// Peinture Sainte-Thérèse — interactions slow & artisan
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // FAQ accordion (close others on open)
  var details = document.querySelectorAll('.faq-list details');
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        details.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });

  // Slow reveals on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    var stagger = function (selector, step) {
      document.querySelectorAll(selector).forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * step) + 'ms';
        io.observe(el);
      });
    };

    document.querySelectorAll('.section-title, .lede, .approche-step, .aside-card').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
    stagger('.spec-grid .spec-card', 140);
    stagger('.galerie-grid .card-wood', 130);
    stagger('.temoignages-grid blockquote', 160);
    stagger('.zones-cols > div', 140);
  }
})();
