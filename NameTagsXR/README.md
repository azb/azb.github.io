# WebXR Room Name Tags

A minimal same-room multiplayer WebXR prototype using:

- Three.js + WebXR
- WebXR hand tracking and XR controllers
- Firebase Authentication (anonymous)
- Cloud Firestore for room/player state
- Two-point physical calibration

## How calibration works

Every headset has its own local XR coordinate system. The app creates two shared calibration landmarks:

- red = canonical room point A
- blue = canonical room point B

Each player grabs those virtual dots and physically places them on the same two landmarks in the room (for example, two corners of a table).

When the player presses **Calibrate**, the app records where those landmarks are in that headset's local XR space. It computes a local-to-room transform using:

1. translation from the red point
2. yaw rotation from the red→blue direction
3. the headset's Y-up axis

A player's head position is converted into canonical room coordinates before it is sent to Firebase. Other headsets transform that room position into their own local XR space, so everyone sees the name tag over the same physical person.

This intentionally uses a rigid horizontal transform rather than trying to create a full shared spatial-anchor system.

## Setup

1. Create a Firebase project.
2. Enable **Authentication → Anonymous**.
3. Create a Firestore database.
4. Put the Firebase Web App config into the app's setup panel.
5. Publish the folder on an HTTPS host. WebXR generally requires a secure context.
6. Deploy `firebase.rules` as your Firestore rules.

You can use Firebase Hosting, Cloudflare Pages, Netlify, GitHub Pages, or another HTTPS static host.

## Running

Open the same URL on two or more WebXR-capable headsets.

1. Enter the same Room ID.
2. Use the same two physical landmarks.
3. Grab the red dot and put it on landmark A.
4. Grab the blue dot and put it on landmark B.
5. Press **Calibrate**.
6. Once everyone is calibrated, walk around. Each person's name should appear above their head.

## Notes

- This prototype assumes the room is level and uses Y as the shared up direction.
- The two-point method does not establish an absolute vertical translation. Each headset's floor/reference-space Y is therefore used as its local vertical datum.
- Firebase is used for multiplayer state, not for tracking raw controller/hand poses every frame.
- Player updates are throttled to roughly 15 Hz to keep Firestore traffic reasonable.
- For production, use a real-time database/WebRTC data channel or another low-latency transport for high-frequency head pose.
