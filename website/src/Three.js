import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef } from "react";
import Bundle from "./Bundle";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
function MyThree() {
  const refContainer = useRef(null);
  const refBundles = useRef([]);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1, // strength
      0.1, // radius
      0.4 // threshold
    );
    composer.addPass(bloomPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    controls.target.set(0, 0, 0);
    controls.update();

    const color = 0xfaf5de;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const color2 = 0xfae8de;
    const intensity2 = 0.8;
    const light2 = new THREE.DirectionalLight(color2, intensity2);
    light2.castShadow = true;
    light2.position.set(-10, 3, 0);
    light2.target.position.set(0, 0, 5);
    scene.add(light2);
    scene.add(light2.target);

    const color3 = 0xdeeafa;
    const intensity3 = 2;
    const light3 = new THREE.DirectionalLight(color3, intensity3);
    light3.castShadow = true;
    light3.position.set(3, -10, 30);
    light3.target.position.set(0, 10, -5);
    scene.add(light3);
    scene.add(light3.target);

    //document.body.appendChild(renderer.domElement);
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    refBundles.current.push(new Bundle(1.5, [2, 0, 0], 0x00ff00, scene));
    refBundles.current.push(new Bundle(0.5, [-2, 0, 0], 0xffff00, scene));
    refBundles.current.push(new Bundle(1, [2, 4, 0], 0x00ffff, scene));
    refBundles.current.push(new Bundle(2, [-4, -4, 0], 0xff00ff, scene));

    var animate = function () {
      requestAnimationFrame(animate);
      refBundles.current.forEach((b) => b.animate(0.01, 0.01, 0.01));
      composer.render(scene, camera);
    };
    animate();
  }, []);
  return <div ref={refContainer}></div>;
}

export default MyThree;
