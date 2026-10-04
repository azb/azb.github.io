# Meta Quest controller models

## Active (Touch Pro / Quest Pro)

Converted from the Meta/Oculus Integration meshes bundled with Strategeality:

- `Assets/Oculus/VR/Meshes/MetaQuestTouchPro/MetaQuestTouchPro_Left.fbx`
- `Assets/Oculus/VR/Meshes/MetaQuestTouchPro/MetaQuestTouchPro_Right.fbx`
- Albedo from `Assets/Oculus/VR/Textures/MetaQuestTouchPro/controller_{l,r}_lo_BaseColor.png`

ASCII FBX → OBJ → GLB (Blender 3.6). Main controller mesh only (battery/nub helpers omitted). Albedo resized to 1024 JPEG for web. Geometry origin centered on bounds so the controls panel / scene placement stays predictable.

Touch Pro has no tracking ring over the face buttons (unlike Quest 2 Touch), so X/Y/A/B stay readable on the guide.

## Fallback

Runtime still keeps the procedural capsule guide, then tries local Pro GLBs, then `@webxr-input-profiles` for the connected headset.

## Legacy (Quest 2 Touch)

`meta-quest-touch-left.glb` / `meta-quest-touch-right.glb` remain from the earlier Quest 2 conversion (`OculusTouchForQuest2`). Not referenced by the app anymore.

These meshes are subject to the Oculus SDK License (see `LICENSE-OculusSDK.txt` and https://developer.oculus.com/licenses/oculussdk/).
