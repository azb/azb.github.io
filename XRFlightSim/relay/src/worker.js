/**
 * XRFlightSim pose/event WebSocket relay.
 * One Durable Object per room code — fan-out JSON to peers (Spectacles + WebXR).
 *
 * Client protocol:
 *   { type: "join", room, uid, name? }
 *   then any game message (plane / fire / balloonPop / balloonSync / hello)
 * Server stamps `from` and broadcasts to other sockets in the room.
 */

import { DurableObject } from "cloudflare:workers";

export class FlightRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    /** Restore hibernated sockets. */
    for (const ws of this.ctx.getWebSockets()) {
      const meta = ws.deserializeAttachment() || {};
      ws.uid = meta.uid || "";
      ws.name = meta.name || "Pilot";
    }
  }

  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("XRFlightSim relay — connect via WebSocket", { status: 200 });
    }
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ uid: "", name: "Pilot" });
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, message) {
    let data;
    try {
      data = JSON.parse(typeof message === "string" ? message : new TextDecoder().decode(message));
    } catch {
      return;
    }
    if (!data || typeof data !== "object") return;

    if (data.type === "join") {
      const uid = String(data.uid || "");
      const name = String(data.name || "Pilot");
      if (!uid) return;
      ws.uid = uid;
      ws.name = name;
      ws.serializeAttachment({ uid, name });
      ws.send(JSON.stringify({ type: "welcome", uid }));
      this.broadcast(ws, { type: "peerJoin", uid, name }, false);
      return;
    }

    if (data.type === "ping") {
      ws.send(JSON.stringify({ type: "pong", t: data.t || Date.now() }));
      return;
    }

    if (!ws.uid) return;
    // Fan-out game payloads; never echo to sender.
    this.broadcast(ws, { ...data, from: ws.uid }, true);
  }

  async webSocketClose(ws) {
    if (ws.uid) {
      this.broadcast(ws, { type: "peerLeave", uid: ws.uid }, false);
    }
  }

  async webSocketError(ws) {
    if (ws.uid) {
      this.broadcast(ws, { type: "peerLeave", uid: ws.uid }, false);
    }
  }

  broadcast(sender, msg, skipSender) {
    const payload = JSON.stringify(msg);
    for (const peer of this.ctx.getWebSockets()) {
      if (skipSender && peer === sender) continue;
      try {
        peer.send(payload);
      } catch {
        /* closed */
      }
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("xrflightsim-relay ok", { status: 200 });
    }

    // /room/1234  or  ?room=1234
    let room = url.searchParams.get("room") || "";
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "room" && parts[1]) room = parts[1];
    room = String(room).replace(/\D/g, "").slice(0, 6);
    if (room.length < 4) {
      return new Response("Missing room code. Use /room/1234", { status: 400 });
    }

    const id = env.ROOM.idFromName(room);
    const stub = env.ROOM.get(id);
    return stub.fetch(request);
  },
};
