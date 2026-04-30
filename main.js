// ── SCROLL REVEAL ───────────────────────────────────────
const reveals = document.querySelectorAll('.project-card, .service-card, .addon, .about-inner');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ── NAV ACTIVE LINK ON SCROLL ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--cream)' : '';
  });
}, { passive: true });

// ── FORM SUBMIT ─────────────────────────────────────────
document.querySelector('.btn-submit')?.addEventListener('click', () => {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Mensaje enviado ✓';
  btn.style.background = 'var(--blue-mid)';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
  }, 3000);
});

// ── PERFORMANCE: LAZY LOAD IMAGES ──────────────────────
// Cuando agregues imágenes reales, este código las carga
// solo cuando el usuario las va a ver (mejora velocidad)
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ── PERFORMANCE: PREFETCH DEMO PAGES ──────────────────
// Pre-carga los demos cuando el usuario está inactivo
// para que abran instantáneo cuando haga clic
window.addEventListener('load', () => {
  const demos = [
    'elume-studio/index.html',
    'cafe-miron/index.html',
    'noir-studio/index.html'
  ];
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      demos.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
});
