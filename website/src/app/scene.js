import * as THREE from "three";

import WindStationDescription from "../components/descriptions/windStationDescription";
import SuiloDescription from "../components/descriptions/suiloDescription";
import DnDDescription from "../components/descriptions/dndDescription";
import FractalDescription from "../components/descriptions/fractalDescription";
import AboutMeDescription from "../components/descriptions/aboutMeDescription";
import OrigamiDescription from "../components/descriptions/origamiDescription";
export const lights = [
  { color: 0xfa957e, intensity: 2, position: new THREE.Vector3(0, 10, 0), target: new THREE.Vector3(-5, 0, 0) },
  { color: 0x8e9afa, intensity: 2.4, position: new THREE.Vector3(3, -10, 30), target: new THREE.Vector3(0, 10, -5) },
  { color: 0xfa988e, intensity: 1.6, position: new THREE.Vector3(-10, 3, 0), target: new THREE.Vector3(0, 0, 5) },
];
export const bundle_data = [
  {
    size: 2.5,
    position: new THREE.Vector3(6, 0, 0),
    edge_color: 0x361cc9,
    name: "weather_bundle",
    inner_model: "wether_station.glb",
    clickable: false,
    description: WindStationDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 1,
    position: new THREE.Vector3(-4, 0, -4),
    edge_color: 0xb7cc4b,
    name: "lang_bundle",
    clickable: true,
    inner_model: "Moon_flag.glb",
    description: null,
    additionalModelSetup: function additionalModelSetup() {
      this.flags = {};
      const flags = this.inner_mesh.children.filter((c) => {
        return c.name === "en" || c.name === "pl";
      });
      flags.forEach((element) => {
        if (element.name !== this.languageProvider.language) {
          element.visible = false;
        }
        this.flags[element.name] = element;
      });
      this.languageProvider.addCallback((new_l) => {
        for (const [key, value] of Object.entries(this.flags)) {
          if (key === new_l) {
            value.visible = true;
          } else {
            value.visible = false;
          }
        }
      });
    },
    onClick: function onClick() {
      this.languageProvider.setLanguage(this.languageProvider.language === "en" ? "pl" : "en");
    },
  },
  {
    size: 1.8,
    position: new THREE.Vector3(4, 4, 0),
    edge_color: 0xf55c1b,
    name: "suilo_bundle",
    clickable: false,
    inner_model: "suilo.glb",
    description: SuiloDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 1.7,
    position: new THREE.Vector3(-4, -4, 0),
    edge_color: 0xd0d60f,
    name: "dnd_bundle",
    clickable: false,
    inner_model: "tracker.glb",
    description: DnDDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 3,
    position: new THREE.Vector3(4, -6, 0),
    edge_color: 0xf0699b,
    name: "fractal_bundle",
    clickable: false,
    inner_model: "fractal.glb",
    description: FractalDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 1.5,
    position: new THREE.Vector3(0, 0, 0),
    edge_color: 0x065d5e,
    name: "about_me_bundle",
    clickable: false,
    inner_model: "astronaut.glb",
    description: AboutMeDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 1.5,
    position: new THREE.Vector3(-6, 0, 0),
    edge_color: 0xe036c7,
    name: "origami_bundle",
    clickable: false,
    inner_model: "origami_bird.glb",
    description: OrigamiDescription,
    additionalModelSetup: function additionalModelSetup() {
      this.inner_mesh.children.forEach((c) => {
        if (c.material) {
          c.material.side = THREE.DoubleSide;
          c.material.depthWrite = true;
          c.material.depthTest = true;
        }
      });
    },
    onClick: () => {},
  },
];
