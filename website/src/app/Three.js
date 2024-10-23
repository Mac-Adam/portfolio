import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef, useState } from "react";
import Bundle from "./Bundle";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { BLOOM_SCENE, vertexShader, fragmentShader } from "./Common";
import { lights, bundle_data } from "./scene.js";
import PickHelper from "./pickHelper.js";
import LanguageProvider from "./language.js";

const DRAWER_WIDTH = "45rem";
const TRANSITION = "all 250ms ease-in-out";

function MyThree() {
  const refContainer = useRef(null); // for three js
  const refRenderWindow = useRef(null);
  const refBundles = useRef([]);
  const refClock = useRef(null);
  const refMaterials = useRef({}); // for selective bloom
  const refPickPositiom = useRef({ x: 0, y: 0 });
  const refPickHelper = useRef(new PickHelper());
  const refPosStartedClick = useRef({ x: 0, y: 0 });
  const refLanguageProvider = useRef(null);
  const [Description, setDescription] = useState(null);
  const [showGui, setShowGui] = useState(false);

  useEffect(() => {
    refLanguageProvider.current = new LanguageProvider("pl");
    clearPickPosition();

    function mouseOnRenderWindow(event) {
      return event.clientX < refRenderWindow.current.getBoundingClientRect().width;
    }
    // --- Picking ---
    function getCanvasRelativePosition(event) {
      const rect = refContainer.current.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) * window.innerWidth) / rect.width,
        y: ((event.clientY - rect.top) * window.innerHeight) / rect.height,
      };
    }

    function setPickPosition(event) {
      if (mouseOnRenderWindow(event)) {
        const pos = getCanvasRelativePosition(event);
        refPickPositiom.current.x = (pos.x / window.innerWidth) * 2 - 1;
        refPickPositiom.current.y = (pos.y / window.innerHeight) * -2 + 1; // note we flip Y
      } else {
        clearPickPosition();
      }
    }
    // The touch screen functionality was not yet tested and it most likely needs some changes.
    function clearPickPosition() {
      // unlike the mouse which always has a position
      // if the user stops touching the screen we want
      // to stop picking. For now we just pick a value
      // unlikely to pick something
      refPickPositiom.current.x = -100000;
      refPickPositiom.current.y = -100000;
    }

    function getActiveBundle(event) {
      const dist = Math.abs(event.clientX - refPosStartedClick.current.x) + Math.abs(event.clientY - refPosStartedClick.current.y);
      if (mouseOnRenderWindow(event) && dist < 10) {
        if (!refPickHelper.current.pickedObject) {
          refPickHelper.current.activeBundle = null;
        } else {
          if (!refPickHelper.current.pickedObject.clickable) {
            refPickHelper.current.activeBundle = refPickHelper.current.pickedObject;
          }
          refPickHelper.current.pickedObject.handleClick();
        }
      }
    }

    function keyPress(e) {
      if (e.key === "Escape") {
        refPickHelper.current.activeBundle = null;
      }
    }

    const recordMouseDown = (e) => {
      refPosStartedClick.current.x = e.clientX;
      refPosStartedClick.current.y = e.clientY;
    };

    window.addEventListener("mousemove", setPickPosition);
    window.addEventListener("mouseout", clearPickPosition);
    window.addEventListener("mouseleave", clearPickPosition);
    window.addEventListener("click", getActiveBundle);
    window.addEventListener("keyup", keyPress);
    window.addEventListener("mousedown", recordMouseDown);

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
    refClock.current = new THREE.Clock();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth),
      0.3, // strength
      0.1, // radius
      0 // threshold
    );
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.setSize(window.innerWidth);

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

    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms["resolution"].value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));

    const outputPass = new OutputPass();

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);
    finalComposer.addPass(fxaaPass);
    finalComposer.addPass(outputPass);
    finalComposer.setSize(window.innerWidth);

    renderer.setSize(window.innerWidth);
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
      const width = window.innerWidth;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);

      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms["resolution"].value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));
    };

    // --- SkyBox ---
    const loader = new THREE.CubeTextureLoader();
    loader.setPath("skybox/");

    const textureCube = loader.load(["right.png", "left.png", "front.png", "back.png", "top.png", "bottom.png"]);

    scene.background = textureCube;

    // --- Lights ---
    lights.forEach((l) => {
      const light = new THREE.DirectionalLight(l.color, l.intensity);
      light.position.set(...l.position);
      light.target.position.set(...l.target);
      light.castShadow = true;
      scene.add(light);
      scene.add(light.target);
    });
    const light = new THREE.AmbientLight(0x404040, 5); // soft white light
    scene.add(light);
    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    // --- Bundles ---
    bundle_data.forEach((b) => {
      refBundles.current.push(new Bundle(b, scene, refLanguageProvider.current));
    });
    window.onresize();

    var animate = function () {
      requestAnimationFrame(animate);
      const delta = refClock.current.getDelta();
      if (refPickHelper.current.activeBundle) {
        refPickHelper.current.activeBundle.active = true;
        setDescription(() => refPickHelper.current.activeBundle.description);
        setShowGui(true);
      } else {
        setDescription(null);
        setShowGui(false);
      }

      refBundles.current.forEach((b) => b.animate(camera, controls, delta));

      render();
    };
    animate();
  }, []);

  return (
    <>
      <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div
          ref={refRenderWindow}
          style={{
            maxWidth: showGui ? `calc(100vw - ${DRAWER_WIDTH})` : "100vw",
            minWidth: showGui ? `calc(100vw - ${DRAWER_WIDTH})` : "100vw",
            transition: TRANSITION,
            overflowX: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div ref={refContainer} />
        </div>
        <div
          style={{
            backgroundColor: "black",
            transition: TRANSITION,
            width: DRAWER_WIDTH,
            position: "absolute",
            right: 0, //showGui ? 0 : `-100%`,
            top: 0,
            bottom: 0,
            transform: showGui ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {Description ? <Description languageProvider={refLanguageProvider.current} /> : "Loading..."}
        </div>
      </div>
    </>
  );
}

export default MyThree;
