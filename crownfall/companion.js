var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../spectacles/Assets/Scripts/SimulacraCore.ts
function xrToProtocol(x, y, z) {
  return { x, y, z: -z };
}
function protocolToXr(p) {
  return { x: p.x, y: p.y, z: -p.z };
}
var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function pcm16ToBase64(samples, count) {
  let out = "";
  const bytes = count * 2;
  const byteAt = (i) => {
    const s = samples[i >> 1] & 65535;
    return (i & 1) === 0 ? s & 255 : s >> 8;
  };
  for (let i = 0; i < bytes; i += 3) {
    const a = byteAt(i);
    const b = i + 1 < bytes ? byteAt(i + 1) : 0;
    const c = i + 2 < bytes ? byteAt(i + 2) : 0;
    out += B64.charAt(a >> 2) + B64.charAt((a & 3) << 4 | b >> 4);
    out += i + 1 < bytes ? B64.charAt((b & 15) << 2 | c >> 6) : "=";
    out += i + 2 < bytes ? B64.charAt(c & 63) : "=";
  }
  return out;
}
function base64ToPcm16(text) {
  let len = text.length;
  while (len > 0 && text.charAt(len - 1) === "=") len--;
  const bytes = Math.floor(len * 3 / 4);
  const out = new Int16Array(bytes >> 1);
  let acc = 0;
  let bits = 0;
  let n = 0;
  let low = 0;
  for (let i = 0; i < len; i++) {
    const v = B64.indexOf(text.charAt(i));
    if (v < 0) continue;
    acc = acc << 6 | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      const byte = acc >> bits & 255;
      if ((n & 1) === 0) low = byte;
      else {
        const s = low | byte << 8;
        out[n >> 1] = s >= 32768 ? s - 65536 : s;
      }
      n++;
    }
  }
  return out;
}
var flat = (a, b) => Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.z - b.z) * (a.z - b.z));
var _SimulacraCore = class _SimulacraCore {
  constructor(host2, deviceName) {
    __publicField(this, "host", host2);
    __publicField(this, "deviceName", deviceName);
    __publicField(this, "walkSpeed", 0.9);
    // m/s
    __publicField(this, "turnSpeed", 3.5);
    // rad/s
    __publicField(this, "userDistance", 1.2);
    /** While true the microphone stream carries silence (echo guard while the avatar speaks). */
    __publicField(this, "micMuted", false);
    __publicField(this, "objects", []);
    __publicField(this, "avatar", { pos: { x: 0, y: 0, z: 0 }, yaw: 0, state: "idle", speed01: 0, gesture: "" });
    __publicField(this, "connected", false);
    __publicField(this, "brain", "-");
    __publicField(this, "lastAction", "");
    __publicField(this, "lastTranscript", "");
    __publicField(this, "lastError", "");
    /** Seconds of speech still queued for playback, estimated from what was received. */
    __publicField(this, "speakingFor", 0);
    __publicField(this, "placed", false);
    __publicField(this, "clock", 0);
    __publicField(this, "nextWorld", 0);
    __publicField(this, "counters", {});
    __publicField(this, "goal", null);
    __publicField(this, "face", null);
    __publicField(this, "goalTarget", "");
    __publicField(this, "pendingGesture", "");
    /** Waypoints still to visit after `goal` (the path found around obstacles). */
    __publicField(this, "route", []);
    __publicField(this, "planned", []);
    __publicField(this, "following", false);
    __publicField(this, "done", null);
    __publicField(this, "stuckFor", 0);
    __publicField(this, "bestDistance", 0);
    __publicField(this, "sideBias", 0);
    __publicField(this, "sideBiasFor", 0);
    __publicField(this, "mic", new Int16Array(_SimulacraCore.AUDIO_RATE / 1e3 * 60));
    __publicField(this, "micCount", 0);
    __publicField(this, "micPos", 0);
  }
  // ---- connection
  onOpen() {
    this.connected = true;
    this.lastError = "";
    this.sendJson({ type: "hello", protocol: 1, device: this.deviceName, capabilities: { vision: false, navmesh: false } });
    this.nextWorld = 0;
  }
  onClose() {
    this.connected = false;
    this.brain = "-";
  }
  onMessage(text) {
    let m;
    try {
      m = JSON.parse(text);
    } catch (e) {
      return;
    }
    switch (m.type) {
      case "ready":
        this.brain = String(m.brain);
        break;
      case "audio": {
        const samples = base64ToPcm16(String(m.pcm16));
        this.speakingFor += samples.length / _SimulacraCore.AUDIO_RATE;
        this.host.playAudio(samples);
        break;
      }
      case "audio_stop":
        this.speakingFor = 0;
        this.host.stopAudio();
        break;
      case "action":
        this.handleAction(m);
        break;
      case "transcript":
        this.lastTranscript = (m.role === "user" ? "You: " : "Sim: ") + String(m.text);
        break;
      case "log":
        this.lastError = String(m.message);
        this.host.log("[backend " + m.level + "] " + m.message);
        break;
    }
  }
  sendJson(obj) {
    if (this.connected) this.host.send(JSON.stringify(obj));
  }
  /** The user pressed the interrupt control. */
  interrupt() {
    this.speakingFor = 0;
    this.host.stopAudio();
    this.sendJson({ type: "interrupt" });
  }
  // ---- microphone
  /**
   * Feed captured microphone samples (-1..1) at `rate` Hz. They are resampled to 24 kHz, packed
   * as PCM16 and sent in 60 ms frames. The stream never stops: while muted it carries silence,
   * because the speech service needs continuous audio to notice the end of an utterance.
   */
  pushMic(samples, count, rate) {
    const step = rate / _SimulacraCore.AUDIO_RATE;
    while (this.micPos < count) {
      const i = Math.floor(this.micPos);
      const a = samples[i];
      const b = i + 1 < count ? samples[i + 1] : a;
      let s = a + (b - a) * (this.micPos - i);
      if (this.micMuted) s = 0;
      s = s < -1 ? -1 : s > 1 ? 1 : s;
      this.mic[this.micCount++] = Math.round(s * 32767);
      if (this.micCount === this.mic.length) {
        this.sendJson({ type: "audio", pcm16: pcm16ToBase64(this.mic, this.micCount) });
        this.micCount = 0;
      }
      this.micPos += step;
    }
    this.micPos -= count;
  }
  // ---- world model
  find(id) {
    const key = String(id || "").toLowerCase();
    for (let i = 0; i < this.objects.length; i++) if (this.objects[i].id.toLowerCase() === key) return this.objects[i];
    return null;
  }
  /** Add an object the user pointed at and named. Re-registering the same thing nearby keeps its id. */
  register(label, pos, source) {
    label = String(label || "object").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "object";
    for (let i = 0; i < this.objects.length; i++) {
      const o = this.objects[i];
      if (o.label === label && flat(o.pos, pos) < 0.75) {
        o.seenAt = this.clock;
        return o;
      }
    }
    this.counters[label] = (this.counters[label] || 0) + 1;
    const obj = { id: label + "_" + this.counters[label], label, pos, size: { x: 0.5, y: 0.5, z: 0.5 }, source, confidence: 1, seenAt: this.clock };
    this.objects.push(obj);
    return obj;
  }
  /**
   * Add or refresh an object the device knows by a stable id of its own (a scanned piece of
   * furniture, a simulated prop). Ids never change between refreshes.
   */
  upsert(id, label, pos, size, source) {
    let o = this.find(id);
    if (!o) {
      o = { id, label, pos, size, source, confidence: 1, seenAt: this.clock };
      this.objects.push(o);
    }
    o.label = label;
    o.pos = pos;
    o.size = size;
    o.seenAt = this.clock;
    return o;
  }
  /** Forget objects from one source whose ids are not in `keep` (furniture that left the room scan). */
  prune(source, keep) {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      if (this.objects[i].source === source && keep.indexOf(this.objects[i].id) < 0) this.objects.splice(i, 1);
    }
  }
  /** Typed input instead of speech (desktop preview and tests). */
  sendText(text) {
    this.sendJson({ type: "text", text });
  }
  /** Put the avatar in front of the user, facing them, on real floor. Call once the floor is known. */
  placeInFrontOfUser(distance) {
    const floorY = this.host.floorY();
    if (floorY === null) return false;
    const head = this.host.headPosition();
    const f = this.host.headForward();
    const len = Math.sqrt(f.x * f.x + f.z * f.z) || 1;
    const base = Math.atan2(f.x / len, f.z / len);
    const user = { x: head.x, y: floorY, z: head.z };
    const dists = [distance, distance * 0.75, distance * 1.3, 1];
    for (let d = 0; d < dists.length; d++) {
      for (let i = 0; i < 9; i++) {
        const a = base + Math.ceil(i / 2) * 0.44 * (i % 2 === 0 ? -1 : 1);
        const p = { x: user.x + Math.sin(a) * dists[d], y: floorY, z: user.z + Math.cos(a) * dists[d] };
        if (!this.host.isFloor(p) || !this.clearLine(user, p)) continue;
        this.avatar.pos = p;
        this.avatar.yaw = Math.atan2(user.x - p.x, user.z - p.z);
        this.placed = true;
        return true;
      }
    }
    return false;
  }
  userFloor() {
    const h = this.host.headPosition();
    const y = this.host.floorY();
    return { x: h.x, y: y === null ? this.avatar.pos.y : y, z: h.z };
  }
  /** Every 25 cm along a straight line must be real floor. */
  clearLine(a, b) {
    const n = Math.max(1, Math.ceil(flat(a, b) / 0.25));
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      if (!this.host.isFloor({ x: a.x + (b.x - a.x) * t, y: a.y, z: a.z + (b.z - a.z) * t })) return false;
    }
    return true;
  }
  /**
   * Path from a to b over real floor: the straight line if it is clear, otherwise a shortest path
   * on a 20 cm grid (A*), simplified to its corners. Returns the points to walk through, ending
   * at b, or null if b cannot be reached. Runs on the device in well under a frame.
   */
  planPath(a, b) {
    if (this.clearLine(a, b)) return [b];
    const cell = 0.2;
    const span = 60;
    const key = (i, j) => (i + span) * (2 * span + 1) + (j + span);
    const at = (i, j) => ({ x: a.x + i * cell, y: a.y, z: a.z + j * cell });
    const gi = Math.round((b.x - a.x) / cell);
    const gj = Math.round((b.z - a.z) / cell);
    if (Math.abs(gi) > span || Math.abs(gj) > span) return null;
    const walk = {};
    const free = (i, j) => {
      if (Math.abs(i) > span || Math.abs(j) > span) return false;
      const k = key(i, j);
      if (walk[k] === void 0) walk[k] = i === 0 && j === 0 || this.host.isFloor(at(i, j));
      return walk[k];
    };
    if (!free(gi, gj)) return null;
    const open = [[0, 0, 0, 0]];
    const cost = {};
    const from = {};
    cost[key(0, 0)] = 0;
    const steps = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    let found = false;
    for (let guard = 0; guard < 6e3 && open.length > 0; guard++) {
      let best = 0;
      for (let n = 1; n < open.length; n++) if (open[n][3] < open[best][3]) best = n;
      const cur = open.splice(best, 1)[0];
      if (cur[0] === gi && cur[1] === gj) {
        found = true;
        break;
      }
      if (cur[2] > cost[key(cur[0], cur[1])]) continue;
      for (let s = 0; s < steps.length; s++) {
        const ni = cur[0] + steps[s][0];
        const nj = cur[1] + steps[s][1];
        if (!free(ni, nj)) continue;
        if (steps[s][0] !== 0 && steps[s][1] !== 0 && (!free(cur[0] + steps[s][0], cur[1]) || !free(cur[0], cur[1] + steps[s][1]))) continue;
        const c = cur[2] + (steps[s][0] !== 0 && steps[s][1] !== 0 ? 1.414 : 1);
        const k = key(ni, nj);
        if (cost[k] !== void 0 && cost[k] <= c) continue;
        cost[k] = c;
        from[k] = [cur[0], cur[1]];
        const di = Math.abs(gi - ni);
        const dj = Math.abs(gj - nj);
        open.push([ni, nj, c, c + Math.max(di, dj) + 0.414 * Math.min(di, dj)]);
      }
    }
    if (!found) return null;
    const cells = [];
    let ci = gi;
    let cj = gj;
    while (!(ci === 0 && cj === 0)) {
      cells.unshift(at(ci, cj));
      const prev = from[key(ci, cj)];
      ci = prev[0];
      cj = prev[1];
    }
    cells[cells.length - 1] = b;
    const out = [];
    let here = a;
    let idx = 0;
    while (idx < cells.length) {
      let far = idx;
      for (let n = cells.length - 1; n > idx; n--) {
        if (this.clearLine(here, cells[n])) {
          far = n;
          break;
        }
      }
      out.push(cells[far]);
      here = cells[far];
      idx = far + 1;
    }
    return out;
  }
  /** A reachable spot on a ring around a target, nearest side first, with the path to it. */
  standPoint(target, radius) {
    const from = this.avatar.pos;
    const base = Math.atan2(from.x - target.x, from.z - target.z);
    const radii = [radius, radius + 0.3, radius + 0.7];
    for (let r = 0; r < radii.length; r++) {
      for (let i = 0; i < 12; i++) {
        const a = base + Math.ceil(i / 2) * (Math.PI / 6) * (i % 2 === 0 ? -1 : 1);
        const p = { x: target.x + Math.sin(a) * radii[r], y: from.y, z: target.z + Math.cos(a) * radii[r] };
        if (!this.host.isFloor(p)) continue;
        const path = this.planPath(from, p);
        if (path === null) continue;
        this.planned = path;
        return p;
      }
    }
    return null;
  }
  resolve(target) {
    if (String(target).toLowerCase() === "user") return { pos: this.userFloor(), standOff: this.userDistance };
    const o = this.find(target);
    if (!o) return null;
    const foot = Math.max(o.size.x, o.size.z) / 2 + 0.45;
    return { pos: o.pos, standOff: Math.min(2, Math.max(0.6, foot)) };
  }
  // ---- actions
  finish(ok, reason) {
    const cb = this.done;
    this.goal = null;
    this.route = [];
    this.face = null;
    this.done = null;
    this.goalTarget = "";
    this.avatar.state = this.following ? "following" : "idle";
    if (cb) cb(ok, reason);
  }
  handleAction(m) {
    const id = String(m.id);
    const action = String(m.action || "");
    const target = action === "approach_user" ? "user" : String(m.target_id || "");
    const reply = (ok, reason, data) => {
      this.lastAction = action + (target ? " " + target : "") + (ok ? " ok" : " FAILED: " + reason);
      const r = { type: "action_result", id, status: ok ? "succeeded" : "failed" };
      if (!ok && reason) r.reason = reason;
      if (data) r.data = data;
      this.sendJson(r);
    };
    const started = (pathM) => this.sendJson({ type: "event", name: "action_started", data: { id, plan_ms: 0, path_m: Math.round(pathM * 10) / 10 } });
    this.lastAction = action + (target ? " " + target : "") + " ...";
    if (action === "walk_to" || action === "inspect_object" || action === "approach_user") {
      if (!this.placed) return reply(false, "the floor has not been found yet; ask the user to look at the floor");
      const t = this.resolve(target);
      if (!t) return reply(false, "unknown target '" + target + "'");
      if (this.done) this.finish(false, "superseded by a newer action");
      this.following = false;
      const near = flat(this.avatar.pos, t.pos) <= t.standOff + 0.25;
      const stand = near ? this.avatar.pos : this.standPoint(t.pos, t.standOff);
      if (!stand) return reply(false, "there is no reachable floor next to " + target);
      this.route = near ? [] : this.planned.slice(1);
      this.goal = near ? stand : this.planned[0];
      this.face = t.pos;
      this.goalTarget = target;
      this.stuckFor = 0;
      this.bestDistance = flat(this.avatar.pos, stand);
      this.sideBias = 0;
      this.avatar.state = "turning";
      started(flat(this.avatar.pos, stand));
      this.done = (ok, reason) => reply(ok, reason, { metres_from_target: Math.round(flat(this.avatar.pos, this.resolveOr(target, t.pos)) * 10) / 10 });
      return;
    }
    if (action === "look_at") {
      const t = this.resolve(target);
      if (!t) return reply(false, "unknown target '" + target + "'");
      if (this.done) this.finish(false, "superseded by a newer action");
      this.goal = this.avatar.pos;
      this.route = [];
      this.face = t.pos;
      this.avatar.state = "turning";
      this.done = (ok, reason) => reply(ok, reason);
      return;
    }
    if (action === "follow_user") {
      if (!this.placed) return reply(false, "the floor has not been found yet");
      if (this.done) this.finish(false, "superseded by a newer action");
      this.following = true;
      this.avatar.state = "following";
      started(0);
      return reply(true, "", { following: true });
    }
    if (action === "stop") {
      this.following = false;
      if (this.done) this.finish(false, "stopped");
      this.avatar.state = "idle";
      return reply(true, "");
    }
    if (action === "gesture") {
      const type = String(m.params && m.params.type || "");
      if (["wave", "nod", "shake_head", "shrug"].indexOf(type) < 0) return reply(false, "unknown gesture '" + type + "'");
      this.pendingGesture = type;
      return reply(true, "");
    }
    if (action === "register_marker") {
      const label = String(m.params && m.params.label || "");
      if (!label) return reply(false, "a label is required");
      const hit = this.host.pointerHit();
      if (!hit) return reply(false, "could not tell where the user is looking; ask them to look at the object or the floor beside it");
      const o = this.register(label, hit, "manual");
      this.nextWorld = 0;
      return reply(true, "", { id: o.id, label: o.label, origin: "registered by the user, not camera-detected" });
    }
    if (action === "scan_surroundings") return reply(false, "camera object detection is not available on this device; ask the user to look at things and name them");
    reply(false, "this device does not implement action '" + action + "'");
  }
  resolveOr(target, fallback) {
    const t = this.resolve(target);
    return t ? t.pos : fallback;
  }
  // ---- per-frame update
  turnToward(point, dt) {
    const want = Math.atan2(point.x - this.avatar.pos.x, point.z - this.avatar.pos.z);
    let diff = Math.atan2(Math.sin(want - this.avatar.yaw), Math.cos(want - this.avatar.yaw));
    const stepAbs = Math.min(Math.abs(diff), this.turnSpeed * dt);
    this.avatar.yaw += diff < 0 ? -stepAbs : stepAbs;
    diff = Math.atan2(Math.sin(want - this.avatar.yaw), Math.cos(want - this.avatar.yaw));
    return Math.abs(diff);
  }
  /**
   * One step toward a point. If the direct step is not on real floor, try stepping around the
   * obstruction (the same side for a while, so it does not dither). Returns metres moved.
   * This is local obstacle avoidance, not path planning: it gets around a chair, not out of a maze.
   */
  stepToward(point, maxStep, dt) {
    const want = Math.atan2(point.x - this.avatar.pos.x, point.z - this.avatar.pos.z);
    this.sideBiasFor = Math.max(0, this.sideBiasFor - dt);
    if (this.sideBiasFor === 0) this.sideBias = 0;
    const offsets = this.sideBias > 0 ? [0, 0.6, 1.2, 1.6] : this.sideBias < 0 ? [0, -0.6, -1.2, -1.6] : [0, 0.6, -0.6, 1.2, -1.2, 1.6, -1.6];
    for (let i = 0; i < offsets.length; i++) {
      const heading = want + offsets[i];
      const probe = { x: this.avatar.pos.x + Math.sin(heading) * 0.3, y: this.avatar.pos.y, z: this.avatar.pos.z + Math.cos(heading) * 0.3 };
      const next = { x: this.avatar.pos.x + Math.sin(heading) * maxStep, y: this.avatar.pos.y, z: this.avatar.pos.z + Math.cos(heading) * maxStep };
      if (!this.host.isFloor(next) || !this.host.isFloor(probe)) continue;
      if (offsets[i] !== 0) {
        this.sideBias = offsets[i] > 0 ? 1 : -1;
        this.sideBiasFor = 1.5;
      }
      let diff = Math.atan2(Math.sin(heading - this.avatar.yaw), Math.cos(heading - this.avatar.yaw));
      const turn = Math.min(Math.abs(diff), this.turnSpeed * dt);
      this.avatar.yaw += diff < 0 ? -turn : turn;
      this.avatar.pos = next;
      return maxStep;
    }
    return 0;
  }
  /** Advance the avatar. Call every frame; read `avatar` afterwards. Runs with or without a connection. */
  update(dt) {
    this.clock += dt;
    this.avatar.gesture = this.pendingGesture;
    this.pendingGesture = "";
    if (this.speakingFor > 0) this.speakingFor = Math.max(0, this.speakingFor - dt);
    let moved = 0;
    const floorY = this.host.floorY();
    if (floorY !== null && this.placed) this.avatar.pos.y = floorY;
    if (this.goal && this.face) {
      if (this.goalTarget === "user") {
        const u = this.userFloor();
        if (flat(u, this.face) > 0.3) {
          this.face = u;
          const p = flat(this.avatar.pos, u) <= this.userDistance + 0.25 ? this.avatar.pos : this.standPoint(u, this.userDistance);
          if (p === this.avatar.pos) {
            this.goal = p;
            this.route = [];
          } else if (p) {
            this.goal = this.planned[0];
            this.route = this.planned.slice(1);
            this.bestDistance = flat(this.avatar.pos, this.goal);
          }
        }
      }
      const d = flat(this.avatar.pos, this.goal);
      if (d > 0.04) {
        const aim = Math.atan2(this.goal.x - this.avatar.pos.x, this.goal.z - this.avatar.pos.z);
        const off = Math.abs(Math.atan2(Math.sin(aim - this.avatar.yaw), Math.cos(aim - this.avatar.yaw)));
        if (this.avatar.state !== "walking" && off > 0.4 && this.sideBias === 0) {
          this.turnToward(this.goal, dt);
          this.avatar.state = "turning";
        } else {
          moved = this.stepToward(this.goal, Math.min(d, this.walkSpeed * dt), dt);
          this.avatar.state = "walking";
          const now = flat(this.avatar.pos, this.goal);
          if (now < this.bestDistance - 0.05) {
            this.bestDistance = now;
            this.stuckFor = 0;
          } else {
            this.stuckFor += dt;
            if (this.stuckFor > (moved > 0 ? 4 : 1)) this.finish(false, "the way became blocked");
          }
        }
      } else if (this.route.length > 0) {
        this.goal = this.route.shift();
        this.bestDistance = flat(this.avatar.pos, this.goal);
        this.stuckFor = 0;
        this.sideBias = 0;
      } else if (this.turnToward(this.face, dt) < 0.06) this.finish(true, "");
      else this.avatar.state = "turning";
    } else if (this.following) {
      const u = this.userFloor();
      const d = flat(this.avatar.pos, u);
      const off = d > this.userDistance + 0.5 ? 0 : this.turnToward(u, dt);
      if (d > this.userDistance + 0.5) moved = this.stepToward(u, Math.min(d - this.userDistance, this.walkSpeed * dt), dt);
      else void off;
      this.avatar.state = "following";
    }
    this.avatar.speed01 = dt > 0 ? Math.min(1, moved / dt / this.walkSpeed) : 0;
    if (this.connected && this.clock >= this.nextWorld) {
      this.nextWorld = this.clock + 0.4;
      this.sendWorld();
    }
  }
  sendWorld() {
    const v = (p) => [Math.round(p.x * 1e3) / 1e3, Math.round(p.y * 1e3) / 1e3, Math.round(p.z * 1e3) / 1e3];
    const floorY = this.host.floorY();
    const info = this.host.roomInfo ? this.host.roomInfo() : null;
    const objects = [];
    for (let i = 0; i < this.objects.length; i++) {
      const o = this.objects[i];
      objects.push({ id: o.id, label: o.label, pos: v(o.pos), size: v(o.size), source: o.source, confidence: o.confidence, lastSeen: Math.round((this.clock - o.seenAt) * 10) / 10, reachable: true });
    }
    const state = this.avatar.state === "idle" && this.speakingFor > 0 ? "speaking" : this.avatar.state;
    this.sendJson({
      type: "world",
      world: {
        user: { pos: v(this.host.headPosition()), fwd: v(this.host.headForward()) },
        avatar: { pos: v(this.avatar.pos), fwd: v({ x: Math.sin(this.avatar.yaw), y: 0, z: Math.cos(this.avatar.yaw) }), state },
        objects,
        room: { source: floorY === null ? "unknown" : info ? info.source : "surface_hit_test", floorY: floorY === null ? 0 : Math.round(floorY * 1e3) / 1e3, obstacles: info ? info.obstacles : 0, navmesh: false }
      }
    });
  }
};
__publicField(_SimulacraCore, "AUDIO_RATE", 24e3);
var SimulacraCore = _SimulacraCore;

// ../webxr/crownfall-companion.js
var params = new URLSearchParams(location.search);
var isQuest = /OculusBrowser|Quest/i.test(navigator.userAgent);
var $ = (id) => document.getElementById(id);
var T = window.__cf3 || {};
var V3 = T.Vector3 || function V32() {
};
var tmpV = new V3();
var tmpD = new V3();
var boardPos = new V3();
var standPos = new V3();
var audio = null;
var speechGain = null;
var analyser = null;
var nextPlay = 0;
var playing = /* @__PURE__ */ new Set();
var levelBuf = new Uint8Array(256);
var micOn = false;
var micOpening = false;
var userMuted = true;
var aWasDown = false;
var parkedAt = null;
var commanded = false;
var lastStatus = "";
var halfDuplex = params.has("halfduplex") ? params.get("halfduplex") !== "0" : isQuest;
function audioContext() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    speechGain = audio.createGain();
    analyser = audio.createAnalyser();
    analyser.fftSize = 512;
    speechGain.connect(analyser);
    analyser.connect(audio.destination);
  }
  if (audio.state === "suspended") audio.resume();
  return audio;
}
function playAudio(samples) {
  const ctx = audioContext();
  const buffer = ctx.createBuffer(1, samples.length, SimulacraCore.AUDIO_RATE);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) data[i] = samples[i] / 32768;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(speechGain);
  nextPlay = Math.max(nextPlay, ctx.currentTime + 0.04);
  src.start(nextPlay);
  nextPlay += buffer.duration;
  playing.add(src);
  src.onended = () => playing.delete(src);
}
function stopAudio() {
  for (const src of playing) {
    try {
      src.stop();
    } catch (e) {
    }
  }
  playing.clear();
  nextPlay = 0;
}
function speechLevel() {
  if (!analyser || playing.size === 0) return 0;
  analyser.getByteTimeDomainData(levelBuf);
  let sum = 0;
  for (let i = 0; i < levelBuf.length; i++) {
    const v = (levelBuf[i] - 128) / 128;
    sum += v * v;
  }
  return Math.min(1, Math.sqrt(sum / levelBuf.length) * 5);
}
function viewCamera(ctx) {
  return ctx.renderer.xr.isPresenting ? ctx.renderer.xr.getCamera() : ctx.camera;
}
var socket = null;
var host = {
  send: (text) => {
    if (socket && socket.readyState === WebSocket.OPEN) socket.send(text);
  },
  headPosition: () => {
    const cam = viewCamera(latest);
    cam.getWorldPosition(tmpV);
    return xrToProtocol(tmpV.x, tmpV.y, tmpV.z);
  },
  headForward: () => {
    const cam = viewCamera(latest);
    cam.getWorldDirection(tmpD);
    return xrToProtocol(tmpD.x, tmpD.y, tmpD.z);
  },
  floorY: () => 0,
  isFloor: () => true,
  pointerHit: () => null,
  playAudio,
  stopAudio,
  log: (m) => console.log(m),
  roomInfo: () => ({ source: "crownfall", obstacles: 0 })
};
var core = new SimulacraCore(host, "crownfall");
var latest = { scene: null, camera: null, renderer: null, board: null, dt: 0.016 };
function deviceUrl(base) {
  const b = String(base || "").trim().replace(/\/$/, "");
  if (!b) return "";
  return b.endsWith("/device") ? b : b + "/device";
}
function defaultBackend() {
  const q = params.get("backend");
  if (q) return q;
  try {
    const saved = localStorage.getItem("simulacra-backend");
    if (saved) return saved;
  } catch (e) {
  }
  if (!/github\.io$/i.test(location.hostname)) return (location.protocol === "https:" ? "wss://" : "ws://") + location.host;
  return "";
}
function connect(base) {
  const url = deviceUrl(base);
  if (!url) {
    setStatus("The companion is beside the board. Add the laptop address to connect the AI.");
    return;
  }
  if (socket) {
    socket.onclose = null;
    try {
      socket.close();
    } catch (e) {
    }
  }
  setStatus("Connecting the companion\u2026");
  socket = new WebSocket(url);
  socket.onopen = () => {
    core.onOpen();
    setStatus("Companion connected.");
    const link = $("companion-link");
    if (link) link.hidden = true;
  };
  socket.onmessage = (e) => {
    if (typeof e.data === "string") core.onMessage(e.data);
  };
  socket.onclose = () => {
    core.onClose();
    setStatus("Companion disconnected. Retrying\u2026");
    setTimeout(() => connect(base), 2e3);
  };
  socket.onerror = () => {
  };
}
function setStatus(text) {
  const extra = core.lastTranscript ? "\n" + core.lastTranscript : "";
  const mic = userMuted ? " Mic is quiet. Press A on the right controller, or Talk." : " Listening.";
  const line = text + (core.connected ? mic : "") + extra;
  if (line === lastStatus) return;
  lastStatus = line;
  const el = $("companion-status");
  if (el) el.textContent = line;
}
async function startMic() {
  if (micOn || micOpening) return micOn;
  micOpening = true;
  try {
    const ctx = audioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    const worklet = `class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('crownfall-mic',P)`;
    await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([worklet], { type: "text/javascript" })));
    const node = new AudioWorkletNode(ctx, "crownfall-mic");
    node.port.onmessage = (e) => {
      const samples = e.data;
      core.pushMic(samples, samples.length, ctx.sampleRate);
    };
    ctx.createMediaStreamSource(stream).connect(node);
    micOn = true;
    return true;
  } catch (e) {
    setStatus("Microphone unavailable. You can still type to the companion.");
    return false;
  } finally {
    micOpening = false;
  }
}
function pollA(renderer) {
  const session = renderer.xr.getSession && renderer.xr.getSession();
  if (!session) return;
  let down = false;
  for (const source of session.inputSources) {
    if (source.handedness !== "right") continue;
    const pad = source.gamepad;
    const button = pad && pad.buttons.length > 4 ? pad.buttons[4] : null;
    if (button && button.pressed) down = true;
  }
  if (down && !aWasDown) {
    userMuted = !userMuted;
    if (!userMuted) startMic();
    setStatus(userMuted ? "Companion muted." : "Companion listening.");
  }
  aWasDown = down;
}
function buildAvatar() {
  const root = new T.Group();
  root.name = "simulacra";
  const skin = 13219226;
  const cloth = 7311285;
  const part = (geo, y, color) => {
    const mesh = new T.Mesh(geo, new T.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04 }));
    mesh.position.y = y;
    mesh.raycast = () => {
    };
    root.add(mesh);
    return mesh;
  };
  part(new T.CapsuleGeometry(0.16, 0.5, 4, 10), 1.02, cloth);
  const head = part(new T.SphereGeometry(0.12, 18, 14), 1.58, skin);
  const nose = part(new T.ConeGeometry(0.028, 0.07, 8), 1.56, skin);
  nose.position.z = 0.1;
  nose.rotation.x = Math.PI / 2;
  const legL = part(new T.CapsuleGeometry(0.06, 0.62, 4, 8), 0.38, 4082268);
  const legR = part(new T.CapsuleGeometry(0.06, 0.62, 4, 8), 0.38, 4082268);
  legL.position.x = -0.09;
  legR.position.x = 0.09;
  const armL = part(new T.CapsuleGeometry(0.045, 0.48, 4, 8), 1.05, cloth);
  const armR = part(new T.CapsuleGeometry(0.045, 0.48, 4, 8), 1.05, cloth);
  armL.position.x = -0.24;
  armR.position.x = 0.24;
  root.visible = false;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const g = canvas.getContext("2d");
  g.fillStyle = "rgba(16,14,12,0.72)";
  g.fillRect(0, 0, 512, 128);
  g.fillStyle = "#f0d48a";
  g.font = "64px Cinzel, Palatino, serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("Simulacra", 256, 64);
  const tex = new T.CanvasTexture(canvas);
  tex.colorSpace = T.SRGBColorSpace;
  const label = new T.Mesh(new T.PlaneGeometry(0.42, 0.105), new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  label.position.set(0, 1.86, 0);
  label.raycast = () => {
  };
  root.add(label);
  return { root, head, armL, armR, legL, legR };
}
var body = null;
var phase = 0;
function placeBeside(board) {
  board.updateWorldMatrix(true, true);
  standPos.set(0.85, 0, 0.05);
  board.localToWorld(standPos);
  standPos.y = 0;
  board.getWorldPosition(boardPos);
  const pos = xrToProtocol(standPos.x, 0, standPos.z);
  const face = xrToProtocol(boardPos.x, 0, boardPos.z);
  core.avatar.pos = pos;
  core.avatar.yaw = Math.atan2(face.x - pos.x, face.z - pos.z);
  core.placed = true;
  parkedAt = { x: boardPos.x, z: boardPos.z };
  core.upsert("crownfall", "board game", xrToProtocol(boardPos.x, boardPos.y, boardPos.z), { x: 0.5, y: 0.08, z: 0.5 }, "manual");
}
function tick(ctx) {
  latest = ctx;
  const dt = Math.min(0.1, ctx.dt || 0.016);
  if (ctx.renderer.xr.isPresenting) pollA(ctx.renderer);
  core.micMuted = userMuted || halfDuplex && core.speakingFor > 0;
  if (core.lastAction && /walk|follow|approach|stop/.test(core.lastAction)) commanded = true;
  const board = ctx.board;
  if (board && board.visible) {
    board.getWorldPosition(boardPos);
    const moved = !parkedAt || Math.hypot(boardPos.x - parkedAt.x, boardPos.z - parkedAt.z) > 0.35;
    if (!commanded && (moved || !core.placed) && core.avatar.state === "idle") placeBeside(board);
    else core.upsert("crownfall", "board game", xrToProtocol(boardPos.x, boardPos.y, boardPos.z), { x: 0.5, y: 0.08, z: 0.5 }, "manual");
  } else if (!core.placed) {
    core.placeInFrontOfUser(1.5);
  }
  core.update(dt);
  const p = protocolToXr(core.avatar.pos);
  body.root.visible = core.placed;
  body.root.position.set(p.x, p.y, p.z);
  body.root.rotation.y = Math.PI - core.avatar.yaw;
  const moving = core.avatar.speed01 > 0.06 ? 1 : 0;
  phase += dt * (2 + moving * 6);
  const swing = Math.sin(phase) * 0.35 * moving;
  body.legL.rotation.x = swing;
  body.legR.rotation.x = -swing;
  body.armL.rotation.x = -swing * 0.6;
  body.armR.rotation.x = swing * 0.6;
  const level = speechLevel();
  body.head.scale.y = 1 + level * 0.08;
  if (core.avatar.gesture === "wave") body.armR.rotation.x = -1.4;
  const say = $("companion-say");
  if (say) say.hidden = ctx.renderer.xr.isPresenting;
  if (core.connected) setStatus(core.brain && core.brain !== "-" ? "Companion here \xB7 " + core.brain + "." : "Companion connected.");
}
function boot() {
  if (!T.Group) return;
  body = buildAvatar();
  latest.scene = { add: () => {
  } };
  window.__cfTick = (ctx) => {
    if (body.root.parent !== ctx.scene) ctx.scene.add(body.root);
    tick(ctx);
  };
  const backend = defaultBackend();
  const input = $("companion-backend");
  if (input && backend) input.value = backend;
  const link = $("companion-link");
  if (link) {
    link.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = input ? input.value.trim() : "";
      if (!value) return;
      try {
        localStorage.setItem("simulacra-backend", value);
      } catch (err) {
      }
      connect(value);
    });
  }
  const say = $("companion-say");
  if (say) {
    say.addEventListener("submit", (e) => {
      e.preventDefault();
      audioContext();
      const field = $("companion-text");
      const text = field ? field.value.trim() : "";
      if (text) core.sendText(text);
      if (field) field.value = "";
    });
  }
  const talk = $("companion-talk");
  if (talk) {
    talk.addEventListener("click", () => {
      userMuted = false;
      startMic();
      setStatus("Companion listening.");
    });
  }
  for (const id of ["btn-ar", "btn-vr", "btn-play", "btn-ar-mini", "btn-vr-mini"]) {
    const button = $(id);
    if (button) button.addEventListener("click", () => {
      audioContext();
      startMic();
    });
  }
  connect(backend);
}
boot();
