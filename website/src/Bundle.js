import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

class Bundle {
  constructor(size, position, color, scene) {
    this.rotation_anim_x = Math.random() * 0.01 - 0.005;
    this.rotation_anim_y = Math.random() * 0.01 - 0.005;
    this.rotation_anim_z = Math.random() * 0.01 - 0.005;
    const loader = new GLTFLoader();
    loader.load(
      "/models/ico_sphere.glb",
      (gltf) => {
        const model = gltf.scene;
        const edge_mesh = model.children[0]; // make sure the glb file has just one child, the model.
        edge_mesh.material = new THREE.MeshBasicMaterial({ color: color, emissive: color, emissiveIntensity: 2 });
        edge_mesh.material.wireframe = true;
        scene.add(edge_mesh);
        edge_mesh.position.set(...position);
        edge_mesh.scale.set(size, size, size);
        this.edge_mesh = edge_mesh;
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const inner_mesh = new THREE.Mesh(geometry, material);
    scene.add(inner_mesh);
    inner_mesh.castShadow = true;
    inner_mesh.receiveShadow = true;
    inner_mesh.position.set(...position);
    this.inner_mesh = inner_mesh;
  }
  animate() {
    if (!this.edge_mesh) {
      return;
    }
    this.edge_mesh.rotation.x += this.rotation_anim_x;
    this.edge_mesh.rotation.y += this.rotation_anim_y;
    this.edge_mesh.rotation.z += this.rotation_anim_z;
  }
}
export default Bundle;
