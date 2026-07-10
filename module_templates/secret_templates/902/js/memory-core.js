// Importing Three.js and dependencies
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { RoundedBoxGeometry } from './RoundedBoxGeometry.js';
import * as dat from "./dat.gui.module.js";

// Texture URLs
const textures = {
  matcap:
  "./placeholder4.png",
  env:
  "./env.png" };


// Configurations for object (group) speed, proximity settings, and transparency
const config = {
  object: { speed: 0.2 }, // Controls the group movement speed
  proximity: { range: 3, strength: 1.05, falloff: 2.0 }, // Proximity settings
  transparent: true // Transparency setting
};

// Setting up the controls with dat.GUI
function setupGUI(space) {
  const gui = new dat.GUI();

  // Add object speed control for group movement
  gui.add(config.object, "speed", 0, 1, 0.01).name("Object Speed");

  // Add proximity range, strength, and falloff controls
  const proximityFolder = gui.addFolder("Proximity Settings");
  proximityFolder.
  add(config.proximity, "range", 1, 5, 0.1).
  name("Proximity Range");
  proximityFolder.
  add(config.proximity, "strength", 0.1, 3, 0.01).
  name("Proximity Strength");
  proximityFolder.
  add(config.proximity, "falloff", 1, 5, 0.1).
  name("Proximity Falloff");

  // Add transparency toggle
  gui.
  add(config, "transparent").
  name("Transparent").
  onChange(() => {
    space.updateTransparency(); // Call to update transparency
  });
}

class Control {
  constructor(props) {
    this.controls = new OrbitControls(props.camera, props.canvas);
    this.init();
  }
  init() {
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 0.9;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.02;
    this.update();
  }
  update() {
    this.controls.update();
  }}


class Space {
  constructor(props) {
    this.canvas = props.canvas || null;
    this.mouse = new THREE.Vector2();
    this.main();
  }

  main() {
    // Renderer with alpha: true for transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true // This makes the background transparent
    });
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35);
    this.camera.position.set(5, -1.7, 8); // Move the camera back for Rubik's cube view

    this.scene.background = null; // Ensure the scene has no background

    this.control = new Control({ camera: this.camera, canvas: this.canvas });
    this.renderer.shadowMap.enabled = true;
    this.init();

    // Add mousemove event listener to track mouse position
    window.addEventListener("mousemove", event => this.onMouseMove(event));
  }

  init() {
    this.addRubiksCube(); // Adding the Rubik's cube object (group of cubes)
    this.render();
    this.loop();
    this.resize();
  }

  // Create a 3x3 Rubik's cube grid of smaller cubes
  addRubiksCube() {
    const size = 1; // Size of each small cube
    const spacing = 1.1; // Spacing between cubes
    this.cubeGroup = new THREE.Group(); // Create a group to hold all cubes

    const matcapTexture = new THREE.TextureLoader().load(textures.matcap);
    const envTexture = new THREE.TextureLoader().load(textures.env);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const cubeGeometry = new RoundedBoxGeometry(
          size,
          size,
          size,
          5,
          0.05);

          const cubeMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture, // Apply matcap texture
            map: envTexture, // Stack env texture for blending
            transparent: config.transparent, // Use initial transparency setting
            opacity: config.transparent ? 0.8 : 1.0 });


          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(x * spacing, y * spacing, z * spacing);
          cube.originalPosition = cube.position.clone(); // Store original positions
          this.cubeGroup.add(cube); // Add each cube to the group
        }
      }
    }
    this.scene.add(this.cubeGroup); // Add the entire group to the scene
  }

  updateTransparency() {
    this.cubeGroup.children.forEach(cube => {
      cube.material.transparent = config.transparent; // Apply transparency toggle
      cube.material.opacity = config.transparent ? 0.8 : 1.0; // Adjust opacity
      cube.material.needsUpdate = true;
    });
  }

  // Update cubes' positions based on mouse proximity
  onMouseMove(event) {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

    this.cubeGroup.children.forEach(cube => {
      const distanceToMouse = cube.position.distanceTo(pos);

      // Apply distance-based falloff for smooth movement
      const falloffFactor = Math.min(
      1,
      Math.pow(
      distanceToMouse / config.proximity.range,
      config.proximity.falloff));



      // Move cubes based on proximity (with a falloff effect)
      if (distanceToMouse < config.proximity.range) {
        const displacement = cube.position.
        clone().
        sub(pos).
        normalize().
        multiplyScalar(config.proximity.strength * (1 - falloffFactor));

        // Apply smooth movement using `lerp` to blend positions
        cube.position.lerpVectors(
        cube.position,
        cube.originalPosition.clone().add(displacement),
        0.1);

      } else {
        // Smoothly return to the original position
        cube.position.lerp(cube.originalPosition, 0.1);
      }
    });
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    // Rotate the entire Rubik's cube group at the configured speed
    this.cubeGroup.rotation.y += config.object.speed * 0.01;

    // Render the scene and control
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
    this.control.update();
  }

  loop() {
    // Optimized rendering loop for smoother FPS
    requestAnimationFrame(() => {
      this.render();
      this.loop();
    });
  }}


// Initial setup for Three.js scene
const canvas = document.querySelector("canvas");
const world = new Space({ canvas });

// Initialize the GUI and pass the space object for texture update handling
setupGUI(world);

// Handle window resize
window.addEventListener("resize", () => world.resize());
window.addEventListener("load", () => world.resize());
world.resize();
