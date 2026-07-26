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
  // Gallery — Staggered Reveal + Parallax
  // ===========================
  var galleryItems = document.querySelectorAll('.galeria__item');

  if (galleryItems.length > 0) {
    var hoveredItems = new Set();

    galleryItems.forEach(function(item) {
      var row = item.closest('.galeria__row');
      var siblings = row ? row.querySelectorAll('.galeria__item') : [];
      var indexInRow = Array.prototype.indexOf.call(siblings, item);

      item.setAttribute('data-delay', String(indexInRow));

      item.addEventListener('mouseenter', function() { hoveredItems.add(item); });
      item.addEventListener('mouseleave', function() { hoveredItems.delete(item); });
    });

    function revealGallery() {
      var windowHeight = window.innerHeight;
      var triggerPoint = windowHeight * 0.85;

      galleryItems.forEach(function(item) {
        var rect = item.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          item.classList.add('is-revealed');
        }
      });
    }

    window.addEventListener('scroll', revealGallery, { passive: true });
    window.addEventListener('load', revealGallery);

    // Parallax on gallery items
    function parallaxGallery() {
      var windowHeight = window.innerHeight;

      galleryItems.forEach(function(item) {
        var rect = item.getBoundingClientRect();
        var inView = rect.top < windowHeight && rect.bottom > 0;
        var img = item.querySelector('.img-placeholder');

        if (inView && item.classList.contains('is-revealed') && img) {
          var speed = parseInt(item.getAttribute('data-parallax'), 10) || 10;
          var offset = (rect.top - windowHeight * 0.5) * (speed / windowHeight);
          var isHovered = hoveredItems.has(item);
          var scaleVal = isHovered ? 1.03 : 1;
          img.style.transform = 'translateY(' + offset + 'px) scale(' + scaleVal + ')';
        } else if (img && !inView) {
          img.style.transform = '';
        }
      });
    }

    window.addEventListener('scroll', parallaxGallery, { passive: true });
  }

  // ===========================
  // Servicios — Count-Up + Scanning Glow + Cursor Glow
  // ===========================
  var servicioRows = document.querySelectorAll('.servicio-row');

  if (servicioRows.length > 0) {
    var countedItems = new Set();
    var scannedItems = new Set();

    // Count-up animation: 0 → target in 800ms
    function animateCountUp(el) {
      var target = parseInt(el.getAttribute('data-count-to'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 800;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    // Observe servicios rows for reveal
    var servicioObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var row = entry.target;
          var valueEl = row.querySelector('.servicio-row__value');
          var glowEl = row.querySelector('.servicio-row__divider-glow');

          // Count-up for numeric values
          if (valueEl && valueEl.getAttribute('data-count-to') && !countedItems.has(row)) {
            countedItems.add(row);
            animateCountUp(valueEl);
          }

          // Start scanning glow after line draws
          if (glowEl && !scannedItems.has(row)) {
            scannedItems.add(row);
            setTimeout(function() {
              glowEl.classList.add('is-scanning');
            }, 900);
          }

          servicioObserver.unobserve(row);
        }
      });
    }, { threshold: 0.5 });

    servicioRows.forEach(function(row) {
      servicioObserver.observe(row);
    });

    // Cursor glow tracking (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
      var serviciosSection = document.querySelector('.servicios');
      var cursorGlow = document.createElement('div');
      cursorGlow.className = 'servicios__cursor-glow';
      serviciosSection.style.position = 'relative';
      serviciosSection.appendChild(cursorGlow);

      serviciosSection.addEventListener('mousemove', function(e) {
        var rect = serviciosSection.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        cursorGlow.style.left = x + 'px';
        cursorGlow.style.top = y + 'px';
        cursorGlow.classList.add('is-visible');
      });

      serviciosSection.addEventListener('mouseleave', function() {
        cursorGlow.classList.remove('is-visible');
      });
    }
  }

  // ===========================
  // Entorno — Map Reveal Sequence + Cross-Hover
  // ===========================
  var mapContainer = document.querySelector('[data-map="map"]');
  var ubicacionDetails = document.querySelectorAll('.ubicacion__detail[data-map-target]');
  var mapPoints = document.querySelectorAll('.map-point[data-map-id]');
  var mapStreets = document.querySelectorAll('.map-street');
  var mapPin = document.querySelector('.map-point--primary');

  if (mapContainer) {
    // Scroll reveal sequence: streets → pin → names → list rows
    var mapObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Phase 1: streets (0ms)
          mapStreets.forEach(function(street, i) {
            setTimeout(function() {
              street.classList.add('is-revealed');
            }, i * 100);
          });

          // Phase 2: pin (400ms after streets start)
          setTimeout(function() {
            if (mapPin) mapPin.classList.add('is-revealed');
          }, 400);

          // Phase 3: other names (700ms)
          mapPoints.forEach(function(point) {
            if (!point.classList.contains('map-point--primary')) {
              setTimeout(function() {
                point.classList.add('is-revealed');
              }, 700);
            }
          });

          mapObserver.unobserve(mapContainer);
        }
      });
    }, { threshold: 0.3 });

    mapObserver.observe(mapContainer);

    // Cross-hover: list row ↔ map point
    ubicacionDetails.forEach(function(detail) {
      var targetId = detail.getAttribute('data-map-target');
      var point = document.querySelector('.map-point[data-map-id="' + targetId + '"]');

      if (point) {
        detail.addEventListener('mouseenter', function() {
          point.classList.add('is-active');
        });
        detail.addEventListener('mouseleave', function() {
          point.classList.remove('is-active');
        });

        point.addEventListener('mouseenter', function() {
          detail.classList.add('is-active');
        });
        point.addEventListener('mouseleave', function() {
          detail.classList.remove('is-active');
        });
      }
    });
  }

  // ===========================
  // Experience Words — Scroll Narrative v3
  // Crossfade: current fades, next starts appearing
  // No empty moment between words
  // ===========================
  var experienceWords = document.querySelectorAll('[data-word]');
  var closingBlock = document.querySelector('.experiencia-words__closing');

  if (experienceWords.length > 0) {
    function updateWords() {
      var windowHeight = window.innerHeight;
      var triggerPoint = windowHeight * 0.65;

      var closestIndex = -1;
      var closestDistance = Infinity;

      experienceWords.forEach(function(word, i) {
        var rect = word.getBoundingClientRect();
        var wordCenter = rect.top + rect.height / 2;
        var distance = Math.abs(wordCenter - triggerPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      experienceWords.forEach(function(word, i) {
        word.classList.remove('is-visible', 'is-past', 'is-next');

        if (i < closestIndex) {
          word.classList.add('is-past');
          word.classList.add('is-visible');
        } else if (i === closestIndex) {
          word.classList.add('is-visible');
          // Next word starts appearing (crossfade)
          if (i + 1 < experienceWords.length) {
            experienceWords[i + 1].classList.add('is-next');
          }
        }
      });

      if (closingBlock && closestIndex === experienceWords.length - 1) {
        closingBlock.classList.add('is-visible');
      } else if (closingBlock) {
        closingBlock.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', updateWords, { passive: true });
    window.addEventListener('load', updateWords);
  }

  // ===========================
  // Initialize on Load
  // ===========================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    heroEntrance();
  });

})();
