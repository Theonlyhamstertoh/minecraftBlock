import * as THREE from "three";
import { scene, group } from "./init";

// Textures
const loadingManager = new THREE.LoadingManager(() => console.log("loaded"));
const textureLoader = new THREE.TextureLoader(loadingManager);

// diamond texture
const diamondBlock = textureLoader.load("/textures/minecraft.png");
diamondBlock.minFilter = THREE.NearestFilter;
diamondBlock.magFilter = THREE.NearestFilter;
diamondBlock.generateMipmaps = false;
// Mesh Materials
export const debugObject = {
  color: 0xfff0cc,
  generateCube,
};

const basicMaterial = new THREE.MeshBasicMaterial({ color: debugObject.color, map: diamondBlock });

// Cube generator
export function generateCube() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), basicMaterial);
  cube.position.set(x, y, z);
  group.add(cube);
}
