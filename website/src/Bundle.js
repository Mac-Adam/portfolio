import * as THREE from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Wireframe } from "three/addons/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/addons/lines/WireframeGeometry2.js";
import { BLOOM_SCENE } from "./Common";

class Bundle {
  constructor(size, position, color, scene, name) {
    this.target_scale = 0;
    this.current_scale = 0;
    this.rotation_anim_x = Math.random() * 0.01 - 0.005;
    this.rotation_anim_y = Math.random() * 0.01 - 0.005;
    this.rotation_anim_z = Math.random() * 0.01 - 0.005;
    this.position = position;
    this.size = size;
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
    bounding_sphere.layers.set(BLOOM_SCENE);
    bounding_sphere.position.set(...position);
    this.bounding_sphere = bounding_sphere;

    const font_loader = new FontLoader();
    //TODO: pick font
    const fontName = "helvetiker";
    const fontWeight = "bold";

    font_loader.load("fonts/" + fontName + "_" + fontWeight + ".typeface.json", (response) => {
      const textGeo = new TextGeometry(name, {
        font: response,
        size: 0.3,
        depth: 0.05,
      });
      textGeo.center();
      textGeo.translate(0, size + 0.3, 0);
      const textMesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 }));
      scene.add(textMesh);
      textMesh.position.set(...position);
      this.text_mesh = textMesh;
    });

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
      this.text_mesh.material.opacity = 1;
    } else {
      this.text_mesh.material.opacity = 0;
      this.edge_mesh.material.opacity = 0;
    }
    this.edge_mesh.scale.set(this.current_scale, this.current_scale, this.current_scale);
    this.text_mesh.scale.set(this.current_scale, this.current_scale, this.current_scale);
  }
  align_text(camera) {
    if (!this.text_mesh) {
      return;
    }
    this.text_mesh.lookAt(camera.position);
  }
  animate(camera) {
    //During firs frame it is sometimes not yet set up, not sure why
    if (!this.edge_mesh || !this.text_mesh) {
      return;
    }

    this.animate_edge();
    this.edge_mesh.rotation.x += this.rotation_anim_x;
    this.edge_mesh.rotation.y += this.rotation_anim_y;
    this.edge_mesh.rotation.z += this.rotation_anim_z;
    this.hide_edge();
    this.align_text(camera);
  }
}
export default Bundle;
