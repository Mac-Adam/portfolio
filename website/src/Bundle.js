import * as THREE from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Wireframe } from "three/addons/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/addons/lines/WireframeGeometry2.js";
import { BLOOM_SCENE, lerp } from "./Common";

class Bundle {
  constructor(bundle_data, scene) {
    //used for animation of the icosphere
    this.target_scale = 0;
    this.current_scale = 0;
    this.rotation_anim_x = Math.random() * 0.01 - 0.005;
    this.rotation_anim_y = Math.random() * 0.01 - 0.005;
    this.rotation_anim_z = Math.random() * 0.01 - 0.005;
    this.position = bundle_data.position;
    this.size = bundle_data.size;
    // keeps track if user is currently looking at it
    this.active = false;
    // placeholder for now, will have to populate it with some react components later
    this.description = `This is ${bundle_data.name}`;

    // --- Create the icosphere ---
    let geo = new THREE.IcosahedronGeometry(bundle_data.size * 0.9, 1);
    const geometry_w = new WireframeGeometry2(geo);
    const matLine = new LineMaterial({
      color: bundle_data.edge_color,
      linewidth: 4, // in pixels
      dashed: false,
      transparent: true,
      opacity: 0,
    });
    const wireframe = new Wireframe(geometry_w, matLine);
    wireframe.computeLineDistances();

    scene.add(wireframe);
    wireframe.position.set(...bundle_data.position);
    wireframe.layers.enable(BLOOM_SCENE);

    this.edge_mesh = wireframe;

    // Since the icosphere is a wireframe for correct picking we need a bounding sphere
    const bounding_geo = new THREE.SphereGeometry(bundle_data.size * 0.9);
    const transparent_mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const bounding_sphere = new THREE.Mesh(bounding_geo, transparent_mat);
    scene.add(bounding_sphere);
    bounding_sphere.layers.set(BLOOM_SCENE);
    bounding_sphere.position.set(...bundle_data.position);
    this.bounding_sphere = bounding_sphere;

    // --- Text on top of icosphere ---
    const font_loader = new FontLoader();
    //TODO: pick font
    const fontName = "helvetiker";
    const fontWeight = "bold";

    font_loader.load("fonts/" + fontName + "_" + fontWeight + ".typeface.json", (response) => {
      const textGeo = new TextGeometry(bundle_data.name, {
        font: response,
        size: 0.3,
        depth: 0.001,
      });
      textGeo.center();
      textGeo.translate(0, bundle_data.size + 0.3, 0);
      const textMesh = new THREE.Mesh(
        textGeo,
        new THREE.MeshBasicMaterial({ color: bundle_data.edge_color, transparent: true, opacity: 0 })
      );
      scene.add(textMesh);
      textMesh.position.set(...bundle_data.position);
      this.text_mesh = textMesh;
    });

    // --- Inner contents --- (placeholder for now)
    const geometry = new THREE.BoxGeometry(bundle_data.size, bundle_data.size, bundle_data.size);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const inner_mesh = new THREE.Mesh(geometry, material);
    scene.add(inner_mesh);
    inner_mesh.position.set(...bundle_data.position);
    this.inner_mesh = inner_mesh;
  }
  // --- Animate icosphere, text, and camera
  hide_edge() {
    this.target_scale = 0;
  }
  show_edge() {
    this.target_scale = 1;
  }
  animate_edge() {
    this.current_scale = lerp(this.current_scale, this.target_scale, 0.05);
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
  animate_camera(camera, controls) {
    controls.target.set(
      lerp(controls.target.x, this.position.x, 0.05),
      lerp(controls.target.y, this.position.y, 0.05),
      lerp(controls.target.z, this.position.z, 0.05)
    );
    const camera_dir = new THREE.Vector3();
    const positionVec = new THREE.Vector3(...this.position);
    camera_dir.subVectors(camera.position, positionVec);
    const r = camera_dir.length();
    const target_r = lerp(r, this.size * 2, 0.05);
    const final_position = new THREE.Vector3().addVectors(positionVec, camera_dir.normalize().multiplyScalar(target_r));

    camera.position.set(...final_position);
    controls.update();
  }
  animate(camera, controls) {
    //During firs frame it is sometimes not yet set up, not sure why
    if (!this.edge_mesh || !this.text_mesh) {
      return;
    }
    if (this.active) {
      this.hide_edge();
      this.active = false;
      this.animate_camera(camera, controls);
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
