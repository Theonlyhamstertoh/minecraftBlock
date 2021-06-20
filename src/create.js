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

// Gradients
// Matcap

// door Materials
const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorColor = textureLoader.load("/textures/door/color.jpg");
const doorHeight = textureLoader.load("/textures/door/height.jpg");
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const doorNormal = textureLoader.load("/textures/door/normal.jpg");
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");
const gradient = textureLoader.load("/textures/gradients/5.jpg");
gradient.magFilter = THREE.NearestFilter;
gradient.minFilter = THREE.NearestFilter;

//Debug OBject
export const debugObject = {
  color: 0xfff0cc,
  generateCube,
  generateNormalSphere,
  generateMatCapSphere,
  generateToonSphere,
  generateDepthSphere,
  generateLambertTorus,
  generatePhongSphere,
  generateEnvSphere,
  generateDoor,
};

const basicMaterial = new THREE.MeshBasicMaterial({ color: debugObject.color, map: diamondBlock });
basicMaterial.transparent = true;

// Cube generator
export function generateCube() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), basicMaterial);
  cube.position.set(x, y, z);
  group.add(cube);
}

const normalMaterial = new THREE.MeshNormalMaterial();
// normalMaterial.flatShading = true;

export function generateNormalSphere() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), normalMaterial);
  sphere.position.set(x, y, z);
  group.add(sphere);
}

export function generateMatCapSphere() {
  const matcapTexture = textureLoader.load(
    `/textures/matcaps/${Math.floor(Math.random() * 9) + 1}.png`
  );
  const matCapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), matCapMaterial);
  sphere.position.set(x, y, z);
  group.add(sphere);
}

const toonMaterial = new THREE.MeshToonMaterial({ gradientMap: gradient, color: "red" });
export function generateToonSphere() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), toonMaterial);
  sphere.position.set(x, y, z);
  group.add(sphere);
}
const depthMaterial = new THREE.MeshDepthMaterial();
export function generateDepthSphere() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), depthMaterial);
  sphere.position.set(x, y, z);
  group.add(sphere);
}
const lambertMaterial = new THREE.MeshLambertMaterial();
export function generateLambertTorus() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const p = Math.floor((Math.random() - 0.5) * 20) + 1;
  const q = Math.floor((Math.random() - 0.5) * 20) + 1;
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotBufferGeometry(3, 1.7, 90, 20, p, q),
    lambertMaterial
  );
  torusKnot.position.set(x, y, z);
  group.add(torusKnot);
}

const phongMaterial = new THREE.MeshPhongMaterial();
export function generatePhongSphere() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const torusKnot = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), phongMaterial);
  torusKnot.position.set(x, y, z);
  group.add(torusKnot);
}

export const standardMaterial = new THREE.MeshStandardMaterial();
standardMaterial.map = doorColor;
standardMaterial.normalMap = doorNormal;
standardMaterial.aoMap = doorAmbientOcclusion;
standardMaterial.displacementMap = doorHeight;
standardMaterial.displacementScale = 1;
standardMaterial.roughnessMap = doorRoughness;
standardMaterial.alphaMap = doorAlpha;
standardMaterial.transparent = true;
standardMaterial.metalnessMap = doorMetalness;
standardMaterial.metalness = 0.2;
export function generateDoor() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const door = new THREE.Mesh(new THREE.PlaneBufferGeometry(7, 7, 100, 100), standardMaterial);
  const uv2 = door.geometry.attributes.uv.array;
  door.position.set(x, 10, z);
  door.geometry.setAttribute("uv2", new THREE.BufferAttribute(uv2, 2));
  group.add(door);
}

// Environment Map
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/5/px.png",
  "/textures/environmentMaps/5/nx.png",
  "/textures/environmentMaps/5/py.png",
  "/textures/environmentMaps/5/ny.png",
  "/textures/environmentMaps/5/pz.png",
  "/textures/environmentMaps/5/nz.png",
]);
console.log(environmentMapTexture);

const environmentMaterial = new THREE.MeshStandardMaterial({ envMap: environmentMapTexture });
environmentMaterial.metalness = 1;
environmentMaterial.roughness = 0;

export function generateEnvSphere() {
  const x = Math.floor((Math.random() - 0.5) * 50);
  const y = Math.floor(Math.random() * 50);
  const z = Math.floor((Math.random() - 0.5) * 50);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 32, 32), environmentMaterial);
  sphere.position.set(x, y, z);
  group.add(sphere);
}
