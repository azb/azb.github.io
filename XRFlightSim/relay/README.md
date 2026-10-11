# XRFlightSim WebSocket relay

Low-latency fan-out for plane poses / fire / balloons. Firebase still handles Host/Join room codes; this socket carries gameplay traffic (especially for Spectacles, which has no WebRTC).

## Deploy (Cloudflare Workers)

```bash
cd XRFlightSim/relay
npm install
npx wrangler login
npm run deploy
```

Current preview URL (claim or re-deploy to your account):

- `wss://xrflightsim-relay.vast-laborer.workers.dev`
- Claim: https://dash.cloudflare.com/claim-preview?claimToken=l7ymt20Ohszm6QX6OcNE_03Of-3IJrbJ-O3YVmiIGAw

Set the same base in:

- `XRFlightSim/src/net/firebase.js` → `WS_RELAY_URL`
- `SpectaclesFlightSim/.../FirebaseConfig.ts` → `WS_RELAY_URL`

Spectacles Project Settings → Trusted Domains: `xrflightsim-relay.lean-poppyseed.workers.dev`

## Local dev

```bash
npm run local
# ws://localhost:8787/room/1234
```

Browser on the same machine can use `ws://localhost:8787`. Spectacles needs `wss://` (deployed worker).
