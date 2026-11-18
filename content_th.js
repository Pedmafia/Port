const F = t => `<span class="fill">เติม: ${t}</span>`;

const PDF_IC = `<svg class="pi" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 14h6M9 17h4"/></svg>`;
const REPORT_CATS = ["Safety & doors","Sequence & logic","Timing & overtime","Sensors & detection","HMI & alarms"];
const REPORTS = [
  {d:"2026-11-16", p:"The Fine", f:"2026-11-16-exit-door-sensor", c:"Safety & doors", t:"แก้โปรแกรมชั่วคราวเมื่อ sensor ประตูทางออกทำงานไม่สม่ำเสมอ"},
  {d:"2026-11-13", p:"Holme Ekkamai22", f:"2026-11-13-guide-screen", c:"HMI & alarms", t:"ปรับหน้าจอแนะนำการใช้งาน"},
  {d:"2026-11-04", p:"Siamese LM@GS", f:"2026-11-04-lot-priority", c:"Sequence & logic", t:"จัดลำดับช่องจอดให้ระบบยังทำงานได้เมื่อลิฟต์ตัวหนึ่งเสีย"},
  {d:"2026-10-19", p:"Siamese LM@GS", f:"2026-10-19-card-number", c:"Sequence & logic", t:"แก้บั๊กเลขบัตรค้างเมื่อทำรายการไม่จบ"},
  {d:"2026-03-27", p:"Runesu", f:"2026-03-27-robot-overtime-err297", c:"Safety & doors", t:"ห้ามเปิดประตูขณะลิฟต์มีคำสั่งขนรถค้าง (Err297)"},
  {d:"2026-03-24", p:"The Fine", f:"2026-03-24-door-safety-sensor", c:"Safety & doors", t:"ประตูค้างเปิดเมื่อ safety sensor ตรวจพบระหว่างปิด"},
  {d:"2026-02-12", p:"Runesu", f:"2026-02-12-door-after-start", c:"Safety & doors", t:"แก้ประตูเปิดหลังกด START"},
  {d:"2026-01-29", p:"4Point", f:"2026-01-29-centering-overtime-er203", c:"Timing & overtime", t:"ปรับเวลา centering overtime (ER203)"},
  {d:"2026-01-29", p:"Runesu", f:"2026-01-29-centering-overtime-er6-70", c:"Timing & overtime", t:"ปรับเวลา centering overtime (ER6, ER70)"},
  {d:"2026-01-19", p:"Holme Ekkamai22", f:"2026-01-19-turntable-delay", c:"Timing & overtime", t:"เพิ่ม timer delay ที่ turntable"},
  {d:"2025-12-16", p:"4Point", f:"2025-12-16-small-car-centering", c:"Sensors & detection", t:"ตรวจตำแหน่งล้อของรถคันเล็ก และแจ้งผู้ขับให้ขยับรถผ่าน HMI"},
  {d:"2025-11-06", p:"The Fine", f:"2025-11-06-lot-sequencing", c:"Sequence & logic", t:"ปรับลำดับการเลือกช่องจอด"},
  {d:"2025-10-10", p:"Runesu", f:"2025-10-10-turnover-sequence", c:"Sequence & logic", t:"แก้ลำดับการทำงาน turnover"},
  {d:"2025-09-12", p:"4Point", f:"2025-09-12-car-wheel-check", c:"Sensors & detection", t:"แก้ error ตรวจตำแหน่งล้อรถ"},
  {d:"2025-07-14", p:"Runesu", f:"2025-07-14-thermal-overload", c:"Sequence & logic", t:"ปรับโปรแกรมรับมือ thermal overload ของ robot (ER227)"},
  {d:"2025-04-29", p:"Runesu", f:"2025-04-29-reset-sequence", c:"Sequence & logic", t:"ปรับลำดับการ reset ระบบ"},
  {d:"2025-04-28", p:"The Fine", f:"2025-04-28-door-not-open", c:"Safety & doors", t:"แก้ประตูห้องจอดไม่เปิด"},
  {d:"2025-04-25", p:"Runesu", f:"2025-04-25-fold-expand-sensor", c:"Sensors & detection", t:"แก้ error sensor พับ/กางของ robot ตรวจพบพร้อมกัน"},
  {d:"2025-04-23", p:"Holme Ekkamai22", f:"2025-04-23-power-drop-timer", c:"Timing & overtime", t:"เพิ่ม timer delay กัน error จากไฟตกชั่วขณะ"},
  {d:"2025-04-10", p:"Holme Ekkamai22", f:"2025-04-10-guide-lamp", c:"HMI & alarms", t:"ปรับป้ายไฟนำทาง (guide lamp)"},
  {d:"2025-03-26", p:"4Point", f:"2025-03-26-scada-alarm", c:"HMI & alarms", t:"ส่ง alarm เข้า SCADA พร้อมเสียงเตือนนอกห้องควบคุม"},
  {d:"2025-02-04", p:"Holme Ekkamai22", f:"2025-02-04-centering-sensor", c:"Sensors & detection", t:"ย้ายตำแหน่งและปรับมุม centering sensor"}
];

const P_TH = [
{
  id:"siamese", box:[.111,.4354,.1994,.6318],
  kicker:"Automated Parking · PLC & Integration",
  title:"Siamese LM@GS",
  short:"ระบบลิฟต์จอดรถอัตโนมัติ 2 ลิฟต์ — ผมดูแลตั้งแต่ตู้คอนโทรล โปรแกรม PLC หน้าจอผู้ใช้ จนถึงการเชื่อมกับระบบชำระเงิน",
  tags:["Siemens S7-1500","HMI","TCP/IP","Modbus RTU","Commissioning"],
  hero:{src:"assets/siamese_site.webp", pos:"50% 50%", cap:"ทำงานในห้องคอนโทรลของโครงการระหว่าง commissioning"},
  body:`
  <div class="sec"><h4>What I did</h4>
    <p>โครงการนี้เป็นอาคารจอดรถอัตโนมัติที่ใช้ลิฟต์ 2 ตัวขนรถขึ้นไปเก็บ ผู้ขับขี่แค่ขับรถเข้าห้องจอด แตะบัตร แล้วเดินออก ระบบจะจัดการที่เหลือเอง
    งานของผมคือทำให้ทุกส่วนตั้งแต่ไฟฟ้าในตู้ไปจนถึงหน้าจอที่ผู้ใช้เห็น ทำงานร่วมกันได้อย่างปลอดภัย</p>
    <ul>
      <li><b>ทดสอบตู้คอนโทรล</b> — ตรวจ wiring และทดสอบสัญญาณ I/O ของระบบไฟฟ้าและระบบควบคุมก่อนเชื่อมกับเครื่องจักร</li>
      <li><b>เขียนโปรแกรม PLC</b> — ลำดับการทำงานของลิฟต์ การเลือกช่องจอด ระบบ interlock ความปลอดภัยของประตู และ alarm</li>
      <li><b>ออกแบบสิ่งที่ผู้ใช้เห็น</b> — หน้าจอ HMI หน้าห้องจอด ป้ายไฟนำทาง (guide lamp) และจอแสดงคิวรับรถ</li>
      <li><b>เชื่อมกับระบบชำระเงิน (Pay on foot)</b> — ออกแบบ protocol ให้เครื่อง POS คุยกับ PLC ผ่าน TCP/IP และให้เครื่องอ่านบัตรส่งเลขบัตรผ่าน Modbus RTU (RS485)</li>
      <li><b>Commissioning หน้างาน</b> — ทดสอบทุก flow กับรถจริง และปรับแก้หลังส่งมอบ เช่น ป้องกันบัตรค้างในระบบ และจัดลำดับช่องจอดให้ระบบยังนำรถออกได้แม้ลิฟต์ตัวหนึ่งเสีย</li>
    </ul></div>
  <div class="sec"><h4>How customers use it</h4>
    <p class="muted">ภาพรวมการใช้งานของผู้ขับขี่ ตั้งแต่ฝากรถจนรับรถคืน</p>
    <div class="fcwrap">
      <div class="fc"><div class="lane">ขาเข้า · ฝากรถ</div>
        <div class="n end">ขับรถมาที่หน้าห้องจอด</div>
        <div class="n">รถทับ sensor → ประตูเปิดอัตโนมัติ</div>
        <div class="n">ขับเข้าห้องจอด ดับเครื่อง แล้วเดินออก</div>
        <div class="n dec"><b>ล้อรถอยู่ในตำแหน่งที่ถูกต้อง?</b><span class="no">ไม่ → HMI แจ้งให้ขยับรถ แล้วตรวจใหม่</span></div>
        <div class="n">รับบัตรจอด แตะบัตรที่แผงหน้าห้อง แล้วกด CONFIRM → START</div>
        <div class="n dec"><b>ไม่มีคนหรือสิ่งกีดขวางในห้อง?</b><span class="no">ไม่ → ประตูค้างเปิด รอจนปลอดภัย</span></div>
        <div class="n">ประตูปิด → ลิฟต์นำรถขึ้นไปเก็บ</div>
        <div class="n end ok">ฝากรถเรียบร้อย</div>
      </div>
      <div class="fc"><div class="lane">ขาออก · รับรถ</div>
        <div class="n end">ชำระค่าจอดที่ POS หรือตู้ชำระอัตโนมัติ</div>
        <div class="n">แตะบัตรที่จุดเรียกรถ</div>
        <div class="n dec"><b>ยังอยู่ในเวลาที่ชำระไว้?</b><span class="no">ไม่ → กลับไปชำระส่วนต่าง</span></div>
        <div class="n">เข้าคิว — จอแสดงลำดับคิว</div>
        <div class="n">ถึงคิว → ลิฟต์นำรถลงมารอที่ห้องรับรถ</div>
        <div class="n dec"><b>คืนบัตรตรงกับรถคันนี้?</b><span class="no">ไม่ → ตู้คืนบัตร ให้ติดต่อเจ้าหน้าที่</span></div>
        <div class="n">ประตูเปิด → ขับรถออก → ประตูปิด</div>
        <div class="n end ok">รับรถเรียบร้อย</div>
      </div>
    </div></div>
  <div class="sec"><h4>Gallery</h4><div class="gallery">
    <img src="assets/siamese_tower.webp" alt="อาคารจอดรถระหว่างก่อสร้าง">
    <img src="assets/siamese_cart.webp" alt="รถบน cart ของระบบจอดรถอัตโนมัติ">
    <img src="assets/siamese_robot.webp" alt="ทีมติดตั้งและตรวจเช็ค robot ขนรถ">
    <img src="assets/siamese_tec1.webp" alt="ช่างติดตั้งโครงสร้างหน้างาน">
    <img src="assets/siamese_tec2.webp" alt="ทีมติดตั้งรางและโครงสร้างช่องจอด">
    <img src="assets/siamese_hmi.webp" alt="หน้าจอ HMI Siemens Smart Line">
    <img src="assets/siamese_guide.webp" alt="ตัวอย่างหน้าจอ Guide lamp"></div></div>`
},
{
  id:"dashboard", box:[.2393,.4532,.345,.6322],
  kicker:"IoT · System Architecture",
  title:"PT-Autopark Dashboard",
  short:"ระบบ monitor ส่วนกลาง ดึงข้อมูลจาก PLC ของทุกโครงการขึ้นมาดูบนเว็บแบบ real-time โดยไม่ต้องเพิ่มฮาร์ดแวร์",
  tags:["S7-1500","V-box · Lua","MQTT/TLS","Node.js","Socket.io","SQLite","AWS"],
  hero:{src:"assets/dashboard_desk.webp", pos:"50% 50%", cap:"ฝั่งซ้ายคือโค้ดฝั่ง cloud ฝั่งขวาคือโปรแกรม PLC บนกระดาษคือ flow ที่ร่างก่อนลงมือ"},
  body:`
  <div class="goal"><b>Personal goal</b>ดูภาพรวมของทุกโครงการได้ในที่เดียว ประเมินการเสื่อมสภาพของเครื่องจักรจากการใช้งานจริง และเข้าถึง data log ได้ง่ายผ่าน UX/UI ที่ใช้งานสะดวก</div>
  <div class="sec"><h4>Problem</h4>
    <p>เดิมแต่ละโครงการดูสถานะได้จากจอ HMI หน้างานเท่านั้น เมื่อเครื่องมีปัญหา ทีมต้องรอโทรแจ้งหรือเดินทางไปดูเอง — ผมจึงออกแบบระบบที่ทำให้เห็นทุกโครงการได้จากหน้าจอเดียว</p></div>
  <div class="sec"><h4>System architecture</h4>
    <div class="arch">
      <div class="col"><small>LAYER 1 · FIELD</small>
        <div class="blk"><b>Siemens S7-1500</b><span>PLC เดิมของแต่ละโครงการ</span></div>
        <div class="blk ghost"><span>อ่านเฉพาะ tag ที่มีอยู่แล้ว: ช่องว่าง, คิว, สถานะ/error ของลิฟต์ cart และ robot, รถเข้า–ออก</span></div></div>
      <div class="link"><span>S7comm  ·  LAN ในไซต์</span></div>
      <div class="col"><small>LAYER 2 · GATEWAY</small>
        <div class="blk"><b>V-box + Lua script</b><span>อ่าน PLC ทุก 1 วินาที → สร้าง JSON</span></div>
        <div class="blk ghost"><span>script สร้างอัตโนมัติจาก template ตัวเดียว ตรวจหา tag ที่ไซต์นั้นมีเอง — เพิ่มไซต์ใหม่ไม่ต้องแก้ backend</span></div></div>
      <div class="link"><span>MQTT over TLS  ·  publish อย่างเดียว</span></div>
      <div class="col"><small>LAYER 3 · CLOUD</small>
        <div class="blk"><b>MQTT broker</b><span>รับข้อมูลจากทุกไซต์</span></div>
        <div class="blk"><b>Node.js / Express</b><span>ingest → SQLite · REST API</span></div>
        <div class="blk"><b>Socket.io</b><span>push ค่าใหม่ไปหน้าเว็บทันที</span></div>
        <div class="blk"><b>AI Guide</b><span>แปล alarm เป็นขั้นตอนตรวจเช็ค</span></div></div>
      <div class="link"><span>HTTPS  ·  WebSocket</span></div>
      <div class="col"><small>USERS</small>
        <div class="blk"><b>Web dashboard</b><span>ภาพรวมทุกไซต์ · หน้ารายไซต์ · error log · สถิติรถเข้า–ออก</span></div></div>
    </div></div>
  <div class="sec"><h4>Design decisions</h4><ul>
    <li><b>ไม่แตะ control logic</b> — อ่าน tag เดิมอย่างเดียว ไม่ต้องหยุดเครื่องหรือแก้โปรแกรมที่ทำงานอยู่</li>
    <li><b>ข้อมูลไหลทางเดียว</b> — gateway ส่งออกอย่างเดียว ไม่ subscribe คำสั่งใด ๆ จึงไม่มีทางสั่งเครื่องจักรจาก internet</li>
    <li><b>เข้ารหัสทุกช่วง</b> — MQTT ผ่าน TLS และแต่ละ gateway มี client ID ไม่ซ้ำกัน กันการเตะกันเองจน data หาย</li>
    <li><b>ไม่โกหกด้วยตัวเลข</b> — ค่าที่ระบบไม่รู้จะแสดงเป็น “—” ไม่เติมค่าสมมติให้หน้าจอดูครบ</li>
    <li><b>AI ต้องบอกที่มา</b> — คำแนะนำทุกข้อมีป้ายบอกว่ามาจาก AI หรือ rule และยังใช้ได้แม้ไม่มี internet</li></ul></div>
  <div class="sec"><h4>ประเมินการเสื่อมสภาพจากการใช้งานจริง</h4><ul>
    <li><b>จำนวนรถเข้า–ออก</b> — สถิติรายวัน สัปดาห์ เดือน และปี บอกว่าเครื่องแต่ละชุดถูกใช้งานหนักแค่ไหน</li>
    <li><b>ประวัติ fault</b> — ทุก alarm ถูกบันทึกพร้อมระยะเวลาที่ค้าง ทำให้เห็น fault ที่เกิดซ้ำได้ชัด</li>
    <li><b>ความพร้อมใช้งาน</b> — ประวัติ uptime รายชั่วโมง บอกได้ว่าไซต์ไหนเริ่มมีอาการ</li>
    <li><b>Data log เข้าถึงง่าย</b> — กรองตามไซต์และช่วงวันที่ แล้ว export CSV ได้ในคลิกเดียว ไม่ต้องไปอ่านจาก HMI หน้างาน</li></ul></div>
  <div class="sec"><h4>My role</h4><p>ออกแบบสถาปัตยกรรมทั้งหมด ทำ Layer 1–2 (PLC tag และ V-box gateway) เอง และกำหนด requirement พร้อมรีวิว Layer 3 ที่ใช้ AI (Claude Code) ช่วยเขียน</p></div>`
},
{
  id:"travel", box:[.3774,.5045,.4821,.6322],
  kicker:"Automation Mindset · AI",
  title:"Travel RBM",
  short:"งานเอกสารที่ทำซ้ำทุกเดือน ผมเปลี่ยนให้เหลือแค่พิมพ์แชตสั้น ๆ แล้วได้ฟอร์มจริงที่กรอกครบตอนสิ้นเดือน",
  tags:["Python","Telegram","Gemini","Azure Functions","Azure SQL"],
  body:`
  <div class="goal"><b>Personal goal</b>แก้ปัญหาการเสียเวลาไปกับงานที่ต้องทำซ้ำซ้อน</div>
  <div class="sec"><h4>My view on repetitive work</h4>
    <blockquote class="quote">งานที่ต้องทำซ้ำทุกเดือนไม่ใช่แค่เสียเวลา แต่เป็นจุดที่ความผิดพลาดเกิดง่ายที่สุด
    — ถ้าขั้นตอนไหนมีกติกาชัดเจน ขั้นตอนนั้นควรให้ระบบทำ และให้คนเหลือแค่การตัดสินใจ</blockquote>
    <p>ทุกเดือนพนักงานต้องกรอกฟอร์มเบิกค่าเดินทางเองทีละเที่ยว คำนวณระยะทาง × อัตรา และแยกตาม job code ผมเลยใช้หลักคิด 4 ข้อนี้แก้ปัญหา:</p>
    <div class="steps4">
      <div><i>1</i><b>หาจุดเจ็บจริง</b><span>ปัญหาไม่ใช่การกรอกฟอร์ม แต่คือการต้องจำและรวบรวมข้อมูลย้อนหลังทั้งเดือน</span></div>
      <div><i>2</i><b>เก็บข้อมูลตอนที่มันเกิด</b><span>พิมพ์แชตสั้น ๆ ตอนเดินทาง ในภาษาที่คนพูดกันจริง</span></div>
      <div><i>3</i><b>ใช้ AI เท่าที่จำเป็น</b><span>AI แค่ “อ่าน” ข้อความ ส่วนตัวเลขเงินคำนวณด้วยโค้ดที่ตรวจสอบได้</span></div>
      <div><i>4</i><b>ส่งออกในรูปที่คนเชื่อถือ</b><span>กรอกลงฟอร์ม Excel ตัวจริงของบริษัท ไม่สร้างเอกสารหน้าตาใหม่</span></div>
    </div></div>
  <div class="sec"><h4>System architecture</h4>
    <div class="arch">
      <div class="col"><small>INPUT</small>
        <div class="blk"><b>Telegram</b><span>“ไป inn office ทางด่วน 50”</span></div></div>
      <div class="link"><span>webhook + secret token</span></div>
      <div class="col"><small>AZURE FUNCTIONS</small>
        <div class="blk"><b>Access gate</b><span>ตรวจ token + whitelist ผู้ใช้ (fail-closed)</span></div>
        <div class="blk"><b>Gemini parser</b><span>ข้อความไทย/อังกฤษ → ข้อมูลการเดินทาง</span></div>
        <div class="blk"><b>Confirm</b><span>ทวนข้อมูลให้ผู้ใช้ยืนยันก่อนบันทึก</span></div></div>
      <div class="link"><span>บันทึก</span></div>
      <div class="col"><small>DATA & REPORT</small>
        <div class="blk"><b>Azure SQL</b><span>free tier · ต้นทุน ~0 บาท/เดือน</span></div>
        <div class="blk"><b>Aggregate (code)</b><span>รวมยอดแยกตาม job code — ไม่ให้ AI คิดเลข</span></div>
        <div class="blk"><b>Excel template</b><span>เขียนลงช่องข้อมูลของฟอร์มจริงโดยตรง</span></div></div>
      <div class="link"><span>ทุกวันที่ 1 หรือสั่ง /report</span></div>
      <div class="col"><small>OUTPUT</small>
        <div class="blk"><b>ไฟล์ฟอร์มที่กรอกครบ</b><span>ส่งกลับทาง Telegram พร้อมยื่นเบิก</span></div>
        <div class="blk ghost"><span>watchdog ทุก 6 ชม. แจ้งเตือนเมื่อระบบล่มหรือโควตาใกล้หมด</span></div></div>
    </div></div>
  <div class="sec"><h4>What it proves</h4><ul>
    <li>แยกได้ว่างานส่วนไหนควรใช้ AI และส่วนไหนต้องใช้ logic ที่แม่นยำ 100%</li>
    <li>ออกแบบให้ต้นทุนเป็นศูนย์และปลอดภัยตั้งแต่วันแรก — มี 65 automated tests และไม่ให้ key หลุดลง log</li>
    <li>จากไอเดียถึงระบบที่ใช้งานจริงได้ภายในวันเดียว แล้วปรับต่อจาก feedback ของผู้ใช้</li></ul></div>
  <div class="sec"><h4>My role</h4><p>Product owner — มองเห็นปัญหา ออกแบบแนวทาง กำหนด requirement ทดสอบ และรีวิว โดยใช้ AI (Claude Code) เขียนโค้ดและ deploy</p></div>`
},
{
  id:"sumitronic", box:[.5179,.2888,.6198,.6327],
  kicker:"Installation · Commissioning",
  title:"Sumitronic",
  short:"ติดตั้งและ commissioning ระบบ conveyor ลำเลียง PCB และประตู ESD ที่สแกนใบหน้าและตรวจไฟฟ้าสถิตของพนักงาน ในโรงงานอิเล็กทรอนิกส์",
  tags:["Installation","Commissioning","Omron PLC","Interlock","TCP/IP"],
  hero:[{src:"assets/sumi_conv_5.webp", cap:"Conveyor ลำเลียง PCB"},{src:"assets/sumi_esd_2.webp", cap:"ESD Gate"}],
  body:`
  <div class="sec"><h4>My role</h4>
    <p><b>Install & Commissioning</b> — ผมมีส่วนร่วมในโครงการ Sumitronic ทั้งโครงการ ไม่ใช่แค่ conveyor: ติดตั้งระบบหน้างาน เดินสาย ตั้งค่า และทดสอบการทำงานจนพร้อมใช้งานจริงในพื้นที่ผลิต</p></div>
  <div class="sec"><h4>Status</h4><ul>
    <li><b>เสร็จแล้ว</b> — ติดตั้งและ commissioning conveyor Type 1 และ ESD gate</li>
    <li><b>ถัดไป</b> — ติดตั้งและทดสอบ conveyor Type 2 และ Type 3</li></ul></div>
  <div class="sec"><h4>Conveyor · ลำเลียง PCB</h4>
    <p>conveyor สำหรับส่งแผ่น PCB ระหว่างห้อง โดยไม่ให้ฝุ่นจากอีกฝั่งเข้ามาในพื้นที่ผลิต</p>
    <ul>
      <li><b>Interlock ระหว่างห้อง</b> — ประตูทั้งสองฝั่งเปิดพร้อมกันไม่ได้ เพื่อกันฝุ่นผ่านเข้าห้อง</li>
      <li><b>ควบคุมด้วย PLC Omron</b> — ใช้ sensor ตรวจจับและยืนยันตำแหน่งของ PCB ก่อนเปิดหรือปิดประตูแต่ละฝั่ง</li>
      <li><b>Safety & operation</b> — มี emergency stop และสลับโหมด Auto / Manual ได้จากหน้าจอ HMI</li>
    </ul></div>
  <div class="sec"><h4>ESD Gate · ประตูตรวจไฟฟ้าสถิต</h4>
    <p>ประตูคัดกรองพนักงานก่อนเข้าพื้นที่ผลิต เพื่อกันไฟฟ้าสถิตจากร่างกายไปทำความเสียหายให้ชิ้นงานอิเล็กทรอนิกส์</p>
    <ul>
      <li><b>สแกนใบหน้า</b> — ระบุตัวพนักงานที่ผ่านประตู</li>
      <li><b>ตรวจวัดไฟฟ้าในร่างกาย</b> — เปิดให้ผ่านเฉพาะเมื่อค่าที่วัดได้ไม่เกินเกณฑ์ที่กำหนด</li>
      <li><b>บันทึก data log</b> — เก็บผลการตรวจของแต่ละคน และเชื่อมต่อข้อมูลผ่าน TCP/IP</li>
    </ul></div>
  <div class="sec"><h4>Gallery</h4><div class="gallery">
    <img src="assets/sumi_conv_3.webp" alt="conveyor โค้งต่อกับช่องส่งผ่านระหว่างห้อง">
    <img src="assets/sumi_conv_8.webp" alt="หน้าจอ HMI Transfer Operate">
    <img src="assets/sumi_conv_9.webp" alt="PLC Omron ในตู้คอนโทรล">
    <img src="assets/sumi_conv_2.webp" alt="ทีมติดตั้ง conveyor">
    <img src="assets/sumi_esd_1.webp" alt="ระหว่างติดตั้ง ESD gate"></div></div>`
},
{
  id:"troubleshooting", box:[.6585,.3825,.757,.6327],
  kicker:"Field Service · Engineering Knowledge",
  title:"Field Troubleshooting Log",
  short:"สิ่งที่ผมเรียนรู้จากการแก้ปัญหาหน้างานระบบจอดรถอัตโนมัติ — ปัญหาจริงแต่ละครั้งสอนหลักการที่ใช้ได้กับทุกเครื่องจักร",
  tags:["Safety interlock","State machine","Timing","Sensors","HMI / SCADA"],
  body:`
  <div class="sec"><h4>How I troubleshoot</h4>
    <div class="steps"><span>ดูอาการจริง (กล้อง, alarm, log)</span><i>→</i><span>ไล่ sequence หาต้นเหตุ</span><i>→</i><span>แก้ที่เงื่อนไข ไม่ใช่ที่อาการ</span><i>→</i><span>ทดสอบหน้างาน</span><i>→</i><span>บันทึก before / after</span></div></div>
  <div class="sec"><h4>What the field taught me</h4><div class="know">
    <div class="k"><b>Safety interlock</b>
      <p>ประตูหรือเครื่องจักรต้องเคลื่อนที่ได้ก็ต่อเมื่อ <em>ทุก</em> เงื่อนไขปลอดภัย ไม่ใช่แค่ sensor ตัวเดียวบอกว่าว่าง</p>
      <span class="ex">ตัวอย่าง: ห้ามเปิดประตูห้องจอดขณะลิฟต์ยังมีคำสั่งขนรถค้างอยู่ แม้จะมีรถอีกคันทับ loop coil รอเข้า</span></div>
    <div class="k"><b>State machine & transaction</b>
      <p>ทุกขั้นตอนที่ผู้ใช้ทำไม่จบต้องมีทางย้อนกลับที่ชัดเจน ไม่อย่างนั้นข้อมูลค้างจะไปติดผู้ใช้คนถัดไป</p>
      <span class="ex">ตัวอย่าง: ล้างเลขบัตรที่แตะแล้วไม่ยืนยัน และตรวจว่ามีรถอยู่ในห้องก่อนรับคำสั่ง START</span></div>
    <div class="k"><b>Timing & watchdog</b>
      <p>timer ที่ดีต้องแยกให้ออกระหว่าง “ช้าเพราะเสีย” กับ “ช้าเพราะสภาพจริง” — ตั้งสั้นไปเครื่องหยุดบ่อย ตั้งยาวไปไม่เห็นปัญหาจริง</p>
      <span class="ex">ตัวอย่าง: ปรับ overtime ของ centering และ robot, หน่วงเวลาตรวจไฟตกชั่วขณะ, เพิ่ม delay ที่ turntable</span></div>
    <div class="k"><b>Sensor physics & placement</b>
      <p>ตำแหน่งและมุมของ sensor สำคัญพอ ๆ กับโปรแกรม รถแต่ละขนาดสะท้อนและบังสัญญาณไม่เหมือนกัน</p>
      <span class="ex">ตัวอย่าง: ปรับมุม centering sensor ให้ตรวจล้อหลังได้แม่นขึ้น และแยกเงื่อนไขตรวจตำแหน่งล้อของรถคันเล็ก</span></div>
    <div class="k"><b>Design for degraded mode</b>
      <p>ระบบที่ดีต้องยังให้บริการได้บางส่วนเมื่อมีอุปกรณ์ตัวหนึ่งเสีย</p>
      <span class="ex">ตัวอย่าง: จัดลำดับช่องจอดให้รถส่วนใหญ่อยู่ในตำแหน่งที่ลิฟต์ทั้งสองตัวเข้าถึงได้</span></div>
    <div class="k"><b>Human-machine interface</b>
      <p>ถ้าผู้ใช้ทำผิดซ้ำ ๆ ปัญหามักอยู่ที่ระบบสื่อสารไม่ชัด ไม่ใช่ที่ตัวผู้ใช้</p>
      <span class="ex">ตัวอย่าง: ข้อความบน HMI ให้ผู้ขับขยับรถ, ป้ายไฟนำทาง, ส่ง alarm เข้า SCADA พร้อมเสียงเตือนที่ห้องควบคุม</span></div>
  </div></div>
  <div class="sec"><h4>Worked example</h4>
    <div class="case"><h5>รถอีกคันขับเข้าห้องจอดขณะลิฟต์กำลังทำงาน</h5><dl>
      <dt>อาการ</dt><dd>ขณะ cart ส่งรถเข้าลิฟต์ รถอีกคันมาทับ loop coil หน้าห้อง ประตูจึงเปิดและรถคันใหม่ขับเข้าไป</dd>
      <dt>ต้นเหตุ</dt><dd>เงื่อนไขเปิดประตูดูแค่ loop coil แต่ไม่ดูว่าลิฟต์มีคำสั่ง unloading ค้างอยู่</dd>
      <dt>แก้ไข</dt><dd>เพิ่ม interlock ให้ประตูเปิดได้เฉพาะเมื่อลิฟต์ไม่มีคำสั่งค้าง แล้วยืนยันผลจากภาพกล้องหน้างาน</dd>
      <dt>บทเรียน</dt><dd>sensor บอก “สภาพ” ได้ แต่ความปลอดภัยต้องดู “สถานะของระบบ” ด้วย</dd></dl>
      <a class="rlink" href="assets/reports/2026-03-27-robot-overtime-err297.pdf" target="_blank" rel="noopener">${PDF_IC} เปิดรายงานฉบับจริง</a></div></div>
  <div class="sec"><h4>Report library</h4>
    <p class="muted">รายงานฉบับจริงที่ผมเขียนหลังแก้ปัญหาแต่ละครั้ง — คลิกเพื่อเปิด PDF</p>
    <div class="rfilter" role="tablist">${["ทั้งหมด",...REPORT_CATS].map((c,i)=>`<button data-rcat="${i?c:""}" class="${i?"":"on"}">${c}</button>`).join("")}</div>
    <div class="rlist">${REPORTS.map(r=>`<a href="assets/reports/${r.f}.pdf" target="_blank" rel="noopener" data-cat="${r.c}">
      <span class="rd">${r.d}</span><span class="rt"><small class="rp">${r.p}</small>${r.t}</span><span class="rc">${r.c}</span>${PDF_IC}</a>`).join("")}</div></div>`
},
{
  id:"slc", box:[.7761,.4095,.9166,.6331],
  kicker:"Automated Parking · Upcoming",
  title:"SLC", soon:true,
  short:"โครงการระบบจอดรถอัตโนมัติใหม่ ผมรับผิดชอบขอบเขตเดียวกับ Siamese LM@GS — ตอนนี้อยู่ระหว่างเริ่มโครงการ",
  tags:["PLC","HMI","Commissioning","In progress"],
  body:`
  <div class="sec"><h4>Scope</h4>
    <p>ใช้ประสบการณ์จากโครงการ Siamese LM@GS เป็นต้นแบบ งานของผมครอบคลุมตั้งแต่ตู้คอนโทรลจนถึงการส่งมอบ</p>
    <ul>
      <li><b>ทดสอบตู้คอนโทรล</b> — ตรวจ wiring และทดสอบสัญญาณ I/O ของระบบไฟฟ้าและระบบควบคุมก่อนเชื่อมกับเครื่องจักร</li>
      <li><b>เขียนโปรแกรม PLC</b> — ลำดับการทำงานของลิฟต์ การเลือกช่องจอด ระบบ interlock ความปลอดภัยของประตู และ alarm</li>
      <li><b>สิ่งที่ผู้ใช้เห็น</b> — หน้าจอ HMI หน้าห้องจอด ป้ายไฟนำทาง (guide lamp) และจอแสดงคิวรับรถ</li>
      <li><b>เชื่อมกับระบบชำระเงินและเครื่องอ่านบัตร</b> — ออกแบบและทดสอบการสื่อสารระหว่าง POS เครื่องอ่านบัตร และ PLC</li>
      <li><b>Commissioning หน้างาน</b> — ทดสอบทุก flow กับรถจริง และดูแลการแก้ไขหลังส่งมอบ</li>
    </ul></div>
  <div class="sec"><h4>Plan</h4>
    <div class="steps"><span>ทดสอบตู้คอนโทรล</span><i>→</i><span>โปรแกรม PLC / HMI</span><i>→</i><span>ทดสอบ I/O หน้างาน</span><i>→</i><span>ทดสอบกับรถจริง</span><i>→</i><span>ส่งมอบและดูแลหลังส่งมอบ</span></div></div>
  <div class="sec"><h4>บทเรียนจาก Siamese LM@GS ที่จะใช้ตั้งแต่วันแรก</h4><ul>
    <li><b>Interlock จากสถานะระบบ</b> — ประตูเปิดได้เมื่อลิฟต์ไม่มีคำสั่งค้าง ไม่ได้ดูแค่ sensor หน้าห้อง</li>
    <li><b>ไม่มีบัตรค้าง</b> — ล้างเลขบัตรทุกครั้งที่ผู้ใช้ทำรายการไม่จบ</li>
    <li><b>ยังให้บริการได้เมื่อลิฟต์เสียหนึ่งตัว</b> — จัดลำดับช่องจอดให้ลิฟต์อีกตัวยังนำรถออกได้</li>
    <li><b>เก็บข้อมูลตั้งแต่เริ่ม</b> — ตั้งเวลา overtime ตามสภาพจริงหน้างาน และบันทึก data log ให้เชื่อมกับ PT-Autopark Dashboard ได้ทันที</li></ul></div>
  <div class="sec"><h4>Status</h4><p>อยู่ระหว่างเริ่มโครงการ — จะอัปเดตความคืบหน้าที่นี่</p></div>`
},
{
  id:"bdms", box:[0,0,0,0],
  kicker:"Automated Parking · Next year",
  title:"BDMS Phuket", soon:true,
  short:"โครงการระบบจอดรถอัตโนมัติที่ภูเก็ต เริ่มในปีหน้า — ผมรับผิดชอบขอบเขตเดียวกับ Siamese LM@GS",
  tags:["PLC","HMI","Commissioning","ปีหน้า"],
  body:`
  <div class="sec"><h4>สิ่งที่องค์กรคาดหวัง</h4><p>มีส่วนร่วมในโครงการ และทำให้การติดตั้งและทดสอบผ่านไปได้อย่างราบรื่น</p></div>
  <div class="sec"><h4>My role</h4><ul>
    <li><b>ทดสอบตู้คอนโทรล</b> — ตรวจ wiring และทดสอบสัญญาณ I/O ก่อนเชื่อมกับเครื่องจักร</li>
    <li><b>เขียนโปรแกรม PLC</b> — ลำดับการทำงานของลิฟต์ การเลือกช่องจอด interlock ความปลอดภัยของประตู และ alarm</li>
    <li><b>สิ่งที่ผู้ใช้เห็น</b> — หน้าจอ HMI ป้ายไฟนำทาง และจอแสดงคิวรับรถ</li>
    <li><b>เชื่อมกับระบบชำระเงินและเครื่องอ่านบัตร</b> — ทดสอบการสื่อสารระหว่าง POS เครื่องอ่านบัตร และ PLC</li>
    <li><b>Commissioning หน้างาน</b> — ทดสอบทุก flow กับรถจริง และดูแลการแก้ไขหลังส่งมอบ</li></ul></div>
  <div class="sec"><h4>การเตรียมตัว</h4><ul>
    <li>ทบทวนแบบไฟฟ้าและ I/O list ก่อนตู้คอนโทรลมาถึงหน้างาน เพื่อลดเวลาทดสอบหน้างาน</li>
    <li>ใช้ checklist การทดสอบที่สะสมจาก Siamese LM@GS และ SLC</li>
    <li>บันทึก data log ตั้งแต่ช่วง commissioning และเชื่อมเข้า PT-Autopark Dashboard</li>
    <li>หน้างานอยู่ไกล จึงเตรียมการเข้าระบบจากระยะไกลผ่าน VPN เพื่อ support หลังส่งมอบได้รวดเร็ว</li></ul></div>
  <div class="sec"><h4>Status</h4><p>ยังไม่เริ่ม — โครงการเริ่มในปีหน้า จะอัปเดตความคืบหน้าที่นี่</p></div>`
}];

const RESUME = "assets/Resume_Supawit_Prommas.pdf";
const WORK_EMAIL = "supawit@protechasia.co.th";   // shown instead of EMAIL in the review (1150) mode
const EMAIL = "supawit.prommas@gmail.com", PHONE = "095-769-3943", TEL = "+66957693943";
const IC = {
  mail:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  pin:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  doc:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>'
};

const ABOUT_TH = `
  <div class="kicker">About</div>
  <h2>Supawit Prommas</h2>
  <p class="teaser"><b style="color:var(--red)">System Engineer</b> · Automation &amp; Control</p>
  <div class="facts"><span>ประสบการณ์ 6 ปี</span><span>PLC · HMI/SCADA · IoT</span><span>ภาคีวิศวกรไฟฟ้า (สภาวิศวกร)</span></div>
  <div class="sec"><h4>Hello</h4>
    <p>สวัสดีครับ ผมชื่อศุภวิชญ์ (เอิร์ธ) วิศวกรไฟฟ้าที่หลงใหลในการทำให้เครื่องจักรทำงานเองได้อย่างปลอดภัยและเชื่อถือได้
    ตลอด 6 ปีที่ผ่านมา ผมเติบโตจากงานระบบไฟฟ้าในอาคาร สู่การออกแบบวงจรและเขียนโปรแกรม PLC ให้ประตูอัตโนมัติความเร็วสูง
    จนถึงการดูแลระบบจอดรถอัตโนมัติตั้งแต่ตู้คอนโทรล หน้าจอ HMI ไปจนถึงการ commissioning หน้างาน</p></div>
  <div class="sec"><h4>How I work</h4><ul>
    <li><b>เริ่มจากต้นเหตุ</b> — เวลาเครื่องหยุด ผมไล่หาสาเหตุจริงจาก sequence, sensor และ log ก่อนแก้ ไม่แก้แค่อาการ</li>
    <li><b>ความปลอดภัยมาก่อน</b> — ทุกการแก้โปรแกรมต้องคิดถึงคนที่ยืนอยู่หน้าเครื่องเสมอ</li>
    <li><b>เชื่อมหน้างานกับซอฟต์แวร์</b> — นอกจาก PLC ผมเขียน Python และใช้ IoT/เว็บ เพื่อดึงข้อมูลเครื่องจักรขึ้นมา monitor และใช้ AI ช่วยลดงานซ้ำ ๆ</li>
    <li><b>ทำงานกับคน</b> — ประสานงานกับผู้รับเหมา ซัพพลายเออร์ และทีมหลายฝ่ายให้งานจบตามกำหนด</li></ul></div>
  <div class="sec"><h4>Technical skills</h4><div class="skills">
    <div class="skill"><b>PLC Programming</b><span>Siemens (TIA Portal, STEP 7), Mitsubishi (GX Works) · LD, FBD, ST (SCL)</span></div>
    <div class="skill"><b>HMI / SCADA & IoT</b><span>Siemens WinCC, IoT (VPN Passthrough)</span></div>
    <div class="skill"><b>Industrial Protocols</b><span>Modbus (RTU/TCP), PROFIBUS, PROFINET, Ethernet/IP, OPC Server</span></div>
    <div class="skill"><b>Electrical Design</b><span>AutoCAD Electrical, Control Panel Design, Wiring Diagrams</span></div>
    <div class="skill"><b>Motor Drives</b><span>VFD / Inverter (Siemens, Mitsubishi, Delta, Schneider)</span></div>
    <div class="skill"><b>Software</b><span>Python, C++</span></div></div></div>
  <div class="sec"><h4>Certificates</h4><ul>
    <li>ภาคีวิศวกรไฟฟ้า (สาขาไฟฟ้ากำลัง/ควบคุม) สภาวิศวกร — 2021</li>
    <li>PLC & SCADA Advanced Programming, Mitsubishi Electric Thailand — 2022</li></ul></div>
  <div class="sec"><h4>Education</h4>
    <p><b>วศ.บ. วิศวกรรมไฟฟ้า (ไฟฟ้ากำลัง)</b> — มหาวิทยาลัยเทคโนโลยีมหานคร, 2020<br>
    <span style="color:var(--ink2)">Senior project: จักรยานไฟฟ้าพร้อมระบบควบคุมมอเตอร์ด้วย Arduino</span></p></div>
  <div class="sec only-review"><h4>Current role</h4>
    <p>แผนก R&amp;D — ดูแลระบบจอดรถอัตโนมัติตั้งแต่ทดสอบตู้คอนโทรล โปรแกรม PLC/HMI การ commissioning และ field service
    และพัฒนาเครื่องมือดิจิทัลภายในที่ช่วยให้ทีมทำงานได้ดีขึ้น</p></div>
  <div class="btns"><a class="btn only-portfolio" href="${RESUME}" download>${IC.doc} ดาวน์โหลด Resume (PDF)</a><button class="btn ghost" data-go="contact">ติดต่อผม →</button></div>`;

const CONTACT_TH = `
  <div class="kicker">Contact</div>
  <h2>มาคุยกันครับ</h2>
  <div class="bcard" aria-label="นามบัตร"><div class="band">SP</div>
    <div class="main"><div class="nm">Mr. Supawit Prommas</div><div class="rule"></div><div class="ttl">SYSTEM ENGINEER</div></div></div>
  <p class="teaser" style="margin:0 0 20px">สนใจร่วมงาน หรืออยากคุยเรื่องระบบอัตโนมัติ PLC, SCADA/IoT — ติดต่อได้ทางอีเมลหรือโทรศัพท์</p>
  <div class="contacts">
    <a class="contact" href="mailto:${EMAIL}"><span class="ic">${IC.mail}</span><span><small>Email</small><b>${EMAIL}</b></span><button class="copy" data-copy="${EMAIL}">คัดลอก</button></a>
    <a class="contact" href="tel:${TEL}"><span class="ic">${IC.phone}</span><span><small>Phone</small><b>${PHONE}</b></span><button class="copy" data-copy="${PHONE}">คัดลอก</button></a>
    <div class="contact"><span class="ic">${IC.pin}</span><span><small>Location</small><b>นนทบุรี, ประเทศไทย</b></span></div>
  </div>
  <div class="btns only-portfolio"><a class="btn" href="${RESUME}" download>${IC.doc} ดาวน์โหลด Resume (PDF)</a><a class="btn ghost" href="${RESUME}" target="_blank" rel="noopener">เปิดดู Resume</a></div>`;


const KPI_TH = {
  kicker: "R&D department · ถึงสิ้นเดือนตุลาคม 2026",
  title: "KPI Summary for R&D",
  intro: "สรุปผลงานตามหัวข้อการประเมิน — คลิกแต่ละรายการเพื่อดูรายละเอียดผลงาน",
  groups: {
    error: { title: "Error", text: "งานแก้ปัญหาหน้างานและแก้ไขโปรแกรมของระบบจอดรถอัตโนมัติ ทุกเคสบันทึกเป็นรายงาน before / after" },
    new:   { title: "New project", text: "โครงการใหม่ที่ผมรับผิดชอบการติดตั้ง ทดสอบ และ commissioning — BDMS Phuket เริ่มในปีหน้า" },
    goal:  { title: "Personal goal", text: "เป้าหมายที่ตั้งไว้เอง และทำสำเร็จแล้ว 2 เรื่อง" }
  },
  notes: {
    troubleshooting: "ไล่หาต้นเหตุ แก้ที่เงื่อนไข และบันทึกเป็นรายงานฉบับจริง พร้อมคลังรายงานให้เปิดดู",
    siamese: "ทดสอบตู้คอนโทรล โปรแกรม PLC/HMI เชื่อมระบบชำระเงิน commissioning และปรับปรุงหลังส่งมอบ",
    sumitronic: "ติดตั้งและ commissioning conveyor Type 1 และ ESD gate — ถัดไปคือ Type 2 และ Type 3",
    slc: "อยู่ระหว่างเริ่มโครงการ — ขอบเขตเดียวกับ Siamese LM@GS: ทดสอบตู้คอนโทรล PLC/HMI ระบบชำระเงิน และ commissioning",
    bdms: "เริ่มปีหน้า — สิ่งที่องค์กรคาดหวัง: มีส่วนร่วมและทำให้การติดตั้งและทดสอบผ่านไปอย่างราบรื่น บทบาทเหมือน Siamese LM@GS",
    dashboard: "เป้าหมาย: ดูภาพรวมทุกโครงการ ประเมินการเสื่อมสภาพจากการใช้งานจริง และเข้าถึง data log ได้ง่าย — สำเร็จแล้ว",
    travel: "เป้าหมาย: แก้ปัญหาการเสียเวลาไปกับงานที่ทำซ้ำซ้อน — สำเร็จแล้ว"
  },
  print: "ดาวน์โหลดสรุป (PDF)"
};
