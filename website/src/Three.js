import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef, useState } from "react";
import Bundle from "./Bundle";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { BLOOM_SCENE, vertexShader, fragmentShader } from "./Common";
import "./App.css";

class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.activeBundle = null;
  }
  pick(normalizedPosition, scene, camera, boundles) {
    if (this.pickedObject) {
      this.pickedObject = null;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const bounding_spheres = boundles.map((b) => b.bounding_sphere);
    bounding_spheres.forEach((b) => {
      b.layers.set(0);
    });
    const intersectedObjects = this.raycaster.intersectObjects(bounding_spheres);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      const picked_sphere = intersectedObjects[0].object;
      this.pickedObject = boundles.filter((b) => b.bounding_sphere === picked_sphere)[0];
    }
    bounding_spheres.forEach((b) => {
      b.layers.set(BLOOM_SCENE);
    });
    if (this.pickedObject) {
      this.pickedObject.show_edge();
    }
  }
}

const DRAWER_WIDTH = "32rem";
const TRANSITION = "all 250ms ease-in-out";

function MyThree() {
  const refContainer = useRef(null); // for three js
  const refBundles = useRef([]);
  const refMaterials = useRef({}); // for selective bloom
  const refPickPositiom = useRef({ x: 0, y: 0 });
  const refPickHelper = useRef(new PickHelper());
  const [description, setDescription] = useState("");
  const [showGui, setShowGui] = useState(false);

  useEffect(() => {
    clearPickPosition();

    const getWidth = () => {
      const res = window.innerWidth;
      return res;
    };
    // --- Picking ---
    function getCanvasRelativePosition(event) {
      const rect = refContainer.current.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) * getWidth()) / rect.width,
        y: ((event.clientY - rect.top) * window.innerHeight) / rect.height,
      };
    }

    function setPickPosition(event) {
      const pos = getCanvasRelativePosition(event);
      refPickPositiom.current.x = (pos.x / getWidth()) * 2 - 1;
      refPickPositiom.current.y = (pos.y / window.innerHeight) * -2 + 1; // note we flip Y
    }

    function clearPickPosition() {
      // unlike the mouse which always has a position
      // if the user stops touching the screen we want
      // to stop picking. For now we just pick a value
      // unlikely to pick something
      refPickPositiom.current.x = -100000;
      refPickPositiom.current.y = -100000;
    }

    function getActiveBundle() {
      refPickHelper.current.activeBundle = null;
      if (refPickHelper.current.pickedObject) {
        refPickHelper.current.activeBundle = refPickHelper.current.pickedObject;
      }
    }

    function keyPress(e) {
      if (e.key === "Escape") {
        refPickHelper.current.activeBundle = null;
      }
    }
    window.addEventListener("mousemove", setPickPosition);
    window.addEventListener("mouseout", clearPickPosition);
    window.addEventListener("mouseleave", clearPickPosition);
    window.addEventListener("click", getActiveBundle);
    window.addEventListener("keyup", keyPress);

    window.addEventListener(
      "touchstart",
      (event) => {
        // prevent the window from scrolling
        event.preventDefault();
        setPickPosition(event.touches[0]);
      },
      { passive: false }
    );

    window.addEventListener("touchmove", (event) => {
      setPickPosition(event.touches[0]);
    });

    window.addEventListener("touchend", clearPickPosition);

    // --- Render with selective bloom ---
    //I am not 100% how it works, But i think It swaps the material for not bloomed objects for a pure black, which makes them invisible
    // Then returns the materials to normal for the normal render.
    const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const bloomLayer = new THREE.Layers();

    function darkenNonBloomed(obj) {
      if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        //This was put here because even though the bounding spheres are invisible they interfere with
        //the bloom effect
        if (obj.material.transparent === true) {
          //keep it out of rendering for now
          obj.layers.set(BLOOM_SCENE);
        }
        refMaterials.current[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
    }

    function restoreMaterial(obj) {
      if (refMaterials.current[obj.uuid]) {
        obj.layers.set(0);
        obj.material = refMaterials.current[obj.uuid];

        delete refMaterials.current[obj.uuid];
      }
    }

    // --- Setup render ---
    bloomLayer.set(BLOOM_SCENE);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, getWidth() / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(getWidth()),
      0.3, // strength
      0.1, // radius
      0 // threshold
    );
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.setSize(getWidth());

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
    finalComposer.setSize(getWidth());

    renderer.setSize(getWidth());
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    controls.target.set(0, 0, 0);
    controls.update();

    const render = () => {
      refPickHelper.current.pick(refPickPositiom.current, scene, camera, refBundles.current);

      //render bloom
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);

      // render the entire scene, then render bloom scene on top
      finalComposer.render();
    };

    window.onresize = () => {
      const height = window.innerHeight;
      const width = getWidth();

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);
    };

    // --- Lights ---
    const color = 0xfad5be;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const color2 = 0xfac8be;
    const intensity2 = 0.8;
    const light2 = new THREE.DirectionalLight(color2, intensity2);
    light2.position.set(-10, 3, 0);
    light2.target.position.set(0, 0, 5);
    scene.add(light2);
    scene.add(light2.target);

    const color3 = 0xbecafa;
    const intensity3 = 2;
    const light3 = new THREE.DirectionalLight(color3, intensity3);
    light3.position.set(3, -10, 30);
    light3.target.position.set(0, 10, -5);
    scene.add(light3);
    scene.add(light3.target);

    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    // --- Bundles ---
    refBundles.current.push(new Bundle(1.5, [2, 0, 0], 0x00ff00, scene, "Exhibit 1"));
    refBundles.current.push(new Bundle(0.5, [-2, 0, 0], 0xffff00, scene, "Exhibit 2"));
    refBundles.current.push(new Bundle(1, [2, 4, 0], 0x00ffff, scene, "Exhibit 3"));
    refBundles.current.push(new Bundle(2, [-4, -4, 0], 0xff00ff, scene, "Exhibit 4"));

    window.onresize();

    var animate = function () {
      requestAnimationFrame(animate);

      if (refPickHelper.current.activeBundle) {
        refPickHelper.current.activeBundle.active = true;
        setDescription(refPickHelper.current.activeBundle.description);
        setShowGui(true);
      } else {
        setShowGui(false);
      }

      refBundles.current.forEach((b) => b.animate(camera, controls));

      render();
    };
    animate();
  }, []);

  return (
    <>
      <div className="container">
        <div
          // ref={/* */} // ref.current.getBoundingRect() => {width, hight, ...}
          style={{
            maxWidth: showGui ? `calc(100vw - 32rem)` : "100vw",
            minWidth: showGui ? `calc(100vw - 32rem)` : "100vw",
            transition: TRANSITION,
            overflowX: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div ref={refContainer} className={"three-js"} />
        </div>
        <div
          style={{
            backgroundColor: "tomato",
            transition: TRANSITION,
            width: DRAWER_WIDTH,
            position: "absolute",
            right: 0, //showGui ? 0 : `-100%`,
            top: 0,
            bottom: 0,
            transform: showGui ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}

export default MyThree;
