import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// camera.position.z = 5;
// camera.position.y = 2
// camera.position.x = -10
//can adjust all camera postions at once like this, the first value is the X, the second is the Y and the third is the Z
camera.position.set(-10, 30, 30)
orbit.update();

//creating a box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//creating a plane for the box to sit on and rotating it to match the grid
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI;

//creating a grid to show the levelness of the viewing angle
const gridHelper = new THREE.GridHelper(30, 50);
scene.add(gridHelper);

//creating a sphere now
const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

//created an animation function to spin the box
const animate = (time) => {
  // box.rotation.x += 0.01;
  // box.rotation.y += 0.01;
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera)
}

//putting the box on a neverending loop of spinning
renderer.setAnimationLoop(animate)
