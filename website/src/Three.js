import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef } from "react";
import Bundle from "./Bundle";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { BLOOM_SCENE, vertexShader, fragmentShader } from "./Common";
function MyThree() {
  const refContainer = useRef(null);
  const refBundles = useRef([]);
  const refMaterials = useRef({});

  useEffect(() => {
    const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const bloomLayer = new THREE.Layers();

    //functions used for selective bloom,
    //I am not 100% how it works, But i think It swaps the material for not bloomed objects for a pure black, which makes them invisible
    // Then returns the materials to normal for the normal render.
    function darkenNonBloomed(obj) {
      if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        refMaterials.current[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
    }

    function restoreMaterial(obj) {
      if (refMaterials.current[obj.uuid]) {
        obj.material = refMaterials.current[obj.uuid];
        delete refMaterials.current[obj.uuid];
      }
    }

    //Setup render
    bloomLayer.set(BLOOM_SCENE);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // strength
      0.1, // radius
      0.1 // threshold
    );
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);

    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: {},
      }),
      "baseTexture"
    );
    mixPass.needsSwap = true;

    const outputPass = new OutputPass();

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);
    finalComposer.addPass(outputPass);
    finalComposer.setSize(window.innerWidth, window.innerHeight);

    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    controls.target.set(0, 0, 0);
    controls.update();

    const render = () => {
      //render bloom
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);

      // render the entire scene, then render bloom scene on top
      finalComposer.render();
    };
    window.onresize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);

      render();
    };

    //setupLights
    const color = 0xfae5ce;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const color2 = 0xfad8ce;
    const intensity2 = 0.8;
    const light2 = new THREE.DirectionalLight(color2, intensity2);
    light2.position.set(-10, 3, 0);
    light2.target.position.set(0, 0, 5);
    scene.add(light2);
    scene.add(light2.target);

    const color3 = 0xcedafa;
    const intensity3 = 2;
    const light3 = new THREE.DirectionalLight(color3, intensity3);
    light3.position.set(3, -10, 30);
    light3.target.position.set(0, 10, -5);
    scene.add(light3);
    scene.add(light3.target);

    refContainer.current && refContainer.current.appendChild(renderer.domElement);
    // Create bundles
    refBundles.current.push(new Bundle(1.5, [2, 0, 0], 0x00ff00, scene));
    refBundles.current.push(new Bundle(0.5, [-2, 0, 0], 0xffff00, scene));
    refBundles.current.push(new Bundle(1, [2, 4, 0], 0x00ffff, scene));
    refBundles.current.push(new Bundle(2, [-4, -4, 0], 0xff00ff, scene));

    var animate = function () {
      requestAnimationFrame(animate);
      refBundles.current.forEach((b) => b.animate(0.01, 0.01, 0.01));
      render();
    };
    animate();
  }, []);

  return <div ref={refContainer}></div>;
}

export default MyThree;
