# Meta Quest controller models

## Active (Touch Pro / Quest Pro)

Exported from `QuestProControllers.blend` (SpectaclesFlightSim/XRFlightSim) with submeshes separated per part:

- `meta-quest-touch-pro-left.glb` — `left_controller` + faceplate / innerplate / outerplate / joystick_base / joystick_hat
- `meta-quest-touch-pro-right.glb` — same hierarchy under `right_controller`

Source meshes/textures originate from Meta/Oculus Integration (`MetaQuestTouchPro` FBX + `controller_{l,r}_lo_BaseColor`). Blender 3.6 GLB export: apply modifiers, Y-up, materials/textures preserved, part names kept. Same unit scale as the prior single-mesh Pro GLBs, so scene wingspan / panel fit still apply.

Touch Pro has no tracking ring over the face buttons (unlike Quest 2 Touch), so X/Y/A/B stay readable on the guide.

## Fallback

Runtime still keeps the procedural capsule guide, then tries local Pro GLBs, then `@webxr-input-profiles` for the connected headset.

## Legacy (Quest 2 Touch)

`meta-quest-touch-left.glb` / `meta-quest-touch-right.glb` remain from the earlier Quest 2 conversion (`OculusTouchForQuest2`). Not referenced by the app anymore.

These meshes are subject to the Oculus SDK License (see `LICENSE-OculusSDK.txt` and https://developer.oculus.com/licenses/oculussdk/).
