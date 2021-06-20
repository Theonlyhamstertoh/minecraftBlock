import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import "./style.css";
import { generateCube } from "./create.js";
import { Vector3 } from "three";

/**
 * Size
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Scene
 */
export const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 25, 15);
camera.lookAt(new Vector3(0, 0, 0));
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(sizes.width, sizes.height);

/**
 * OrbitControls
 */
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;
// orbitControls.update();
const flyControls = new FlyControls(camera, renderer.domElement);
flyControls.movementSpeed = 1000;
flyControls.autoForward = false;

flyControls.dragToLook = false;
flyControls.rollSpeed = Math.PI / 24;

/**
 * Helper
 */
const gridHelper = new THREE.GridHelper(50, 50);
const axesHelper = new THREE.AxesHelper(25);

/**
 * Group
 */
export const group = new THREE.Group();

/**
 * Add To Scene
 */
scene.add(gridHelper, axesHelper, group);

/**
 * Animate
 */
const clock = new THREE.Clock();
const animate = () => {
  const delta = clock.getDelta();
  requestAnimationFrame(animate);
  // orbitControls.update();
  flyControls.update(delta);
  flyControls.movementSpeed = 300 * delta;
  renderer.render(scene, camera);
  generateCube();
};
animate();

/**
 * Resizing
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
});
