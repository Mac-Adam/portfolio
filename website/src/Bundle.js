import * as THREE from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Wireframe } from "three/addons/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/addons/lines/WireframeGeometry2.js";
import { BLOOM_SCENE } from "./Common";

class Bundle {
  constructor(size, position, color, scene) {
    this.target_scale = 0;
    this.current_scale = 0;
    this.rotation_anim_x = Math.random() * 0.01 - 0.005;
    this.rotation_anim_y = Math.random() * 0.01 - 0.005;
    this.rotation_anim_z = Math.random() * 0.01 - 0.005;

    let geo = new THREE.IcosahedronGeometry(size, 1);
    const geometry_w = new WireframeGeometry2(geo);
    const matLine = new LineMaterial({
      color,
      linewidth: 4, // in pixels
      dashed: false,
      transparent: true,
      opacity: 0,
    });
    const wireframe = new Wireframe(geometry_w, matLine);
    wireframe.computeLineDistances();

    scene.add(wireframe);
    wireframe.position.set(...position);
    wireframe.layers.enable(BLOOM_SCENE);

    this.edge_mesh = wireframe;

    const bounding_geo = new THREE.SphereGeometry(size);
    const transparent_mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const bounding_sphere = new THREE.Mesh(bounding_geo, transparent_mat);
    scene.add(bounding_sphere);
    bounding_sphere.position.set(...position);
    this.bounding_sphere = bounding_sphere;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const inner_mesh = new THREE.Mesh(geometry, material);
    scene.add(inner_mesh);
    inner_mesh.position.set(...position);
    this.inner_mesh = inner_mesh;
  }
  hide_edge() {
    this.target_scale = 0;
  }
  show_edge() {
    this.target_scale = 1;
  }
  animate_edge() {
    this.current_scale += (this.target_scale - this.current_scale) * 0.05;
    if (this.current_scale >= 0.1) {
      this.edge_mesh.material.opacity = 1;
    } else {
      this.edge_mesh.material.opacity = 0;
    }
    this.edge_mesh.scale.set(this.current_scale, this.current_scale, this.current_scale);
  }
  animate() {
    //During firs frame it is sometimes not yet set up, not sure why
    if (!this.edge_mesh) {
      return;
    }

    this.animate_edge();
    this.edge_mesh.rotation.x += this.rotation_anim_x;
    this.edge_mesh.rotation.y += this.rotation_anim_y;
    this.edge_mesh.rotation.z += this.rotation_anim_z;
    this.hide_edge();
  }
}
export default Bundle;
