/*
 * CORTINA VOLÁTIL v3
 * 
 * Objetivo:
 *   respuesta inmediata al cursor + fisheye + viento + relajación de tela.
 *
 * Optimización respecto a v2:
 *   - 60 x 34 partículas en lugar de 72 x 42.
 *   - Sólo constraints estructurales (horizontal/vertical).
 *   - 3 iteraciones de relajación.
 *   - Fisheye aplicado directamente a la posición visual.
 *   - El viento se aplica como velocidad, no como una fuerza que acumula
 *     retraso.
 *   - Buffer de caracteres reutilizable.
 *   - Sin dependencias externas.
 */

"use strict";

const container = document.getElementById("container");

const CONFIG = {
  maxWidth: 900,
  maxHeight: 620,

  gridW: 60,
  gridH: 34,

  gravity: 0.055,
  damping: 0.975,
  springIterations: 3,
  springStrength: 0.78,

  mouseRadius: 180,

  // Fisheye directo: respuesta inmediata.
  fisheyeStrength: 72,

  // Viento: basado en velocidad del cursor.
  windStrength: 1.25,
  windResponse: 0.030,
  maxCursorSpeed: 48,

  // Memoria del viento para que deje una pequeña estela.
  windPersistence: 0.86,

  fontWeight: 700,
  fontScale: 1.0,
  characterColor: "#333",
  background: "#eeeeee"
};

const sourceText =
  "CORTINA VOLATIL • MOVE THE CURSOR • FISHEYE WIND • " +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 " +
  "<>/+-=*#@$%&?!:;()[]{}";

let canvas;
let ctx;
let dpr = 1;
let animationId = 0;
let lastTime = 0;

let clothWidth = 0;
let clothHeight = 0;
let cellW = 0;
let cellH = 0;

let particles = [];
let constraints = [];
let characterCache = null;

const pointer = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 0,
  active: false,
  lastX: 0,
  lastY: 0,
  lastTime: 0
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

class Particle {
  constructor(x, y, pinned, char) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;

    this.baseX = x;
    this.baseY = y;

    this.pinned = pinned;
    this.char = char;

    // Visual displacement generated directly by the cursor.
    this.fx = 0;
    this.fy = 0;

    // Wind velocity retained briefly in the cloth.
    this.windX = 0;
    this.windY = 0;
  }

  update(dt) {
    if (this.pinned) {
      this.x = this.baseX;
      this.y = this.baseY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.fx = 0;
      this.fy = 0;
      this.windX = 0;
      this.windY = 0;
      return;
    }

    const vx = (this.x - this.oldX) * CONFIG.damping;
    const vy = (this.y - this.oldY) * CONFIG.damping;

    this.oldX = this.x;
    this.oldY = this.y;

    // Wind is velocity-like, so response is much more immediate.
    this.x += vx + this.windX * dt;
    this.y += vy + this.windY * dt + CONFIG.gravity * dt * dt;

    // Fade the wind after each frame.
    const persistence = Math.pow(CONFIG.windPersistence, dt);
    this.windX *= persistence;
    this.windY *= persistence;

    // Direct fisheye displacement is added after physics.
    this.x += this.fx;
    this.y += this.fy;

    // Fisheye is a transient visual displacement.
    this.fx *= 0.48;
    this.fy *= 0.48;
  }
}

class Constraint {
  constructor(a, b, length) {
    this.a = a;
    this.b = b;
    this.length = length;
  }

  solve() {
    const dx = this.b.x - this.a.x;
    const dy = this.b.y - this.a.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 0.001) return;

    const error = (distance - this.length) / distance;
    const correction = error * CONFIG.springStrength;

    const cx = dx * correction;
    const cy = dy * correction;

    if (!this.a.pinned && !this.b.pinned) {
      this.a.x += cx * 0.5;
      this.a.y += cy * 0.5;
      this.b.x -= cx * 0.5;
      this.b.y -= cy * 0.5;
    } else if (!this.a.pinned) {
      this.a.x += cx;
      this.a.y += cy;
    } else if (!this.b.pinned) {
      this.b.x -= cx;
      this.b.y -= cy;
    }
  }
}

function id(x, y) {
  return y * CONFIG.gridW + x;
}

function buildCharacterCache() {
  const width = clothWidth;
  const height = clothHeight;
  const fontSize = Math.max(
    8,
    Math.min(cellW, cellH) * 1.20 * CONFIG.fontScale
  );

  characterCache = {
    font: `${CONFIG.fontWeight} ${fontSize}px monospace`,
    size: fontSize
  };
}

function buildCloth() {
  particles = [];
  constraints = [];

  cellW = clothWidth / (CONFIG.gridW - 1);
  cellH = clothHeight / (CONFIG.gridH - 1);

  let charIndex = 0;

  for (let y = 0; y < CONFIG.gridH; y++) {
    for (let x = 0; x < CONFIG.gridW; x++) {
      const char = sourceText[charIndex++ % sourceText.length];

      particles.push(
        new Particle(
          x * cellW,
          y * cellH,
          y === 0,
          char === "\n" ? " " : char
        )
      );
    }
  }

  // Structural constraints only: much cheaper than v2's diagonal network.
  for (let y = 0; y < CONFIG.gridH; y++) {
    for (let x = 0; x < CONFIG.gridW; x++) {
      const p = particles[id(x, y)];

      if (x < CONFIG.gridW - 1) {
        constraints.push(
          new Constraint(p, particles[id(x + 1, y)], cellW)
        );
      }

      if (y < CONFIG.gridH - 1) {
        constraints.push(
          new Constraint(p, particles[id(x, y + 1)], cellH)
        );
      }
    }
  }

  buildCharacterCache();

  pointer.x = clothWidth * 0.5;
  pointer.y = clothHeight * 0.5;
  pointer.vx = 0;
  pointer.vy = 0;
  pointer.speed = 0;
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  clothWidth = Math.min(CONFIG.maxWidth, window.innerWidth * 0.92);
  clothHeight = Math.min(CONFIG.maxHeight, window.innerHeight * 0.88);

  canvas.style.width = `${clothWidth}px`;
  canvas.style.height = `${clothHeight}px`;
  canvas.width = Math.round(clothWidth * dpr);
  canvas.height = Math.round(clothHeight * dpr);

  buildCloth();
}

function updatePointer(event) {
  const rect = canvas.getBoundingClientRect();

  const x = (event.clientX - rect.left) * (clothWidth / rect.width);
  const y = (event.clientY - rect.top) * (clothHeight / rect.height);

  const now = performance.now();

  if (pointer.lastTime === 0) {
    pointer.x = x;
    pointer.y = y;
    pointer.lastX = x;
    pointer.lastY = y;
    pointer.lastTime = now;
    pointer.active = true;
    return;
  }

  const elapsed = Math.max(1, now - pointer.lastTime);

  const rawVX = (x - pointer.x) / elapsed * 16.6667;
  const rawVY = (y - pointer.y) / elapsed * 16.6667;

  // Very light smoothing: avoid jitter without making the cursor lag.
  pointer.vx = pointer.vx * 0.20 + rawVX * 0.80;
  pointer.vy = pointer.vy * 0.20 + rawVY * 0.80;

  pointer.x = x;
  pointer.y = y;
  pointer.speed = Math.hypot(pointer.vx, pointer.vy);
  pointer.lastTime = now;
  pointer.active = true;
}

function applyCursorInteraction() {
  if (!pointer.active) return;

  const radius = CONFIG.mouseRadius;
  const radius2 = radius * radius;

  const vx = clamp(pointer.vx, -CONFIG.maxCursorSpeed, CONFIG.maxCursorSpeed);
  const vy = clamp(pointer.vy, -CONFIG.maxCursorSpeed, CONFIG.maxCursorSpeed);
  const speedFactor =
    clamp(pointer.speed / CONFIG.maxCursorSpeed, 0, 1);

  for (const p of particles) {
    if (p.pinned) continue;

    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const distance2 = dx * dx + dy * dy;

    if (distance2 >= radius2) continue;

    const distance = Math.sqrt(distance2) || 0.001;
    const normalized = 1 - distance / radius;
    const influence = smoothstep(normalized);

    // ------------------------------------------------------------
    // FISHEYE: direct positional response.
    // This happens in the same frame as the cursor movement.
    // ------------------------------------------------------------
    const lens = CONFIG.fisheyeStrength * influence * influence;

    p.fx += (dx / distance) * lens;
    p.fy += (dy / distance) * lens * 0.48;

    // ------------------------------------------------------------
    // WIND: cursor movement becomes a directional velocity.
    // The faster the cursor, the stronger the gust.
    // ------------------------------------------------------------
    const gust =
      CONFIG.windStrength *
      (0.18 + speedFactor) *
      influence;

    p.windX += vx * CONFIG.windResponse * gust;
    p.windY += vy * CONFIG.windResponse * gust;

    // Lateral turbulence makes the deformation read as cloth.
    p.windX += -vy * CONFIG.windResponse * gust * 0.34;
    p.windY +=  vx * CONFIG.windResponse * gust * 0.20;
  }
}

function drawCharacters() {
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = CONFIG.background;
  ctx.fillRect(0, 0, width, height);

  ctx.font = characterCache.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = CONFIG.characterColor;

  for (let y = 0; y < CONFIG.gridH; y++) {
    for (let x = 0; x < CONFIG.gridW; x++) {
      const p = particles[id(x, y)];

      if (!p.char || p.char === " ") continue;

      const right =
        x < CONFIG.gridW - 1
          ? particles[id(x + 1, y)]
          : particles[id(x - 1, y)];

      const down =
        y < CONFIG.gridH - 1
          ? particles[id(x, y + 1)]
          : particles[id(x, y - 1)];

      // Local tangent of the cloth.
      const horizontalAngle = Math.atan2(
        right.y - p.y,
        right.x - p.x
      );

      const verticalAngle = Math.atan2(
        down.x - p.x,
        down.y - p.y
      );

      const angle =
        horizontalAngle * 0.78 +
        verticalAngle * 0.22;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }
  }
}

function frame(time) {
  animationId = requestAnimationFrame(frame);

  if (!lastTime) {
    lastTime = time;
    return;
  }

  const dt = clamp((time - lastTime) / 16.6667, 0.35, 1.75);
  lastTime = time;

  // Update physical state.
  for (const p of particles) {
    p.update(dt);
  }

  // Immediate cursor response occurs after physics, so it is visible
  // in this very frame instead of waiting for the next integration step.
  applyCursorInteraction();

  // Relax cloth.
  for (let i = 0; i < CONFIG.springIterations; i++) {
    for (const constraint of constraints) {
      constraint.solve();
    }
  }

  drawCharacters();
}

function init() {
  canvas = document.createElement("canvas");
  container.replaceChildren(canvas);

  ctx = canvas.getContext("2d", { alpha: false });

  resize();

  canvas.addEventListener("pointerenter", updatePointer);
  canvas.addEventListener("pointermove", updatePointer);

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.vx *= 0.3;
    pointer.vy *= 0.3;
  });

  canvas.addEventListener("pointercancel", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("blur", () => {
    pointer.active = false;
    pointer.vx = 0;
    pointer.vy = 0;
    pointer.speed = 0;
    lastTime = 0;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
      pointer.speed = 0;
      lastTime = 0;
    }
  });

  animationId = requestAnimationFrame(frame);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
