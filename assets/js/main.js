/**
 * Diana & Sans Apartamentos Boutique
 * Main JavaScript
 */

(function() {
  'use strict';

  // ===========================
  // Navbar Scroll Behavior
  // ===========================
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===========================
  // Mobile Menu
  // ===========================
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-menu .navbar__link');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const spans = toggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      spans[2].style.width = '100%';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      spans[2].style.width = '80%';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (menuOpen) toggleMenu();
    });
  });

  // ===========================
  // Hero Entrance — Life-like Sequence
  // ===========================
  function heroEntrance() {
    var hero = document.querySelector('.hero');
    var elements = document.querySelectorAll('[data-hero]');

    if (!hero || elements.length === 0) return;

    // Mark hero as loaded — triggers CSS opacity transitions for glow + arch
    hero.classList.add('loaded');

    // Stagger timings: organic, not mechanical
    // 0: signature    — 600ms
    // 1: title        — 1100ms
    // 2: boutique     — 1800ms (300ms after title settles)
    // 3: subtitle     — 2300ms
    // 4: description  — 3000ms (110px breathing room = visual pause)
    // 5: cta          — 3600ms (60px gap = final invitation)
    var timings = [600, 1100, 1800, 2300, 3000, 3600];

    elements.forEach(function(el) {
      var index = parseInt(el.getAttribute('data-hero'), 10);
      var delay = timings[index] || 2000;

      setTimeout(function() {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    });
  }

  // ===========================
  // Scroll Reveal Animations
  // ===========================
  var revealElements = document.querySelectorAll('[data-reveal]');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    var triggerPoint = windowHeight * 0.85;

    revealElements.forEach(function(el) {
      var elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerPoint) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);

  // ===========================
  // Smooth Scroll for Anchors
  // ===========================
  var anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));

      if (target) {
        var offsetTop = target.offsetTop - 72;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================
  // Opiniones Carousel
  // ===========================
  var quotes = document.querySelectorAll('.opinione');
  var dots = document.querySelectorAll('.opiniones__nav-dot');
  var currentQuote = 0;

  function showQuote(index) {
    quotes.forEach(function(q, i) {
      q.style.display = i === index ? 'flex' : 'none';
    });

    dots.forEach(function(d, i) {
      d.classList.toggle('active', i === index);
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      currentQuote = i;
      showQuote(currentQuote);
    });
  });

  if (quotes.length > 0) {
    showQuote(0);
  }

  if (quotes.length > 1) {
    setInterval(function() {
      currentQuote = (currentQuote + 1) % quotes.length;
      showQuote(currentQuote);
    }, 6000);
  }

  // ===========================
  // Parallax on Hero Glow
  // ===========================
  var heroGlow = document.querySelector('.hero__glow');

  if (heroGlow) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      var rate = scrolled * 0.2;
      heroGlow.style.transform = 'translate(-50%, calc(-50% + ' + rate + 'px))';
    }, { passive: true });
  }

  // ===========================
  // Initialize on Load
  // ===========================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    heroEntrance();
  });

})();
