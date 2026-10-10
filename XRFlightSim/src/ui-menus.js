import * as THREE from "three";

// v3: reset prefs so mesh visual/collision start Off (was On in older builds).
const SETTINGS_KEY = "xrflightsim-settings-v3";
const VOLUME_STEPS = [0, 0.25, 0.5, 0.75, 1];
const SENSITIVITY_STEPS = [0.5, 0.75, 1, 1.25, 1.5];

export const defaultSettings = () => ({
  meshCollision: false,
  meshVisual: false,
  masterVolume: 1,
  engineVolume: 1,
  stickSensitivity: 1,
});

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings();
    return { ...defaultSettings(), ...JSON.parse(raw) };
  } catch (_) {
    return defaultSettings();
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (_) { /* ignore quota / private mode */ }
}

function nextStep(steps, value) {
  const index = steps.findIndex((step) => Math.abs(step - value) < 1e-6);
  return steps[(Math.max(index, 0) + 1) % steps.length];
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

/** World-space scale for procedural menus (authored sizes were ~3× too large). */
export const UI_MENU_SCALE = 1 / 3;

const BUTTON_TEX_W = 1024;
const BUTTON_TEX_H = 256;
/** How far outline + text lift off the UI plane on hover (local Z). */
const BUTTON_POP_Z = 0.045;
/** Outline + text settle near the plane while the trigger is held. */
const BUTTON_PRESS_Z = 0.003;

function buttonFont(context) {
  context.font = "bold 84px system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
}

function makeCanvasTexture(draw) {
  const canvas = document.createElement("canvas");
  canvas.width = BUTTON_TEX_W;
  canvas.height = BUTTON_TEX_H;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, BUTTON_TEX_W, BUTTON_TEX_H);
  draw(context, BUTTON_TEX_W, BUTTON_TEX_H);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeButtonBgTexture(hovered = false) {
  return makeCanvasTexture((context, width, height) => {
    context.fillStyle = hovered ? "rgba(40, 70, 28, 0.96)" : "rgba(8, 28, 44, 0.92)";
    context.beginPath();
    context.roundRect(12, 12, width - 24, height - 24, 28);
    context.fill();
  });
}

function makeButtonOutlineTexture(hovered = false) {
  return makeCanvasTexture((context, width, height) => {
    context.strokeStyle = hovered ? "#ffe626" : "#7fd4ff";
    context.lineWidth = hovered ? 14 : 8;
    context.beginPath();
    context.roundRect(12, 12, width - 24, height - 24, 28);
    context.stroke();
  });
}

function makeButtonTextTexture(text, hovered = false) {
  return makeCanvasTexture((context, width, height) => {
    buttonFont(context);
    context.fillStyle = hovered ? "#fff6b0" : "#eaf6ff";
    context.fillText(text, width / 2, height / 2);
  });
}

/** Darkened, soft, transparent copy of the label for the on-plane drop shadow. */
function makeButtonTextShadowTexture(text) {
  return makeCanvasTexture((context, width, height) => {
    buttonFont(context);
    context.save();
    context.filter = "blur(10px)";
    context.fillStyle = "rgba(0, 0, 0, 0.55)";
    context.fillText(text, width / 2, height / 2 + 4);
    context.restore();
    // Second softer pass for a more diffuse contact shadow.
    context.save();
    context.filter = "blur(18px)";
    context.fillStyle = "rgba(0, 0, 0, 0.28)";
    context.fillText(text, width / 2, height / 2 + 6);
    context.restore();
  });
}

function makeUiLayer(map, width, height, renderOrder) {
  const material = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.renderOrder = renderOrder;
  return mesh;
}

function swapLayerMap(mesh, nextMap) {
  mesh.material.map?.dispose();
  mesh.material.map = nextMap;
  mesh.material.needsUpdate = true;
}

export function createUiButton(label, width = 1.6, height = 0.32) {
  const root = new THREE.Group();
  root.name = label;

  const bg = makeUiLayer(makeButtonBgTexture(false), width, height, 8);
  bg.position.z = 0;
  root.add(bg);

  const textShadow = makeUiLayer(makeButtonTextShadowTexture(label), width, height, 9);
  textShadow.position.z = 0.002;
  textShadow.visible = false;
  root.add(textShadow);

  const outline = makeUiLayer(makeButtonOutlineTexture(false), width, height, 10);
  outline.position.z = 0.004;
  root.add(outline);

  const text = makeUiLayer(makeButtonTextTexture(label, false), width, height, 11);
  text.position.z = 0.006;
  root.add(text);

  root.userData.uiButton = {
    label,
    hovered: false,
    pressed: false,
    hot: false,
    layers: { bg, outline, text, textShadow },
    applyPose() {
      const hot = this.hovered || this.pressed;
      if (this.hot !== hot) {
        this.hot = hot;
        swapLayerMap(bg, makeButtonBgTexture(hot));
        swapLayerMap(outline, makeButtonOutlineTexture(hot));
        swapLayerMap(text, makeButtonTextTexture(this.label, hot));
      }
      if (this.pressed) {
        // Depress toward the UI plane; hide the raised-text shadow.
        outline.position.z = BUTTON_PRESS_Z;
        text.position.z = BUTTON_PRESS_Z + 0.001;
        textShadow.visible = false;
      } else if (this.hovered) {
        outline.position.z = BUTTON_POP_Z;
        text.position.z = BUTTON_POP_Z + 0.002;
        textShadow.visible = true;
      } else {
        outline.position.z = 0.004;
        text.position.z = 0.006;
        textShadow.visible = false;
      }
    },
    setLabel(next) {
      if (this.label === next) return;
      this.label = next;
      swapLayerMap(textShadow, makeButtonTextShadowTexture(next));
      // Force tint textures to rebuild for the new string.
      this.hot = null;
      this.applyPose();
    },
    setHovered(next) {
      const on = Boolean(next);
      if (this.hovered === on) return;
      this.hovered = on;
      this.applyPose();
    },
    setPressed(next) {
      const on = Boolean(next);
      if (this.pressed === on) return;
      this.pressed = on;
      this.applyPose();
    },
    onClick: null,
  };
  return root;
}

/** Clear / apply hover highlight across visible UI panels. */
export function setUiButtonHovers(panels, hoveredButton) {
  for (const panel of panels) {
    panel?.traverse((obj) => {
      const ui = obj.userData?.uiButton;
      if (!ui || typeof ui.setHovered !== "function") return;
      if (!ui.onClick) return;
      ui.setHovered(obj === hoveredButton);
    });
  }
}

/** Clickable menu buttons top-to-bottom for gamepad focus navigation. */
export function listClickableUiButtons(panel) {
  const buttons = [];
  panel?.traverse((obj) => {
    if (obj.userData?.uiButton?.onClick) buttons.push(obj);
  });
  buttons.sort((a, b) => b.position.y - a.position.y);
  return buttons;
}

function createMenuPanel(title, width, height) {
  const root = new THREE.Group();
  root.name = title;
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(4, 20, 34, 0.92)";
  context.strokeStyle = "#82cfff";
  context.lineWidth = 8;
  context.beginPath();
  context.roundRect(18, 18, canvas.width - 36, canvas.height - 36, 40);
  context.fill();
  context.stroke();
  context.fillStyle = "#a9dbff";
  context.font = "bold 92px system-ui, sans-serif";
  context.textAlign = "center";
  context.fillText(title, canvas.width / 2, 150);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const backing = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  backing.renderOrder = 6;
  root.add(backing);
  root.userData.menuBacking = backing;
  return root;
}

export function createPauseMenu({ onResume, onControls, onSettings, onMultiplayer, onRestart }) {
  const s = UI_MENU_SCALE;
  const root = createMenuPanel("Simulation Paused", 2.4 * s, 2.85 * s);
  const buttons = [
    { label: "Resume", y: 0.75 * s, onClick: onResume },
    { label: "Controls", y: 0.35 * s, onClick: onControls },
    { label: "Settings", y: -0.05 * s, onClick: onSettings },
    { label: "Multiplayer", y: -0.45 * s, onClick: onMultiplayer },
    { label: "Restart", y: -0.85 * s, onClick: onRestart },
  ];
  for (const spec of buttons) {
    const button = createUiButton(spec.label, 1.7 * s, 0.34 * s);
    button.position.set(0, spec.y, 0.02 * s);
    button.userData.uiButton.onClick = spec.onClick;
    root.add(button);
  }
  return root;
}

/** In-XR multiplayer lobby: host / join / leave + status (code via overlay / ?room=). */
export function createMultiplayerMenu({ onHost, onJoin, onLeave, onBack }) {
  const s = UI_MENU_SCALE;
  const root = createMenuPanel("Multiplayer", 2.6 * s, 2.7 * s);
  const status = createUiButton("Solo · Host or Join", 2.2 * s, 0.3 * s);
  status.position.set(0, 0.7 * s, 0.02 * s);
  status.userData.uiButton.onClick = null;
  root.add(status);

  const buttons = [
    { label: "Host Room", y: 0.25 * s, onClick: onHost },
    { label: "Join", y: -0.15 * s, onClick: onJoin },
    { label: "Leave Room", y: -0.55 * s, onClick: onLeave },
    { label: "Back", y: -0.95 * s, onClick: onBack },
  ];
  for (const spec of buttons) {
    const button = createUiButton(spec.label, 2.2 * s, 0.34 * s);
    button.position.set(0, spec.y, 0.02 * s);
    button.userData.uiButton.onClick = spec.onClick;
    root.add(button);
  }

  root.userData.setStatus = (text) => {
    status.userData.uiButton.setLabel(text || "Solo");
  };
  return root;
}

/** In-flight HUD matching Lens Game Panel: throttle readout + Menu → pause. */
export function createGamePanel({ onMenu }) {
  const s = UI_MENU_SCALE;
  const root = createMenuPanel("Flight", 2.1 * s, 1.35 * s);
  root.name = "Game Panel";

  const throttleReadout = createUiButton("Throttle: 0%", 1.7 * s, 0.34 * s);
  throttleReadout.position.set(0, 0.12 * s, 0.02 * s);
  // Label only — findUiButton requires onClick, so leave it null.
  throttleReadout.userData.uiButton.onClick = null;
  root.add(throttleReadout);

  const barWidth = 1.55 * s;
  const barHeight = 0.12 * s;
  const barBg = new THREE.Mesh(
    new THREE.PlaneGeometry(barWidth, barHeight),
    new THREE.MeshBasicMaterial({
      color: 0x1a3a52,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  barBg.position.set(0, -0.18 * s, 0.015 * s);
  barBg.renderOrder = 7;
  root.add(barBg);

  const barFill = new THREE.Mesh(
    new THREE.PlaneGeometry(1, barHeight * 0.7),
    new THREE.MeshBasicMaterial({
      color: 0x7fd4ff,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  barFill.position.set(0, -0.18 * s, 0.02 * s);
  barFill.renderOrder = 8;
  root.add(barFill);

  // Rays are off while flying — label the pause hint (left X), not a click target.
  const menu = createUiButton("Press X for Menu", 1.85 * s, 0.32 * s);
  menu.position.set(0, -0.48 * s, 0.02 * s);
  menu.userData.uiButton.onClick = onMenu;
  root.add(menu);

  root.userData._throttlePercent = -1;
  root.userData.setThrottle = (throttle) => {
    const clamped = Math.max(0, Math.min(1, throttle));
    const percent = Math.round(clamped * 100);
    // Canvas text (esp. blurred shadow) is expensive — only rebuild on % change.
    if (root.userData._throttlePercent !== percent) {
      root.userData._throttlePercent = percent;
      throttleReadout.userData.uiButton.setLabel(`Throttle: ${percent}%`);
    }
    const fillWidth = Math.max(barWidth * clamped, 0.001);
    barFill.scale.x = fillWidth;
    barFill.position.x = -barWidth * 0.5 + fillWidth * 0.5;
    barFill.visible = clamped > 0.001;
  };
  root.userData.setThrottle(0);

  return root;
}

export function createSettingsMenu(settings, { onBack, onChange }) {
  const s = UI_MENU_SCALE;
  const root = createMenuPanel("Settings", 2.6 * s, 2.85 * s);
  root.userData.settingsButtons = {};

  const rows = [
    {
      key: "meshVisual",
      y: 0.7 * s,
      label: () => `Mesh Visual: ${settings.meshVisual ? "On" : "Off"}`,
      click: () => {
        settings.meshVisual = !settings.meshVisual;
      },
    },
    {
      key: "meshCollision",
      y: 0.3 * s,
      label: () => `Mesh Collision: ${settings.meshCollision ? "On" : "Off"}`,
      click: () => {
        settings.meshCollision = !settings.meshCollision;
      },
    },
    {
      key: "masterVolume",
      y: -0.1 * s,
      label: () => `Master Volume: ${formatPercent(settings.masterVolume)}`,
      click: () => {
        settings.masterVolume = nextStep(VOLUME_STEPS, settings.masterVolume);
      },
    },
    {
      key: "engineVolume",
      y: -0.5 * s,
      label: () => `Engine Volume: ${formatPercent(settings.engineVolume)}`,
      click: () => {
        settings.engineVolume = nextStep(VOLUME_STEPS, settings.engineVolume);
      },
    },
    {
      key: "stickSensitivity",
      y: -0.9 * s,
      label: () => `Stick Sensitivity: ${settings.stickSensitivity.toFixed(2)}x`,
      click: () => {
        settings.stickSensitivity = nextStep(SENSITIVITY_STEPS, settings.stickSensitivity);
      },
    },
  ];

  for (const row of rows) {
    const button = createUiButton(row.label(), 2.1 * s, 0.32 * s);
    button.position.set(0, row.y, 0.02 * s);
    button.userData.uiButton.onClick = () => {
      row.click();
      button.userData.uiButton.setLabel(row.label());
      saveSettings(settings);
      onChange?.(settings);
    };
    root.userData.settingsButtons[row.key] = { button, row };
    root.add(button);
  }

  const back = createUiButton("Back", 1.4 * s, 0.32 * s);
  back.position.set(0, -1.25 * s, 0.02 * s);
  back.userData.uiButton.onClick = onBack;
  root.add(back);

  root.userData.refreshSettingsLabels = () => {
    for (const entry of Object.values(root.userData.settingsButtons)) {
      entry.button.userData.uiButton.setLabel(entry.row.label());
    }
  };

  return root;
}

export function findUiButton(object) {
  let node = object;
  while (node) {
    if (node.userData?.uiButton?.onClick) return node;
    node = node.parent;
  }
  return null;
}
