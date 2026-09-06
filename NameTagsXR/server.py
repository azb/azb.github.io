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
import urllib.error
import urllib.parse
import urllib.request
import uuid
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HTTPS_PORT = 8443
HTTP_PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))
CERT_PATH = os.path.join(ROOT, "lan-cert.pem")
KEY_PATH = os.path.join(ROOT, "lan-key.pem")
IP_META = os.path.join(ROOT, "lan-ip.txt")
CDN_CACHE = os.path.join(ROOT, "vendor-cdn")
THREE_CDN = "https://cdn.jsdelivr.net/npm/three@0.180.0"
THREE_LOCAL = "/cdn/three"
HAND_CDN = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand"
HAND_LOCAL = "/cdn/hands"
WS_MAGIC = b"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

rooms_lock = threading.Lock()
# room_id -> { client_id: Client }
rooms: dict[str, dict[str, "Client"]] = {}
# room_id -> { object_id: { meta, bytes } }
room_models: dict[str, dict[str, dict]] = {}
MAX_MODEL_BYTES = 20 * 1024 * 1024
lan_ip = "127.0.0.1"
using_https = False


def safe_token(value: str, n: int = 80) -> str:
    raw = str(value or "")[:n]
    return "".join(ch for ch in raw if ch.isalnum() or ch in "-_.") or ""


def room_object_list(room_id: str) -> list:
    out = []
    for rec in room_models.get(room_id, {}).values():
        meta = rec.get("meta")
        if isinstance(meta, dict) and meta.get("id"):
            out.append(meta)
    return out


def parse_model_path(path: str):
    parts = path.strip("/").split("/")
    if len(parts) != 3 or parts[0] != "models":
        return None
    room = safe_token(urllib.parse.unquote(parts[1]), 48)
    oid = safe_token(urllib.parse.unquote(parts[2]), 80)
    if not room or not oid:
        return None
    return room, oid


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
                room_models.pop(left_room, None)
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
            objects = room_object_list(room)
        if old is not None and old is not client:
            try:
                old.conn.close()
            except OSError:
                pass
        client.send_json({"type": "peers", "peers": snapshot, "objects": objects})
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

    if kind == "object":
        action = str(msg.get("action") or "")
        obj = msg.get("object")
        if action not in ("add", "move", "hold", "remove") or not isinstance(obj, dict):
            return
        oid = safe_token(obj.get("id"))
        if not oid:
            return
        obj = {**obj, "id": oid}
        others = []
        with rooms_lock:
            bucket = room_models.setdefault(client.room, {})
            if action == "remove":
                bucket.pop(oid, None)
            else:
                prev = bucket.get(oid) or {}
                meta = dict(prev.get("meta") or {})
                for key in ("name", "ext", "x", "y", "z", "heldBy", "seq", "size", "fitted"):
                    if key in obj:
                        meta[key] = obj[key]
                meta["id"] = oid
                bucket[oid] = {"meta": meta, "bytes": prev.get("bytes")}
            room = rooms.get(client.room, {})
            others = [c for cid, c in room.items() if cid != client.id]
        payload = {"type": "object", "action": action, "object": obj}
        for other in others:
            try:
                other.send_json(payload)
            except OSError:
                pass
        return

    if kind in ("file-meta", "file-chunk", "file-request"):
        others = []
        with rooms_lock:
            room = rooms.get(client.room, {})
            others = [c for cid, c in room.items() if cid != client.id]
        for other in others:
            try:
                other.send_json(msg)
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

    def guess_type(self, path):
        lowered = path.lower()
        if lowered.endswith(".js") or lowered.endswith(".mjs"):
            return "text/javascript"
        if lowered.endswith(".wasm"):
            return "application/wasm"
        return SimpleHTTPRequestHandler.guess_type(self, path)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self) -> None:
        path = self.path.split("?", 1)[0]
        ident = parse_model_path(path)
        if not ident:
            self.send_error(404, "Unknown POST")
            return
        room, oid = ident
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_MODEL_BYTES:
            self.send_error(413 if length > MAX_MODEL_BYTES else 400, "Invalid model size")
            return
        data = self.rfile.read(length)
        qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        name = safe_token((qs.get("name") or ["model"])[0], 80) or "model"
        ext = safe_token((qs.get("ext") or [""])[0], 8).lower()
        with rooms_lock:
            bucket = room_models.setdefault(room, {})
            prev = bucket.get(oid) or {}
            meta = dict(prev.get("meta") or {})
            meta.update({"id": oid, "name": name, "ext": ext, "size": len(data)})
            bucket[oid] = {"meta": meta, "bytes": data}
        self._json({"ok": True, "id": oid, "size": len(data)})

    def do_GET(self) -> None:
        path = self.path.split("?", 1)[0]
        if path == "/__lan":
            self._json({"ok": True, "ip": lan_ip, "https": using_https})
            return
        if path == "/ws":
            self._websocket()
            return
        if path == "/" or path == "/index.html":
            self._serve_index()
            return
        if path.startswith("/models/"):
            ident = parse_model_path(path)
            if not ident:
                self.send_error(400, "Bad model path")
                return
            room, oid = ident
            with rooms_lock:
                rec = room_models.get(room, {}).get(oid)
                data = rec.get("bytes") if rec else None
            if not data:
                self.send_error(404, "Model not found")
                return
            self.send_response(200)
            self.send_header("Content-Type", "application/octet-stream")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        if path.startswith(THREE_LOCAL + "/"):
            self._proxy_cdn(THREE_CDN, path[len(THREE_LOCAL) + 1 :], "three")
            return
        if path.startswith(HAND_LOCAL + "/"):
            self._proxy_cdn(HAND_CDN, path[len(HAND_LOCAL) + 1 :], "hands")
            return
        super().do_GET()

    def _serve_index(self) -> None:
        index_path = os.path.join(ROOT, "index.html")
        with open(index_path, encoding="utf-8") as fh:
            html = fh.read()
        html = html.replace(
            f"{THREE_CDN}/build/three.module.js",
            f"{THREE_LOCAL}/build/three.module.js",
        )
        html = html.replace(
            f"{THREE_CDN}/examples/jsm/",
            f"{THREE_LOCAL}/examples/jsm/",
        )
        raw = html.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _proxy_cdn(self, base: str, rel: str, folder: str) -> None:
        rel = rel.lstrip("/")
        if not rel or ".." in rel.split("/"):
            self.send_error(400, "Bad path")
            return
        cache_root = os.path.join(CDN_CACHE, folder)
        os.makedirs(cache_root, exist_ok=True)
        cache_path = os.path.join(cache_root, rel.replace("/", os.sep))
        data = None
        if os.path.isfile(cache_path):
            with open(cache_path, "rb") as fh:
                data = fh.read()
        else:
            url = f"{base.rstrip('/')}/{rel}"
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "NameTagsXR"})
                with urllib.request.urlopen(req, timeout=25) as resp:
                    data = resp.read()
            except (urllib.error.URLError, TimeoutError, OSError) as err:
                self.send_error(502, f"Could not fetch {rel}: {err}")
                return
            os.makedirs(os.path.dirname(cache_path) or cache_root, exist_ok=True)
            with open(cache_path, "wb") as fh:
                fh.write(data)
        lowered = rel.lower()
        if lowered.endswith(".js") or lowered.endswith(".mjs"):
            ctype = "text/javascript"
        elif lowered.endswith(".glb"):
            ctype = "model/gltf-binary"
        elif lowered.endswith(".gltf"):
            ctype = "model/gltf+json"
        elif lowered.endswith(".css"):
            ctype = "text/css"
        else:
            ctype = "application/octet-stream"
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

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


def serve(httpd: ThreadingHTTPServer) -> None:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


def print_urls() -> None:
    print()
    print("NameTagsXR local network")
    print(f"  This PC:              http://localhost:{HTTP_PORT}/")
    print(f"  Headset over USB:     http://127.0.0.1:{HTTP_PORT}/")
    print("    1. Enable USB debugging on the headset")
    print("    2. Run start-quest.bat  (or: adb reverse tcp:8080 tcp:8080)")
    print("    3. Open the USB URL in the headset browser")
    print(f"  Other devices Wi-Fi:  http://{lan_ip}:{HTTP_PORT}/")
    if using_https:
        print(f"                        https://{lan_ip}:{HTTPS_PORT}/")
        print("    Self-signed HTTPS often blocks headset XR. USB localhost is more reliable.")
    print("  Choose Local network, then Enter Room.")
    print("  Press Ctrl+C to stop.")
    print()


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

    try:
        httpd = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), LanHandler)
    except OSError as err:
        print(f"Could not bind HTTP on port {HTTP_PORT}: {err}")
        sys.exit(1)

    if using_https:
        try:
            httpsd = ThreadingHTTPServer(("0.0.0.0", HTTPS_PORT), LanHandler)
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            ctx.minimum_version = ssl.TLSVersion.TLSv1_2
            ctx.load_cert_chain(CERT_PATH, KEY_PATH)
            httpsd.socket = ctx.wrap_socket(httpsd.socket, server_side=True)
            threading.Thread(target=serve, args=(httpsd,), daemon=True).start()
        except OSError as err:
            using_https = False
            print(f"HTTPS unavailable on {HTTPS_PORT}: {err}")

    print_urls()
    threading.Thread(target=lambda: webbrowser.open(f"http://localhost:{HTTP_PORT}/"), daemon=True).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")


if __name__ == "__main__":
    main()
