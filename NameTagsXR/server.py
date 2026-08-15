#!/usr/bin/env python3
"""Local HTTPS + WebSocket relay for NameTagsXR (no Firebase)."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import select
import socket
import ssl
import struct
import subprocess
import sys
import tempfile
import threading
import uuid
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HTTPS_PORT = 8443
HTTP_PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))
CERT_PATH = os.path.join(ROOT, "lan-cert.pem")
KEY_PATH = os.path.join(ROOT, "lan-key.pem")
IP_META = os.path.join(ROOT, "lan-ip.txt")
WS_MAGIC = b"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

rooms_lock = threading.Lock()
# room_id -> { client_id: Client }
rooms: dict[str, dict[str, "Client"]] = {}
lan_ip = "127.0.0.1"
using_https = False


def lan_address() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        sock.close()


def openssl_bin() -> str | None:
    extra = [
        os.path.join(os.environ.get("ProgramFiles", r"C:\Program Files"), "Git", "usr", "bin", "openssl.exe"),
        os.path.join(os.environ.get("ProgramFiles(x86)", r"C:\Program Files (x86)"), "Git", "usr", "bin", "openssl.exe"),
    ]
    for name in ["openssl", *extra]:
        try:
            subprocess.run(
                [name, "version"],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            return name
        except (OSError, subprocess.CalledProcessError):
            continue
    return None


def generate_cert(ip: str) -> bool:
    if (
        os.path.isfile(CERT_PATH)
        and os.path.isfile(KEY_PATH)
        and os.path.isfile(IP_META)
        and open(IP_META, encoding="utf-8").read().strip() == ip
    ):
        return True

    openssl = openssl_bin()
    if not openssl:
        return False

    cfg = f"""[ req ]
prompt = no
distinguished_name = dn
x509_extensions = ext
[ dn ]
CN = NameTagsXR
[ ext ]
basicConstraints = CA:false
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt
[ alt ]
DNS.1 = localhost
IP.1 = 127.0.0.1
IP.2 = {ip}
"""
    fd, cfg_path = tempfile.mkstemp(suffix=".cnf", text=True)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            fh.write(cfg)
        subprocess.run(
            [
                openssl, "req", "-x509", "-newkey", "rsa:2048", "-sha256",
                "-days", "365", "-nodes", "-batch",
                "-keyout", KEY_PATH, "-out", CERT_PATH, "-config", cfg_path,
            ],
            check=True,
            cwd=ROOT,
            stdin=subprocess.DEVNULL,
        )
        with open(IP_META, "w", encoding="utf-8") as fh:
            fh.write(ip)
        return True
    except (OSError, subprocess.CalledProcessError) as err:
        print("Could not create a TLS certificate:", err)
        return False
    finally:
        try:
            os.remove(cfg_path)
        except OSError:
            pass


def recvall(conn: socket.socket, n: int) -> bytes:
    buf = bytearray()
    while len(buf) < n:
        chunk = conn.recv(n - len(buf))
        if not chunk:
            raise ConnectionError("closed")
        buf.extend(chunk)
    return bytes(buf)


def send_frame(conn: socket.socket, opcode: int, payload: bytes) -> None:
    header = bytearray()
    header.append(0x80 | opcode)
    n = len(payload)
    if n < 126:
        header.append(n)
    elif n < 65536:
        header.append(126)
        header.extend(struct.pack("!H", n))
    else:
        header.append(127)
        header.extend(struct.pack("!Q", n))
    conn.sendall(header + payload)


def recv_message(conn: socket.socket) -> tuple[int, bytes]:
    pieces = bytearray()
    opcode = 0
    while True:
        hdr = recvall(conn, 2)
        fin = hdr[0] & 0x80
        op = hdr[0] & 0x0F
        masked = hdr[1] & 0x80
        length = hdr[1] & 0x7F
        if length == 126:
            length = struct.unpack("!H", recvall(conn, 2))[0]
        elif length == 127:
            length = struct.unpack("!Q", recvall(conn, 8))[0]
        mask = recvall(conn, 4) if masked else None
        data = recvall(conn, length)
        if mask:
            data = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
        if op:
            opcode = op
        pieces.extend(data)
        if fin:
            return opcode, bytes(pieces)


class Client:
    def __init__(self, conn: socket.socket):
        self.conn = conn
        self.lock = threading.Lock()
        self.id = ""
        self.room = ""
        self.data: dict = {}

    def send_json(self, obj: dict) -> None:
        raw = json.dumps(obj, separators=(",", ":")).encode("utf-8")
        with self.lock:
            send_frame(self.conn, 1, raw)

    def ping(self) -> None:
        with self.lock:
            send_frame(self.conn, 9, b"")


def room_snapshot(room_id: str, exclude: str | None = None) -> dict:
    peers = {}
    room = rooms.get(room_id, {})
    for cid, client in room.items():
        if exclude and cid == exclude:
            continue
        peers[cid] = client.data or {}
    return peers


def drop_client(client: Client) -> None:
    left_id = client.id
    left_room = client.room
    others = []
    with rooms_lock:
        room = rooms.get(left_room)
        if room and room.get(left_id) is client:
            del room[left_id]
            if not room:
                rooms.pop(left_room, None)
            else:
                others = list(room.values())
    for other in others:
        try:
            other.send_json({"type": "leave", "id": left_id})
        except OSError:
            pass


def handle_message(client: Client, msg: dict) -> None:
    kind = msg.get("type")
    if kind == "join":
        room = str(msg.get("room") or "demo-room")[:48]
        cid = str(msg.get("id") or uuid.uuid4())[:80]
        old = None
        with rooms_lock:
            if client.room and client.id:
                prev = rooms.get(client.room, {})
                if prev.get(client.id) is client:
                    prev.pop(client.id, None)
            bucket = rooms.setdefault(room, {})
            old = bucket.get(cid)
            client.id = cid
            client.room = room
            client.data = {}
            bucket[cid] = client
            snapshot = room_snapshot(room, exclude=cid)
        if old is not None and old is not client:
            try:
                old.conn.close()
            except OSError:
                pass
        client.send_json({"type": "peers", "peers": snapshot})
        print(f"join {cid[:8]} room={room} peers={len(snapshot)}")
        return

    if not client.room or not client.id:
        client.send_json({"type": "error", "message": "Join a room first."})
        return

    if kind == "state":
        data = msg.get("data")
        if not isinstance(data, dict):
            return
        others = []
        with rooms_lock:
            client.data = data
            room = rooms.get(client.room, {})
            others = [c for cid, c in room.items() if cid != client.id]
        payload = {"type": "state", "id": client.id, "data": data}
        for other in others:
            try:
                other.send_json(payload)
            except OSError:
                pass
        return

    if kind == "leave":
        raise ConnectionError("leave")


class LanHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        sys.stdout.write("[%s] %s\n" % (self.address_string(), fmt % args))

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def _json(self, payload: dict, code: int = 200) -> None:
        raw = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self) -> None:
        path = self.path.split("?", 1)[0]
        if path == "/__lan":
            self._json({"ok": True, "ip": lan_ip, "https": using_https})
            return
        if path == "/ws":
            self._websocket()
            return
        super().do_GET()

    def _websocket(self) -> None:
        if (self.headers.get("Upgrade") or "").lower() != "websocket":
            self.send_error(400, "Expected WebSocket upgrade")
            return
        key = self.headers.get("Sec-WebSocket-Key")
        if not key:
            self.send_error(400, "Missing Sec-WebSocket-Key")
            return
        accept = base64.b64encode(hashlib.sha1(key.encode("utf-8") + WS_MAGIC).digest()).decode("ascii")
        self.send_response(101, "Switching Protocols")
        self.send_header("Upgrade", "websocket")
        self.send_header("Connection", "Upgrade")
        self.send_header("Sec-WebSocket-Accept", accept)
        self.end_headers()
        self.close_connection = True
        self.wfile.flush()

        conn = self.connection
        client = Client(conn)
        client.data = {}
        try:
            conn.settimeout(None)
            while True:
                ready, _, _ = select.select([conn], [], [], 20)
                if not ready:
                    try:
                        client.ping()
                    except OSError:
                        break
                    continue
                opcode, payload = recv_message(conn)
                if opcode == 8:
                    break
                if opcode == 9:
                    with client.lock:
                        send_frame(conn, 10, payload)
                    continue
                if opcode == 10:
                    continue
                if opcode not in (1, 2):
                    continue
                try:
                    msg = json.loads(payload.decode("utf-8"))
                except (UnicodeDecodeError, json.JSONDecodeError):
                    continue
                if not isinstance(msg, dict):
                    continue
                handle_message(client, msg)
        except (ConnectionError, OSError, TimeoutError, struct.error):
            pass
        finally:
            drop_client(client)
            try:
                conn.close()
            except OSError:
                pass


class RedirectHandler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        host = (self.headers.get("Host") or lan_ip).split(":")[0] or lan_ip
        loc = f"https://{host}:{HTTPS_PORT}{self.path}"
        self.send_response(301)
        self.send_header("Location", loc)
        self.end_headers()

    def log_message(self, fmt: str, *args) -> None:
        pass


def serve(httpd: ThreadingHTTPServer) -> None:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


def main() -> None:
    global lan_ip, using_https
    try:
        sys.stdout.reconfigure(line_buffering=True)
        sys.stderr.reconfigure(line_buffering=True)
    except Exception:
        pass
    os.chdir(ROOT)
    lan_ip = lan_address()
    using_https = generate_cert(lan_ip)

    if using_https:
        httpd = ThreadingHTTPServer(("0.0.0.0", HTTPS_PORT), LanHandler)
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ctx.load_cert_chain(CERT_PATH, KEY_PATH)
        httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)
        try:
            redirect = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), RedirectHandler)
            threading.Thread(target=serve, args=(redirect,), daemon=True).start()
        except OSError:
            print(f"(Could not bind HTTP redirect on port {HTTP_PORT})")
        local_url = f"https://localhost:{HTTPS_PORT}/"
        lan_url = f"https://{lan_ip}:{HTTPS_PORT}/"
        print()
        print("NameTagsXR local network")
        print(f"  This PC:        {local_url}")
        print(f"  Other devices:  {lan_url}")
        print("  Accept the certificate warning once on each device.")
        print("  Choose Local network, then Enter Room.")
        print("  Press Ctrl+C to stop.")
        print()
        threading.Thread(target=lambda: webbrowser.open(local_url), daemon=True).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
        return

    httpd = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), LanHandler)
    local_url = f"http://localhost:{HTTP_PORT}/"
    lan_url = f"http://{lan_ip}:{HTTP_PORT}/"
    print()
    print("NameTagsXR local network (HTTP only — no openssl, so no HTTPS)")
    print(f"  This PC:        {local_url}")
    print(f"  Other devices:  {lan_url}")
    print("  XR headsets need HTTPS. Install Git for Windows (includes openssl) and re-run.")
    print("  Press Ctrl+C to stop.")
    print()
    threading.Thread(target=lambda: webbrowser.open(local_url), daemon=True).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")


if __name__ == "__main__":
    main()
