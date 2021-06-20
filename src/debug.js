import * as dat from "dat.gui";
import { debugObject, standardMaterial } from "./create";

export const gui = new dat.GUI();
gui.add(debugObject, "generateCube");
gui.add(debugObject, "generateNormalSphere");
gui.add(debugObject, "generateMatCapSphere");
gui.add(debugObject, "generateToonSphere");
gui.add(debugObject, "generateDepthSphere");
gui.add(debugObject, "generateLambertTorus");
gui.add(debugObject, "generatePhongSphere");
gui.add(debugObject, "generateDoor");
gui.add(debugObject, "generateEnvSphere");

const doorFolder = gui.addFolder("door");
doorFolder.add(standardMaterial, "displacementScale").min(0).max(10).step(0.001);
doorFolder.add(standardMaterial, "roughness").min(0).max(1).step(0.0001);
doorFolder.add(standardMaterial, "metalness").min(0).max(10).step(0.0001);

gui.domElement.style.userSelect = "none";
