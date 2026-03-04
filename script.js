/* ===========================
   VALADS — script.js
   =========================== */

(function () {
  'use strict';

  /* ---- Smooth scroll polyfill guard ---- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- DOM refs ---- */
  const header      = document.getElementById('header');
  const navLinks    = document.querySelectorAll('.nav-link');
  const navToggle   = document.querySelector('.nav-toggle');
  const nav         = document.querySelector('.nav');
  const sections    = document.querySelectorAll('section[id]');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBox    = document.getElementById('modal-box');
  const modalBody   = document.getElementById('modal-body');
  const modalClose  = document.getElementById('modal-close');

  /* ===========================
     HEADER SCROLL BEHAVIOUR
     =========================== */
  function onScroll () {
    if (window.scrollY > 48) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ===========================
     ACTIVE NAV HIGHLIGHT
     =========================== */
  function updateActiveNav () {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 120) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  /* ===========================
     SMOOTH SCROLL FOR ANCHORS
     =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // Close mobile nav if open
      closeNav();

      const headerHeight = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      if (prefersReducedMotion) {
        window.scrollTo(0, targetTop);
      } else {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ===========================
     MOBILE NAV TOGGLE
     =========================== */
  function openNav () {
    nav.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav () {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Close nav on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeNav();
      closeModal();
    }
  });

  /* ===========================
     PROJECT MODALS
     =========================== */
  function openModal (id) {
    const tmpl = document.getElementById(`${id}-content`);
    if (!tmpl) return;
    modalBody.innerHTML = '';
    modalBody.appendChild(tmpl.content.cloneNode(true));
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus trap: move focus to close button
    setTimeout(() => modalClose.focus(), 50);
  }

  function closeModal () {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open via card or link clicks
  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', function (e) {
      // Don't double-trigger when clicking the button inside the card
      if (e.target.classList.contains('project-link') && el.tagName === 'ARTICLE') return;
      if (el.tagName === 'ARTICLE') {
        openModal(this.dataset.modal);
      } else {
        e.stopPropagation();
        openModal(this.dataset.modal);
      }
    });
  });

  // Close on overlay click (outside modal box)
  modalOverlay.addEventListener('click', function (e) {
    if (!modalBox.contains(e.target)) {
      closeModal();
    }
  });

  // Close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  /* ===========================
     ENTRANCE ANIMATIONS
     (CSS-driven, JS sets class)
     =========================== */
  if (!prefersReducedMotion) {
    const revealEls = document.querySelectorAll(
      '.hero-inner, .reality-inner, .section-header, .project-card, .process-step, .contact-intro, .contact-block'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.04}s, transform 0.55s ease ${i * 0.04}s`;
      observer.observe(el);
    });

    // When revealed class is added, animate in
    const style = document.createElement('style');
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
  }

})();