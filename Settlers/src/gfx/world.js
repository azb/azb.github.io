import * as THREE from 'three';
import { TABLE_HEIGHT } from '../game/constants.js';
import { woodMap, feltMap } from './textures.js';

export function createWorld(scene) {
  const wood = woodMap(1024, 512, [110, 64, 32]);
  wood.repeat.set(2, 2);
  const floorWood = woodMap(1024, 1024, [78, 48, 28]);
  floorWood.repeat.set(8, 8);
  const plaster = feltMap([62, 52, 42]);
  const room = new THREE.Group();
  room.name = 'room';
  scene.add(room);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ map: floorWood, roughness: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  room.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ map: plaster, color: '#6d5a48', roughness: 0.95 });
  const walls = [
    [0, 1.6, -3.4, 0],
    [0, 1.6, 3.4, Math.PI],
    [-3.4, 1.6, 0, Math.PI / 2],
    [3.4, 1.6, 0, -Math.PI / 2],
  ];
  for (const [x, y, z, ry] of walls) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 0.12), wallMat);
    w.position.set(x, y, z);
    w.rotation.y = ry;
    w.receiveShadow = true;
    room.add(w);
  }

  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.98, 0.08, 32),
    new THREE.MeshStandardMaterial({ map: wood, color: '#7a4a28', roughness: 0.65 }),
  );
  table.position.y = TABLE_HEIGHT - 0.04;
  table.castShadow = true;
  table.receiveShadow = true;
  scene.add(table);

  const apron = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.2, TABLE_HEIGHT - 0.08, 12),
    new THREE.MeshStandardMaterial({ map: wood, color: '#5a3218', roughness: 0.8 }),
  );
  apron.position.y = (TABLE_HEIGHT - 0.08) / 2;
  scene.add(apron);

  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 32),
    new THREE.MeshStandardMaterial({ color: '#4a1f1a', roughness: 1 }),
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.01;
  room.add(rug);

  const hemi = new THREE.HemisphereLight('#f4ead8', '#4a3424', 1.05);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#ffe6c0', 1.7);
  sun.position.set(2.4, 4.2, 1.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 12;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -3;
  sun.shadow.camera.right = sun.shadow.camera.top = 3;
  scene.add(sun);
  const lamp = new THREE.PointLight('#ffcc88', 8, 6);
  lamp.position.set(0, 2.1, 0);
  scene.add(lamp);

  const chandelier = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.015, 8, 18),
    new THREE.MeshStandardMaterial({ color: '#c9a44a', metalness: 0.7, roughness: 0.3 }),
  );
  chandelier.rotation.x = Math.PI / 2;
  chandelier.position.y = 2.05;
  room.add(chandelier);

  return { table, room };
}
