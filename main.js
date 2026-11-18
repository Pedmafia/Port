// Portfolio site: real-time 3D room (viewer.js) + HTML drawer for the content.
// Content lives in content_th.js / content_en.js / content_ja.js (classic scripts loaded first).
import * as THREE from "three";
import { createViewer } from "./viewer.js";
import { KPI_GROUPS, pad, projectHTML as projectOf, kpiHTML as kpiOf } from "./summary.js";

const $ = s => document.querySelector(s);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = { get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }, set(k,v){ try { localStorage.setItem(k,v); } catch(e){} },
                sget(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } }, sset(k,v){ try { sessionStorage.setItem(k,v); } catch(e){} } };

// ---------------------------------------------------------------- content + i18n
const CONTENT = {
  en: { P: P_EN, ABOUT: ABOUT_EN, CONTACT: CONTACT_EN, KPI: KPI_EN },
  th: { P: P_TH, ABOUT: ABOUT_TH, CONTACT: CONTACT_TH, KPI: KPI_TH },
  ja: { P: P_JA, ABOUT: ABOUT_JA, CONTACT: CONTACT_JA, KPI: KPI_JA }
};
const LANGS = ["en", "th", "ja"];
const LANG_NAME = { en: "English", th: "ภาษาไทย", ja: "日本語" };
const UI = {
  en: { back: "← Back to room", about: "About", contact: "Contact", kpi: "KPI",
        hint: { room: "Drag to turn the room · click a sign, the shelf, the photo, the card, the globe or the clock",
                shelf: "Click a building, or pick a project below", about: "", contact: "", keypad: "Enter the 4-digit code, then press OK",
                locked: "Click the house to enter the code" },
        unlock: "The closed house — click to enter the access code",
        wrong: "Wrong code — try again", welcome: "Welcome in",
        prev: "Previous project", next: "Next project", close: "Close", soon: "soon", inProgress: "● In progress",
        copy: "Copy", copied: "Copied ✓", toast: "Switched to English", screen: "CODE",
        signs: { my_work: "My work", about: "About", contact: "Contact" }, nextYear: "Next year", toDay: "Switch to day", toNight: "Switch to night" },
  th: { back: "← กลับไปที่ห้อง", about: "About", contact: "Contact", kpi: "KPI",
        hint: { room: "ลากเพื่อหมุนห้อง · คลิกป้าย ชั้นอาคาร กรอบรูป นามบัตร ลูกโลก หรือนาฬิกา",
                shelf: "คลิกอาคาร หรือเลือกโครงการด้านล่าง", about: "", contact: "", keypad: "ใส่รหัส 4 หลัก แล้วกด OK",
                locked: "คลิกที่บ้านเพื่อใส่รหัส" },
        unlock: "บ้านที่ปิดอยู่ — คลิกเพื่อใส่รหัสเข้าชม",
        wrong: "รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง", welcome: "ยินดีต้อนรับ",
        prev: "โครงการก่อนหน้า", next: "โครงการถัดไป", close: "ปิด", soon: "soon", inProgress: "● In progress",
        copy: "คัดลอก", copied: "คัดลอกแล้ว ✓", toast: "เปลี่ยนเป็นภาษาไทยแล้ว", screen: "CODE",
        signs: { my_work: "My work", about: "About", contact: "Contact" }, nextYear: "ปีหน้า", toDay: "เปลี่ยนเป็นกลางวัน", toNight: "เปลี่ยนเป็นกลางคืน" },
  ja: { back: "← ルームに戻る", about: "About", contact: "Contact", kpi: "KPI",
        hint: { room: "ドラッグで回転 · 看板・棚・写真・名刺・地球儀・時計をクリック",
                shelf: "建物をクリックするか、下のリストからプロジェクトを選んでください", about: "", contact: "", keypad: "4桁のコードを入力し、OKを押してください",
                locked: "家をクリックしてコードを入力してください" },
        unlock: "閉じた家 — クリックしてアクセスコードを入力",
        wrong: "コードが違います。もう一度お試しください", welcome: "ようこそ",
        prev: "前のプロジェクト", next: "次のプロジェクト", close: "閉じる", soon: "準備中", inProgress: "● 進行中",
        copy: "コピー", copied: "コピーしました ✓", toast: "日本語に切り替えました", screen: "CODE",
        signs: { my_work: "My work", about: "About", contact: "Contact" }, nextYear: "来年", toDay: "昼モードに切り替え", toNight: "夜モードに切り替え" }
};
let LANG = LANGS.includes(store.get("lang")) ? store.get("lang") : "en";
let MODE = ["review", "portfolio"].includes(store.sget("mode")) ? store.sget("mode") : null;   // null = locked
if (new URLSearchParams(location.search).has("lock")) { MODE = null; store.sset("mode", ""); }
const t = () => UI[LANG];
const C = () => CONTENT[LANG];

// ---------------------------------------------------------------- 3D
const V = await createViewer($("#c"), { onProgress: p => { $("#loadbar i").style.width = `${Math.round(p * 100)}%`; } });
$("#loader").classList.add("done");
const { camera, controls, room, lights, meta } = V;
const N = n => room.getObjectByName(n);

// tweening
const ease = { inOut: x => x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2, out: x => 1 - Math.pow(1 - x, 3),
               backOut: x => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2) };
function tween(ms, fn, e = ease.inOut){
  return new Promise(res => {
    if (REDUCED || ms <= 0) { fn(1); return res(); }
    // wall-clock based, so a slow frame never stretches the animation
    const start = performance.now();
    const f = () => { const p = Math.min(1, (performance.now() - start) / ms); fn(e(p), p); V.dirtyShadows(); if (p >= 1) { V.tickers.delete(f); res(); } };
    V.tickers.add(f);
  });
}
const wait = ms => new Promise(r => setTimeout(r, REDUCED ? 0 : ms));

// pickable meshes
const picks = [];
room.traverse(o => { if (o.isMesh && o.userData.interactive) picks.push(o); });
const kind = o => o.userData.interactive;

// ---- animated parts
const hinge = { my_work: N("Sign_MyWork_Hinge"), about: N("Sign_About_Hinge"), contact: N("Sign_Contact_Hinge") };
const arm = N("Signpost_Signs_Root"); const ARM_BASE = arm.rotation.y, ARM_X = arm.position.x;
const globe = N("Globe_Sphere"); let globeVel = 0;
const buildings = [...Array(7)].map((_, i) => { const ms = picks.filter(o => kind(o) === `project_0${i + 1}`); return { ms, y0: ms.map(m => m.position.y), lift: 0, target: 0, hop: 0 }; });
const cardStack = N("CardBox_Stack"); const CARD_Y = cardStack.position.y;

// picture frame pivots on its nail: re-parent the frame parts under a pivot at the top centre
const framePivot = new THREE.Object3D();
{
  const parts = picks.filter(o => o.name.startsWith("Picture_"));
  const box = new THREE.Box3(); parts.forEach(p => box.expandByObject(p));
  const c = box.getCenter(new THREE.Vector3());
  framePivot.position.set(c.x, box.max.y - 0.02, c.z);
  parts[0].parent.parent.add(framePivot); framePivot.updateMatrixWorld();
  parts.forEach(p => framePivot.attach(p));
}

// damped swings, hops and the globe spin run every frame
const swings = new Set();
function swing(obj, axis, amp, freq = 9, decay = 3.2, ms = 1500){
  if (!obj || REDUCED) return;
  const base = obj.userData.swingBase ?? (obj.userData.swingBase = obj.rotation[axis]);
  const s = { obj, axis, amp, freq, decay, ms, el: 0, base }; swings.add(s);
}
V.tickers.add(dt => {
  for (const s of swings) {
    s.el += dt * 1000; const tt = s.el / 1000;
    s.obj.rotation[s.axis] = s.base + s.amp * Math.exp(-s.decay * tt) * Math.sin(s.freq * tt);
    if (s.el >= s.ms) { s.obj.rotation[s.axis] = s.base; swings.delete(s); }
  }
  for (const b of buildings) {
    b.lift += (b.target - b.lift) * Math.min(1, dt * 12);
    if (b.hop > 0) b.hop = Math.max(0, b.hop - dt);
    const hopY = b.hop > 0 ? 0.07 * Math.abs(Math.sin((0.6 - b.hop) * 9)) * Math.exp(-(0.6 - b.hop) * 4) : 0;
    b.ms.forEach((m, k) => { m.position.y = b.y0[k] + b.lift + hopY; });
  }
  if (globeVel > 0.01) { globe.rotation.y += globeVel * dt; globeVel *= Math.exp(-1.6 * dt); }
  // shadows are only re-rendered while something actually moves
  if (swings.size || globeVel > 0.01 || buildings.some(b => b.hop > 0 || Math.abs(b.target - b.lift) > 1e-4)) V.dirtyShadows();
});
const hop = i => { const b = buildings[i]; if (b && !REDUCED) b.hop = 0.6; };
const spinGlobe = () => { globeVel += 14; };
const cardUp = () => tween(650, e => { cardStack.position.y = CARD_Y + 0.07 * e; }, ease.backOut);
const cardDown = () => { if (cardStack.position.y !== CARD_Y) tween(400, e => { cardStack.position.y = CARD_Y + 0.07 * (1 - e); }); };
// KPI clipboard on the desk (review mode only): it lifts and tips towards the visitor when clicked
const clip = N("Clipboard_Root"); const CLIP_Y = clip.position.y, CLIP_RX = clip.rotation.x;
let clipK = 0;
const clipSet = k => { clipK = k; clip.position.y = CLIP_Y + 0.035 * k; clip.rotation.x = CLIP_RX + 0.12 * k; };
const clipUp = () => tween(600, e => clipSet(e), ease.backOut);
const clipDown = () => { if (clipK) { const k0 = clipK; tween(400, e => clipSet(k0 * (1 - e))); } };

// ---- camera views
const VIEWS = { shelf: "Camera_MyWork", about: "Camera_About", contact: "Camera_Contact", keypad: "Camera_Keypad", kpi: "Camera_KPI" };
let view = "room", roomPose = null, flying = false;
const pose = name => { const c = meta.cameras[name]; return { pos: new THREE.Vector3().fromArray(c.pos), target: new THREE.Vector3().fromArray(c.target), vfov: c.vfov, aspect: c.aspect }; };
const fovFor = p => { // keep at least the horizontal field the Blender camera had
  const hf = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(p.vfov) / 2) * p.aspect);
  return Math.max(p.vfov, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hf / 2) / camera.aspect)));
};
async function flyTo(p, ms = 1200){
  flying = true; controls.enabled = false; controls.autoRotate = false;
  const p0 = camera.position.clone(), t0 = controls.target.clone(), f0 = camera.fov, f1 = p.fov ?? fovFor(p);
  await tween(ms, e => {
    camera.position.lerpVectors(p0, p.pos, e); controls.target.lerpVectors(t0, p.target, e);
    camera.fov = f0 + (f1 - f0) * e; camera.updateProjectionMatrix(); camera.lookAt(controls.target);
  });
  flying = false;
}
// the business card is framed from its real size, centred in the part of the screen the drawer leaves free
function contactPose(){
  const p = pose(VIEWS.contact);
  const box = new THREE.Box3(); room.traverse(o => { if (o.isMesh && /^CardBox_Face_/.test(o.name)) box.expandByObject(o); });
  const c = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
  c.y += CARD_Y + 0.07 - cardStack.position.y;                  // where the card ends up once it has slid out
  const dir = p.pos.clone().sub(p.target).normalize();
  const fov = fovFor(p), tv = Math.tan(THREE.MathUtils.degToRad(fov) / 2), th = tv * camera.aspect;
  const free = innerWidth >= 1000 ? Math.max(0.3, 1 - document.querySelector("#drawer").offsetWidth / innerWidth) : 1;
  const w = Math.hypot(size.x, size.z), h = size.y;                 // the card stands at an angle: its true width
  const dist = Math.max(h / 0.45 / 2 / tv, w / (0.5 * free) / 2 / th);
  return { pos: c.clone().add(dir.multiplyScalar(dist)), target: c, fov };
}
// frame a box from a Blender camera's direction: every corner fits inside the given share of the free screen
function fitPose(camName, box, fillW, fillH){
  const p = pose(camName), c = box.getCenter(new THREE.Vector3());
  const dir = p.pos.clone().sub(p.target).normalize();
  const right = new THREE.Vector3().crossVectors(dir.clone().negate(), new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, dir.clone().negate()).normalize();
  const fov = fovFor(p), tv = Math.tan(THREE.MathUtils.degToRad(fov) / 2), th = tv * camera.aspect;
  const free = innerWidth >= 1000 ? Math.max(0.3, 1 - drawer.offsetWidth / innerWidth) : 1;
  let dist = 0;
  for (let i = 0; i < 8; i++) {
    const d = new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).sub(c);
    const t = d.dot(dir);
    dist = Math.max(dist, t + Math.abs(d.dot(right)) / (fillW * free * th), t + Math.abs(d.dot(up)) / (fillH * tv));
  }
  return { pos: c.clone().add(dir.multiplyScalar(dist)), target: c, fov };
}
function kpiPose(){
  const box = new THREE.Box3().setFromObject(N("Clipboard_Board"));
  box.translate(new THREE.Vector3(0, CLIP_Y + 0.035 - clip.position.y, 0));      // where it ends up once lifted
  return fitPose(VIEWS.kpi, box, 0.62, 0.78);
}
async function goView(v){
  if (v === view) return;
  if (view === "room") roomPose = { pos: camera.position.clone(), target: controls.target.clone(), fov: camera.fov };
  view = v; document.body.dataset.view = v; hint();
  if (v === "room") {
    closeDrawer(); cardDown(); clipDown();
    await flyTo(roomPose || { ...pose("Camera_Main"), target: controls.target.clone() });
    controls.enabled = true; controls.autoRotate = !MODE;   // the room only turns by itself while locked
  } else {
    await flyTo(v === "contact" ? contactPose() : v === "kpi" ? kpiPose() : pose(VIEWS[v]));
  }
}

// drawer pushes the 3D view left on wide screens
let offset = 0;
function setOffset(target){
  const from = offset;
  tween(450, e => { offset = from + (target - from) * e; applyOffset(); });
}
function applyOffset(){
  const w = innerWidth, h = innerHeight;
  if (Math.abs(offset) < 0.5) camera.clearViewOffset(); else camera.setViewOffset(w, h, offset, 0, w, h);
  camera.updateProjectionMatrix();
}
addEventListener("resize", applyOffset);

// ---------------------------------------------------------------- picking
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
let hoverObj = null, down = null;
const canvas = $("#c"), tip = $("#tip");
function allowed(o){
  const k = kind(o);
  if (!MODE) return k === "gate";                       // locked: only the closed house
  if (k === "gate") return false;
  if (k === "kpi" && MODE !== "review") return false;
  if (view === "shelf") return k.startsWith("project_");
  if (view === "room") return true;
  return false;
}
const shown = o => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; };
function pick(e){
  const r = canvas.getBoundingClientRect();
  ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  // the nearest visible surface wins, so walls and furniture block what is behind them
  const hit = ray.intersectObject(room, true).find(h => h.object.isMesh && shown(h.object) && h.object.name !== "Gate_LCD");
  return hit && hit.object.userData.interactive && allowed(hit.object) ? hit.object : null;
}
function label(o){
  const k = kind(o);
  if (k.startsWith("project_")) { const p = C().P[+k.slice(-2) - 1]; return `${k.slice(-2)} ${p.title}`; }
  if (k === "daynight") return DAY ? t().toNight : t().toDay;
  if (k === "kpi") return C().KPI.title;
  if (k === "language") return LANG_NAME[LANGS[(LANGS.indexOf(LANG) + 1) % 3]];
  if (k === "gate") return view === "keypad" ? (o.userData.key || "") : t().hint.locked;
  return t().signs[k] || (k === "about" ? "About" : k === "contact" ? "Contact" : "");
}
canvas.addEventListener("pointermove", e => {
  if (flying) return;
  const o = pick(e);
  if (o !== hoverObj) {
    if (hoverObj) { const k = kind(hoverObj); if (k.startsWith("project_")) buildings[+k.slice(-2) - 1].target = 0; }
    hoverObj = o;
    if (o) { const k = kind(o); if (k.startsWith("project_")) buildings[+k.slice(-2) - 1].target = view === "shelf" ? 0.03 : 0.04; }
  }
  canvas.style.cursor = o ? "pointer" : (view === "room" ? "grab" : "default");
  if (o && !(view === "keypad")) { tip.textContent = label(o); tip.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`; tip.classList.add("on"); }
  else tip.classList.remove("on");
});
canvas.addEventListener("pointerleave", () => tip.classList.remove("on"));
canvas.addEventListener("pointerdown", e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
canvas.addEventListener("pointerup", e => {
  if (!down || flying) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t; down = null;
  if (moved > 6 || dt > 600) return;
  const o = pick(e); if (o) activate(o);
});

async function activate(o){
  const k = kind(o);
  tip.classList.remove("on");
  if (k === "gate") return gateClick(o);
  if (k === "kpi") { if (MODE !== "review") return; clipUp(); await wait(420); await goView("kpi"); return showPage("kpi"); }
  if (k === "daynight") { swing(clockRoot, "z", 0.12, 10, 3.5, 1200); return setDay(!DAY); }
  if (k === "language") { spinGlobe(); return setLang(LANGS[(LANGS.indexOf(LANG) + 1) % 3]); }
  if (k.startsWith("project_")) {
    const i = +k.slice(-2) - 1; hop(i);
    if (view === "room") { await wait(300); await goView("shelf"); hop(i); await wait(250); }
    else await wait(250);
    return openProject(i);
  }
  if (k === "my_work") { swing(hinge.my_work, "y", 0.16); await wait(320); return goView("shelf"); }
  if (k === "about") {
    if (o.name.startsWith("Sign_")) swing(hinge.about, "y", 0.16);
    swing(framePivot, "z", 0.07, 8, 3);
    await wait(380); await goView("about"); return showPage("about");
  }
  if (k === "contact") {
    if (o.name.startsWith("Sign_")) swing(hinge.contact, "y", 0.16);
    cardUp(); await wait(560); await goView("contact"); return showPage("contact");
  }
}

// ---------------------------------------------------------------- drawer
const drawer = $("#drawer"), dbody = $("#dbody");
let cur = 0, curPage = null;
const projectHTML = i => projectOf(C(), i, t());
function openDrawer(){ document.body.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); setOffset(innerWidth >= 1000 ? Math.min(380, drawer.offsetWidth / 2) : 0); }
function closeDrawer(){ document.body.classList.remove("open", "page"); drawer.setAttribute("aria-hidden", "true"); setOffset(0); }
function openProject(i, keep){
  curPage = null; cur = (i + 7) % 7; document.body.classList.remove("page");
  $("#pos").textContent = `${pad(cur)} / 07`;
  const y = drawer.scrollTop; dbody.innerHTML = projectHTML(cur); drawer.scrollTop = keep ? y : 0;
  openDrawer();
}
function showPage(name, keep){
  curPage = name; document.body.classList.add("page");
  const y = drawer.scrollTop;
  if (name === "kpi" && MODE !== "review") return;           // the KPI page belongs to the review (1150) mode only
  dbody.innerHTML = name === "kpi" ? kpiHTML() : name === "about" ? C().ABOUT
    : MODE === "review" ? C().CONTACT.replaceAll(EMAIL, WORK_EMAIL) : C().CONTACT;   // the organisation sees the work email
  drawer.scrollTop = keep ? y : 0; openDrawer();
}
$("#prev").onclick = () => openProject(cur - 1); $("#next").onclick = () => openProject(cur + 1);
$("#close").onclick = () => closeDrawer();
$("#scrim").onclick = () => closeDrawer();

// ---------------------------------------------------------------- project list (shelf view)
function listHTML(){
  const P = C().P;
  const chip = i => `<button data-i="${i}"><span class="n">${pad(i)}</span>${P[i].title}${P[i].soon ? ` <em>${P[i].id === "bdms" ? t().nextYear : t().soon}</em>` : ""}</button>`;
  if (MODE === "review") {
    return KPI_GROUPS.map(g => `<div class="grp">${g.items.map(chip).join("")}</div>`).join("");
  }
  return `<div class="grp">${P.map((_, i) => chip(i)).join("")}</div>`;
}

// ---------------------------------------------------------------- KPI page
// the summary PDF is generated ahead of time from summary.html (tools/make_summary_pdf.js), one per language
const kpiHTML = () => kpiOf(C(), { button: `<div class="btns"><a class="btn" href="assets/KPI_Summary_${LANG}.pdf" download="Supawit_Prommas_KPI_Summary_${LANG.toUpperCase()}.pdf">${IC.doc} ${C().KPI.print}</a></div>` });

// ---------------------------------------------------------------- language + mode
function hint(){
  const key = !MODE ? (view === "keypad" ? "keypad" : "locked") : view;
  $("#hint").textContent = t().hint[key] || ""; $("#hint").classList.toggle("off", !$("#hint").textContent);
}
const sheet = document.createElement("canvas"); sheet.width = 1024; sheet.height = 1448;
const sheetTex = new THREE.CanvasTexture(sheet); sheetTex.colorSpace = THREE.SRGBColorSpace; sheetTex.flipY = false; sheetTex.anisotropy = 8;
{
  const m = N("Clipboard_Paper").material;
  m.map = sheetTex; m.color.set(0xffffff); m.emissive.set(0xffffff); m.emissiveMap = sheetTex; m.emissiveIntensity = 0.12; m.needsUpdate = true;
}
function drawSheet(){
  const g = sheet.getContext("2d"), K = C().KPI, P = C().P, W = 1024;
  const sans = LANG === "ja" ? '"Noto Sans JP"' : LANG === "th" ? '"IBM Plex Sans Thai"' : '"Rubik"';
  g.fillStyle = "#f6f3ec"; g.fillRect(0, 0, W, 1448);
  let y = 230;                                                   // the clip covers the top of the sheet
  g.textBaseline = "alphabetic"; g.textAlign = "left";
  g.fillStyle = "#7a706a"; g.font = '600 26px "JetBrains Mono", monospace'; g.fillText(K.kicker.toUpperCase(), 80, y);
  y += 78; g.fillStyle = "#1d1a19"; g.font = `800 64px ${sans}, sans-serif`; g.fillText(K.title, 80, y);
  y += 30; g.fillStyle = "#a8262b"; g.fillRect(80, y, W - 160, 6);
  y += 40;
  const tick = (x, yy) => { g.strokeStyle = "#a8262b"; g.lineWidth = 7; g.lineCap = "round"; g.beginPath(); g.moveTo(x + 8, yy - 16); g.lineTo(x + 20, yy - 4); g.lineTo(x + 40, yy - 34); g.stroke(); };
  for (const grp of KPI_GROUPS) {
    y += 58; g.fillStyle = "#1d1a19"; g.font = `700 44px ${sans}, sans-serif`; g.fillText(K.groups[grp.key].title, 80, y);
    g.textAlign = "right"; g.fillStyle = "#a8262b"; g.font = '800 52px "Rubik", sans-serif'; g.fillText(grp.weight + "%", W - 80, y); g.textAlign = "left";
    y += 22; g.fillStyle = "#d9d1c6"; g.fillRect(80, y, W - 160, 3);
    for (const i of grp.items) {
      y += 66;
      g.strokeStyle = "#5b524c"; g.lineWidth = 4; g.strokeRect(96, y - 38, 44, 44); tick(98, y);
      g.fillStyle = "#2b2725"; g.font = `500 38px ${sans}, sans-serif`; g.fillText(P[i].title, 168, y);
    }
    y += 34;
  }
  y += 40; g.fillStyle = "#d9d1c6"; g.fillRect(80, y, W - 160, 3);
  y += 56; g.fillStyle = "#7a706a"; g.font = '600 28px "JetBrains Mono", monospace'; g.fillText("SUPAWIT PROMMAS · SYSTEM ENGINEER", 80, y);
  sheetTex.needsUpdate = true; V.invalidate();
}
document.fonts?.ready.then(() => drawSheet());
function build(){
  const u = t();
  document.documentElement.lang = LANG;
  document.body.classList.toggle("mode-review", MODE === "review");
  document.body.classList.toggle("mode-portfolio", MODE === "portfolio");
  document.body.classList.toggle("locked", !MODE);
  $("#back").textContent = u.back; $("#navAbout").textContent = u.about; $("#navContact").textContent = u.contact; $("#navKpi").textContent = u.kpi;
  document.querySelectorAll("#langBtn [data-l]").forEach(b => b.classList.toggle("on", b.dataset.l === LANG));
  $("#prev").setAttribute("aria-label", u.prev); $("#next").setAttribute("aria-label", u.next); $("#close").setAttribute("aria-label", u.close);
  $("#list").innerHTML = listHTML();
  hint(); drawKeypad(); drawSheet();
  clip.visible = MODE === "review"; V.dirtyShadows();          // the KPI clipboard only exists in the review (1150) room
}
let toastT;
function setLang(l){
  if (l === LANG) return;
  LANG = l; store.set("lang", l); build();
  if (document.body.classList.contains("open")) { if (curPage) showPage(curPage, true); else openProject(cur, true); }
  const el = $("#toast"); el.textContent = t().toast; el.classList.add("on");
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("on"), 1800);
}

// ---------------------------------------------------------------- UI events
document.addEventListener("click", e => {
  const lb = e.target.closest("#langBtn [data-l]"); if (lb) { if (lb.dataset.l !== LANG) spinGlobe(); return setLang(lb.dataset.l); }
  const rf = e.target.closest("[data-rcat]");
  if (rf) { const cat = rf.dataset.rcat; rf.parentElement.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === rf));
    document.querySelectorAll("#drawer .rlist a").forEach(a => a.hidden = !!cat && a.dataset.cat !== cat); return; }
  const c = e.target.closest("[data-copy]");
  if (c) { e.preventDefault(); navigator.clipboard?.writeText(c.dataset.copy).then(() => { c.textContent = t().copied; setTimeout(() => c.textContent = t().copy, 1500); }).catch(() => {}); return; }
  const go = e.target.closest("[data-go]"); if (go) { return go.dataset.go === "contact" ? activate(N("CardBox_Card_0")) : showPage(go.dataset.go); }
  const ti = e.target.closest("[data-i]");
  if (ti) { const i = +ti.dataset.i; if (view === "shelf") hop(i); return openProject(i); }
  const g = e.target.closest(".gallery img, .hero img"); if (g) { $("#lb img").src = g.src; $("#lb").classList.add("on"); }
});
$("#lb").onclick = () => $("#lb").classList.remove("on");
$("#back").onclick = () => { if (view !== "room") goView("room"); };
$("#navAbout").onclick = () => activate(N("Picture_Image"));
$("#navContact").onclick = () => activate(N("CardBox_Card_0"));
$("#navKpi").onclick = () => activate(N("Clipboard_Paper"));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { if ($("#lb").classList.contains("on")) return $("#lb").classList.remove("on");
    if (document.body.classList.contains("open")) return closeDrawer(); if (view !== "room") return goView("room"); }
  if (document.body.classList.contains("open") && !curPage && MODE) { if (e.key === "ArrowRight") openProject(cur + 1); if (e.key === "ArrowLeft") openProject(cur - 1); }
});

// ---------------------------------------------------------------- the gate (locked state)
// sha256("supawit-gate:" + code) -> mode. 1150 = review (organisation), 1412 = portfolio (public).
const CODES = {
  "ac4ce01900b825387308f740a7aff6412a7bf0b4ec35b7c2821f4dbd74e6d147": "review",
  "f5a530a2ff0a17fe6c66f562b0dcbcc2222e372f3ca16db96044c7a9f937260d": "portfolio"
};
const INTERIOR_LIGHTS = ["Light_LED_Back", "Light_LED_Right", "Light_Neon", "Light_PC_Fans", "Light_Room_Top", "Light_Screen_Glow", "Light_Shelf_Books_LED", "Light_Shelf_Top_LED", "Light_Window"];
const INTERIOR_EMIS = ["M_LED_Warm", "M_Meter_Screen", "M_Neon_White", "M_PC_Glow", "M_PC_LCD", "M_Phone_Screen", "M_Picture_Photo", "M_Screen_Code", "M_Screen_Stock", "M_Window_View"];
const gateObjs = []; room.traverse(o => { if (/^Gate_/.test(o.name) && o.parent && !/^Gate_/.test(o.parent.name)) gateObjs.push(o); });
const wallF = N("Gate_Wall_Front"), wallL = N("Gate_Wall_Left"), lid = N("Gate_Lid");
const emisMats = new Map();
room.traverse(o => { const m = o.material; if (m && INTERIOR_EMIS.includes(m.name) && !emisMats.has(m)) emisMats.set(m, m.emissiveIntensity); });
const lightBase = Object.fromEntries(INTERIOR_LIGHTS.filter(n => lights[n]).map(n => [n, lights[n].intensity]));
// ---------------------------------------------------------------- day / night (the wall clock toggles it)
// lightE = interior power (0 while the house is locked, ramps up while it opens); dayK = 0 night .. 1 day
let lightE = 1, dayK = 0, DAY = store.get("daylight") === "1";
const DAY_INT = { Light_Window: 6, Light_Screen_Glow: 0.6, Light_PC_Fans: 0.6, Light_Neon: 0.5 };   // interior lights by day (default 0.15)
const DAY_EMIS = { M_LED_Warm: 0.08, M_Neon_White: 0.7, M_PC_Glow: 0.7, M_Window_View: 1.7 };                      // glowing materials by day (default 1)
const DAY_EXT = { Light_Sun_Key: 5.5, Light_Fill: 2.2, Light_Rim: 1.4, Light_Sign_Spot: 0.35 };    // outside lights by day
const hemi = V.scene.children.find(o => o.isHemisphereLight), HEMI0 = hemi.intensity;
const BG_N = new THREE.Color(0x0b0f1d), BG_D = new THREE.Color(0xbfd0e0);
const SUN_N = lights.Light_Sun_Key.color.clone(), SUN_D = new THREE.Color(1, 0.95, 0.86);
const HS_N = hemi.color.clone(), HS_D = new THREE.Color(0xe4eeff), HG_N = hemi.groundColor.clone(), HG_D = new THREE.Color(0x8a7a66);
const BLOOM0 = V.bloom.strength, EXPO0 = V.renderer.toneMappingExposure;
const extBase = Object.fromEntries(Object.keys(DAY_EXT).filter(n => lights[n]).map(n => [n, lights[n].intensity]));
// window: the night skyline is swapped for a painted daytime sky
const winM = [...emisMats.keys()].find(m => m.name === "M_Window_View");
const winNight = winM && { map: winM.map, emissiveMap: winM.emissiveMap };
const winDay = (() => {
  const c = document.createElement("canvas"); c.width = 256; c.height = 512; const g = c.getContext("2d");
  const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, "#6fa6dc"); gr.addColorStop(0.75, "#cfe5f5"); gr.addColorStop(1, "#e8f1f6");
  g.fillStyle = gr; g.fillRect(0, 0, 256, 512);
  g.fillStyle = "rgba(255,255,255,.85)";
  [[60, 120, 50], [110, 110, 38], [180, 210, 44], [215, 200, 30], [40, 300, 34]].forEach(([x, y, r]) => { g.beginPath(); g.ellipse(x, y, r, r * 0.42, 0, 0, 7); g.fill(); });
  g.fillStyle = "#9fb3c4";
  for (let x = 0, i = 0; x < 256; i++) { const w = 24 + (i * 37) % 30, h = 50 + (i * 53) % 90; g.fillRect(x, 512 - h, w - 3, h); x += w; }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; return t;
})();
const L = THREE.MathUtils.lerp;
function applyLights(){
  const d = dayK;
  for (const n in lightBase) lights[n].intensity = lightBase[n] * lightE * L(1, DAY_INT[n] ?? 0.15, d);
  for (const [m, v] of emisMats) m.emissiveIntensity = v * lightE * L(1, DAY_EMIS[m.name] ?? 1, d);
  for (const n in extBase) lights[n].intensity = extBase[n] * L(1, DAY_EXT[n], d);
  lights.Light_Sun_Key.color.lerpColors(SUN_N, SUN_D, d);
  hemi.intensity = L(HEMI0, 1.0, d); hemi.color.lerpColors(HS_N, HS_D, d); hemi.groundColor.lerpColors(HG_N, HG_D, d);
  V.scene.background.lerpColors(BG_N, BG_D, d);
  V.bloom.strength = L(BLOOM0, 0.12, d); V.renderer.toneMappingExposure = L(EXPO0, 0.95, d);
  if (winM) {
    const day = d > 0.5;
    if ((winM.map === winDay) !== day) { winM.map = day ? winDay : winNight.map; winM.emissiveMap = day ? winDay : winNight.emissiveMap; winM.needsUpdate = true; }
  }
  V.invalidate();
}
function setDay(on, instant){
  DAY = on; store.set("daylight", on ? "1" : "0"); document.body.classList.toggle("day", on);
  const from = dayK, to = on ? 1 : 0;
  if (instant) { dayK = to; return applyLights(); }
  return tween(1200, e => { dayK = from + (to - from) * e; applyLights(); });
}
// the clock shows the visitor's real time
const clockRoot = N("Clock_Root");
const hands = { h: N("Clock_Hand_Hour"), m: N("Clock_Hand_Minute"), s: N("Clock_Hand_Second") };
Object.values(hands).forEach(o => { if (o) o.castShadow = false; });
let lastSec = -1;
V.tickers.add(() => {
  const now = new Date(), sec = now.getSeconds(); if (sec === lastSec || !hands.s) return; lastSec = sec;
  const m = now.getMinutes() + sec / 60, h = (now.getHours() % 12) + m / 60;
  hands.s.rotation.z = -sec / 60 * Math.PI * 2; hands.m.rotation.z = -m / 60 * Math.PI * 2; hands.h.rotation.z = -h / 12 * Math.PI * 2;
  V.invalidate(16);
});

const ARM_FOLD = ARM_BASE + THREE.MathUtils.degToRad(103), ARM_SHIFT = -0.10;
const FLOOR = 0.6, DROP = 2.64;
// parts that stick out of the front wall disappear when they reach the floor
const sinkers = [];
[wallF, wallL].forEach(w => w.children.forEach(ch => { const b = new THREE.Box3().setFromObject(ch); sinkers.push({ o: ch, bottom: b.min.y }); }));

// LCD text on the keypad screen (a canvas texture laid over the modelled screen)
const lcd = document.createElement("canvas"); lcd.width = 512; lcd.height = 180;
const lcdTex = new THREE.CanvasTexture(lcd); lcdTex.colorSpace = THREE.SRGBColorSpace;
{
  const scr = N("Gate_Keypad_Screen"); const b = new THREE.Box3().setFromObject(scr);
  const s = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(s.x * 0.98, s.y * 0.96), new THREE.MeshBasicMaterial({ map: lcdTex, toneMapped: false }));
  plane.position.set(c.x, c.y, b.max.z + 0.001); wallF.attach(plane); plane.name = "Gate_LCD";
}
let entered = "", lcdState = "idle", busy = false;
function drawKeypad(){
  const g = lcd.getContext("2d");
  g.fillStyle = lcdState === "bad" ? "#d9a3a3" : lcdState === "good" ? "#a9e0b4" : "#9ec9bf"; g.fillRect(0, 0, 512, 180);
  g.fillStyle = lcdState === "bad" ? "#7d1010" : lcdState === "good" ? "#0d5222" : "#0f2f29";
  g.textAlign = "center"; g.textBaseline = "middle";
  const txt = lcdState === "bad" ? "ERROR" : lcdState === "good" ? "OPEN" : entered ? "● ".repeat(entered.length).trim() : t().screen;
  g.font = `700 ${entered && lcdState === "idle" ? 84 : 72}px "JetBrains Mono", monospace`; g.fillText(txt, 256, 96);
  lcdTex.needsUpdate = true; V.invalidate();
}
function setClosed(closed){
  gateObjs.forEach(o => o.visible = closed);
  lightE = closed ? 0 : 1; applyLights();
  arm.rotation.y = closed ? ARM_FOLD : ARM_BASE; arm.position.x = ARM_X + (closed ? ARM_SHIFT : 0);
  [wallF, wallL].forEach(w => { w.position.y = FLOOR; }); lid.scale.set(1, 1, 1);
  sinkers.forEach(s => s.o.visible = closed);
  V.dirtyShadows();
}
async function gateClick(o){
  if (busy) return;
  if (view !== "keypad") { await goView("keypad"); return; }
  // the printed digit on a key is its own mesh: treat it as the key
  const k = o.userData.key || (o.name.match(/^Gate_KeyLabel_(.+)$/) || [])[1];
  if (k) press(k);
}
function pressAnim(k){
  const parts = [N(`Gate_Key_${k}`), N(`Gate_KeyLabel_${k}`)].filter(Boolean);
  const z0 = parts.map(p => p.userData.z0 ?? (p.userData.z0 = p.position.z));
  tween(160, e => parts.forEach((p, j) => p.position.z = z0[j] - 0.01 * Math.sin(Math.PI * e)), x => x);
}
async function press(k){
  if (busy) return;
  pressAnim(k);
  if (k === "C") { entered = ""; lcdState = "idle"; return drawKeypad(); }
  if (k === "OK") return check();
  if (/^\d$/.test(k) && entered.length < 4) { entered += k; lcdState = "idle"; drawKeypad(); if (entered.length === 4) { const go = () => flying ? setTimeout(go, 100) : check(); setTimeout(go, 200); } }
}
async function sha(s){ const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join(""); }
async function check(){
  if (busy || entered.length < 4) return;
  busy = true;
  const mode = CODES[await sha("supawit-gate:" + entered)];
  if (!mode) {
    lcdState = "bad"; drawKeypad(); $("#hint").textContent = t().wrong;
    const p0 = camera.position.clone();
    await tween(420, (e, p) => { camera.position.x = p0.x + 0.02 * Math.sin(p * Math.PI * 6) * (1 - p); }, x => x);
    await wait(500); entered = ""; lcdState = "idle"; drawKeypad(); busy = false; hint(); return;
  }
  lcdState = "good"; drawKeypad(); $("#hint").textContent = t().welcome;
  clip.visible = mode === "review"; V.dirtyShadows();   // inside the closed house already, so it is there when the walls come down
  await wait(550);
  view = "room"; document.body.dataset.view = "room";
  await flyTo({ ...pose("Camera_Main"), target: new THREE.Vector3(0.1, 1.55, -0.25) }, 1300);
  await opening();
  MODE = mode; store.sset("mode", mode); entered = ""; busy = false;
  build(); controls.enabled = true; controls.autoRotate = false;
}
function opening(){
  const L = THREE.MathUtils.lerp, seg = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
  const neonM = [...emisMats.keys()].find(m => m.name === "M_Neon_White");
  return tween(2600, (_, p) => {
    const s = p * 2.6;                                         // seconds
    const lidE = ease.inOut(seg(s, 0.15, 1.1)); lid.scale.set(1 - 0.996 * lidE, 1, 1 - 0.996 * lidE); lid.visible = lidE < 1;
    const wallE = ease.inOut(seg(s, 0.2, 1.35)), drop = DROP * wallE;
    [wallF, wallL].forEach(w => { w.position.y = FLOOR - drop; w.visible = wallE < 1; });
    sinkers.forEach(k => { k.o.visible = k.bottom - drop > FLOOR - 0.01; });
    lightE = ease.inOut(seg(s, 0.5, 1.55)); applyLights();
    if (neonM) { const f = seg(s, 1.0, 1.33); const flick = f <= 0 ? 0 : f >= 1 ? 1 : [0, 1, .15, 1, .35, 1][Math.min(5, Math.floor(f * 6))]; neonM.emissiveIntensity *= flick; }
    const a = seg(s, 1.13, 2.0);                              // the sign arm swings out and settles
    const ang = a <= 0 ? ARM_FOLD : ARM_BASE + (ARM_FOLD - ARM_BASE) * Math.exp(-4.2 * a) * Math.cos(a * 7.5);
    arm.rotation.y = ang; arm.position.x = ARM_X + ARM_SHIFT * (1 - seg(s, 1.13, 1.45));
    if (s >= 1.53 && !opening.wob) { opening.wob = true; ["my_work", "about", "contact"].forEach((k, i) => setTimeout(() => swing(hinge[k], "y", 0.15, 9, 3.4, 1300), i * 100)); }
  }, x => x).then(() => { setClosed(false); opening.wob = false; });
}
document.addEventListener("keydown", e => {
  if (MODE || busy) return;
  if (/^\d$/.test(e.key)) { e.preventDefault(); if (view !== "keypad") goView("keypad"); press(e.key); }   // digits count at once, in order, even while the camera is still flying
  else if (view === "keypad" && e.key === "Backspace") { entered = entered.slice(0, -1); drawKeypad(); }
  else if (view === "keypad" && e.key === "Enter") press("OK");
});

// ---------------------------------------------------------------- start
setDay(DAY, true);
setClosed(!MODE);
controls.autoRotate = !MODE;
document.body.dataset.view = "room";
build();
window.SITE = { V, goView, openProject, showPage, setLang, setDay, MODE: () => MODE,
  _dbg: () => ({ entered, busy, view, lcdState, flying, down }), _pick: e => pick(e)?.name };
