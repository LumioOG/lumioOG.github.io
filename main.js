// Scroll reveal
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
 
// Nav active link on scroll
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
});
 
// Form submit placeholder
document.querySelector('.btn-submit')?.addEventListener('click', () => {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Mensaje enviado ✓';
  btn.style.background = 'var(--blue-mid)';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
  }, 3000);
});
 