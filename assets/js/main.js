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
  let lastScroll = 0;

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    lastScroll = currentScroll;
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

    // Animate toggle
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
  // Scroll Reveal Animations
  // ===========================
  const revealElements = document.querySelectorAll('[data-reveal]');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;

    revealElements.forEach(function(el) {
      const elementTop = el.getBoundingClientRect().top;

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
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const offsetTop = target.offsetTop - 72;
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
  const quotes = document.querySelectorAll('.opinione');
  const dots = document.querySelectorAll('.opiniones__nav-dot');
  let currentQuote = 0;

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

  // Initialize
  if (quotes.length > 0) {
    showQuote(0);
  }

  // Auto-advance
  if (quotes.length > 1) {
    setInterval(function() {
      currentQuote = (currentQuote + 1) % quotes.length;
      showQuote(currentQuote);
    }, 6000);
  }

  // ===========================
  // Parallax on Hero Glow
  // ===========================
  const heroGlow = document.querySelector('.hero__glow');

  if (heroGlow) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroGlow.style.transform = 'translate(-50%, calc(-50% + ' + rate + 'px))';
    }, { passive: true });
  }

  // ===========================
  // Cursor Glow Effect (Desktop)
  // ===========================
  if (window.innerWidth > 1024) {
    const hero = document.querySelector('.hero');

    if (hero) {
      hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        hero.style.setProperty('--mouse-x', x + 'px');
        hero.style.setProperty('--mouse-y', y + 'px');
      });
    }
  }

  // ===========================
  // Page Load Animation
  // ===========================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Stagger hero content
    const heroContent = document.querySelectorAll('.hero__content > *');
    heroContent.forEach(function(el, i) {
      setTimeout(function() {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + (i * 120));
    });
  });

})();
