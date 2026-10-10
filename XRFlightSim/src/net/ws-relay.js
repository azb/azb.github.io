/**
 * WebSocket room relay client (Cloudflare Worker / local server).
 * Fan-out for plane / fire / balloon messages alongside WebRTC.
 */

/** @param {string} baseUrl e.g. wss://xrflightsim-relay.<subdomain>.workers.dev */
export function roomWsUrl(baseUrl, roomCode) {
  const base = String(baseUrl || "").replace(/\/$/, "");
  const room = String(roomCode || "").replace(/\D/g, "").slice(0, 6);
  if (!base || room.length < 4) return "";
  return `${base}/room/${room}`;
}

/**
 * @param {{
 *   url: string,
 *   uid: string,
 *   name?: string,
 *   onMessage: (from: string, msg: object) => void,
 *   onOpen?: () => void,
 *   onClose?: () => void,
 * }} opts
 */
export function createWsRelay(opts) {
  let ws = null;
  let closed = false;
  let reconnectTimer = null;
  let open = false;
  let attempt = 0;

  function clearReconnect() {
    if (reconnectTimer != null) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }

  function connect() {
    if (closed || !opts.url) return;
    clearReconnect();
    try {
      ws = new WebSocket(opts.url);
    } catch {
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      open = true;
      attempt = 0;
      try {
        ws.send(
          JSON.stringify({
            type: "join",
            uid: opts.uid,
            name: opts.name || "Pilot",
          }),
        );
      } catch {
        /* ignore */
      }
      opts.onOpen?.();
    };

    ws.onmessage = (ev) => {
      let msg;
      try {
        msg = JSON.parse(typeof ev.data === "string" ? ev.data : "");
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      if (
        msg.type === "welcome" ||
        msg.type === "pong" ||
        msg.type === "peerJoin" ||
        msg.type === "peerLeave"
      ) {
        return;
      }
      const from = String(msg.from || msg.playerId || "");
      if (!from || from === opts.uid) return;
      opts.onMessage?.(from, msg);
    };

    ws.onclose = () => {
      open = false;
      ws = null;
      opts.onClose?.();
      if (!closed) scheduleReconnect();
    };

    ws.onerror = () => {
      try {
        ws?.close();
      } catch {
        /* ignore */
      }
    };
  }

  function scheduleReconnect() {
    if (closed) return;
    clearReconnect();
    attempt += 1;
    const delay = Math.min(8000, 400 * 2 ** Math.min(attempt, 4));
    reconnectTimer = setTimeout(connect, delay);
  }

  connect();

  return {
    ready() {
      return open && ws?.readyState === WebSocket.OPEN;
    },
    send(msg) {
      if (!this.ready()) return false;
      try {
        ws.send(JSON.stringify(msg));
        return true;
      } catch {
        return false;
      }
    },
    close() {
      closed = true;
      clearReconnect();
      open = false;
      try {
        ws?.close();
      } catch {
        /* ignore */
      }
      ws = null;
    },
  };
}
