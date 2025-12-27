const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

anchorLinks.forEach((link) => {
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;
  link.addEventListener('click', (event) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Redirect old in-page services anchors to the dedicated page
if (window.location.hash === '#services' && !window.location.pathname.includes('services.html')) {
  window.location.href = 'services.html';
}
