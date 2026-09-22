/* Soundaffair — OnePager Interaktionen */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var links = document.getElementById('navLinks');
  var toggle = document.getElementById('navToggle');

  /* --- Nav-Hintergrund ab dem ersten Scroll --- */
  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobiles Menü --- */
  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });

  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* --- Scroll-Reveal --- */
  var items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --- Buchungsformular ---
     Hinweis: Noch kein Endpoint hinterlegt. Sobald das Formular an einen
     Dienst (z. B. Formspree) oder ein eigenes Backend geht, hier das
     preventDefault entfernen und action/method im HTML setzen. */
  var form = document.getElementById('bookingForm');
  var hint = document.getElementById('formHint');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        hint.textContent = 'Bitte Name und E-Mail ausfüllen.';
        form.reportValidity();
        return;
      }

      hint.textContent = 'Formularversand ist noch nicht eingerichtet – bitte Endpoint hinterlegen.';
    });
  }

  /* --- Jahreszahl im Footer --- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
