import * as THREE from 'three';
import { TABLE_HEIGHT } from '../game/constants.js';
import { woodMap, feltMap } from './textures.js';
import { QUALITY } from './quality.js';

const LAMP_INTENSITY = 11;
const LAMP_DISTANCE = 6;

export function createWorld(stage) {
  const wood = woodMap(QUALITY.roomWood, QUALITY.roomWood / 2, [110, 64, 32]);
  wood.repeat.set(2, 2);
  const floorWood = woodMap(QUALITY.floorWood, QUALITY.floorWood, [78, 48, 28]);
  floorWood.repeat.set(8, 8);
  const plaster = feltMap([62, 52, 42]);
  const room = new THREE.Group();
  room.name = 'room';
  stage.add(room);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ map: floorWood, roughness: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  room.add(floor);

  const ROOM_H = 3.2;
  const ROOM_W = 7;
  const WALL_T = 0.12;
  const WALL_R = 3.4;
  const wallMat = new THREE.MeshStandardMaterial({
    map: plaster,
    color: '#6d5a48',
    roughness: 0.95,
    depthWrite: true,
    transparent: false,
  });
  const walls = [
    [0, ROOM_H / 2, -WALL_R, 0],
    [0, ROOM_H / 2, WALL_R, Math.PI],
    [-WALL_R, ROOM_H / 2, 0, Math.PI / 2],
    [WALL_R, ROOM_H / 2, 0, -Math.PI / 2],
  ];
  for (const [x, y, z, ry] of walls) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, ROOM_H, WALL_T), wallMat);
    w.position.set(x, y, z);
    w.rotation.y = ry;
    w.receiveShadow = true;
    room.add(w);
  }

  // Lid on the walls so looking up is never empty sky (AR passthrough).
  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, WALL_T, ROOM_W), wallMat);
  ceiling.name = 'ceiling';
  ceiling.position.set(0, ROOM_H + WALL_T / 2, 0);
  ceiling.receiveShadow = true;
  room.add(ceiling);

  // Inward shell behind the room: WebXR AR ignores scene.background, so any
  // missed ray would otherwise composite the camera. Opaque + depthWrite.
  const sky = new THREE.Mesh(
    new THREE.BoxGeometry(9.2, ROOM_H + 0.5, 9.2),
    new THREE.MeshBasicMaterial({
      color: '#1b140f',
      side: THREE.BackSide,
      depthWrite: true,
      transparent: false,
      fog: false,
    }),
  );
  sky.name = 'sky';
  sky.position.y = ROOM_H / 2 + 0.05;
  room.add(sky);

  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.98, 0.08, QUALITY.tableSegments),
    new THREE.MeshStandardMaterial({ map: wood, color: '#7a4a28', roughness: 0.65 }),
  );
  table.position.y = TABLE_HEIGHT - 0.04;
  table.castShadow = true;
  table.receiveShadow = true;
  stage.add(table);

  const apron = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.2, TABLE_HEIGHT - 0.08, 12),
    new THREE.MeshStandardMaterial({ map: wood, color: '#5a3218', roughness: 0.8 }),
  );
  apron.position.y = (TABLE_HEIGHT - 0.08) / 2;
  stage.add(apron);

  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, QUALITY.rugSegments),
    new THREE.MeshStandardMaterial({ color: '#4a1f1a', roughness: 1 }),
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.01;
  room.add(rug);

  // Room fill stays on the room (walls/ceiling when passthrough is off).
  const hemi = new THREE.HemisphereLight('#f4ead8', '#4a3424', 1.05);
  room.add(hemi);
  const sun = new THREE.DirectionalLight('#ffe6c0', 1.7);
  sun.position.set(2.4, 4.2, 1.6);
  sun.castShadow = QUALITY.shadows;
  sun.shadow.mapSize.set(QUALITY.shadowSize, QUALITY.shadowSize);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 12;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -3;
  sun.shadow.camera.right = sun.shadow.camera.top = 3;
  room.add(sun);

  // Board key light: follows the table. Three.js PointLight.distance is *not*
  // transformed by parent scale (only world position is), and inverse-square
  // uses world metres — a shrunk stage would blow out tiles without this sync.
  const lamp = new THREE.PointLight('#ffcc88', LAMP_INTENSITY, LAMP_DISTANCE);
  lamp.name = 'boardLamp';
  lamp.position.set(0, 2.1, 0);
  stage.add(lamp);

  function syncBoardLight(scale = stage.scale.x) {
    const s = Math.max(1e-4, scale);
    lamp.intensity = LAMP_INTENSITY * s * s;
    lamp.distance = LAMP_DISTANCE * s;
  }
  syncBoardLight();

  const chandelier = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.015, 6, 12),
    new THREE.MeshStandardMaterial({ color: '#c9a44a', metalness: 0.7, roughness: 0.3 }),
  );
  chandelier.rotation.x = Math.PI / 2;
  chandelier.position.y = 2.05;
  room.add(chandelier);

  return { table, room, sun, lamp, syncBoardLight };
}
