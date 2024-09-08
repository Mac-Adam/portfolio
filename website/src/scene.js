import * as THREE from "three";
export const lights = [
  { color: 0xfad5be, intensity: 1.3, position: new THREE.Vector3(0, 10, 0), target: new THREE.Vector3(-5, 0, 0) },
  { color: 0xbecafa, intensity: 2, position: new THREE.Vector3(3, -10, 30), target: new THREE.Vector3(0, 10, -5) },
  { color: 0xfac8be, intensity: 0.8, position: new THREE.Vector3(-10, 3, 0), target: new THREE.Vector3(0, 0, 5) },
];
export const bundle_data = [
  { size: 1.5, position: new THREE.Vector3(2, 0, 0), edge_color: 0x00ff00, name: "Exhibit 1" },
  { size: 0.5, position: new THREE.Vector3(-2, 0, 0), edge_color: 0xffff00, name: "Exhibit 2" },
  { size: 1.0, position: new THREE.Vector3(2, 4, 0), edge_color: 0x00ffff, name: "Exhibit 3" },
  { size: 2.0, position: new THREE.Vector3(-4, -4, 0), edge_color: 0xff00ff, name: "Exhibit 4" },
];
