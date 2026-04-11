/* VALADS — script.js */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Header scroll --- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 48);
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Active nav --- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    var current = '';
    sections.forEach(function(s) {
      if (s.getBoundingClientRect().top <= 120) current = s.id;
    });
    navLinks.forEach(function(l) {
      l.classList.toggle('active', l.dataset.section === current);
    });
  }

  /* --- Smooth scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeNav();
      var top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --- Mobile nav --- */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  function closeNav() {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      var open = nav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeNav(); closeModal(); }
  });

  /* --- Modals --- */
  var modalOverlay = document.getElementById('modal-overlay');
  var modalBox = document.getElementById('modal-box');
  var modalBody = document.getElementById('modal-body');
  var modalClose = document.getElementById('modal-close');

  function openModal(id) {
    var tmpl = document.getElementById(id + '-content');
    if (!tmpl) return;
    modalBody.innerHTML = '';
    modalBody.appendChild(tmpl.content.cloneNode(true));
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-modal]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      if (e.target.classList.contains('project-link') && el.tagName === 'ARTICLE') return;
      if (el.tagName === 'ARTICLE') { openModal(el.dataset.modal); }
      else { e.stopPropagation(); openModal(el.dataset.modal); }
    });
  });
  modalOverlay.addEventListener('click', function(e) {
    if (!modalBox.contains(e.target)) closeModal();
  });
  if (modalClose) modalClose.addEventListener('click', closeModal);

  /* --- FLIP WORD --- */
  var words = [
    { word: 'Facebook',  suffix: 'nestačí.' },
    { word: 'Instagram', suffix: 'nestačí.' },
    { word: 'plagáty',   suffix: 'nestačia.' }
  ];
  var slot = document.getElementById('flip-slot');
  var card = slot ? slot.querySelector('.flip-word__card') : null;
  var text = slot ? slot.querySelector('.flip-word__text') : null;
  var suffix = document.getElementById('flip-suffix');
  var idx = 0;
  var flipDuration = 760;
  var flipInterval = 3400;
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setPhrase(i) {
    text.textContent = words[i].word;
    suffix.textContent = words[i].suffix;
  }

  if (slot && card && text && suffix) {
    setPhrase(idx);

    window.setInterval(function() {
      idx = (idx + 1) % words.length;

      if (motionQuery.matches) {
        setPhrase(idx);
        return;
      }

      card.classList.remove('is-flipping');
      void card.offsetWidth;
      card.classList.add('is-flipping');

      window.setTimeout(function() {
        setPhrase(idx);
      }, Math.round(flipDuration * 0.5));
    }, flipInterval);
  }

});
