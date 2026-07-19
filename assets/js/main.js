/**
 * Diana & Sans Apartamentos Boutique
 * Main JavaScript
 */

(function() {
  'use strict';

  // ===========================
  // Navbar — Hidden until 40px scroll
  // ===========================
  var navbar = document.querySelector('.navbar');
  var navbarHidden = true;

  function handleNavbarScroll() {
    var currentScroll = window.pageYOffset;

    // Show after 40px
    if (currentScroll > 40 && navbarHidden) {
      navbar.classList.add('navbar--visible');
      navbarHidden = false;
    } else if (currentScroll <= 40 && !navbarHidden) {
      navbar.classList.remove('navbar--visible');
      navbarHidden = true;
    }

    // Scrolled state (blur + border)
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
  var toggle = document.querySelector('.navbar__toggle');
  var mobileMenu = document.querySelector('.navbar__mobile-menu');
  var mobileLinks = document.querySelectorAll('.navbar__mobile-menu .navbar__link');
  var menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    var spans = toggle.querySelectorAll('span');
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
  // Hero Entrance — Premium Sequence
  // Each element 150-250ms apart
  // ===========================
  function heroEntrance() {
    var hero = document.querySelector('.hero');
    var elements = document.querySelectorAll('[data-hero]');

    if (!hero || elements.length === 0) return;

    hero.classList.add('loaded');

    // Timings: 150-250ms gaps, organic feel
    // 0: signature   — 500ms
    // 1: title       — 850ms   (+350)
    // 2: boutique    — 1300ms  (+450 — title needs to land first)
    // 3: subtitle    — 1700ms  (+400)
    // 4: description — 2200ms  (+500 — breathing pause)
    // 5: cta         — 2700ms  (+500)
    // 6: scroll      — 4200ms  (late arrival, CSS handles delay too)
    var timings = [500, 850, 1300, 1700, 2200, 2700, 4200];

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
      var rate = scrolled * 0.15;
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
