// English content. Thai originals live in index.html (P_TH, ABOUT_TH, CONTACT_TH).
const F_EN = t => `<span class="fill">To fill: ${t}</span>`;

const REPORT_TE = {
  "2026-11-16-exit-door-sensor": "Temporary program fix for an intermittent exit-door sensor",
  "2026-11-13-guide-screen": "Updated the driver guidance screen",
  "2026-11-04-lot-priority": "Slot priority that keeps the system running when one lift fails",
  "2026-10-19-card-number": "Fixed a parking card number left pending after an unfinished transaction",
  "2026-03-27-robot-overtime-err297": "Door must stay shut while the lift has an active unloading command (Err297)",
  "2026-03-24-door-safety-sensor": "Door stays open when the safety sensor trips while closing",
  "2026-02-12-door-after-start": "Fixed the door opening after START was pressed",
  "2026-01-29-centering-overtime-er203": "Tuned the centering overtime timer (ER203)",
  "2026-01-29-centering-overtime-er6-70": "Tuned the centering overtime timer (ER6, ER70)",
  "2026-01-19-turntable-delay": "Added a timer delay at the turntable",
  "2025-12-16-small-car-centering": "Wheel-position check for small cars, with an HMI prompt for the driver",
  "2025-11-06-lot-sequencing": "Reworked the parking slot selection order",
  "2025-10-10-turnover-sequence": "Fixed the turnover sequence",
  "2025-09-12-car-wheel-check": "Fixed the car wheel position check error",
  "2025-07-14-thermal-overload": "Program change to handle robot thermal overload (ER227)",
  "2025-04-29-reset-sequence": "Reworked the system reset sequence",
  "2025-04-28-door-not-open": "Fixed a parking room door that would not open",
  "2025-04-25-fold-expand-sensor": "Fixed robot fold/expand sensors triggering at the same time",
  "2025-04-23-power-drop-timer": "Added a delay so brief power dips no longer raise an error",
  "2025-04-10-guide-lamp": "Adjusted the guide lamp",
  "2025-03-26-scada-alarm": "Sent alarms to SCADA with an audible alert outside the control room",
  "2025-02-04-centering-sensor": "Moved and re-angled the centering sensor"
};

const P_EN = [
{
  id:"siamese", box:[.111,.4354,.1994,.6318],
  kicker:"Automated Parking · PLC & Integration",
  title:"Siamese LM@GS",
  short:"An automated parking system with two lifts — I worked on everything from the control panel and PLC program to the user screens and the payment system link.",
  tags:["Siemens S7-1500","HMI","TCP/IP","Modbus RTU","Commissioning"],
  hero:{src:"assets/siamese_site.webp", pos:"50% 50%", cap:"In the project's control room during commissioning"},
  body:`
  <div class="sec"><h4>What I did</h4>
    <p>This building parks cars automatically: two lifts carry each car up into storage. The driver only has to drive into the parking room, tap a card and walk away — the system does the rest.
    My job was to make every part, from the electrics in the panel to the screens the driver sees, work together safely.</p>
    <ul>
      <li><b>Control panel testing</b> — checked the wiring and tested the I/O signals of the power and control systems before connecting them to the machinery</li>
      <li><b>PLC programming</b> — lift sequences, parking slot selection, door safety interlocks and alarms</li>
      <li><b>What the driver sees</b> — the HMI at the parking room, the guide lamps and the pickup queue display</li>
      <li><b>Pay-on-foot integration</b> — designed the protocol so the POS talks to the PLC over TCP/IP, and the card reader sends card numbers over Modbus RTU (RS485)</li>
      <li><b>On-site commissioning</b> — tested every flow with real cars and kept improving after handover, e.g. preventing stuck card numbers and ordering slots so cars can still be retrieved when one lift is down</li>
    </ul></div>
  <div class="sec"><h4>How customers use it</h4>
    <p class="muted">An overview of the driver's journey, from parking to pickup</p>
    <div class="fcwrap">
      <div class="fc"><div class="lane">Entry · Park the car</div>
        <div class="n end">Drive up to the parking room</div>
        <div class="n">Car triggers the sensor → door opens automatically</div>
        <div class="n">Drive in, turn off the engine and walk out</div>
        <div class="n dec"><b>Are the wheels in the right position?</b><span class="no">No → HMI asks the driver to move the car, then checks again</span></div>
        <div class="n">Take a parking card, tap it at the panel, press CONFIRM → START</div>
        <div class="n dec"><b>Is the room clear of people and obstacles?</b><span class="no">No → door stays open until it is safe</span></div>
        <div class="n">Door closes → the lift takes the car up to storage</div>
        <div class="n end ok">Car parked</div>
      </div>
      <div class="fc"><div class="lane">Exit · Pick up the car</div>
        <div class="n end">Pay at the POS or the self-service kiosk</div>
        <div class="n">Tap the card at the car-call point</div>
        <div class="n dec"><b>Still within the paid time?</b><span class="no">No → go back and pay the difference</span></div>
        <div class="n">Join the queue — the display shows the order</div>
        <div class="n">Your turn → the lift brings the car down to the pickup room</div>
        <div class="n dec"><b>Does the returned card match this car?</b><span class="no">No → card is handed back; contact staff</span></div>
        <div class="n">Door opens → drive out → door closes</div>
        <div class="n end ok">Car picked up</div>
      </div>
    </div></div>
  <div class="sec"><h4>Gallery</h4><div class="gallery">
    <img src="assets/siamese_tower.webp" alt="The parking building under construction">
    <img src="assets/siamese_cart.webp" alt="A car on the automated parking cart">
    <img src="assets/siamese_robot.webp" alt="The team installing and checking the car-carrying robot">
    <img src="assets/siamese_tec1.webp" alt="Technician working on the structure on site">
    <img src="assets/siamese_tec2.webp" alt="The team installing rails and slot structures">
    <img src="assets/siamese_hmi.webp" alt="Siemens Smart Line HMI screen">
    <img src="assets/siamese_guide.webp" alt="Guide lamp screen example"></div></div>`
},
{
  id:"dashboard", box:[.2393,.4532,.345,.6322],
  kicker:"IoT · System Architecture",
  title:"PT-Autopark Dashboard",
  short:"A central monitoring system that brings live PLC data from every parking project onto one web screen — with no new hardware.",
  tags:["S7-1500","V-box · Lua","MQTT/TLS","Node.js","Socket.io","SQLite","AWS"],
  hero:{src:"assets/dashboard_desk.webp", pos:"50% 50%", cap:"Cloud code on the laptop, the PLC program on the monitor, and the flow I sketched before building"},
  body:`
  <div class="goal"><b>Personal goal</b>One place to see every project, judge how the machines wear from real use, and reach the data logs easily through a clear UX/UI.</div>
  <div class="sec"><h4>Problem</h4>
    <p>Each project's status could only be seen on the HMI on site. When a machine had a problem, the team had to wait for a phone call or travel there to look — so I designed a system that shows every project on a single screen.</p></div>
  <div class="sec"><h4>System architecture</h4>
    <div class="arch">
      <div class="col"><small>LAYER 1 · FIELD</small>
        <div class="blk"><b>Siemens S7-1500</b><span>The existing PLC at each project</span></div>
        <div class="blk ghost"><span>Reads only tags that already exist: free slots, queue, lift/cart/robot status and errors, cars in and out</span></div></div>
      <div class="link"><span>S7comm  ·  on-site LAN</span></div>
      <div class="col"><small>LAYER 2 · GATEWAY</small>
        <div class="blk"><b>V-box + Lua script</b><span>Polls the PLC every second → builds JSON</span></div>
        <div class="blk ghost"><span>Scripts are generated from one template and detect each site's tags at runtime — adding a site needs no backend change</span></div></div>
      <div class="link"><span>MQTT over TLS  ·  publish only</span></div>
      <div class="col"><small>LAYER 3 · CLOUD</small>
        <div class="blk"><b>MQTT broker</b><span>Receives data from every site</span></div>
        <div class="blk"><b>Node.js / Express</b><span>Ingest → SQLite · REST API</span></div>
        <div class="blk"><b>Socket.io</b><span>Pushes new values to the browser instantly</span></div>
        <div class="blk"><b>AI Guide</b><span>Turns alarms into troubleshooting steps</span></div></div>
      <div class="link"><span>HTTPS  ·  WebSocket</span></div>
      <div class="col"><small>USERS</small>
        <div class="blk"><b>Web dashboard</b><span>All-site overview · per-site view · error log · traffic statistics</span></div></div>
    </div></div>
  <div class="sec"><h4>Design decisions</h4><ul>
    <li><b>Never touch the control logic</b> — read existing tags only, so no machine has to stop and no running program is changed</li>
    <li><b>Data flows one way</b> — gateways only publish and never subscribe to commands, so machinery cannot be controlled from the internet</li>
    <li><b>Encrypted end to end</b> — MQTT runs over TLS, and every gateway has a unique client ID so they never knock each other offline</li>
    <li><b>No made-up numbers</b> — a value the system does not know is shown as “—”, never filled in to make the screen look complete</li>
    <li><b>AI must show its source</b> — every suggestion is labelled as AI or rule-based, and the guide still works offline</li></ul></div>
  <div class="sec"><h4>Judging wear from real use</h4><ul>
    <li><b>Traffic counts</b> — cars in and out per day, week, month and year show how hard each machine actually works</li>
    <li><b>Fault history</b> — every alarm is logged with how long it lasted, so faults that keep coming back stand out</li>
    <li><b>Availability</b> — hourly uptime history shows when a site starts to drift</li>
    <li><b>Easy data logs</b> — filter by site and date and export CSV in a click, instead of reading the HMI on site</li></ul></div>
  <div class="sec"><h4>My role</h4><p>I designed the whole architecture, built Layers 1–2 (PLC tags and V-box gateway) myself, and wrote the requirements for and reviewed Layer 3, which was written with AI (Claude Code).</p></div>`
},
{
  id:"travel", box:[.3774,.5045,.4821,.6322],
  kicker:"Automation Mindset · AI",
  title:"Travel RBM",
  short:"A monthly paperwork chore turned into a quick chat message — and a fully filled-in company form at the end of the month.",
  tags:["Python","Telegram","Gemini","Azure Functions","Azure SQL"],
  body:`
  <div class="goal"><b>Personal goal</b>Stop losing time to repetitive work.</div>
  <div class="sec"><h4>My view on repetitive work</h4>
    <blockquote class="quote">Work that repeats every month doesn't just waste time — it's where mistakes happen most easily.
    If a step follows clear rules, the system should do it, and people should be left with only the decisions.</blockquote>
    <p>Every month, staff filled in the travel reimbursement form by hand, trip by trip, calculating distance × rate and splitting by job code. I solved it with four principles:</p>
    <div class="steps4">
      <div><i>1</i><b>Find the real pain</b><span>The problem wasn't filling in the form — it was remembering and collecting a whole month of data after the fact</span></div>
      <div><i>2</i><b>Capture data when it happens</b><span>A short chat message during the trip, in the language people actually speak</span></div>
      <div><i>3</i><b>Use AI only where needed</b><span>AI only “reads” the message; money is calculated by code that can be checked</span></div>
      <div><i>4</i><b>Deliver in a format people trust</b><span>Fill in the company's real Excel form instead of inventing a new document</span></div>
    </div></div>
  <div class="sec"><h4>System architecture</h4>
    <div class="arch">
      <div class="col"><small>INPUT</small>
        <div class="blk"><b>Telegram</b><span>“to inn office, expressway 50”</span></div></div>
      <div class="link"><span>webhook + secret token</span></div>
      <div class="col"><small>AZURE FUNCTIONS</small>
        <div class="blk"><b>Access gate</b><span>Checks token + user whitelist (fail-closed)</span></div>
        <div class="blk"><b>Gemini parser</b><span>Thai/English text → structured trip data</span></div>
        <div class="blk"><b>Confirm</b><span>Reads the data back for the user to confirm before saving</span></div></div>
      <div class="link"><span>save</span></div>
      <div class="col"><small>DATA & REPORT</small>
        <div class="blk"><b>Azure SQL</b><span>Free tier · about 0 THB per month</span></div>
        <div class="blk"><b>Aggregate (code)</b><span>Totals per job code — AI never does the maths</span></div>
        <div class="blk"><b>Excel template</b><span>Writes straight into the data cells of the real form</span></div></div>
      <div class="link"><span>1st of every month or /report</span></div>
      <div class="col"><small>OUTPUT</small>
        <div class="blk"><b>A fully filled-in form</b><span>Sent back on Telegram, ready to submit</span></div>
        <div class="blk ghost"><span>A watchdog every 6 hours alerts when the bot is down or quota is running low</span></div></div>
    </div></div>
  <div class="sec"><h4>What it proves</h4><ul>
    <li>I can tell which parts of a job suit AI and which need logic that is 100% exact</li>
    <li>Designed for zero cost and security from day one — 65 automated tests, and no keys ever reach the logs</li>
    <li>From idea to a working system in one day, then improved from real user feedback</li></ul></div>
  <div class="sec"><h4>My role</h4><p>Product owner — I spotted the problem, designed the approach, wrote the requirements, tested and reviewed, while AI (Claude Code) wrote the code and deployed it.</p></div>`
},
{
  id:"sumitronic", box:[.5179,.2888,.6198,.6327],
  kicker:"Installation · Commissioning",
  title:"Sumitronic",
  short:"Installation and commissioning of a PCB conveyor and ESD gates with face scanning and body static checks, in an electronics factory.",
  tags:["Installation","Commissioning","Omron PLC","Interlock","TCP/IP"],
  hero:[{src:"assets/sumi_conv_5.webp", cap:"PCB conveyor"},{src:"assets/sumi_esd_2.webp", cap:"ESD gate"}],
  body:`
  <div class="sec"><h4>My role</h4>
    <p><b>Install & Commissioning</b> — I take part across the Sumitronic project, not only the conveyor: I installed both systems on site, ran the wiring, configured and tested them until they were ready for production.</p></div>
  <div class="sec"><h4>Status</h4><ul>
    <li><b>Done</b> — conveyor Type 1 and the ESD gates installed and commissioned</li>
    <li><b>Next</b> — installing and testing conveyor Type 2 and Type 3</li></ul></div>
  <div class="sec"><h4>Conveyor · PCB transfer</h4>
    <p>A conveyor that moves PCB boards between rooms without letting dust from the other side into the production area.</p>
    <ul>
      <li><b>Room-to-room interlock</b> — the doors on both sides can never be open at the same time, keeping dust out</li>
      <li><b>Omron PLC control</b> — sensors detect and confirm each PCB's position before a door on either side opens or closes</li>
      <li><b>Safety & operation</b> — emergency stop and Auto / Manual modes switchable from the HMI</li>
    </ul></div>
  <div class="sec"><h4>ESD gate · static check</h4>
    <p>Gates that screen staff before they enter production, so static from the body cannot damage electronic parts.</p>
    <ul>
      <li><b>Face scanning</b> — identifies the employee passing through</li>
      <li><b>Body static measurement</b> — opens only when the reading is within the set limit</li>
      <li><b>Data logging</b> — records each person's result, connected over TCP/IP</li>
    </ul></div>
  <div class="sec"><h4>Gallery</h4><div class="gallery">
    <img src="assets/sumi_conv_3.webp" alt="Curved conveyor joining the pass-through between rooms">
    <img src="assets/sumi_conv_8.webp" alt="Transfer Operate HMI screen">
    <img src="assets/sumi_conv_9.webp" alt="Omron PLC in the control panel">
    <img src="assets/sumi_conv_2.webp" alt="Team installing the conveyor">
    <img src="assets/sumi_esd_1.webp" alt="Installing the ESD gates"></div></div>`
},
{
  id:"troubleshooting", box:[.6585,.3825,.757,.6327],
  kicker:"Field Service · Engineering Knowledge",
  title:"Field Troubleshooting Log",
  short:"What fixing real problems on automated parking sites taught me — each issue taught a principle that applies to any machine.",
  tags:["Safety interlock","State machine","Timing","Sensors","HMI / SCADA"],
  body:`
  <div class="sec"><h4>How I troubleshoot</h4>
    <div class="steps"><span>Observe the real symptom (camera, alarm, log)</span><i>→</i><span>Trace the sequence to the root cause</span><i>→</i><span>Fix the condition, not the symptom</span><i>→</i><span>Test on site</span><i>→</i><span>Record before / after</span></div></div>
  <div class="sec"><h4>What the field taught me</h4><div class="know">
    <div class="k"><b>Safety interlock</b>
      <p>A door or machine may move only when <em>every</em> safety condition is met — not just because one sensor says the way is clear.</p>
      <span class="ex">Example: the parking room door must not open while the lift still has a car-unloading command pending, even if another car is waiting on the loop coil.</span></div>
    <div class="k"><b>State machine & transaction</b>
      <p>Every step a user doesn't finish needs a clear way back — otherwise leftover data catches the next user.</p>
      <span class="ex">Example: clear a card number that was tapped but never confirmed, and check that a car is in the room before accepting START.</span></div>
    <div class="k"><b>Timing & watchdog</b>
      <p>A good timer separates “slow because it's broken” from “slow because that's reality” — too short and the machine stops often, too long and real faults go unseen.</p>
      <span class="ex">Example: tuning centering and robot overtime, debouncing brief power dips, adding a delay at the turntable.</span></div>
    <div class="k"><b>Sensor physics & placement</b>
      <p>Where a sensor sits and how it's angled matters as much as the program — cars of different sizes reflect and block signals differently.</p>
      <span class="ex">Example: re-angling the centering sensor to read the rear wheel accurately, and a separate wheel-position check for small cars.</span></div>
    <div class="k"><b>Design for degraded mode</b>
      <p>A good system keeps giving partial service when one device fails.</p>
      <span class="ex">Example: ordering parking slots so most cars sit where both lifts can reach them.</span></div>
    <div class="k"><b>Human-machine interface</b>
      <p>When users keep making the same mistake, the problem is usually unclear communication from the system, not the user.</p>
      <span class="ex">Example: HMI messages asking the driver to move the car, guide lamps, and SCADA alarms with an audible alert in the control room.</span></div>
  </div></div>
  <div class="sec"><h4>Worked example</h4>
    <div class="case"><h5>A second car drove into the parking room while the lift was working</h5><dl>
      <dt>Symptom</dt><dd>While the cart was loading a car into the lift, another car drove onto the loop coil outside; the door opened and the new car drove in.</dd>
      <dt>Root cause</dt><dd>The door-open condition only looked at the loop coil, not at whether the lift had an unloading command pending.</dd>
      <dt>Fix</dt><dd>Added an interlock so the door opens only when the lift has no pending command, then confirmed it with on-site camera footage.</dd>
      <dt>Lesson</dt><dd>Sensors tell you the “situation”, but safety also has to check the “state of the system”.</dd></dl>
      <a class="rlink" href="assets/reports/2026-03-27-robot-overtime-err297.pdf" target="_blank" rel="noopener">${PDF_IC} Open the original report</a></div></div>
  <div class="sec"><h4>Report library</h4>
    <p class="muted">The actual reports I wrote after each fix — click to open the PDF</p>
    <div class="rfilter" role="tablist">${["All",...REPORT_CATS].map((c,i)=>`<button data-rcat="${i?c:""}" class="${i?"":"on"}">${c}</button>`).join("")}</div>
    <div class="rlist">${REPORTS.map(r=>`<a href="assets/reports/${r.f}.pdf" target="_blank" rel="noopener" data-cat="${r.c}">
      <span class="rd">${r.d}</span><span class="rt"><small class="rp">${r.p}</small>${REPORT_TE[r.f]||r.t}</span><span class="rc">${r.c}</span>${PDF_IC}</a>`).join("")}</div></div>`
},
{
  id:"slc", box:[.7761,.4095,.9166,.6331],
  kicker:"Automated Parking · Upcoming",
  title:"SLC", soon:true,
  short:"A new automated parking project where I carry the same scope as on Siamese LM@GS — now getting started.",
  tags:["PLC","HMI","Commissioning","In progress"],
  body:`
  <div class="sec"><h4>Scope</h4>
    <p>Built on what I did at Siamese LM@GS: my part runs from the control panel all the way to handover.</p>
    <ul>
      <li><b>Control panel testing</b> — check the wiring and test every electrical and control I/O signal before the panel is connected to the machine.</li>
      <li><b>PLC programming</b> — lift sequences, parking slot selection, door safety interlocks and alarms.</li>
      <li><b>What users see</b> — the HMI screen at the parking room, guide lamps and the retrieval queue display.</li>
      <li><b>Payment system and card reader integration</b> — design and test the communication between the POS, the card readers and the PLC.</li>
      <li><b>On-site commissioning</b> — test every flow with real cars and handle the fixes after handover.</li>
    </ul></div>
  <div class="sec"><h4>Plan</h4>
    <div class="steps"><span>Test the control panel</span><i>→</i><span>PLC / HMI programs</span><i>→</i><span>On-site I/O tests</span><i>→</i><span>Tests with real cars</span><i>→</i><span>Handover and after-service</span></div></div>
  <div class="sec"><h4>Lessons from Siamese LM@GS I'll apply from day one</h4><ul>
    <li><b>Interlocks based on system state</b> — the door opens only when the lift has no pending command, not just when the sensor outside says so.</li>
    <li><b>No stuck cards</b> — clear the card number whenever a user leaves a transaction unfinished.</li>
    <li><b>Keep serving when one lift is down</b> — order the parking slots so the other lift can still bring cars out.</li>
    <li><b>Collect data from the start</b> — set overtime limits from real site conditions and log data so it connects to the PT-Autopark Dashboard right away.</li></ul></div>
  <div class="sec"><h4>Status</h4><p>Getting started — progress will be posted here.</p></div>`
},
{
  id:"bdms", box:[0,0,0,0],
  kicker:"Automated Parking · Next year",
  title:"BDMS Phuket", soon:true,
  short:"An automated parking project in Phuket starting next year — I carry the same scope as on Siamese LM@GS.",
  tags:["PLC","HMI","Commissioning","Next year"],
  body:`
  <div class="sec"><h4>What is expected</h4><p>Take part in the project and make installation and testing go smoothly.</p></div>
  <div class="sec"><h4>My role</h4><ul>
    <li><b>Control panel testing</b> — check the wiring and test the I/O signals before the panel is connected to the machine.</li>
    <li><b>PLC programming</b> — lift sequences, parking slot selection, door safety interlocks and alarms.</li>
    <li><b>What users see</b> — HMI screens, guide lamps and the retrieval queue display.</li>
    <li><b>Payment system and card reader integration</b> — test the communication between the POS, the card readers and the PLC.</li>
    <li><b>On-site commissioning</b> — test every flow with real cars and handle the fixes after handover.</li></ul></div>
  <div class="sec"><h4>Preparation</h4><ul>
    <li>Review the electrical drawings and the I/O list before the control panels reach the site, to shorten on-site testing.</li>
    <li>Reuse the test checklists built up on Siamese LM@GS and SLC.</li>
    <li>Log data from commissioning onwards and connect it to the PT-Autopark Dashboard.</li>
    <li>The site is far away, so set up remote access over VPN to support the system quickly after handover.</li></ul></div>
  <div class="sec"><h4>Status</h4><p>Not started yet — the project begins next year. Progress will be posted here.</p></div>`
}];

const ABOUT_EN = `
  <div class="kicker">About</div>
  <h2>Supawit Prommas</h2>
  <p class="teaser"><b style="color:var(--red)">System Engineer</b> · Automation &amp; Control</p>
  <div class="facts"><span>6 years of experience</span><span>PLC · HMI/SCADA · IoT</span><span>Licensed Associate Electrical Engineer</span></div>
  <div class="sec"><h4>Hello</h4>
    <p>Hi, I'm Supawit (Earth), an electrical engineer who loves making machines run on their own — safely and reliably.
    Over the past six years I've grown from building electrical work, to designing circuits and PLC programs for high-speed automatic doors,
    to looking after automated parking systems end to end: control panels, HMI screens and on-site commissioning.</p></div>
  <div class="sec"><h4>How I work</h4><ul>
    <li><b>Start from the root cause</b> — when a machine stops, I trace the real cause through the sequence, sensors and logs before fixing anything, rather than patching the symptom</li>
    <li><b>Safety first</b> — every program change has to account for the person standing in front of the machine</li>
    <li><b>Connect the field to software</b> — beyond PLCs, I write Python and use IoT and the web to bring machine data into monitoring, and use AI to cut repetitive work</li>
    <li><b>Work with people</b> — I coordinate contractors, suppliers and cross-functional teams to finish on schedule</li></ul></div>
  <div class="sec"><h4>Technical skills</h4><div class="skills">
    <div class="skill"><b>PLC Programming</b><span>Siemens (TIA Portal, STEP 7), Mitsubishi (GX Works) · LD, FBD, ST (SCL)</span></div>
    <div class="skill"><b>HMI / SCADA & IoT</b><span>Siemens WinCC, IoT (VPN Passthrough)</span></div>
    <div class="skill"><b>Industrial Protocols</b><span>Modbus (RTU/TCP), PROFIBUS, PROFINET, Ethernet/IP, OPC Server</span></div>
    <div class="skill"><b>Electrical Design</b><span>AutoCAD Electrical, Control Panel Design, Wiring Diagrams</span></div>
    <div class="skill"><b>Motor Drives</b><span>VFD / Inverter (Siemens, Mitsubishi, Delta, Schneider)</span></div>
    <div class="skill"><b>Software</b><span>Python, C++</span></div></div></div>
  <div class="sec"><h4>Certificates</h4><ul>
    <li>Licensed Associate Electrical Engineer (Power/Control), Council of Engineers Thailand — 2021</li>
    <li>PLC & SCADA Advanced Programming, Mitsubishi Electric Thailand — 2022</li></ul></div>
  <div class="sec"><h4>Education</h4>
    <p><b>B.Eng. Electrical Engineering (Power)</b> — Mahanakorn University of Technology, 2020<br>
    <span style="color:var(--ink2)">Senior project: an electric bicycle with an Arduino-based motor control system</span></p></div>
  <div class="sec only-review"><h4>Current role</h4>
    <p>R&amp;D department — I look after automated parking systems from control panel testing, PLC/HMI programming and commissioning to field service,
    and I build internal digital tools that help the team work better.</p></div>
  <div class="btns"><a class="btn only-portfolio" href="${RESUME}" download>${IC.doc} Download résumé (PDF)</a><button class="btn ghost" data-go="contact">Get in touch →</button></div>`;

const CONTACT_EN = `
  <div class="kicker">Contact</div>
  <h2>Let's talk</h2>
  <div class="bcard" aria-label="Business card"><div class="band">SP</div>
    <div class="main"><div class="nm">Mr. Supawit Prommas</div><div class="rule"></div><div class="ttl">SYSTEM ENGINEER</div></div></div>
  <p class="teaser" style="margin:0 0 20px">Interested in working together, or want to talk automation, PLC or SCADA/IoT? Reach me by email or phone.</p>
  <div class="contacts">
    <a class="contact" href="mailto:${EMAIL}"><span class="ic">${IC.mail}</span><span><small>Email</small><b>${EMAIL}</b></span><button class="copy" data-copy="${EMAIL}">Copy</button></a>
    <a class="contact" href="tel:${TEL}"><span class="ic">${IC.phone}</span><span><small>Phone</small><b>${PHONE}</b></span><button class="copy" data-copy="${PHONE}">Copy</button></a>
    <div class="contact"><span class="ic">${IC.pin}</span><span><small>Location</small><b>Nonthaburi, Thailand</b></span></div>
  </div>
  <div class="btns only-portfolio"><a class="btn" href="${RESUME}" download>${IC.doc} Download résumé (PDF)</a><a class="btn ghost" href="${RESUME}" target="_blank" rel="noopener">View résumé</a></div>`;

const KPI_EN = {
  kicker: "R&D department · to the end of October 2026",
  title: "KPI Summary for R&D",
  intro: "My work grouped by the evaluation criteria — click any item to see the details.",
  groups: {
    error: { title: "Error", text: "Field troubleshooting and program fixes on automated parking systems. Every case is documented as a before / after report." },
    new:   { title: "New project", text: "New projects where I am responsible for installation, testing and commissioning — BDMS Phuket starts next year." },
    goal:  { title: "Personal goal", text: "Goals I set for myself — both achieved." }
  },
  notes: {
    troubleshooting: "Trace the root cause, fix the condition, and write it up as a real report — with the full report library to open.",
    siamese: "Control panel testing, PLC/HMI programming, payment system integration, commissioning and improvements after handover.",
    sumitronic: "Installed and commissioned conveyor Type 1 and the ESD gates — Type 2 and Type 3 are next.",
    slc: "Getting started — same scope as Siamese LM@GS: control panel testing, PLC/HMI, payment integration and commissioning.",
    bdms: "Starts next year — expected to take part and make installation and testing go smoothly, in the same role as on Siamese LM@GS.",
    dashboard: "Goal: see every project in one place, judge machine wear from real use, and reach the data logs easily — achieved.",
    travel: "Goal: stop losing time to repetitive work — achieved."
  },
  print: "Download summary (PDF)"
};
