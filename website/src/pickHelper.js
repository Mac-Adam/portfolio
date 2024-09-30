import * as THREE from "three";
import { BLOOM_SCENE } from "./Common";
export default class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.activeBundle = null;
  }
  pick(normalizedPosition, scene, camera, bundles) {
    if (this.pickedObject) {
      this.pickedObject = null;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const bounding_spheres = bundles.map((b) => b.bounding_sphere);
    bounding_spheres.forEach((b) => {
      b.layers.set(0);
    });
    const intersectedObjects = this.raycaster.intersectObjects(bounding_spheres);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      const picked_sphere = intersectedObjects[0].object;
      this.pickedObject = bundles.filter((b) => {
        if (b.bounding_sphere === picked_sphere) {
          return true;
        }
        let parent = picked_sphere.parent;
        while (parent) {
          if (b.bounding_sphere === parent) {
            return true;
          }
          parent = parent.parent;
        }
        return false;
      })[0];
    }
    bounding_spheres.forEach((b) => {
      b.layers.set(BLOOM_SCENE);
    });
    if (this.pickedObject) {
      this.pickedObject.show_edge();
    }
  }
}
