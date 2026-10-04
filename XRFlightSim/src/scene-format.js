import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

export const FLIGHT_SCENE_URL = "./scenes/flight-sim-scene.json";

const CONTROL_SURFACES = {
  LeftAileron: "leftAileron",
  RightAileron: "rightAileron",
  Elevator: "elevator",
  Rudder: "rudder",
  Propeller: "propeller",
};

export function isFlightScene(data) {
  return data?.format === "XRFlightSimScene" && Array.isArray(data.objects);
}

export async function loadFlightScene(url = FLIGHT_SCENE_URL) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not fetch ${url} (${response.status})`);
  const data = await response.json();
  if (!isFlightScene(data)) throw new Error("Unrecognized scene file");
  return data;
}

export function sceneRole(item) {
  const name = item?.name || "";
  if (item?.type === "asset" && /FighterPlane/i.test(`${name} ${item.url || ""}`)) return "fighter";
  if (name === "Controls Panel") return "controls";
  if (name === "Pause Panel") return "pause";
  if (/course/i.test(name) && /ring/i.test(name)) return "course";
  return "environment";
}

export function bindControlSurfaces(model, animatedParts) {
  for (const key of Object.values(CONTROL_SURFACES)) animatedParts[key] = null;
  animatedParts.neutral = new Map();
  model.traverse((node) => {
    const key = CONTROL_SURFACES[node.name];
    if (!key) return;
    animatedParts[key] = node;
    animatedParts.neutral.set(node, node.quaternion.clone());
  });
}

export function applyFighterMaterials(model) {
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

function standardMaterials(object) {
  if (!object?.material) return [];
  return [].concat(object.material).filter((material) => material?.isMeshStandardMaterial);
}

function applyMaterialOverride(material, override) {
  if (!material || !override) return;
  if (override.color != null && material.color) material.color.setHex(override.color);
  if (override.metalness != null && material.metalness != null) material.metalness = override.metalness;
  if (override.roughness != null && material.roughness != null) material.roughness = override.roughness;
  material.needsUpdate = true;
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
  }
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
  }
}

function paintLabel(label, text) {
  const labelCanvas = label.material.map.image;
  const context = labelCanvas.getContext("2d");
  context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = "rgba(8, 16, 27, .94)";
  context.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = "#ffffff";
  context.font = "bold 64px system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text || " ", labelCanvas.width / 2, labelCanvas.height / 2);
  label.material.map.needsUpdate = true;
  label.userData.scene.text = text;
}

const labelWorldPosition = new THREE.Vector3();

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
  label.onBeforeRender = function (_renderer, _scene, cam) {
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
  return label;
}

function makeArrow(item) {
  const group = new THREE.Group();
  const end = new THREE.Vector3(...(item.end || [0, 0.4, 0]));
  const length = Math.max(end.length(), 0.001);
  const helper = new THREE.ArrowHelper(end.clone().normalize(), new THREE.Vector3(), length, item.color ?? 0x1686ff, Math.min(0.1, length * 0.25), Math.min(0.055, length * 0.12));
  group.add(helper);
  group.userData.scene = { type: "arrow", color: item.color ?? 0x1686ff, end: end.toArray() };
  return group;
}

function makeAsset(item, options) {
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
    applyMaterialOverrides(wrapper, sceneSpec.materialOverrides);
    applyTransformOverrides(wrapper, sceneSpec.transformOverrides);
    options.onAssetLoaded?.(wrapper, model, item);
  }, undefined, (error) => {
    console.error("Scene asset failed to load", item.url, error);
    options.onAssetError?.(error, item);
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
  if (item.lookAtCamera) spec.lookAtCamera = true;
  object.userData.scene = spec;
}

function applyTransform(object, item) {
  if (item.position) object.position.fromArray(item.position);
  if (item.rotation) object.rotation.set(item.rotation[0] || 0, item.rotation[1] || 0, item.rotation[2] || 0);
  if (item.scale) object.scale.fromArray(item.scale);
  object.visible = item.visible !== false;
}

export function createSceneObject(item, options = {}) {
  const type = item.type || "box";
  let object;
  if (type === "group") object = new THREE.Group();
  else if (type === "text") object = makeText(item);
  else if (type === "arrow") object = makeArrow(item);
  else if (type === "asset") object = makeAsset(item, options);
  else if (type === "plane") object = new THREE.Mesh(new THREE.PlaneGeometry(...(item.size || [1, 1])), standardMaterial(item));
  else if (type === "sphere") object = new THREE.Mesh(new THREE.SphereGeometry(item.radius ?? 0.2, 16, 12), standardMaterial(item));
  else if (type === "cylinder") object = new THREE.Mesh(new THREE.CylinderGeometry(item.radius ?? 0.05, item.radius ?? 0.05, item.height ?? 0.1, 16), standardMaterial(item));
  else if (type === "capsule") object = new THREE.Mesh(new THREE.CapsuleGeometry(item.radius ?? 0.15, item.length ?? 0.4, 6, 12), standardMaterial(item));
  else object = new THREE.Mesh(new THREE.BoxGeometry(...(item.size || [1, 1, 1])), standardMaterial({ ...item, type: "box" }));
  if (!object.userData.scene) rememberSpec(object, item);
  object.name = item.name || type;
  applyTransform(object, item);
  if (type !== "asset") for (const child of item.children || []) object.add(createSceneObject(child, options));
  return object;
}
