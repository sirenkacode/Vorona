const original = "Катерина Да Кунья Станко";
const target =   "Caterina Da Cunha Stanko";

const titleEl = document.getElementById("title");
const feather = document.getElementById("feather");
const featherWrapper = document.getElementById("featherWrapper");
const subtitle = document.getElementById("subtitle");

let result = original.split('');
let maxLength = Math.max(original.length, target.length);
let index = 0;

function animateChange(callback) {
  if (index >= maxLength) {
    callback();
    return;
  }

  result[index] = target[index] || '';
  let highlighted = '';

  for (let i = 0; i < result.length; i++) {
    if (i === index) {
      highlighted += `<span class="highlight">${result[i]}</span>`;
    } else {
      highlighted += result[i];
    }
  }

  titleEl.innerHTML = highlighted;
  index++;

  setTimeout(() => animateChange(callback), 100);
}

function typeSubtitle(text, elementId, callback) {
  const el = document.getElementById(elementId);
  el.textContent = text;
  el.style.opacity = 1;
  el.style.width = `${text.length}ch`;
  el.style.animation = `typing 2.5s steps(${text.length}) 1 normal both, blink 0.8s step-end infinite`;

  setTimeout(() => {
    el.style.borderRight = 'none';
    if (callback) callback();
  }, 2500);
}

function animateFeatherToTarget() {
  const destino = document.getElementById("pluma-destino").getBoundingClientRect().top;
  const wrapperTop = featherWrapper.getBoundingClientRect().top;
  const distancia = destino - wrapperTop;

  let startTime = null;
  const duracion = 7000;

  function frame(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / duracion, 1);
    const swing = Math.sin(progress * Math.PI * 4) * 30; // zigzag
    const top = -300 + (distancia * progress);

    featherWrapper.style.top = `${top}px`;
    featherWrapper.style.left = `calc(50% + ${swing}px)`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      featherWrapper.style.top = `${top}px`;
      featherWrapper.style.left = `50%`;
      feather.classList.add("resting");
    }
  }

  requestAnimationFrame(frame);
}

// Lanzar todo al mismo tiempo
setTimeout(() => {
  featherWrapper.style.opacity = 1;
  animateFeatherToTarget();

  animateChange(() => {
    typeSubtitle("Lic. Diseño Gráfico - Artista visual.", "subtitle");
  });
}, 1000);


window.addEventListener('scroll', () => {
  const menu = document.getElementById("floatingMenu");
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    menu.classList.add("top");
  } else {
    menu.classList.remove("top");
  }
});
