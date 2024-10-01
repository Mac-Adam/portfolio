import * as THREE from "three";

import TestDescription from "../components/descriptions/test_desc";
export const lights = [
  { color: 0xfad5be, intensity: 1.3, position: new THREE.Vector3(0, 10, 0), target: new THREE.Vector3(-5, 0, 0) },
  { color: 0xbecafa, intensity: 2, position: new THREE.Vector3(3, -10, 30), target: new THREE.Vector3(0, 10, -5) },
  { color: 0xfac8be, intensity: 0.8, position: new THREE.Vector3(-10, 3, 0), target: new THREE.Vector3(0, 0, 5) },
];
export const bundle_data = [
  {
    size: 2.5,
    position: new THREE.Vector3(2, 0, 0),
    edge_color: 0x00ff00,
    name: "weather_bundle",
    inner_model: "wether_station.glb",
    clickable: false,
    description: TestDescription,
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
    description: TestDescription,
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
    size: 1.0,
    position: new THREE.Vector3(2, 4, 0),
    edge_color: 0x00ffff,
    name: "suilo_bundle",
    clickable: false,
    inner_model: undefined,
    description: TestDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
  {
    size: 2.0,
    position: new THREE.Vector3(-4, -4, 0),
    edge_color: 0xff00ff,
    name: "about_bundle",
    clickable: false,
    inner_model: undefined,
    description: TestDescription,
    additionalModelSetup: () => {},
    onClick: () => {},
  },
];
