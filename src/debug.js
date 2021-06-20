import * as dat from "dat.gui";
import { debugObject } from "./create";

export const gui = new dat.GUI();
gui.add(debugObject, "generateCube");
console.log((gui.domElement.style.userSelect = "none"));
