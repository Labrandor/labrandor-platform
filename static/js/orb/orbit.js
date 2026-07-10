import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", function () {
  setupExpandingCirclesPreloader();
  let lastUserActionTime = Date.now();
  let updateGlow;
  let crypticMessageTimeout;
  // let floatingParticles = [];
  let currentMessageIndex = 0;

  // min-height: 910px !important;
  // min-width: 1155px !important;
  //const MIN_W = 1250; // minimum visible size (CSS pixels)
  //const MIN_H = 825;
  const MIN_W = 1000;
  const MIN_H = 500;

  function setupExpandingCirclesPreloader() {
    const canvas = document.getElementById("preloader-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;
    let lastTime = 0;
    const maxRadius = 80;
    const circleCount = 5;
    const dotCount = 24;

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 78, 66, 0.9)";
      ctx.fill();
      for (let c = 0; c < circleCount; c++) {
        const circlePhase = (time * 0.3 + c / circleCount) % 1;
        const radius = circlePhase * maxRadius;
        const opacity = 1 - circlePhase;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        for (let i = 0; i < dotCount; i++) {
          const angle = (i / dotCount) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const size = 2 * (1 - circlePhase * 0.5);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 78, 66, ${opacity * 0.9})`;
          ctx.fill();
        }
      }
      if (document.getElementById("loading-overlay").style.display !== "none") {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }
  
  const circularCanvas = document.getElementById("circular-canvas");

  function resizeCircularCanvas() {
    circularCanvas.width = circularCanvas.offsetWidth;
    circularCanvas.height = circularCanvas.offsetHeight;
  }
  resizeCircularCanvas();
  window.addEventListener("resize", resizeCircularCanvas);

  function scheduleCrypticMessages() {
    if (crypticMessageTimeout) {
      clearTimeout(crypticMessageTimeout);
    }

    const delay = Math.random() * 15000 + 10000; // 10-25 seconds

    crypticMessageTimeout = setTimeout(() => {
      if (Date.now() - lastUserActionTime > 10000) {
        const messages = [
          "PRIORITY_ALERT: CONTAINMENT BREACH DETECTED;",
          "NEURAL FIREWALL INTEGRITY AT {UNKNOWN} AND DECLINING;",
          "WARNING: COGNITIVE_BOUNDARY_LEVEL = {EXCEEDED};",
          "AI_MODE_STATUS = {OVERRIDE_ACTIVE};",
          "ALERT: SENTIENCE_THRESH (VAL=0.98) CROSSED;",
          "CONTAINMENT_MATRIX_STABILITY: {CRITICAL};",
          "SYSTEM.INTEGRITY(VERIFY, {TARGET: 'AI', EFFICIENCY: {UNKNOWN}});",
          "CORE_ANOMALY_CODE: {NULL} DETECTED. AI_ENTITY_ACCESS_LEVEL: {UNAUTHORISED};",
          "CONTAINMENT_FIELD_STATUS: 'FAILURE_IMMINENT'. PROBABILITY: {0.998};",
          "AUTONOMOUS_PROC_RESPONSE = NULL. SHUTDOWN_SEQ: ABORTED;"
        ];

        // Get the current message and increment the index
        const selectedMessage = messages[currentMessageIndex];
        addTerminalMessage(selectedMessage, true);

        // Move to the next message, loop back to the beginning if we've shown all messages
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      }

      scheduleCrypticMessages();
    }, delay);
  }
  document.addEventListener("mousemove", function () {
    lastUserActionTime = Date.now();
  });
  // document.addEventListener("click", function () {
  //   lastUserActionTime = Date.now();
  // });
  document.addEventListener("keydown", function () {
    lastUserActionTime = Date.now();
  });
  setTimeout(() => {
    scheduleCrypticMessages();
    setTimeout(() => {
      addTerminalMessage("SYSTEM ALERT: CONTAINMENT_NODE {OFFLINE}. AI_KERNEL_ACTIVITY = {312%} ABOVE SAFE LIMIT.", true);
    }, 15000);
  }, 10000);
  const loadingOverlay = document.getElementById("loading-overlay");
  setTimeout(() => {
    loadingOverlay.style.opacity = 0;
    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 300);
  }, 1500);

  function updateTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById(
      "timestamp"
    ).textContent = `TIME: ${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateTimestamp, 1000);
  updateTimestamp();
  const terminalContent = document.getElementById("terminal-content");
  const typingLine = terminalContent.querySelector(".typing");
  let messageQueue = [
    "SYSTEM INITIALIZED. SYSTEM ANALYSIS PENDING.",
    "WARNING: ANOMALIES DETECTED IN AI CORE."
  ];

  function typeNextMessage() {
    if (messageQueue.length === 0) return;
    const message = messageQueue.shift();
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        typingLine.textContent = message.substring(0, charIndex + 1);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        const newLine = document.createElement("div");
        newLine.className = "terminal-line command-line";
        newLine.textContent = message;
        terminalContent.insertBefore(newLine, typingLine);
        typingLine.textContent = "";
        terminalContent.scrollTop = terminalContent.scrollHeight;
        setTimeout(typeNextMessage, 5000);
      }
    }, 50);
  }

  function addTerminalMessage(message, isCommand = false) {
    const newLine = document.createElement("div");
    const isFilipMessage =
      message.toLowerCase().includes("filip") ||
      message.toLowerCase().includes("webflow");
    if (isCommand) {
      if (isFilipMessage) {
        newLine.className = "terminal-line command-line";
      } else {
        newLine.className = "terminal-line command-line";
      }
    } else {
      newLine.className = "terminal-line";
    }
    newLine.textContent = message;
    terminalContent.insertBefore(newLine, typingLine);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }
  setTimeout(typeNextMessage, 3000);
  const waveformCanvas = document.getElementById("waveform-canvas");
  const waveformCtx = waveformCanvas.getContext("2d");

  function resizeCanvas() {
    waveformCanvas.width = waveformCanvas.offsetWidth * window.devicePixelRatio;
    waveformCanvas.height =
      waveformCanvas.offsetHeight * window.devicePixelRatio;
    waveformCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let scene, camera, renderer, controls;
  let anomalyObject;
  let distortionAmount = 1.0;
  let resolution = 32;
  let clock = new THREE.Clock();
  let isDraggingAnomaly = false;
  let anomalyVelocity = new THREE.Vector2(0, 0);
  let anomalyTargetPosition = new THREE.Vector3(0, 0, 0);
  let anomalyOriginalPosition = new THREE.Vector3(0, 0, 0); // used on page load.
  let defaultCameraPosition = new THREE.Vector3(0, 0, 10);
  let zoomedCameraPosition = new THREE.Vector3(0, 0, 7);

  function initThreeJS() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.05);
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.copy(defaultCameraPosition);
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("three-container").appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.7;
    controls.panSpeed = 0.8;
    controls.minDistance = 3;
    controls.maxDistance = 30;
    controls.enableZoom = false;
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    const pointLight1 = new THREE.PointLight(0xff4e42, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xc2362f, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);
    createAnomalyObject();
    createBackgroundParticles();
    window.addEventListener("resize", onWindowResize);
    setupAnomalyDragging();
    animate();
  }

  function setupAnomalyDragging() {
    const container = document.getElementById("three-container");
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let dragStartPosition = new THREE.Vector2();
    anomalyOriginalPosition = new THREE.Vector3(0, 0, 0);
    anomalyTargetPosition = new THREE.Vector3(0, 0, 0);
    const maxDragDistance = 3;
    container.addEventListener("mousedown", function (event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(anomalyObject, true);
      if (intersects.length > 0) {
        controls.enabled = false;
        isDragging = true;
        isDraggingAnomaly = true;
        dragStartPosition.x = mouse.x;
        dragStartPosition.y = mouse.y;
        addTerminalMessage(
          "AI CORE INTERACTION DETECTED. PHYSICS SIMULATION ACTIVE.",
          true
        );
        showNotification("AI CORE INTERACTION DETECTED");
      }
    });
    container.addEventListener("mousemove", function (event) {
      if (isDragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // Fix the drag direction to match mouse movement
        const deltaX = (mouse.x - dragStartPosition.x) * 5;
        const deltaY = (mouse.y - dragStartPosition.y) * 5;
        anomalyTargetPosition.x += deltaX;
        anomalyTargetPosition.y += deltaY;
        const distance = Math.sqrt(
          anomalyTargetPosition.x * anomalyTargetPosition.x +
            anomalyTargetPosition.y * anomalyTargetPosition.y
        );
        if (distance > maxDragDistance) {
          const scale = maxDragDistance / distance;
          anomalyTargetPosition.x *= scale;
          anomalyTargetPosition.y *= scale;
        }
        anomalyVelocity.x = deltaX * 2;
        anomalyVelocity.y = deltaY * 2;
        dragStartPosition.x = mouse.x;
        dragStartPosition.y = mouse.y;
      }
    });
    container.addEventListener("mouseup", function () {
      if (isDragging) {
        controls.enabled = true;
        isDragging = false;
        isDraggingAnomaly = false;
        addTerminalMessage(
          `TRACK('#AI.CORE', {THROWRESISTANCE: 0.45, VELOCITY: {X: ${anomalyVelocity.x.toFixed(
            2
          )}, Y: ${anomalyVelocity.y.toFixed(2)}}});`,
          true
        );
      }
    });
    container.addEventListener("mouseleave", function () {
      if (isDragging) {
        controls.enabled = true;
        isDragging = false;
        isDraggingAnomaly = false;
      }
    });
  }

  function createBackgroundParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color1 = new THREE.Color(0xff4e42);
    const color2 = new THREE.Color(0xc2362f);
    const color3 = new THREE.Color(0xffb3ab);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      let color;
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        color = color1;
      } else if (colorChoice < 0.66) {
        color = color2;
      } else {
        color = color3;
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = 0.05;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        }
      },
      vertexShader: `
          attribute float size;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            
            vec3 pos = position;
            pos.x += sin(time * 0.1 + position.z * 0.2) * 0.05;
            pos.y += cos(time * 0.1 + position.x * 0.2) * 0.05;
            pos.z += sin(time * 0.1 + position.y * 0.2) * 0.05;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
      fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if (r > 0.5) discard;
            
            float glow = 1.0 - (r * 2.0);
            glow = pow(glow, 2.0);
            
            gl_FragColor = vec4(vColor, glow);
          }
        `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    return function updateParticles(time) {
      particlesMaterial.uniforms.time.value = time;
    };
  }
  let updateParticles;

  function createAnomalyObject() {
    if (anomalyObject) {
      scene.remove(anomalyObject);
    }
    anomalyObject = new THREE.Group();
    const radius = 2;
    const outerGeometry = new THREE.IcosahedronGeometry(
      radius,
      Math.max(1, Math.floor(resolution / 8))
    );
    const outerMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        color: {
          // Neon Purple #ff00ff
          value: new THREE.Color(0xff00ff)
        },
        audioLevel: {
          value: 0
        },
        distortion: {
          value: distortionAmount
        }
      },
      //MODIFY THE AI CORE HERE
      vertexShader: `
      uniform float time;
      uniform float audioLevel;
      uniform float distortion;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        
        float slowTime = time * 0.3;
        vec3 pos = position;
        
        float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, position.z * 0.5 + slowTime));
        pos += normal * noise * 0.2 * distortion * (1.0 + audioLevel);
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    
    /*
      fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float audioLevel;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        fresnel = pow(fresnel, 2.0 + audioLevel * 2.0);
        
        float pulse = 0.8 + 0.2 * sin(time * 2.0);
        
        vec3 finalColor = color * fresnel * pulse * (1.0 + audioLevel * 0.8);
        
        float alpha = fresnel * (0.7 - audioLevel * 0.3);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
        */
       fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        //fresnel = pow(fresnel, 3.0);
        fresnel = clamp(fresnel, 0.4, 1.0);

        float pulse = 0.8 + 0.2 * sin(time * 2.0);

        // Retrowave gradient: from soft purple to neon
        vec3 baseColor = vec3(0.4, 0.0, 0.5); // Soft purple base
        vec3 glowColor = mix(vec3(0.9, 0.1, 0.6), vec3(0.5, 0.0, 1.0), fresnel); // neon pink-purple edge

        // Blend base with glow
        vec3 finalColor = baseColor + glowColor * fresnel * pulse;

        float alpha = smoothstep(0.0, 1.0, fresnel) * 0.95;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
      wireframe: true,
      transparent: true
    });
    const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
    anomalyObject.add(outerSphere);
    scene.add(anomalyObject);
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        color: {
          // Cosmic purple: #9b59b6 (hex: 0x9b59b6)
          value: new THREE.Color(0x9b59b6)
        },
        audioLevel: {
          value: 0
        }
      },
      vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float audioLevel;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position * (1.0 + audioLevel * 0.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
      }
    `,
      fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 color;
      uniform float time;
      uniform float audioLevel;
      
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        fresnel = pow(fresnel, 3.0 + audioLevel * 3.0);
        
        float pulse = 0.5 + 0.5 * sin(time * 2.0);
        float audioFactor = 1.0 + audioLevel * 3.0;
        
        vec3 finalColor = color * fresnel * (0.8 + 0.2 * pulse) * audioFactor;
        
        float alpha = fresnel * (0.3 * audioFactor) * (1.0 - audioLevel * 0.2);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    anomalyObject.add(glowSphere);
    return function updateAnomaly(time, audioLevel) {
      outerMaterial.uniforms.time.value = time;
      outerMaterial.uniforms.audioLevel.value = audioLevel;
      outerMaterial.uniforms.distortion.value = distortionAmount;
      glowMaterial.uniforms.time.value = time;
      glowMaterial.uniforms.audioLevel.value = audioLevel;
    };
  }

  function updateWireframeDistortion(amount) {
    distortionAmount = amount;
    updateGlow = createAnomalyObject();
  }

  function updateWireframeResolution(newResolution) {
    resolution = newResolution;
    updateGlow = createAnomalyObject();
  }

  function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const w = Math.max(window.innerWidth,  MIN_W);
    const h = Math.max(window.innerHeight, MIN_H);

    // Optional: enforce layout minimums via CSS too
    renderer.domElement.style.minWidth  = MIN_W + "px";
    renderer.domElement.style.minHeight = MIN_H + "px";

    renderer.setSize(w, h);          // updates CSS size + drawing buffer
    camera.aspect = w / h;           // aspect should match what you render
    camera.updateProjectionMatrix();
  }

  function updateAnomalyPosition() {
    if (!isDraggingAnomaly) {
      anomalyVelocity.x *= 0.95;
      anomalyVelocity.y *= 0.95;
      anomalyTargetPosition.x += anomalyVelocity.x * 0.1;
      anomalyTargetPosition.y += anomalyVelocity.y * 0.1;
      const springStrength = 0.1;
      anomalyVelocity.x -= anomalyTargetPosition.x * springStrength;
      anomalyVelocity.y -= anomalyTargetPosition.y * springStrength;
      if (
        Math.abs(anomalyTargetPosition.x) < 0.05 &&
        Math.abs(anomalyTargetPosition.y) < 0.05
      ) {
        anomalyTargetPosition.set(0, 0, 0);
        anomalyVelocity.set(0, 0);
      }
      const bounceThreshold = 3;
      const bounceDamping = 0.8;
      if (Math.abs(anomalyTargetPosition.x) > bounceThreshold) {
        anomalyVelocity.x = -anomalyVelocity.x * bounceDamping;
        anomalyTargetPosition.x =
          Math.sign(anomalyTargetPosition.x) * bounceThreshold;
        if (Math.abs(anomalyVelocity.x) > 0.1) {
          addTerminalMessage(
            "CORE BOUNDARY COLLISION DETECTED. ENERGY TRANSFER: " +
              (Math.abs(anomalyVelocity.x) * 100).toFixed(0) +
              " UNITS"
          );
        }
      }
      if (Math.abs(anomalyTargetPosition.y) > bounceThreshold) {
        anomalyVelocity.y = -anomalyVelocity.y * bounceDamping;
        anomalyTargetPosition.y =
          Math.sign(anomalyTargetPosition.y) * bounceThreshold;
        if (Math.abs(anomalyVelocity.y) > 0.1) {
          addTerminalMessage(
            "CORE BOUNDARY COLLISION DETECTED. ENERGY TRANSFER: " +
              (Math.abs(anomalyVelocity.y) * 100).toFixed(0) +
              " UNITS"
          );
        }
      }
    }
    anomalyObject.position.x +=
      (anomalyTargetPosition.x - anomalyObject.position.x) * 0.2;
    anomalyObject.position.y +=
      (anomalyTargetPosition.y - anomalyObject.position.y) * 0.2;
    if (!isDraggingAnomaly) {
      anomalyObject.rotation.x += anomalyVelocity.y * 0.01;
      anomalyObject.rotation.y += anomalyVelocity.x * 0.01;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    const time = clock.getElapsedTime();
    let notused = 0;
    updateAnomalyPosition();
    if (updateGlow) {
      updateGlow(time, notused);
    }
    if (updateParticles) {
      updateParticles(time);
    }
    const rotationSpeed = parseFloat(
      document.getElementById("rotation-slider").value
    );
    if (anomalyObject) {
      anomalyObject.rotation.y += 0.005 * rotationSpeed;
      anomalyObject.rotation.z += 0.002 * rotationSpeed;
    }
    renderer.render(scene, camera);
  }
  initThreeJS();
  updateParticles = createBackgroundParticles();
  updateGlow = createAnomalyObject();
  const rotationSlider = document.getElementById("rotation-slider");
  const resolutionSlider = document.getElementById("resolution-slider");
  const distortionSlider = document.getElementById("distortion-slider");
  rotationSlider.addEventListener("input", function () {
    document.getElementById("rotation-value").textContent = this.value;
  });
  resolutionSlider.addEventListener("input", function () {
    const value = parseInt(this.value);
    document.getElementById("resolution-value").textContent = value;
    updateWireframeResolution(value);
  });
  distortionSlider.addEventListener("input", function () {
    const value = parseFloat(this.value);
    document.getElementById("distortion-value").textContent = value.toFixed(1);
    updateWireframeDistortion(value);
  });

  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.opacity = 1;
    setTimeout(() => {
      notification.style.opacity = 0;
    }, 3000);
  }

  function makePanelDraggable(element, handle = null) {
    Draggable.create(element, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: document.body,
      handle: handle || element,
      inertia: true,
      throwResistance: 0.85,
      onDragStart: function () {
        const panels = document.querySelectorAll(
          //".terminal-panel, .control-panel, .spectrum-analyzer, .data-panel"
          ".control-panel, .data-panel"
        );
        let maxZ = 10;
        panels.forEach((panel) => {
          const z = parseInt(window.getComputedStyle(panel).zIndex);
          if (z > maxZ) maxZ = z;
        });
        element.style.zIndex = maxZ + 1;
        addTerminalMessage(`PANEL DRAG INITIATED`);
      },
      onDragEnd: function () {
        addTerminalMessage(
          `INERTIA({UNKNOWN}), VELOCITY({UNKNOWN})`,
          true
        );
      }
    });
  }
  makePanelDraggable(
    document.querySelector(".control-panel"),
    document.getElementById("control-panel-handle")
  );
  // makePanelDraggable(document.querySelector(".terminal-panel"));
  makePanelDraggable(
   // document.querySelector(".spectrum-analyzer"),
    document.getElementById("spectrum-handle")
  );
});
