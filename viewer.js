// Real-time room viewer: loads room.glb, rebuilds the Blender lighting rig from scene.json,
// and lets the visitor drag to turn the room, with a smooth idle auto-rotation.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

// Blender watts -> three.js units, tuned by eye against the Eevee render
const K = { point: 0.11, spot: 0.11, area: 0.32, sun: 2.2, ambient: 0.10 };
// small area lights are rendered as point lights: area lights cost a lot per pixel on integrated GPUs
const AS_POINT = new Set(["Light_Neon", "Light_Screen_Glow", "Light_Shelf_Books_LED", "Light_Shelf_Top_LED", "Light_Window"]);

export async function createViewer(canvas, { onProgress } = {}) {
  RectAreaLightUniformsLib.init();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const DPR_MAX = Math.min(devicePixelRatio, 1.5), DPR_MIN = Math.min(1, DPR_MAX * 0.6);
  let dpr = DPR_MAX; renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;   // cheaper per-pixel than PCFSoft
  renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;   // lights never move: redraw shadows only when an object does

  const scene = new THREE.Scene();
  const meta = await (await fetch("assets/scene.json")).json();
  renderer.toneMappingExposure = Math.pow(2, meta.exposure || 0);
  scene.background = new THREE.Color(0x0b0f1d);

  const camMain = meta.cameras.Camera_Main;
  const camera = new THREE.PerspectiveCamera(camMain.vfov, 1, 0.25, 60);   // tight near/far keeps depth precise (no z-fighting)
  camera.position.fromArray(camMain.pos);

  // lights
  const lights = {};
  scene.add(new THREE.HemisphereLight(0x8090c0, 0x202030, K.ambient));
  for (const L of meta.lights) {
    const col = new THREE.Color().fromArray(L.color);
    const pos = new THREE.Vector3().fromArray(L.pos), dir = new THREE.Vector3().fromArray(L.dir);
    let l;
    if (L.type === "AREA" && AS_POINT.has(L.name)) {
      l = new THREE.PointLight(col, L.energy * 0.03, 0, 2); l.position.copy(pos.clone().add(dir.clone().multiplyScalar(0.12)));
    } else if (L.type === "AREA") {
      l = new THREE.RectAreaLight(col, L.energy * K.area / Math.max(0.05, L.size * L.size_y), L.size, L.size_y);
      l.position.copy(pos); l.up.fromArray(L.up); l.lookAt(pos.clone().add(dir));
    } else if (L.type === "POINT") {
      l = new THREE.PointLight(col, L.energy * K.point, 0, 2); l.position.copy(pos);
    } else if (L.type === "SPOT") {
      l = new THREE.SpotLight(col, L.energy * K.spot, 0, L.angle / 2, L.blend, 2); l.position.copy(pos);
      l.target.position.copy(pos.clone().add(dir)); scene.add(l.target);
      l.castShadow = true; l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.0005;
    } else if (L.type === "SUN") {
      l = new THREE.DirectionalLight(col, L.energy * K.sun); l.position.copy(pos.clone().sub(dir.clone().multiplyScalar(12)));
      l.target.position.copy(pos); scene.add(l.target);
      l.castShadow = true; l.shadow.mapSize.set(2048, 2048); l.shadow.bias = -0.0004; l.shadow.normalBias = 0.02;
      Object.assign(l.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 40 });
    }
    if (l) { l.name = L.name; l.userData.base = l.intensity; scene.add(l); lights[L.name] = l; }
  }

  // model
  const gltf = await new GLTFLoader().loadAsync("assets/room.glb", e => onProgress?.(e.total ? e.loaded / e.total : 0));
  const room = gltf.scene;
  room.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true; o.receiveShadow = true;
      const m = o.material;
      if (m && m.emissiveIntensity > 0 && (m.emissive.r + m.emissive.g + m.emissive.b) > 0) m.userData.baseEmissive = m.emissiveIntensity;
    }
  });
  scene.add(room);

  // turntable target: centre of the room footprint, a little above the floor
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0.1, 1.55, -0.25);
  controls.enableDamping = true; controls.dampingFactor = 0.06;
  controls.enablePan = false; controls.rotateSpeed = 0.6;
  controls.autoRotate = true; controls.autoRotateSpeed = 0.9;
  controls.minPolarAngle = 0.55; controls.maxPolarAngle = 1.25;
  controls.minDistance = 8; controls.maxDistance = 18;
  controls.update();

  // post: bloom for emissive LEDs / neon / screens
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.85);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    bloom.setSize(Math.round(w * dpr / 2), Math.round(h * dpr / 2));   // bloom is blurry anyway: half resolution is visually identical and much cheaper
    camera.aspect = w / h;
    // keep the whole diorama in view on tall screens
    camera.fov = camMain.vfov * Math.max(1, (camMain.aspect / camera.aspect) * 0.9);
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize); resize();

  const clock = new THREE.Clock(); const tickers = new Set();
  // adaptive resolution: drop the pixel ratio a step when frames run slow, raise it again when there is headroom
  let frames = 0, acc = 0, good = 0;
  function adapt(dt){
    frames++; acc += dt; if (acc < 1) return;
    const fps = frames / acc; frames = 0; acc = 0;
    if (document.hidden) return;
    if (fps < 48 && dpr > DPR_MIN) { dpr = Math.max(DPR_MIN, dpr - 0.25); good = 0; renderer.setPixelRatio(dpr); resize(); }
    else if (fps > 57 && dpr < DPR_MAX && ++good >= 3) { dpr = Math.min(DPR_MAX, dpr + 0.25); good = 0; renderer.setPixelRatio(dpr); resize(); }
  }
  // render on demand: draw only while something changes (camera, animation, auto-rotate), so an idle
  // page leaves the GPU cool and the next drag starts at full speed
  let renderUntil = performance.now() + 2000;
  const invalidate = (ms = 250) => { renderUntil = Math.max(renderUntil, performance.now() + ms); };
  controls.addEventListener("change", () => invalidate());
  addEventListener("resize", () => invalidate());
  renderer.setAnimationLoop(() => {
    const raw = clock.getDelta(), dt = Math.min(0.05, raw);
    for (const f of tickers) f(dt);
    if (controls.enabled) controls.update(dt);
    if (controls.autoRotate && controls.enabled) invalidate();
    if (performance.now() > renderUntil) { frames = 0; acc = 0; return; }
    composer.render();
    adapt(raw);
  });

  // live tuning helper (dev): scale each light family and the bloom
  function tune(k = {}) {
    for (const L of meta.lights) {
      const l = lights[L.name]; if (!l) continue;
      const small = L.type === "AREA" && AS_POINT.has(L.name);
      const f = small ? k.small : { AREA: k.area, POINT: k.point, SPOT: k.spot, SUN: k.sun }[L.type];
      if (f != null) { l.intensity = L.type === "AREA" && !small ? L.energy * f / Math.max(0.05, L.size * L.size_y) : L.energy * f; l.userData.base = l.intensity; }
    }
    if (k.bloom != null) bloom.strength = k.bloom;
    if (k.threshold != null) bloom.threshold = k.threshold;
    if (k.radius != null) bloom.radius = k.radius;
    if (k.exposure != null) renderer.toneMappingExposure = k.exposure;
    if (k.emissive != null) room.traverse(o => { const m = o.material; if (m?.userData.baseEmissive != null) m.emissiveIntensity = m.userData.baseEmissive * k.emissive; });
  }
  // values matched by eye against the Eevee render (renders/ and web_prototype/assets/room.webp)
  tune({ area: 0.06, small: 0.02, point: 0.03, spot: 0.05, sun: 1.2, bloom: 0.18, threshold: 1.1, radius: 0.2, emissive: 0.6, exposure: 0.85 });
  return { THREE, renderer, scene, camera, controls, room, lights, meta, tickers, bloom, tune,
           dirtyShadows: () => { renderer.shadowMap.needsUpdate = true; invalidate(); }, invalidate, dpr: () => dpr,
           byName: n => room.getObjectByName(n) };
}
