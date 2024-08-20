import * as THREE from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Wireframe } from "three/addons/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/addons/lines/WireframeGeometry2.js";

class Bundle {
  constructor(size, position, color, scene) {
    this.rotation_anim_x = Math.random() * 0.01 - 0.005;
    this.rotation_anim_y = Math.random() * 0.01 - 0.005;
    this.rotation_anim_z = Math.random() * 0.01 - 0.005;

    let geo = new THREE.IcosahedronGeometry(size, 1);
    const geometry_w = new WireframeGeometry2(geo);

    const matLine = new LineMaterial({
      color: color,
      linewidth: 5, // in pixels
      dashed: false,
    });

    const wireframe = new Wireframe(geometry_w, matLine);
    wireframe.computeLineDistances();
    wireframe.scale.set(1, 1, 1);
    scene.add(wireframe);
    wireframe.position.set(...position);

    this.edge_mesh = wireframe;

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
