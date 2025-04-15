// Traducción del título
const original = "Катерина Да Кунья Станко";
const target = "Caterina Da Cunha Stanko";

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
    highlighted += i === index
      ? `<span class="highlight">${result[i]}</span>`
      : result[i];
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

// Animación de pluma
function animateFeatherToTarget() {
  const destino = document.getElementById("pluma-destino").getBoundingClientRect().top;
  const wrapperTop = featherWrapper.getBoundingClientRect().top;
  const distancia = destino - wrapperTop;

  let startTime = null;
  const duracion = 6000;
  featherWrapper.style.visibility = "visible";
  featherWrapper.style.opacity = "1";

  function frame(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duracion, 1);
    const swing = Math.sin(progress * Math.PI * 4) * 30;
    const top = -100 + (distancia * progress);
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

window.addEventListener('scroll', () => {
  const nav = document.getElementById("navbar");
  const intro = document.getElementById("inicio");

  if (window.innerWidth > 768) {
    const bottom = intro.getBoundingClientRect().bottom;
    if (bottom <= 0) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  } else {
    // En mobile, no aplicar sticky top
    nav.classList.remove("sticky");
  }
});



// Traducción del título CONTACTO al entrar
function animateContactTitle() {
  const original = "Контакт";
  const target = "Contacto";
  const titleEl = document.getElementById("contactTitle");
  let result = original.split('');
  let index = 0;

  function animateChange() {
    if (index >= Math.max(original.length, target.length)) return;
    result[index] = target[index] || '';
    let highlighted = result.map((ch, i) =>
      i === index ? `<span class="highlight">${ch}</span>` : ch
    ).join('');
    titleEl.innerHTML = highlighted;
    index++;
    setTimeout(animateChange, 100);
  }

  animateChange();
}

let contactoAnimado = false;
const contactoSection = document.querySelector("#contacto");
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !contactoAnimado) {
      contactoAnimado = true;
      animateContactTitle();
    }
  });
}, { threshold: 0.5 }).observe(contactoSection);

// Traducción del “¡Hola!”
function animateHolaTitle() {
  const original = "Привет!";
  const target = "¡Hola!";
  const titleEl = document.getElementById("holaTitulo");
  let result = original.split('');
  let index = 0;

  function animateChange() {
    if (index >= Math.max(original.length, target.length)) return;
    result[index] = target[index] || '';
    let highlighted = result.map((ch, i) =>
      i === index ? `<span class="highlight">${ch}</span>` : ch
    ).join('');
    titleEl.innerHTML = highlighted;
    index++;
    setTimeout(animateChange, 100);
  }

  animateChange();
}

let holaAnimado = false;
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !holaAnimado) {
      holaAnimado = true;
      animateHolaTitle();
    }
  });
}, { threshold: 0.5 }).observe(document.querySelector("#sobreMi"));

// Tabs con fade-in animado
const tabs = document.querySelectorAll(".tab");
const galleries = document.querySelectorAll(".galeria");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    galleries.forEach(g => {
      g.classList.remove("active");
      g.style.opacity = "0";
      g.style.transform = "translateY(20px)";
    });

    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.target);
    if (target) {
      target.classList.add("active");
      setTimeout(() => {
        target.style.opacity = "1";
        target.style.transform = "translateY(0)";
      }, 50);
    }
  });
});

// Modal
const modal = document.getElementById('portfolioModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.galeria img').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10); // activa animación después de mostrar
    modalImg.src = img.src;
    modalTitle.textContent = img.getAttribute('data-title') || '';
    modalSubtitle.textContent = img.getAttribute('data-subtitle') || '';
    modalCaption.textContent = img.getAttribute('data-caption') || '';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300); // espera a que termine la animación
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }
});


// Animación "revelado" de las polaroids
const polaroids = document.querySelectorAll('.polaroid');
const polaroidObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revelada');
      polaroidObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
polaroids.forEach(p => polaroidObserver.observe(p));


// Fade in/out al hacer scroll para elementos de intro
const fadeElements = document.querySelectorAll('.fade-in-out');

function toggleFadeInOut() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.9 && rect.bottom > 100) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', toggleFadeInOut);
window.addEventListener('load', toggleFadeInOut); // se ejecuta al cargar

