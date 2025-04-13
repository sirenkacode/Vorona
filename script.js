const original = "Катерина Да Кунья Станко";
const target =   "Caterina Da Cunha Stanko";

const titleEl = document.getElementById("title");
const feather = document.getElementById("feather");
const featherWrapper = document.getElementById("featherWrapper");
const subtitle = document.getElementById("subtitle");

let result = original.split('');
let maxLength = Math.max(original.length, target.length);
let index = 0;

// Animación del título
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

// Subtítulo con máquina de escribir
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

// Pluma animada con swing
function animateFeatherToTarget() {
  const destino = document.getElementById("pluma-destino").getBoundingClientRect().top;
  const wrapperTop = featherWrapper.getBoundingClientRect().top;
  const distancia = destino - wrapperTop;

  let startTime = null;
  const duracion = 10000;

  function frame(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duracion, 1);
    const swing = Math.sin(progress * Math.PI * 4) * 30;
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

// Iniciar animaciones
setTimeout(() => {
  featherWrapper.style.opacity = 1;
  animateFeatherToTarget();
  animateChange(() => {
    typeSubtitle("Lic. Diseño Gráfico - Artista visual.", "subtitle");
  });
}, 1000);

// Scroll suave
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Fade-up al hacer scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    const trigger = window.innerHeight * 0.9;
    if (rect.top < trigger) {
      el.classList.add('visible');
    }
  });
});


// Sticky navbar al pasar de la sección 1
window.addEventListener('scroll', () => {
  const nav = document.getElementById("navbar");
  const intro = document.getElementById("inicio");
  const bottom = intro.getBoundingClientRect().bottom;

  if (bottom <= 0) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }

  // Fade-up animación
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    const trigger = window.innerHeight * 0.9;
    if (rect.top < trigger) {
      el.classList.add('visible');
    }
  });
});
