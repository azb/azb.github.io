import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/TransformControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

const STORAGE_KEY = "xrflightsim-scene";
const FLIGHT_SCENE_URL = "./scenes/flight-sim-scene.json?v=0.1.12";
const canvas = document.querySelector("#scene");
const list = document.querySelector("#object-list");
const selection = document.querySelector("#selection");
const sceneStatus = document.querySelector("#scene-status");
const transformSection = document.querySelector("#transform");
const materialSection = document.querySelector("#material");
const materialSliders = document.querySelector("#material-sliders");
const textSection = document.querySelector("#text-section");
const textInput = document.querySelector("#object-text");
const lookAtInput = document.querySelector("#text-look-at-camera");
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
const wheelDollyOffset = new THREE.Vector3();
canvas.addEventListener("wheel", (event) => {
  if ((event.buttons & 4) === 0) return;
  event.preventDefault();
  event.stopPropagation();
  wheelDollyOffset.copy(camera.position).sub(orbit.target);
  const currentDistance = wheelDollyOffset.length();
  if (currentDistance === 0) return;
  const zoomScale = Math.pow(0.95, orbit.zoomSpeed * Math.abs(event.deltaY) * 0.01);
  let distance = event.deltaY < 0 ? currentDistance * zoomScale : currentDistance / zoomScale;
  if (Number.isFinite(orbit.minDistance)) distance = Math.max(orbit.minDistance, distance);
  if (Number.isFinite(orbit.maxDistance)) distance = Math.min(orbit.maxDistance, distance);
  wheelDollyOffset.setLength(distance);
  camera.position.copy(orbit.target).add(wheelDollyOffset);
  orbit.update();
}, { passive: false });
const transform = new TransformControls(camera, canvas);
transform.addEventListener("mouseDown", () => {
  orbit.enabled = false;
  beginEdit();
});
transform.addEventListener("mouseUp", () => {
  orbit.enabled = true;
  endEdit();
});
transform.addEventListener("objectChange", () => {
  rememberTransformOverride(selected);
  dirty = true;
  syncInspector();
});
scene.add(transform.getHelper());
const content = new THREE.Group();
content.name = "Scene content";
scene.add(content);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const selectedSet = new Set();
const selectionBox = document.querySelector("#selection-box");
let selected = null;
let pendingSelectionPath = null;
let selectionStart = null;
let dirty = false;
const listExpanded = new Map();

function resize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();

function setStatus(message) { sceneStatus.textContent = message; }
function round(value) { return Math.round(value * 10000) / 10000; }
function standardMaterials(object) {
  if (!object?.material) return [];
  return [].concat(object.material).filter((material) => material?.isMeshStandardMaterial);
}
function primaryMaterial(object) {
  if (!object?.material) return null;
  return standardMaterials(object)[0] || [].concat(object.material)[0] || null;
}
function markDirty() { dirty = true; }

const undoStack = [];
const redoStack = [];
let undoLock = false;
let historyCheckpoint = null;

function selectionPath() {
  if (!selected) return null;
  const path = [];
  let node = selected;
  while (node && node !== content) {
    if (!node.parent) return null;
    path.unshift(node.parent.children.indexOf(node));
    node = node.parent;
  }
  return path;
}

function selectByPath(path) {
  let node = content;
  for (const index of path || []) node = node?.children?.[index];
  if (node && node !== content) {
    select(node, true);
    pendingSelectionPath = null;
    return true;
  }
  return false;
}

function sceneSnapshot() {
  const data = currentScene();
  delete data.view;
  data.selected = selectionPath();
  return JSON.stringify(data);
}

function resetHistory() {
  undoStack.length = 0;
  redoStack.length = 0;
  historyCheckpoint = null;
}

function beginEdit() {
  if (undoLock || historyCheckpoint) return;
  historyCheckpoint = sceneSnapshot();
}

function endEdit() {
  if (undoLock || !historyCheckpoint) return;
  const now = sceneSnapshot();
  if (now !== historyCheckpoint) {
    undoStack.push(historyCheckpoint);
    if (undoStack.length > 60) undoStack.shift();
    redoStack.length = 0;
    dirty = true;
  }
  historyCheckpoint = null;
}

function restoreSnapshot(snapshot, status) {
  undoLock = true;
  const data = JSON.parse(snapshot);
  const selectedPath = data.selected || null;
  delete data.selected;
  data.view = { position: camera.position.toArray(), target: orbit.target.toArray() };
  loadSceneData(data);
  pendingSelectionPath = selectedPath || null;
  if (selectedPath) selectByPath(selectedPath);
  dirty = true;
  undoLock = false;
  setStatus(status);
}

function undo() {
  if (!undoStack.length) {
    setStatus("Nothing to undo");
    return;
  }
  redoStack.push(sceneSnapshot());
  restoreSnapshot(undoStack.pop(), "Undo");
}

function redo() {
  if (!redoStack.length) {
    setStatus("Nothing to redo");
    return;
  }
  undoStack.push(sceneSnapshot());
  restoreSnapshot(redoStack.pop(), "Redo");
}

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

const labelWorldPosition = new THREE.Vector3();
const labelRestoreQuaternion = new THREE.Quaternion();
const meshRaycast = THREE.Mesh.prototype.raycast;

function faceLabelToCamera(label, cam) {
  label.getWorldPosition(labelWorldPosition);
  if (labelWorldPosition.distanceToSquared(cam.position) < 1e-10) return;
  label.lookAt(cam.position);
}

function makeText(item) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 1536;
  labelCanvas.height = 200;
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(labelCanvas), transparent: true, depthTest: false })
  );
  label.renderOrder = 2;
  const spec = { type: "text", text: item.text || "Label" };
  if (item.lookAtCamera) spec.lookAtCamera = true;
  label.userData.scene = spec;
  paintLabel(label, spec.text);
  const facing = { quaternion: new THREE.Quaternion(), active: false };
  label.onBeforeRender = function (renderer, scene, cam) {
    if (!this.userData.scene?.lookAtCamera || facing.active) return;
    facing.quaternion.copy(this.quaternion);
    facing.active = true;
    faceLabelToCamera(this, cam);
    this.updateMatrixWorld(true);
  };
  label.onAfterRender = function () {
    if (!facing.active) return;
    this.quaternion.copy(facing.quaternion);
    facing.active = false;
    this.updateMatrixWorld(true);
  };
  label.raycast = function (raycaster, intersects) {
    if (!this.userData.scene?.lookAtCamera) {
      meshRaycast.call(this, raycaster, intersects);
      return;
    }
    labelRestoreQuaternion.copy(this.quaternion);
    faceLabelToCamera(this, camera);
    this.updateMatrixWorld(true);
    meshRaycast.call(this, raycaster, intersects);
    this.quaternion.copy(labelRestoreQuaternion);
    this.updateMatrixWorld(true);
  };
  return label;
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

function applyFighterMaterials(model) {
  const applyLensMaterial = (sourceMaterial) => {
    const lensMaterial = sourceMaterial.clone();
    if (sourceMaterial.name === "tires") {
      lensMaterial.map = null;
      lensMaterial.color.setRGB(0.03, 0.035, 0.04);
      lensMaterial.metalness = 0.03;
      lensMaterial.roughness = 0.92;
    } else if (sourceMaterial.name === "teamcolor") {
      lensMaterial.map = null;
      lensMaterial.color.setRGB(0, 0.149, 1);
      lensMaterial.metalness = 0.35;
      lensMaterial.roughness = 0.58;
    } else {
      lensMaterial.map = null;
      lensMaterial.color.setRGB(0.78, 0.8, 0.82);
      lensMaterial.metalness = 0.5;
      lensMaterial.roughness = 0.6;
    }
    lensMaterial.needsUpdate = true;
    return lensMaterial;
  };
  model.traverse((node) => {
    if (!node.isMesh) return;
    if (node.name === "Windshield") {
      node.material = new THREE.MeshStandardMaterial({ color: 0x090d12, metalness: 0.25, roughness: 0.18 });
      return;
    }
    node.material = Array.isArray(node.material) ? node.material.map(applyLensMaterial) : applyLensMaterial(node.material);
  });
}

function materialOverrideValues(material) {
  const override = {};
  if (material?.color) override.color = material.color.getHex();
  if (material?.metalness != null) override.metalness = round(material.metalness);
  if (material?.roughness != null) override.roughness = round(material.roughness);
  if (material?.name) override.material = material.name;
  return override;
}

function rememberSubmeshMaterials(mesh) {
  if (!mesh?.isMesh || mesh.userData?.scene) return;
  const material = standardMaterials(mesh)[0];
  if (!material) return;
  mesh.userData.materialOverride = materialOverrideValues(material);
}

function rememberTransformOverride(object) {
  if (!object || object.userData?.scene) return;
  object.userData.transformOverride = true;
}

function applyTransformOverrides(root, overrides) {
  if (!root || !overrides?.length) return;
  for (const override of overrides) {
    let node = root;
    for (const index of override.path || []) node = node?.children?.[index];
    if ((!node || node === root) && override.name) {
      root.traverse((child) => {
        if ((!node || node === root) && child !== root && child.name === override.name) node = child;
      });
    }
    if (!node || node === root) continue;
    if (override.position) node.position.fromArray(override.position);
    if (override.rotation) node.rotation.set(override.rotation[0] || 0, override.rotation[1] || 0, override.rotation[2] || 0);
    if (override.scale) node.scale.fromArray(override.scale);
    node.userData.transformOverride = true;
  }
}

function collectTransformOverrides(object) {
  const overrides = [];
  const walk = (node) => {
    for (const child of node.children) {
      if (child.userData?.skipList) continue;
      if (child.userData?.scene) continue;
      if (child.userData.transformOverride) {
        const path = indexPathFrom(object, child);
        if (path) {
          const entry = {
            path,
            position: child.position.toArray().map(round),
            rotation: [child.rotation.x, child.rotation.y, child.rotation.z].map(round),
            scale: child.scale.toArray().map(round),
          };
          if (child.name) entry.name = child.name;
          overrides.push(entry);
        }
      }
      walk(child);
    }
  };
  walk(object);
  return overrides;
}

function applyMaterialOverrides(root, overrides) {
  if (!root || !overrides?.length) return;
  for (const override of overrides) {
    let node = root;
    for (const index of override.path || []) node = node?.children?.[index];
    if (!node?.isMesh && override.name) {
      root.traverse((child) => {
        if (!node?.isMesh && child.isMesh && child.name === override.name) node = child;
      });
    }
    if (!node?.isMesh) continue;
    const materials = standardMaterials(node);
    for (const material of materials.length ? materials : [].concat(node.material || [])) applyMaterialOverride(material, override);
    const stored = {};
    if (override.color != null) stored.color = override.color;
    if (override.metalness != null) stored.metalness = override.metalness;
    if (override.roughness != null) stored.roughness = override.roughness;
    if (override.material) stored.material = override.material;
    node.userData.materialOverride = stored;
  }
}

function applyMaterialOverride(material, override) {
  if (!material || !override) return;
  if (override.color != null && material.color) material.color.setHex(override.color);
  if (override.metalness != null && material.metalness != null) material.metalness = override.metalness;
  if (override.roughness != null && material.roughness != null) material.roughness = override.roughness;
  material.needsUpdate = true;
}

function indexPathFrom(ancestor, object) {
  const path = [];
  let node = object;
  while (node && node !== ancestor) {
    if (!node.parent) return null;
    path.unshift(node.parent.children.indexOf(node));
    node = node.parent;
  }
  return node === ancestor ? path : null;
}

function collectMaterialOverrides(object) {
  const overrides = [];
  const walk = (node) => {
    for (const child of node.children) {
      if (child.userData?.skipList) continue;
      if (child.userData?.scene) continue;
      if (child.isMesh && child.userData.materialOverride) {
        const path = indexPathFrom(object, child);
        if (path) {
          const entry = { path, ...child.userData.materialOverride };
          if (child.name) entry.name = child.name;
          overrides.push(entry);
        }
      }
      walk(child);
    }
  };
  walk(object);
  return overrides;
}

function ensureReadableMeshNames(root) {
  const used = new Set();
  root.traverse((node) => {
    if (node.name && String(node.name).trim()) used.add(node.name);
  });
  let fallback = 1;
  root.traverse((node) => {
    if (!node.isMesh || node.userData?.skipList) return;
    if (node.name && String(node.name).trim()) return;
    const materialName = primaryMaterial(node)?.name?.trim();
    let name = materialName || `Mesh ${fallback}`;
    if (used.has(name)) {
      const base = materialName || "Mesh";
      let count = 2;
      while (used.has(`${base} ${count}`)) count += 1;
      name = `${base} ${count}`;
    }
    if (!materialName) fallback += 1;
    node.name = name;
    used.add(name);
  });
}

function makeAsset(item) {
  const wrapper = new THREE.Group();
  const sceneSpec = { type: "asset", url: item.url, wingspan: item.wingspan ?? null };
  if (item.materialOverrides?.length) sceneSpec.materialOverrides = item.materialOverrides;
  if (item.transformOverrides?.length) sceneSpec.transformOverrides = item.transformOverrides;
  wrapper.userData.scene = sceneSpec;
  if (!item.url) return wrapper;
  const useFighterMaterials = /FighterPlane/i.test(`${item.name || ""} ${item.url || ""}`);
  new GLTFLoader().load(item.url, (gltf) => {
    const model = gltf.scene;
    if (item.wingspan) {
      const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
      model.scale.setScalar(item.wingspan / Math.max(size.x, 0.001));
    }
    if (useFighterMaterials) applyFighterMaterials(model);
    wrapper.add(model);
    ensureReadableMeshNames(model);
    applyMaterialOverrides(wrapper, sceneSpec.materialOverrides);
    applyTransformOverrides(wrapper, sceneSpec.transformOverrides);
    rebuildList();
    if (pendingSelectionPath) selectByPath(pendingSelectionPath);
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

function makeCamera() {
  const group = new THREE.Group();
  group.userData.scene = { type: "camera" };
  const view = new THREE.PerspectiveCamera(70, 16 / 9, 0.25, 4);
  view.name = "View";
  view.userData.skipList = true;
  group.add(view);
  const helper = new THREE.CameraHelper(view);
  helper.userData.skipList = true;
  helper.userData.selectTarget = group;
  helper.frustumCulled = false;
  scene.add(helper);
  group.userData.cameraHelper = helper;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.28, 0.52),
    new THREE.MeshStandardMaterial({ color: 0x1a1e24, metalness: 0.45, roughness: 0.4 })
  );
  body.name = "Camera body";
  body.position.z = 0.06;
  body.userData.skipList = true;
  body.userData.selectTarget = group;
  const lens = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.22, 16),
    new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.35, roughness: 0.4 })
  );
  lens.rotation.x = -Math.PI / 2;
  lens.position.z = -0.26;
  lens.userData.skipList = true;
  lens.userData.selectTarget = group;
  body.add(lens);
  group.add(body);
  return group;
}

function makeObject(item) {
  const type = item.type || "box";
  let object;
  if (type === "camera") object = makeCamera();
  else if (type === "group") object = new THREE.Group();
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
    const helper = node.userData?.cameraHelper;
    if (helper) {
      helper.removeFromParent();
      helper.dispose?.();
      node.userData.cameraHelper = null;
    }
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

function select(object, fromPath) {
  if (!fromPath) pendingSelectionPath = null;
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

function listKey(object) {
  const parts = [];
  let node = object;
  while (node && node !== content) {
    const kind = node.userData?.scene?.type || (node.isMesh ? "mesh" : "node");
    parts.unshift(`${kind}:${node.name || ""}`);
    node = node.parent;
  }
  return parts.join("/");
}

function isListNode(object) {
  if (!object || object.userData?.skipList) return false;
  return Boolean(object.userData?.scene) || Boolean(object.isMesh);
}

function hasListDescendants(object) {
  for (const child of object.children) {
    if (child.userData?.skipList) continue;
    if (isListNode(child) || hasListDescendants(child)) return true;
  }
  return false;
}

function isListExpanded(object) {
  const key = listKey(object);
  if (listExpanded.has(key)) return listExpanded.get(key);
  return object.userData?.scene?.type !== "asset";
}

function rebuildList() {
  ensureReadableMeshNames(content);
  list.innerHTML = "";
  const addRow = (object, depth, expandable, expanded) => {
    const row = document.createElement("div");
    row.className = `object-row${selectedSet.has(object) ? " selected" : ""}${object.visible ? "" : " hidden-object"}`;
    row.style.paddingLeft = `${0.15 + depth * 0.75}rem`;
    if (expandable) {
      const twist = document.createElement("button");
      twist.type = "button";
      twist.className = "twist";
      twist.textContent = expanded ? "▾" : "▸";
      twist.title = expanded ? "Collapse" : "Expand";
      twist.setAttribute("aria-expanded", expanded ? "true" : "false");
      twist.setAttribute("aria-label", expanded ? "Collapse" : "Expand");
      twist.onclick = (event) => {
        event.stopPropagation();
        listExpanded.set(listKey(object), !expanded);
        rebuildList();
      };
      row.append(twist);
    } else {
      const spacer = document.createElement("span");
      spacer.className = "twist-spacer";
      row.append(spacer);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "object";
    button.textContent = object.name || "Object";
    button.onclick = () => select(object);
    row.append(button);
    list.append(row);
  };
  const walk = (object, depth) => {
    for (const child of object.children) {
      if (child.userData?.skipList) continue;
      if (!isListNode(child)) {
        walk(child, depth);
        continue;
      }
      const expandable = hasListDescendants(child);
      const expanded = expandable && isListExpanded(child);
      addRow(child, depth, expandable, expanded);
      if (expanded) walk(child, depth + 1);
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
  if (sceneSpec?.type === "text") lookAtInput.checked = sceneSpec.lookAtCamera === true;
  visibleInput.checked = selected.visible;
}

document.querySelectorAll("[data-transform]").forEach((input) => {
  input.addEventListener("focus", beginEdit);
  input.addEventListener("blur", endEdit);
  input.addEventListener("change", () => {
    if (!selected) return;
    beginEdit();
    const [group, axis] = input.dataset.transform.split(".");
    let value = Number(input.value);
    if (group === "rotation") value = THREE.MathUtils.degToRad(value);
    selected[group][axis] = value;
    rememberTransformOverride(selected);
    markDirty();
    syncInspector();
    endEdit();
  });
});

for (const id of ["material-color", "material-metalness", "material-roughness"]) {
  const input = document.querySelector(`#${id}`);
  input.addEventListener("pointerdown", beginEdit);
  input.addEventListener("focus", beginEdit);
  input.addEventListener("change", endEdit);
  input.addEventListener("blur", endEdit);
  input.addEventListener("input", (event) => {
    beginEdit();
    if (!selected) return;
    const sceneSpec = selected.userData?.scene;
    if (sceneSpec?.type === "arrow" && id === "material-color") {
      const color = new THREE.Color(event.target.value);
      sceneSpec.color = color.getHex();
      selected.children.find((child) => child.isArrowHelper)?.setColor(color);
      markDirty();
      return;
    }
    const materials = standardMaterials(selected);
    if (!materials.length) return;
    for (const material of materials) {
      if (id === "material-color") material.color.set(event.target.value);
      else material[id.replace("material-", "")] = Number(event.target.value);
      material.needsUpdate = true;
    }
    rememberSubmeshMaterials(selected);
    markDirty();
  });
}

textInput.addEventListener("focus", beginEdit);
textInput.addEventListener("blur", endEdit);
textInput.addEventListener("input", () => {
  beginEdit();
  if (selected?.userData?.scene?.type !== "text") return;
  paintLabel(selected, textInput.value);
  markDirty();
});

lookAtInput.addEventListener("pointerdown", beginEdit);
lookAtInput.addEventListener("focus", beginEdit);
lookAtInput.addEventListener("change", () => {
  if (selected?.userData?.scene?.type !== "text") return;
  beginEdit();
  if (lookAtInput.checked) selected.userData.scene.lookAtCamera = true;
  else delete selected.userData.scene.lookAtCamera;
  markDirty();
  endEdit();
});

visibleInput.addEventListener("pointerdown", beginEdit);
visibleInput.addEventListener("focus", beginEdit);
visibleInput.addEventListener("change", () => {
  if (!selected) return;
  beginEdit();
  selected.visible = visibleInput.checked;
  markDirty();
  rebuildList();
  endEdit();
});

function selectInRectangle(left, top, right, bottom) {
  pendingSelectionPath = null;
  selectedSet.clear();
  content.traverse((object) => {
    const cameraRig = object.userData?.scene?.type === "camera";
    if (!cameraRig && (!(object.isMesh || object.isSprite) || object.userData?.skipList)) return;
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
    const helpers = [];
    content.traverse((object) => {
      if (object.userData?.cameraHelper) helpers.push(object.userData.cameraHelper);
    });
    const hit = raycaster.intersectObjects([...content.children, ...helpers], true)[0];
    if (hit) select(hit.object);
    else selectInRectangle(left, top, right, bottom);
  } else selectInRectangle(left, top, right, bottom);
});

function setTool(mode) {
  transform.setMode(mode);
  document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.dataset.tool === mode));
}
addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && !event.altKey && (key === "z" || key === "y")) {
    event.preventDefault();
    endEdit();
    if (key === "z" && !event.shiftKey) undo();
    else redo();
    return;
  }
  if (event.target.matches("input, textarea") || event.ctrlKey || event.metaKey || event.altKey) return;
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
  beginEdit();
  const cube = makeObject({ type: "box", name: "Cube", size: [1, 1, 1], color: 0x4a9ee0, metalness: 0.2, roughness: 0.55, position: [0, 0.5, 0] });
  content.add(cube);
  markDirty();
  select(cube);
  endEdit();
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
  beginEdit();
  for (const file of files) {
    const url = await fileToDataUrl(file);
    const wrapper = makeAsset({ type: "asset", name: file.name.replace(/\.(glb|gltf)$/i, ""), url });
    wrapper.name = file.name.replace(/\.(glb|gltf)$/i, "");
    content.add(wrapper);
    markDirty();
    select(wrapper);
  }
  endEdit();
});

function serializeObject(object) {
  const spec = { ...(object.userData.scene ?? { type: object.isGroup ? "group" : "box" }) };
  if (spec.lookAtCamera !== true) delete spec.lookAtCamera;
  spec.name = object.name || spec.name || "Object";
  spec.position = object.position.toArray().map(round);
  spec.rotation = [object.rotation.x, object.rotation.y, object.rotation.z].map(round);
  spec.scale = object.scale.toArray().map(round);
  if (!object.visible) spec.visible = false;
  const material = primaryMaterial(object);
  if (material?.color && !["text", "arrow", "asset", "group", "camera"].includes(spec.type)) {
    spec.color = material.color.getHex();
    if (material.metalness != null) spec.metalness = round(material.metalness);
    if (material.roughness != null) spec.roughness = round(material.roughness);
    if (material.opacity < 1) spec.opacity = round(material.opacity);
  }
  const materialOverrides = collectMaterialOverrides(object);
  if (materialOverrides.length) spec.materialOverrides = materialOverrides;
  else if (!(spec.type === "asset" && object.children.length === 0 && spec.materialOverrides?.length)) delete spec.materialOverrides;
  const transformOverrides = collectTransformOverrides(object);
  if (transformOverrides.length) spec.transformOverrides = transformOverrides;
  else if (!(spec.type === "asset" && object.children.length === 0 && spec.transformOverrides?.length)) delete spec.transformOverrides;
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
    if (!undoLock) resetHistory();
    return;
  }
  if (data?.object || data?.metadata) {
    clearContent();
    const loaded = new THREE.ObjectLoader().parse(data);
    const nodes = loaded.children?.length ? [...loaded.children] : [loaded];
    for (const node of nodes) content.add(node);
    dirty = false;
    rebuildList();
    if (!undoLock) resetHistory();
    setStatus("Loaded a Three.js scene file");
    return;
  }
  throw new Error("Unrecognized scene file");
}

async function loadSceneUrl(url) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not fetch ${url}`);
  loadSceneData(await response.json());
}

document.querySelector("#load-flight-scene").onclick = async () => {
  if (!confirmReplace()) return;
  try {
    await loadSceneUrl(FLIGHT_SCENE_URL);
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
    await loadSceneUrl(FLIGHT_SCENE_URL);
    setStatus("Flight scene");
  } catch (error) {
    console.warn(error);
    setStatus("No scene loaded");
  }
}

boot();
renderer.setAnimationLoop(() => {
  content.traverse((object) => {
    const helper = object.userData?.cameraHelper;
    if (helper) helper.visible = object.visible;
  });
  renderer.render(scene, camera);
});
