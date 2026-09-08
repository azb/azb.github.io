# Settlers of Catan — WebXR

An unofficial, original-art tabletop recreation of the classic island-settling game. Play in a VR headset or with a mouse in the browser.

Catan is a trademark of Catan GmbH. This is a fan project and is not affiliated with or endorsed by Catan GmbH or Kosmos.

## Play

```bash
npm install
npm run dev
```

Open the printed local URL. Click **Begin the voyage**, then settle the island.

### VR

1. Use a WebXR browser (Meta Quest Browser, Chrome with a headset, etc.).
2. For a Quest on your Wi-Fi, start the dev server and open the LAN URL shown by Vite.
3. Quest requires HTTPS for non-localhost pages. Use a tunnel or `npm run preview` behind HTTPS if needed.
4. Sit or stand at the table, point the controller ray, and squeeze trigger to place pieces or press tray buttons.

Desktop: orbit the table with the mouse, click glowing spots to build.

## Rules included

- Randomized 19-hex island (6 and 8 not adjacent), harbors, robber
- 2–4 players, you-vs-AI or hotseat
- Setup snake, dice production, 7s, discarding, stealing
- Roads, settlements, cities, bank trades (4:1 / 3:1 / 2:1 harbors)
- Development cards (knight, VP, road building, year of plenty, monopoly)
- Longest road, largest army, 10 victory points

## Tips

- During setup, click a glowing vertex, then a glowing edge.
- After rolling, choose Road / Settlement / City, then click a highlighted spot.
- A seven lets you move the robber onto a glowing hex.
