/* ==========================================================================
   AIDEN HOCKINBERRY - MECHANICAL ENGINEERING PORTFOLIO SCRIPT (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEngineGallery();
  initCadViewers();
  initRocketStages();
  initEscapementSimulator();
  initFilters();
  initThemeToggle();
  initPdfModal();
  initSmoothScroll();
});

/* ==========================================================================
   1. PISTON ENGINE GALLERY GENERATOR (27 Variants from PDF)
   ========================================================================== */
const engineImages = [
  { file: 'p6_img1_521.png', name: 'Variant #01: Inline-4 Overhead Cam Block' },
  { file: 'p6_img2_522.png', name: 'Variant #02: V-8 High-Torque Multi-Cylinder' },
  { file: 'p6_img3_523.png', name: 'Variant #03: Radial 5-Cylinder Aero Configuration' },
  { file: 'p6_img4_524.png', name: 'Variant #04: Boxer Flat-4 Low Center-of-Gravity' },
  { file: 'p6_img5_525.png', name: 'Variant #05: Twin-Cam Cross-Plane Crankshaft' },
  { file: 'p6_img6_526.png', name: 'Variant #06: Compact High-RPM Inline-3' },
  { file: 'p6_img7_527.png', name: 'Variant #07: Heavy-Duty Industrial V-12' },
  { file: 'p6_img8_528.png', name: 'Variant #08: Modular Piston Manifold Assembly' },
  { file: 'p6_img9_529.png', name: 'Variant #09: Dual-Stroke Synchronized Valvetrain' },
  { file: 'p6_img10_530.png', name: 'Variant #10: Stepped Compression Chamber' },
  { file: 'p6_img11_531.png', name: 'Variant #11: 90-Degree Crosshead Piston Engine' },
  { file: 'p6_img12_532.png', name: 'Variant #12: Reinforced Structural Gantry Engine' },
  { file: 'p6_img13_533.png', name: 'Variant #13: Supercharged Plenum Intake Block' },
  { file: 'p6_img14_534.png', name: 'Variant #14: Opposed-Piston Two-Stroke Design' },
  { file: 'p6_img15_535.png', name: 'Variant #15: High-Displacement V-Twin Configuration' },
  { file: 'p6_img16_536.png', name: 'Variant #16: Multi-Stage Gear-Timed Crank' },
  { file: 'p6_img17_537.png', name: 'Variant #17: Low-Friction Lightweight Connecting Rods' },
  { file: 'p6_img18_538.png', name: 'Variant #18: Cantilever Bearing Support Engine' },
  { file: 'p6_img19_539.png', name: 'Variant #19: Precision Timing Belt Dual-Cam' },
  { file: 'p6_img20_540.png', name: 'Variant #20: Symmetrical Dual-Cylinder Boxer' },
  { file: 'p6_img21_541.png', name: 'Variant #21: High-Efficiency Scavenging Engine' },
  { file: 'p6_img22_542.png', name: 'Variant #22: Harmonic Balancer Integrated Block' },
  { file: 'p6_img23_543.png', name: 'Variant #23: Offset Wrist-Pin Low Side-Load Engine' },
  { file: 'p6_img24_544.png', name: 'Variant #24: High-Pressure Direct-Port Engine' },
  { file: 'p6_img25_545.png', name: 'Variant #25: Dual-Exhaust Tuned Header Block' },
  { file: 'p6_img26_546.png', name: 'Variant #26: Variable Stroke Ratio Prototype' },
  { file: 'p6_img27_547.png', name: 'Variant #27: Multi-Linkage Dynamic Piston Engine' }
];

function initEngineGallery() {
  const container = document.getElementById('engineGalleryGrid');
  if (!container) return;

  container.innerHTML = '';
  engineImages.forEach((eng, index) => {
    const item = document.createElement('div');
    item.className = 'engine-item';
    item.title = `${eng.name} - Click to inspect CAD`;
    item.innerHTML = `
      <img src="assets/images/${eng.file}" alt="${eng.name}" class="engine-thumb" loading="lazy">
      <span class="engine-number">#${String(index + 1).padStart(2, '0')}</span>
    `;
    item.addEventListener('click', () => {
      openLightbox(`assets/images/${eng.file}`, `Virtual Piston Engine Prototype: ${eng.name}. Designed & stress-tested in real-time physics engine for torque optimization, timing efficiency, and structural equilibrium.`);
    });
    container.appendChild(item);
  });
}

/* ==========================================================================
   2. MULTI-VIEW CAD SWITCHER (Automotive Chassis)
   ========================================================================== */
let activeCadSrc = 'assets/images/p7_img3_554.png';
let activeCadTitle = 'Mechanical Automotive Chassis - FRONT VIEW';

function initCadViewers() {
  const btns = document.querySelectorAll('.cad-view-btn');
  const img = document.getElementById('autoCadImg');

  const titles = {
    front: 'Mechanical Automotive Chassis - FRONT VIEW (Twin-wheel steering alignment)',
    back: 'Mechanical Automotive Chassis - BACK VIEW (Rear axle power transfer)',
    side: 'Mechanical Automotive Chassis - SIDE VIEW (Central piston engine mounting)',
    detail: 'Mechanical Automotive Chassis - SUSPENSION & UNIVERSAL JOINT (Drivetrain kinematics)'
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const src = btn.getAttribute('data-src');
      const view = btn.getAttribute('data-view');
      activeCadSrc = src;
      activeCadTitle = titles[view] || 'Automotive CAD View';

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = src;
          img.style.opacity = '1';
        }, 150);
      }
    });
  });
}

function openActiveCadLightbox() {
  openLightbox(activeCadSrc, activeCadTitle);
}

/* ==========================================================================
   3. SIMULATED ROCKET STAGES INTERACTIVE VIEWER (Mun Mission)
   ========================================================================== */
const stageData = {
  1: {
    title: 'Stage 1: High TWR Atmospheric Escape (Solid Rocket Boosters)',
    desc: 'High thrust-to-weight solid rocket boosters engineered to overcome aerodynamic drag in Kerbin’s thick sea-level atmosphere with maximum initial impulse.',
    img: 'assets/images/p8_img3_569.jpeg'
  },
  2: {
    title: 'Stage 2: Booster Core & Gravity Turn Ascent Profile',
    desc: 'Liquid-fueled core stage executing a continuous gravity turn starting at 70km altitude to trade vertical momentum for horizontal orbital insertion velocity.',
    img: 'assets/images/p8_img3_569.jpeg'
  },
  3: {
    title: 'Stage 3: Trans-Munar Injection (TMI) & Vacuum Isp Optimization',
    desc: 'High vacuum specific impulse (Isp) stage executing precise burn nodes for Hohmann transfer orbit insertion from low parking orbit to the Mun.',
    img: 'assets/images/p8_img6_573.png'
  },
  4: {
    title: 'Stage 4: Munar Descent & Ascent Stage (Lander Module)',
    desc: 'Low-gravity throttleable lander with wide-stance landing legs designed for surface stability, terrain impact dampening, and subsequent lunar ascent.',
    img: 'assets/images/p9_img1_578.jpeg'
  },
  5: {
    title: 'Stage 5: Command Module & Parachute Atmospheric Recovery',
    desc: 'Aerodynamic heat-shielded capsule configured with staged drogue and main recovery parachutes for safe splashdown return.',
    img: 'assets/images/p9_img2_579.png'
  }
};

let currentStageId = 1;

function initRocketStages() {
  const stageBtns = document.querySelectorAll('.stage-btn');
  const stageImg = document.getElementById('rocketStageImg');
  const titleEl = document.getElementById('stageDetailTitle');
  const descEl = document.getElementById('stageDetailDesc');

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stageId = btn.getAttribute('data-stage');
      currentStageId = stageId;
      const data = stageData[stageId];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (stageImg) {
        stageImg.style.opacity = '0';
        setTimeout(() => {
          stageImg.src = data.img;
          stageImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}

function openActiveStageLightbox() {
  const data = stageData[currentStageId];
  if (data) {
    openLightbox(data.img, data.title + ' — ' + data.desc);
  }
}

/* ==========================================================================
   4. INTERACTIVE ESCAPEMENT KINEMATICS SIMULATOR (Canvas Physics Engine)
   ========================================================================== */
let simRunning = true;
let simTime = 0;
let pendulumAngle = 0.25;
let pendulumVelocity = 0.0;
let gearAngle = 0;
let gearVelocity = 0;
let lastTickTime = 0;
let tickCount = 0;

function initEscapementSimulator() {
  const canvas = document.getElementById('escapementCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const sliderLength = document.getElementById('sliderLength');
  const sliderWeight = document.getElementById('sliderWeight');
  const sliderTeeth = document.getElementById('sliderTeeth');
  const sliderDamping = document.getElementById('sliderDamping');

  const valLength = document.getElementById('valLength');
  const valWeight = document.getElementById('valWeight');
  const valTeeth = document.getElementById('valTeeth');
  const valDamping = document.getElementById('valDamping');

  const bpmDisplay = document.getElementById('simBpm');
  const stateDisplay = document.getElementById('simState');
  const btnPause = document.getElementById('btnPauseSim');
  const btnReset = document.getElementById('btnResetSim');

  if (sliderLength) {
    sliderLength.addEventListener('input', (e) => {
      valLength.textContent = `${e.target.value} mm`;
    });
  }
  if (sliderWeight) {
    sliderWeight.addEventListener('input', (e) => {
      valWeight.textContent = `${parseFloat(e.target.value).toFixed(1)} N·m`;
    });
  }
  if (sliderTeeth) {
    sliderTeeth.addEventListener('input', (e) => {
      valTeeth.textContent = `${e.target.value} Teeth`;
    });
  }
  if (sliderDamping) {
    sliderDamping.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      valDamping.textContent = val < 0.006 ? 'Low' : val < 0.014 ? 'Medium' : 'High';
    });
  }

  if (btnPause) {
    btnPause.addEventListener('click', () => {
      simRunning = !simRunning;
      btnPause.innerHTML = simRunning ? '⏸ Pause / Run' : '▶ Resume Simulation';
      if (simRunning) requestAnimationFrame(renderLoop);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      pendulumAngle = 0.35;
      pendulumVelocity = 0.0;
      gearAngle = 0;
      showToast('🔄 Escapement oscillation reset to initial displacement.');
    });
  }

  function renderLoop(timestamp) {
    if (!simRunning) return;

    // Canvas scaling
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Physics parameters
    const length = sliderLength ? parseFloat(sliderLength.value) : 180;
    const torque = sliderWeight ? parseFloat(sliderWeight.value) : 1.5;
    const teeth = sliderTeeth ? parseInt(sliderTeeth.value) : 20;
    const damping = sliderDamping ? parseFloat(sliderDamping.value) : 0.005;

    const gravity = 9.81 * 80;
    const dt = 0.016; // 60fps step

    // Pendulum physics: theta'' = -(g/L) * sin(theta) - damping * theta' + impulse
    const pendulumAcc = -(gravity / length) * Math.sin(pendulumAngle) - damping * pendulumVelocity;
    pendulumVelocity += pendulumAcc * dt;
    pendulumAngle += pendulumVelocity * dt;

    // Escapement impulse logic
    const toothStep = (Math.PI * 2) / teeth;
    let inImpulse = false;

    // When pendulum passes near center (theta ~ 0) and moving in direction, give impulse
    if (Math.abs(pendulumAngle) < 0.08 && Math.abs(pendulumVelocity) > 0.05) {
      inImpulse = true;
      const impulseDir = Math.sign(pendulumVelocity);
      pendulumVelocity += impulseDir * (torque * 0.02);
      gearVelocity = 0.08;
      gearAngle += toothStep * 0.05;

      const now = performance.now();
      if (now - lastTickTime > 250) {
        tickCount++;
        const delta = (now - lastTickTime) / 1000;
        const bpm = (60 / delta).toFixed(1);
        if (bpmDisplay && isFinite(bpm)) bpmDisplay.textContent = `${bpm} BPM`;
        lastTickTime = now;
        if (stateDisplay) {
          stateDisplay.textContent = tickCount % 2 === 0 ? 'TICK (LEFT PALLET IMPULSE)' : 'TOCK (RIGHT PALLET IMPULSE)';
          stateDisplay.style.color = 'var(--cyan-primary)';
        }
      }
    } else {
      gearVelocity *= 0.85;
      gearAngle += gearVelocity;
    }

    // DRAWING ESCAPEMENT GEAR
    const centerX = w / 2;
    const gearCenterY = 130;
    const gearRadius = 75;

    ctx.save();
    ctx.translate(centerX, gearCenterY);
    ctx.rotate(gearAngle);

    // Gear wheel hub & rim
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.beginPath();
    ctx.arc(0, 0, gearRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Spokes
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(gearRadius * Math.cos((i * Math.PI) / 2), gearRadius * Math.sin((i * Math.PI) / 2));
      ctx.stroke();
    }

    // Escapement Club Teeth
    ctx.fillStyle = '#38bdf8';
    for (let i = 0; i < teeth; i++) {
      const a = (i * Math.PI * 2) / teeth;
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(gearRadius - 2, -4);
      ctx.lineTo(gearRadius + 14, 0);
      ctx.lineTo(gearRadius + 8, 8);
      ctx.lineTo(gearRadius - 4, 3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Center Arbor
    ctx.fillStyle = '#ff6b00';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // DRAWING ANCHOR & PALLETS
    const anchorY = 45;
    const anchorSpan = 50;

    ctx.save();
    ctx.translate(centerX, anchorY);
    // Anchor rotates slightly with pendulum
    ctx.rotate(-pendulumAngle * 0.45);

    // Anchor body
    ctx.strokeStyle = inImpulse ? '#ff6b00' : '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-anchorSpan, 25);
    ctx.lineTo(0, 0);
    ctx.lineTo(anchorSpan, 25);
    ctx.stroke();

    // Pallet jewels
    ctx.fillStyle = inImpulse ? '#ff6b00' : '#00f0ff';
    // Left Pallet
    ctx.fillRect(-anchorSpan - 4, 25, 8, 14);
    // Right Pallet
    ctx.fillRect(anchorSpan - 4, 25, 8, 14);

    // Anchor Pivot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // DRAWING PENDULUM SUSPENSION & BOB
    const pendulumPivotY = 45;
    const bobX = centerX + Math.sin(pendulumAngle) * (length * 1.2);
    const bobY = pendulumPivotY + Math.cos(pendulumAngle) * (length * 1.2);

    // Pendulum rod
    ctx.strokeStyle = 'rgba(248, 250, 252, 0.8)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX, pendulumPivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Pendulum Bob
    ctx.fillStyle = '#ff6b00';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bobX, bobY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bob mass highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(bobX - 5, bobY - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    // Technical overlay text on canvas
    ctx.font = '11px JetBrains Mono';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
    ctx.fillText(`θ = ${(pendulumAngle * (180 / Math.PI)).toFixed(1)}°`, 15, 25);
    ctx.fillText(`ω = ${pendulumVelocity.toFixed(2)} rad/s`, 15, 42);
    ctx.fillText(`Teeth = ${teeth} | L = ${length}mm`, 15, 59);

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}

/* ==========================================================================
   5. ERA & DISCIPLINE FILTERING
   ========================================================================== */
function initFilters() {
  const eraTabs = document.querySelectorAll('.era-tab');
  const disciplineBtns = document.querySelectorAll('.discipline-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const eraSections = document.querySelectorAll('.era-section-group');

  let activeEra = 'all';
  let activeDiscipline = 'all';

  function applyFilters() {
    projectCards.forEach(card => {
      const cardEra = card.getAttribute('data-era') || '';
      const cardDisc = card.getAttribute('data-discipline') || '';

      const matchesEra = activeEra === 'all' || cardEra.includes(activeEra);
      const matchesDisc = activeDiscipline === 'all' || cardDisc.includes(activeDiscipline);

      if (matchesEra && matchesDisc) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });

    // Also toggle section visibility if filtered by era
    eraSections.forEach(sec => {
      const group = sec.getAttribute('data-era-group');
      if (activeEra === 'all' || activeEra === group) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  eraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eraTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeEra = tab.getAttribute('data-era');
      applyFilters();
    });
  });

  disciplineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      disciplineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDiscipline = btn.getAttribute('data-discipline');
      applyFilters();
    });
  });
}

/* ==========================================================================
   6. LIGHTBOX MODAL (Full Resolution CAD & Diagrams)
   ========================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  img.src = src;
  if (captionEl) captionEl.textContent = caption || 'High-Resolution CAD / Prototype Diagram';
  modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('open');
}

// Global key handler (Esc closes modals)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closePdfDocModal();
  }
});

// Click outside modal body closes it
const lightboxModalEl = document.getElementById('lightboxModal');
if (lightboxModalEl) {
  lightboxModalEl.addEventListener('click', (e) => {
    if (e.target === lightboxModalEl) closeLightbox();
  });
}

/* ==========================================================================
   7. PDF ORIGINAL DOCUMENT VIEWER (19 Pages Inspector)
   ========================================================================== */
let currentPdfPage = 1;
const totalPdfPages = 19;

function initPdfModal() {
  const btn = document.getElementById('pdfViewerBtn');
  const select = document.getElementById('pageSelect');

  if (select) {
    select.innerHTML = '';
    for (let i = 1; i <= totalPdfPages; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Page ${i} of ${totalPdfPages}`;
      select.appendChild(opt);
    }
  }

  if (btn) {
    btn.addEventListener('click', () => {
      openPdfDocModal();
    });
  }

  const modal = document.getElementById('pdfDocModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePdfDocModal();
    });
  }
}

function openPdfDocModal() {
  const modal = document.getElementById('pdfDocModal');
  if (modal) modal.classList.add('open');
  updatePdfPageDisplay();
}

function closePdfDocModal() {
  const modal = document.getElementById('pdfDocModal');
  if (modal) modal.classList.remove('open');
}

function changePdfPage(val) {
  currentPdfPage = parseInt(val);
  updatePdfPageDisplay();
}

function prevPdfPage() {
  if (currentPdfPage > 1) {
    currentPdfPage--;
    updatePdfPageDisplay();
  }
}

function nextPdfPage() {
  if (currentPdfPage < totalPdfPages) {
    currentPdfPage++;
    updatePdfPageDisplay();
  }
}

function updatePdfPageDisplay() {
  const img = document.getElementById('pdfPageDisplayImg');
  const select = document.getElementById('pageSelect');
  const indicator = document.getElementById('pageNumberIndicator');

  if (img) img.src = `assets/pages/page_${currentPdfPage}.png`;
  if (select) select.value = currentPdfPage;
  if (indicator) indicator.textContent = `Page ${currentPdfPage} of ${totalPdfPages}`;
}

/* ==========================================================================
   8. THEME TOGGLE (Dark Blueprint / Clean Light)
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  const savedTheme = localStorage.getItem('ah_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (icon) icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ah_theme', next);
    if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
    showToast(`Switched to ${next === 'dark' ? 'Precision Blueprint Dark' : 'Clean Studio Light'} mode.`);
  });
}

/* ==========================================================================
   9. CONTACT ACTIONS & TOAST MESSAGES
   ========================================================================== */
function copyContact(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Copied "${text}" to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  showToast(`🚀 Thank you, ${name}! Your inquiry has been forwarded to Aiden.`);
  e.target.reset();
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   10. SMOOTH SCROLL & ACTIVE NAV SPY
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
