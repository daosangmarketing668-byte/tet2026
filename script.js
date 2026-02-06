const targetDate = new Date(2026, 1, 17, 0, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(value) {
  return String(value).padStart(2, "0");
}

// Countdown logic
function updateCountdown() {
  const now = new Date();
  let diff = targetDate - now;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Fireworks canvas (high performance)
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let dpr = Math.max(1, window.devicePixelRatio || 1);

const rockets = [];
const particles = [];

function resizeCanvas() {
  dpr = Math.max(1, window.devicePixelRatio || 1);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function launchRocket() {
  rockets.push({
    x: random(width * 0.15, width * 0.85),
    y: height + 20,
    targetY: random(height * 0.2, height * 0.5),
    speed: random(6, 9),
    hue: random(35, 55),
  });
}

function burst(x, y, hue) {
  const count = Math.floor(random(50, 80));
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      angle: random(0, Math.PI * 2),
      speed: random(1.6, 3.8),
      friction: 0.98,
      gravity: 0.04,
      alpha: 1,
      decay: random(0.008, 0.016),
      hue,
    });
  }
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(10, 0, 0, 0.18)";
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "lighter";

  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    r.y -= r.speed;

    ctx.beginPath();
    ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 210, 120, 0.9)";
    ctx.fill();

    if (r.y <= r.targetY) {
      burst(r.x, r.y, r.hue);
      rockets.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.speed *= p.friction;
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed + p.gravity * 50;
    p.alpha -= p.decay;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
    ctx.fill();

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

let lastLaunch = 0;
function animate(timestamp) {
  if (timestamp - lastLaunch > random(500, 900)) {
    launchRocket();
    lastLaunch = timestamp;
  }
  draw();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Manual burst on click
window.addEventListener("click", (event) => {
  burst(event.clientX, event.clientY, random(35, 55));
});
