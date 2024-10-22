import * as THREE from "three";

import WindStationDescription from "../components/descriptions/windStationDescription";
import SuiloDescription from "../components/descriptions/suiloDescription";
import DnDDescription from "../components/descriptions/dndDescription";
import FractalDescription from "../components/descriptions/fractalDescription";
export const lights = [
  { color: 0xfa957e, intensity: 1, position: new THREE.Vector3(0, 10, 0), target: new THREE.Vector3(-5, 0, 0) },
  { color: 0x8e9afa, intensity: 1.2, position: new THREE.Vector3(3, -10, 30), target: new THREE.Vector3(0, 10, -5) },
  { color: 0xfa988e, intensity: 0.8, position: new THREE.Vector3(-10, 3, 0), target: new THREE.Vector3(0, 0, 5) },
];
export const bundle_data = [
  {
    size: 2.5,
    position: new THREE.Vector3(2, 0, 0),
    edge_color: 0x00ff00,
    name: "weather_bundle",
    inner_model: "wether_station.glb",
    clickable: false,
    description: WindStationDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 1,
    position: new THREE.Vector3(-2, 0, 0),
    edge_color: 0xffff00,
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
    position: new THREE.Vector3(2, 4, 0),
    edge_color: 0x00ffff,
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
    edge_color: 0xff00ff,
    name: "dnd_bundle",
    clickable: false,
    inner_model: "tracker.glb",
    description: DnDDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 3,
    position: new THREE.Vector3(4, -4, 0),
    edge_color: 0xff0000,
    name: "fractal_bundle",
    clickable: false,
    inner_model: "fractal.glb",
    description: FractalDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
];
