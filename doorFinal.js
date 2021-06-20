import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
import * as dat from "dat.gui";
/**
 * Textures
 */

const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);

const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorColor = textureLoader.load("/textures/door/color.jpg");
const doorHeight = textureLoader.load("/textures/door/height.jpg");
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const doorNormal = textureLoader.load("/textures/door/normal.jpg");
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");
const doorGradient = textureLoader.load("/textures/gradients/5.jpg");
const doorMatcapTexture = textureLoader.load("/textures/matcaps/3.png");
const diamondBlock = textureLoader.load("/textures/minecraft.png");

/**
 * ScreenSize
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * helpers
 */
const axesHelper = new THREE.AxesHelper(20);
const gridHelper = new THREE.GridHelper(20, 20);
/**
 * DebugObject
 */
const debugObject = {
  color: 0xff000,
};

/**
 * Material
 */
const material = new THREE.MeshStandardMaterial();
material.aoMap = doorAmbientOcclusion;
material.metalnessMap = doorMetalness;
material.map = doorColor;
material.metalness = 0.7;
material.roughness = 0.2;
material.roughnessMap = doorRoughness;
material.normalMap = doorNormal;
material.alphaMap = doorAlpha;
material.transparent = true;
material.displacementMap = doorHeight;
material.displacementScale = 0.15;
material.normalScale.set(1, 1, 1);
/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xfffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
/**
 * OrbitControls
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/**
 * Group
 */
const group = new THREE.Group();

/**
 * SphereGenerator
 */
function createSphere(x) {
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 20, 20), material);
  sphere.position.x = x;
  group.add(sphere);
  return sphere;
}
/**
 * CubeGenerator
 */
function createCube(x) {
  const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), material);
  mesh.position.x = x;
  group.add(mesh);
  return mesh;
}
/**
 * TorusGenerator
 */
function createTorus(x) {
  const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(3, 1, 64, 128), material);
  torus.position.x = x;
  group.add(torus);
  return torus;
}
/**
 * Create Shapes
 */

const torus = createTorus(-10);
const sphere = createSphere(8);
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5, 100, 100), material);

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
plane.material.side = THREE.DoubleSide;
/**
 * Debug Panel
 */
const gui = new dat.GUI();
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});
gui.add(material, "aoMapIntensity", 0, 10, 0.001);
gui.add(material, "displacementScale", 0, 10, 0.001);
gui.add(material, "metalness", 0, 10, 0.001);
gui.add(material, "roughness", 0, 10, 0.001);
/**
 * Add To Scene
 */
scene.add(gridHelper, plane, axesHelper, camera, group);

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
});
/**
 * Animations
 */
const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  controls.update();
  group.rotation.x = 0.1 * elapsedTime;
  renderer.render(scene, camera);
}
animate();
