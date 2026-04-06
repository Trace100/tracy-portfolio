'use strict';

/* ─── Smooth Scroll ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // close mobile menu if open
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ─── Mobile Nav ────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* ─── Scroll Reveal ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach(sib => {
          if (sib === entry.target) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          delay += 80;
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Nav scroll shadow ─────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'var(--border-strong)'
    : 'var(--border-subtle)';
}, { passive: true });
