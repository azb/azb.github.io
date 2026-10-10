/**
 * Local WebSocket relay for XRFlightSim (dev). Production uses Cloudflare Worker.
 *   npm run local
 *   ws://localhost:8787/room/1234
 */
import { WebSocketServer } from "ws";
import { createServer } from "http";

const PORT = Number(process.env.PORT || 8787);
const rooms = new Map(); // room -> Set<ws>

function roomSet(code) {
  if (!rooms.has(code)) rooms.set(code, new Set());
  return rooms.get(code);
}

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("xrflightsim-relay local\n");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const url = new URL(req.url || "/", "http://localhost");
  let room = url.searchParams.get("room") || "";
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "room" && parts[1]) room = parts[1];
  room = String(room).replace(/\D/g, "").slice(0, 6);
  if (room.length < 4) {
    ws.close(1008, "bad room");
    return;
  }
  ws.room = room;
  ws.uid = "";
  roomSet(room).add(ws);

  ws.on("message", (raw) => {
    let data;
    try {
      data = JSON.parse(String(raw));
    } catch {
      return;
    }
    if (!data || typeof data !== "object") return;
    if (data.type === "join") {
      ws.uid = String(data.uid || "");
      ws.name = String(data.name || "Pilot");
      ws.send(JSON.stringify({ type: "welcome", uid: ws.uid, room }));
      broadcast(room, ws, { type: "peerJoin", uid: ws.uid, name: ws.name }, false);
      return;
    }
    if (data.type === "ping") {
      ws.send(JSON.stringify({ type: "pong", t: data.t || Date.now() }));
      return;
    }
    if (!ws.uid) return;
    broadcast(room, ws, { ...data, from: ws.uid }, true);
  });

  ws.on("close", () => {
    roomSet(room).delete(ws);
    if (ws.uid) broadcast(room, ws, { type: "peerLeave", uid: ws.uid }, false);
    if (roomSet(room).size === 0) rooms.delete(room);
  });
});

function broadcast(room, sender, msg, skipSender) {
  const payload = JSON.stringify(msg);
  for (const peer of roomSet(room)) {
    if (skipSender && peer === sender) continue;
    if (peer.readyState === 1) peer.send(payload);
  }
}

server.listen(PORT, () => {
  console.log(`XRFlightSim relay ws://localhost:${PORT}/room/<code>`);
});
