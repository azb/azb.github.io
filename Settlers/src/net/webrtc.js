const RTC_CONFIG = {
  iceCandidatePoolSize: 8,
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun.cloudflare.com:3478' },
  ],
};

export function createRtcMesh({ uid, onMessage, onOpen, onClose, publishSignal }) {
  const peers = new Map();
  const outgoingOffers = {};
  const outgoingAnswers = {};
  const outgoingIce = {};
  let iceTimer = null;

  function waitIceGathering(pc) {
    if (pc.iceGatheringState === 'complete') return Promise.resolve();
    return new Promise((resolve) => {
      const t = setTimeout(resolve, 3000);
      const onChange = () => {
        if (pc.iceGatheringState !== 'complete') return;
        pc.removeEventListener('icegatheringstatechange', onChange);
        clearTimeout(t);
        resolve();
      };
      pc.addEventListener('icegatheringstatechange', onChange);
    });
  }

  function queuePublish() {
    clearTimeout(iceTimer);
    iceTimer = setTimeout(() => publishSignal?.().catch(() => {}), 180);
  }

  function bindChannel(remoteId, channel) {
    const peer = peers.get(remoteId);
    if (!peer) return;
    peer.channel = channel;
    channel.onmessage = (ev) => {
      let msg;
      try {
        msg = JSON.parse(typeof ev.data === 'string' ? ev.data : new TextDecoder().decode(ev.data));
      } catch {
        return;
      }
      onMessage?.(remoteId, msg);
    };
    channel.onopen = () => {
      delete outgoingOffers[remoteId];
      delete outgoingAnswers[remoteId];
      delete outgoingIce[remoteId];
      publishSignal?.().catch(() => {});
      onOpen?.(remoteId);
    };
    channel.onclose = () => onClose?.(remoteId);
  }

  function closePeer(remoteId) {
    const peer = peers.get(remoteId);
    if (!peer) return;
    try { peer.channel?.close(); } catch { /* ignore */ }
    try { peer.pc.close(); } catch { /* ignore */ }
    peers.delete(remoteId);
    delete outgoingOffers[remoteId];
    delete outgoingAnswers[remoteId];
    delete outgoingIce[remoteId];
  }

  function ensurePeer(remoteId) {
    if (!uid || remoteId === uid || peers.has(remoteId) || typeof RTCPeerConnection !== 'function') return;
    const offerer = uid < remoteId;
    const pc = new RTCPeerConnection(RTC_CONFIG);
    const peer = { pc, channel: null, offerer, appliedRemote: '', seenIce: new Set(), pendingIce: [] };
    peers.set(remoteId, peer);
    try {
      bindChannel(remoteId, pc.createDataChannel('game', { negotiated: true, id: 1, ordered: true }));
    } catch {
      if (offerer) bindChannel(remoteId, pc.createDataChannel('game'));
      else pc.ondatachannel = (ev) => bindChannel(remoteId, ev.channel);
    }
    pc.onicecandidate = (ev) => {
      if (!ev.candidate) {
        if (pc.localDescription) {
          const blob = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
          if (offerer) outgoingOffers[remoteId] = blob;
          else outgoingAnswers[remoteId] = blob;
        }
        queuePublish();
        return;
      }
      if (!outgoingIce[remoteId]) outgoingIce[remoteId] = [];
      if (outgoingIce[remoteId].length >= 24) return;
      outgoingIce[remoteId].push({
        candidate: ev.candidate.candidate,
        sdpMid: ev.candidate.sdpMid == null ? null : ev.candidate.sdpMid,
        sdpMLineIndex: ev.candidate.sdpMLineIndex == null ? 0 : ev.candidate.sdpMLineIndex,
      });
      queuePublish();
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState !== 'failed') return;
      closePeer(remoteId);
      setTimeout(() => ensurePeer(remoteId), 1200);
    };
    if (!offerer) return;
    (async () => {
      await pc.setLocalDescription(await pc.createOffer());
      outgoingOffers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
      await publishSignal?.();
      await waitIceGathering(pc);
      outgoingOffers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
      await publishSignal?.();
    })().catch((err) => console.warn('RTC offer failed', err));
  }

  async function flushPendingIce(peer) {
    if (!peer || !peer.pc.remoteDescription) return;
    while (peer.pendingIce.length) {
      const c = peer.pendingIce.shift();
      try { await peer.pc.addIceCandidate(c); } catch { /* ignore */ }
    }
  }

  async function applyRemoteIce(remoteId, p) {
    const peer = peers.get(remoteId);
    if (!peer) return;
    const list = p.ice && p.ice[uid];
    if (!Array.isArray(list)) return;
    for (const c of list) {
      if (!c?.candidate || peer.seenIce.has(c.candidate)) continue;
      peer.seenIce.add(c.candidate);
      if (!peer.pc.remoteDescription) {
        peer.pendingIce.push(c);
        continue;
      }
      try { await peer.pc.addIceCandidate(c); } catch { /* ignore */ }
    }
  }

  async function handleSignal(remoteId, p) {
    const peer = peers.get(remoteId);
    if (!peer) return;
    const pc = peer.pc;
    const theirOffer = p.offers && p.offers[uid];
    const theirAnswer = p.answers && p.answers[uid];
    try {
      if (theirOffer && !peer.offerer && peer.appliedRemote !== theirOffer.sdp && !peer.busy) {
        peer.busy = true;
        await pc.setRemoteDescription(theirOffer);
        peer.appliedRemote = theirOffer.sdp;
        await flushPendingIce(peer);
        await pc.setLocalDescription(await pc.createAnswer());
        outgoingAnswers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
        await publishSignal?.();
        await waitIceGathering(pc);
        outgoingAnswers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
        await publishSignal?.();
        peer.busy = false;
      }
      if (theirAnswer && peer.offerer && peer.appliedRemote !== theirAnswer.sdp && pc.signalingState === 'have-local-offer') {
        await pc.setRemoteDescription(theirAnswer);
        peer.appliedRemote = theirAnswer.sdp;
        await flushPendingIce(peer);
      }
      await applyRemoteIce(remoteId, p);
    } catch (err) {
      peer.busy = false;
      console.warn('RTC signal failed', err);
    }
  }

  function broadcast(msg) {
    const text = JSON.stringify(msg);
    for (const peer of peers.values()) {
      if (peer.channel?.readyState === 'open') {
        try { peer.channel.send(text); } catch { /* ignore */ }
      }
    }
  }

  function sendTo(remoteId, msg) {
    const peer = peers.get(remoteId);
    if (peer?.channel?.readyState !== 'open') return false;
    try {
      peer.channel.send(JSON.stringify(msg));
      return true;
    } catch {
      return false;
    }
  }

  function openCount() {
    let n = 0;
    for (const peer of peers.values()) {
      if (peer.channel?.readyState === 'open') n++;
    }
    return n;
  }

  function syncPresence(docs) {
    const seen = new Set();
    for (const d of docs) {
      if (d.id === uid) continue;
      seen.add(d.id);
      ensurePeer(d.id);
      handleSignal(d.id, d.data);
    }
    for (const id of [...peers.keys()]) {
      if (!seen.has(id)) closePeer(id);
    }
  }

  function closeAll() {
    for (const id of [...peers.keys()]) closePeer(id);
    for (const key of Object.keys(outgoingOffers)) delete outgoingOffers[key];
    for (const key of Object.keys(outgoingAnswers)) delete outgoingAnswers[key];
    for (const key of Object.keys(outgoingIce)) delete outgoingIce[key];
  }

  function signalBlob() {
    return { offers: outgoingOffers, answers: outgoingAnswers, ice: outgoingIce };
  }

  return {
    peers,
    ensurePeer,
    closePeer,
    closeAll,
    syncPresence,
    broadcast,
    sendTo,
    openCount,
    signalBlob,
    handleSignal,
  };
}
