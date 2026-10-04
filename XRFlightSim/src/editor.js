import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/TransformControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

const STORAGE_KEY = "xrflightsim-scene";
const canvas = document.querySelector("#scene");
const list = document.querySelector("#object-list");
const selection = document.querySelector("#selection");
const sceneStatus = document.querySelector("#scene-status");
const transformSection = document.querySelector("#transform");
const materialSection = document.querySelector("#material");
const materialSliders = document.querySelector("#material-sliders");
const textSection = document.querySelector("#text-section");
const textInput = document.querySelector("#object-text");
const visibleField = document.querySelector("#visible-field");
const visibleInput = document.querySelector("#object-visible");
const colorInput = document.querySelector("#material-color");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x79b9e2);
scene.add(new THREE.HemisphereLight(0xffffff, 0x253d29, 2.5));
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(4, 8, 5);
scene.add(light);
scene.add(new THREE.GridHelper(30, 30, 0x4f8498, 0x416c51));
const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 1000);
camera.position.set(4, 3.5, 6);
const orbit = new OrbitControls(camera, canvas);
orbit.mouseButtons.LEFT = -1;
orbit.mouseButtons.MIDDLE = THREE.MOUSE.PAN;
orbit.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
orbit.target.set(0, 1, 0);
orbit.update();
const transform = new TransformControls(camera, canvas);
transform.addEventListener("dragging-changed", (event) => { orbit.enabled = !event.value; });
transform.addEventListener("objectChange", () => { dirty = true; syncInspector(); });
scene.add(transform.getHelper());
const content = new THREE.Group();
content.name = "Scene content";
scene.add(content);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const selectedSet = new Set();
const selectionBox = document.querySelector("#selection-box");
let selected = null;
let selectionStart = null;
let dirty = false;

function resize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();

function setStatus(message) { sceneStatus.textContent = message; }
function round(value) { return Math.round(value * 10000) / 10000; }
function primaryMaterial(object) {
  if (!object?.material) return null;
  return Array.isArray(object.material) ? object.material[0] : object.material;
}
function markDirty() { dirty = true; }

function paintLabel(sprite, text) {
  const labelCanvas = sprite.material.map.image;
  const context = labelCanvas.getContext("2d");
  context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = "rgba(8, 16, 27, .94)";
  context.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = "#ffffff";
  context.font = "bold 64px system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text || " ", labelCanvas.width / 2, labelCanvas.height / 2);
  sprite.material.map.needsUpdate = true;
  sprite.userData.scene.text = text;
}

function makeText(item) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 1536;
  labelCanvas.height = 200;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(labelCanvas), transparent: true, depthTest: false }));
  sprite.renderOrder = 2;
  sprite.userData.scene = { type: "text", text: item.text || "Label" };
  paintLabel(sprite, sprite.userData.scene.text);
  return sprite;
}

function makeArrow(item) {
  const group = new THREE.Group();
  const end = new THREE.Vector3(...(item.end || [0, 0.4, 0]));
  const length = Math.max(end.length(), 0.001);
  const helper = new THREE.ArrowHelper(end.clone().normalize(), new THREE.Vector3(), length, item.color ?? 0x1686ff, Math.min(0.1, length * 0.25), Math.min(0.055, length * 0.12));
  helper.line.userData.skipList = true;
  helper.cone.userData.skipList = true;
  helper.line.userData.selectTarget = group;
  helper.cone.userData.selectTarget = group;
  group.add(helper);
  group.userData.scene = { type: "arrow", color: item.color ?? 0x1686ff, end: end.toArray() };
  return group;
}

function makeAsset(item) {
  const wrapper = new THREE.Group();
  wrapper.userData.scene = { type: "asset", url: item.url, wingspan: item.wingspan ?? null };
  if (!item.url) return wrapper;
  new GLTFLoader().load(item.url, (gltf) => {
    const model = gltf.scene;
    if (item.wingspan) {
      const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
      model.scale.setScalar(item.wingspan / Math.max(size.x, 0.001));
    }
    wrapper.add(model);
    rebuildList();
  }, undefined, (error) => {
    console.error("Scene asset failed to load", item.url, error);
    setStatus(`Could not load ${item.name || "asset"}`);
  });
  return wrapper;
}

function standardMaterial(item) {
  const opacity = item.opacity ?? 1;
  return new THREE.MeshStandardMaterial({
    color: item.color ?? 0xffffff,
    metalness: item.metalness ?? 0.2,
    roughness: item.roughness ?? 0.55,
    transparent: opacity < 1,
    opacity,
    side: item.type === "plane" ? THREE.DoubleSide : THREE.FrontSide,
  });
}

function rememberSpec(object, item) {
  const spec = { type: item.type || "box" };
  for (const key of ["size", "radius", "height", "length", "text", "end", "url", "wingspan", "color"]) {
    if (item[key] != null) spec[key] = item[key];
  }
  object.userData.scene = spec;
}

function applyTransform(object, item) {
  if (item.position) object.position.fromArray(item.position);
  if (item.rotation) object.rotation.set(item.rotation[0] || 0, item.rotation[1] || 0, item.rotation[2] || 0);
  if (item.scale) object.scale.fromArray(item.scale);
  object.visible = item.visible !== false;
}

function makeObject(item) {
  const type = item.type || "box";
  let object;
  if (type === "group") object = new THREE.Group();
  else if (type === "text") object = makeText(item);
  else if (type === "arrow") object = makeArrow(item);
  else if (type === "asset") object = makeAsset(item);
  else if (type === "plane") object = new THREE.Mesh(new THREE.PlaneGeometry(...(item.size || [1, 1])), standardMaterial(item));
  else if (type === "sphere") object = new THREE.Mesh(new THREE.SphereGeometry(item.radius ?? 0.2, 16, 12), standardMaterial(item));
  else if (type === "cylinder") object = new THREE.Mesh(new THREE.CylinderGeometry(item.radius ?? 0.05, item.radius ?? 0.05, item.height ?? 0.1, 16), standardMaterial(item));
  else if (type === "capsule") object = new THREE.Mesh(new THREE.CapsuleGeometry(item.radius ?? 0.15, item.length ?? 0.4, 6, 12), standardMaterial(item));
  else object = new THREE.Mesh(new THREE.BoxGeometry(...(item.size || [1, 1, 1])), standardMaterial({ ...item, type: "box" }));
  if (!object.userData.scene) rememberSpec(object, item);
  object.name = item.name || type;
  applyTransform(object, item);
  if (type !== "asset") for (const child of item.children || []) object.add(makeObject(child));
  return object;
}

function applyView(view) {
  if (!view) return;
  if (view.position) camera.position.fromArray(view.position);
  if (view.target) orbit.target.fromArray(view.target);
  orbit.update();
}

function disposeObject(object) {
  object.traverse((node) => {
    node.geometry?.dispose();
    const materials = node.material ? [].concat(node.material) : [];
    for (const material of materials) {
      material.map?.dispose();
      material.dispose?.();
    }
  });
}

function clearContent() {
  transform.detach();
  selectedSet.clear();
  selected = null;
  selection.textContent = "Select an object";
  transformSection.hidden = true;
  materialSection.hidden = true;
  textSection.hidden = true;
  visibleField.hidden = true;
  for (const child of [...content.children]) {
    disposeObject(child);
    content.remove(child);
  }
}

function clearSelectionDisplay() {
  transform.detach();
  selection.textContent = "Select an object";
  transformSection.hidden = true;
  materialSection.hidden = true;
  textSection.hidden = true;
  visibleField.hidden = true;
}

function select(object) {
  const target = object?.userData?.selectTarget || object;
  if (!target) {
    selectedSet.clear();
    selected = null;
    clearSelectionDisplay();
    rebuildList();
    return;
  }
  selectedSet.clear();
  selectedSet.add(target);
  selected = target;
  transform.attach(target);
  selection.textContent = target.name || "Object";
  transformSection.hidden = false;
  visibleField.hidden = false;
  rebuildList();
  syncInspector();
}

function rebuildList() {
  list.innerHTML = "";
  const walk = (object, depth) => {
    for (const child of object.children) {
      if (!child.userData?.scene) continue;
      const button = document.createElement("button");
      button.className = `object${selectedSet.has(child) ? " selected" : ""}${child.visible ? "" : " hidden-object"}`;
      button.style.paddingLeft = `${0.45 + depth * 0.7}rem`;
      button.textContent = child.name || "Object";
      button.onclick = () => select(child);
      list.append(button);
      walk(child, depth + 1);
    }
  };
  walk(content, 0);
}

function syncInspector() {
  if (!selected) return;
  document.querySelectorAll("[data-transform]").forEach((input) => {
    if (document.activeElement === input) return;
    const [group, axis] = input.dataset.transform.split(".");
    let value = selected[group][axis];
    if (group === "rotation") value = THREE.MathUtils.radToDeg(value);
    input.value = Number(value).toFixed(3);
  });
  const sceneSpec = selected.userData?.scene;
  const material = primaryMaterial(selected);
  const showStandard = Boolean(material?.isMeshStandardMaterial);
  const showArrowColor = sceneSpec?.type === "arrow";
  materialSection.hidden = !(showStandard || showArrowColor);
  materialSliders.hidden = !showStandard;
  if (showStandard) {
    colorInput.value = `#${material.color.getHexString()}`;
    document.querySelector("#material-metalness").value = material.metalness ?? 0;
    document.querySelector("#material-roughness").value = material.roughness ?? 0.5;
  } else if (showArrowColor) {
    colorInput.value = `#${new THREE.Color(sceneSpec.color ?? 0x1686ff).getHexString()}`;
  }
  textSection.hidden = sceneSpec?.type !== "text";
  if (sceneSpec?.type === "text" && document.activeElement !== textInput) textInput.value = sceneSpec.text ?? "";
  visibleInput.checked = selected.visible;
}

document.querySelectorAll("[data-transform]").forEach((input) => input.addEventListener("change", () => {
  if (!selected) return;
  const [group, axis] = input.dataset.transform.split(".");
  let value = Number(input.value);
  if (group === "rotation") value = THREE.MathUtils.degToRad(value);
  selected[group][axis] = value;
  markDirty();
  syncInspector();
}));

for (const id of ["material-color", "material-metalness", "material-roughness"]) {
  document.querySelector(`#${id}`).addEventListener("input", (event) => {
    if (!selected) return;
    const sceneSpec = selected.userData?.scene;
    if (sceneSpec?.type === "arrow" && id === "material-color") {
      const color = new THREE.Color(event.target.value);
      sceneSpec.color = color.getHex();
      selected.children.find((child) => child.isArrowHelper)?.setColor(color);
      markDirty();
      return;
    }
    const material = primaryMaterial(selected);
    if (!material) return;
    if (id === "material-color") material.color.set(event.target.value);
    else material[id.replace("material-", "")] = Number(event.target.value);
    material.needsUpdate = true;
    markDirty();
  });
}

textInput.addEventListener("input", () => {
  if (selected?.userData?.scene?.type !== "text") return;
  paintLabel(selected, textInput.value);
  markDirty();
});

visibleInput.addEventListener("change", () => {
  if (!selected) return;
  selected.visible = visibleInput.checked;
  markDirty();
  rebuildList();
});

function selectInRectangle(left, top, right, bottom) {
  selectedSet.clear();
  content.traverse((object) => {
    if (!(object.isMesh || object.isSprite) || object.userData?.skipList) return;
    const point = object.getWorldPosition(new THREE.Vector3()).project(camera);
    const x = (point.x + 1) / 2 * canvas.clientWidth;
    const y = (-point.y + 1) / 2 * canvas.clientHeight;
    if (x >= left && x <= right && y >= top && y <= bottom) selectedSet.add(object.userData.selectTarget || object);
  });
  selected = [...selectedSet].at(-1) ?? null;
  if (selected) {
    transform.attach(selected);
    selection.textContent = selectedSet.size > 1 ? `${selectedSet.size} objects selected` : selected.name || "Object";
    transformSection.hidden = false;
    visibleField.hidden = false;
    syncInspector();
  } else clearSelectionDisplay();
  rebuildList();
}

canvas.addEventListener("contextmenu", (event) => event.preventDefault());
canvas.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || transform.dragging || transform.axis) return;
  const rect = canvas.getBoundingClientRect();
  selectionStart = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  selectionBox.style.display = "block";
  selectionBox.style.left = `${selectionStart.x}px`;
  selectionBox.style.top = `${selectionStart.y}px`;
  selectionBox.style.width = "0px";
  selectionBox.style.height = "0px";
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointermove", (event) => {
  if (!selectionStart) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  selectionBox.style.left = `${Math.min(selectionStart.x, x)}px`;
  selectionBox.style.top = `${Math.min(selectionStart.y, y)}px`;
  selectionBox.style.width = `${Math.abs(x - selectionStart.x)}px`;
  selectionBox.style.height = `${Math.abs(y - selectionStart.y)}px`;
});
canvas.addEventListener("pointerup", (event) => {
  if (!selectionStart) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const left = Math.min(selectionStart.x, x);
  const right = Math.max(selectionStart.x, x);
  const top = Math.min(selectionStart.y, y);
  const bottom = Math.max(selectionStart.y, y);
  selectionBox.style.display = "none";
  selectionStart = null;
  if (right - left < 5 && bottom - top < 5) {
    pointer.x = x / rect.width * 2 - 1;
    pointer.y = -(y / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(content.children, true)[0];
    if (hit) select(hit.object);
    else selectInRectangle(left, top, right, bottom);
  } else selectInRectangle(left, top, right, bottom);
});

function setTool(mode) {
  transform.setMode(mode);
  document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.dataset.tool === mode));
}
addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea")) return;
  const key = event.key.toLowerCase();
  if (key === "w") setTool("translate");
  if (key === "e") setTool("rotate");
  if (key === "r") setTool("scale");
});
document.querySelector("#move-tool").dataset.tool = "translate";
document.querySelector("#rotate-tool").dataset.tool = "rotate";
document.querySelector("#scale-tool").dataset.tool = "scale";
document.querySelector("#move-tool").onclick = () => setTool("translate");
document.querySelector("#rotate-tool").onclick = () => setTool("rotate");
document.querySelector("#scale-tool").onclick = () => setTool("scale");
setTool("translate");

document.querySelector("#add-cube").onclick = () => {
  const cube = makeObject({ type: "box", name: "Cube", size: [1, 1, 1], color: 0x4a9ee0, metalness: 0.2, roughness: 0.55, position: [0, 0.5, 0] });
  content.add(cube);
  markDirty();
  select(cube);
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

document.querySelector("#file-input").addEventListener("change", async (event) => {
  const files = [...event.target.files];
  event.target.value = "";
  for (const file of files) {
    const url = await fileToDataUrl(file);
    const wrapper = makeAsset({ type: "asset", name: file.name.replace(/\.(glb|gltf)$/i, ""), url });
    wrapper.name = file.name.replace(/\.(glb|gltf)$/i, "");
    content.add(wrapper);
    markDirty();
    select(wrapper);
  }
});

function serializeObject(object) {
  const spec = { ...(object.userData.scene ?? { type: object.isGroup ? "group" : "box" }) };
  spec.name = object.name || spec.name || "Object";
  spec.position = object.position.toArray().map(round);
  spec.rotation = [object.rotation.x, object.rotation.y, object.rotation.z].map(round);
  spec.scale = object.scale.toArray().map(round);
  if (!object.visible) spec.visible = false;
  const material = primaryMaterial(object);
  if (material?.color && !["text", "arrow", "asset", "group"].includes(spec.type)) {
    spec.color = material.color.getHex();
    if (material.metalness != null) spec.metalness = round(material.metalness);
    if (material.roughness != null) spec.roughness = round(material.roughness);
    if (material.opacity < 1) spec.opacity = round(material.opacity);
  }
  const children = [...object.children].filter((child) => child.userData?.scene).map(serializeObject);
  if (children.length) spec.children = children;
  return spec;
}

function currentScene() {
  return {
    format: "XRFlightSimScene",
    version: 1,
    view: {
      position: camera.position.toArray().map(round),
      target: orbit.target.toArray().map(round),
    },
    objects: [...content.children].filter((child) => child.userData?.scene).map(serializeObject),
  };
}

function confirmReplace() {
  return !dirty || confirm("Replace the current scene? Unsaved edits will be lost.");
}

function loadSceneData(data) {
  if (data?.format === "XRFlightSimScene" && Array.isArray(data.objects)) {
    clearContent();
    for (const item of data.objects) content.add(makeObject(item));
    applyView(data.view);
    dirty = false;
    rebuildList();
    return;
  }
  if (data?.object || data?.metadata) {
    clearContent();
    const loaded = new THREE.ObjectLoader().parse(data);
    const nodes = loaded.children?.length ? [...loaded.children] : [loaded];
    for (const node of nodes) content.add(node);
    dirty = false;
    rebuildList();
    setStatus("Loaded a Three.js scene file");
    return;
  }
  throw new Error("Unrecognized scene file");
}

async function loadSceneUrl(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not fetch ${url}`);
  loadSceneData(await response.json());
}

document.querySelector("#load-flight-scene").onclick = async () => {
  if (!confirmReplace()) return;
  try {
    await loadSceneUrl("./scenes/flight-sim-scene.json");
    setStatus("Flight scene");
  } catch (error) {
    console.error(error);
    setStatus("Could not load the flight scene");
  }
};

document.querySelector("#scene-input").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file || !confirmReplace()) return;
  try {
    loadSceneData(JSON.parse(await file.text()));
    setStatus(file.name);
  } catch (error) {
    console.error(error);
    setStatus("Could not load that scene file");
  }
});

document.querySelector("#save-scene").onclick = () => {
  const usesCustomScene = [...content.children].every((child) => child.userData?.scene);
  const payload = usesCustomScene ? currentScene() : content.toJSON();
  const data = JSON.stringify(payload, null, usesCustomScene ? 2 : 0);
  try {
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.warn("Scene was downloaded, but the browser could not store a local copy", error);
  }
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
  link.download = "xrflightsim-scene.json";
  link.click();
  URL.revokeObjectURL(link.href);
  dirty = false;
  setStatus("Scene saved");
};

async function boot() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      loadSceneData(JSON.parse(saved));
      setStatus("Restored the last saved scene");
      return;
    } catch (error) {
      console.warn("Stored scene could not be restored", error);
    }
  }
  try {
    await loadSceneUrl("./scenes/flight-sim-scene.json");
    setStatus("Flight scene");
  } catch (error) {
    console.warn(error);
    setStatus("No scene loaded");
  }
}

boot();
renderer.setAnimationLoop(() => { renderer.render(scene, camera); });
