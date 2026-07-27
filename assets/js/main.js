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
    var hero = document.querySelector('.hero') || document.querySelector('.es-hero');
    var elements = document.querySelectorAll('[data-hero]');

    if (!hero || elements.length === 0) return;

    hero.classList.add('loaded');

    var timings = [500, 850, 1300, 1700, 2200];

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
  // Opiniones Carousel — Fade + Slide
  // ===========================
  var quotes = document.querySelectorAll('.opinione');
  var dots = document.querySelectorAll('.opiniones__nav-dot');
  var currentQuote = 0;
  var isAnimating = false;

  function showQuote(index) {
    if (isAnimating || index === currentQuote) return;
    isAnimating = true;

    var current = quotes[currentQuote];
    var next = quotes[index];

    // Fade out current
    current.classList.remove('is-visible');

    setTimeout(function() {
      current.classList.remove('is-active');
      current.style.display = 'none';

      // Show next
      next.style.display = 'flex';
      next.classList.add('is-active');

      // Force reflow
      void next.offsetWidth;

      // Fade in next
      next.classList.add('is-visible');

      // Update dots
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === index);
      });

      currentQuote = index;
      isAnimating = false;
    }, 600);
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      showQuote(i);
    });
  });

  // Init: show first quote
  if (quotes.length > 0) {
    quotes[0].style.display = 'flex';
    quotes[0].classList.add('is-active');
    setTimeout(function() {
      quotes[0].classList.add('is-visible');
    }, 100);
  }

  // Auto-advance
  if (quotes.length > 1) {
    setInterval(function() {
      var next = (currentQuote + 1) % quotes.length;
      showQuote(next);
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
  // Parallax on Espacios Hero Image
  // ===========================
  var esHeroImage = document.querySelector('.es-hero__image-placeholder');
  var esHeroGlow = document.querySelector('.es-hero__glow');

  if (esHeroImage) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      var rate = scrolled * 0.08;
      esHeroImage.style.transform = 'translateY(' + rate + 'px) scale(1.02)';
    }, { passive: true });
  }

  if (esHeroGlow) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      var rate = scrolled * 0.12;
      esHeroGlow.style.transform = 'translate(-50%, calc(-50% + ' + rate + 'px))';
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
  // CTA Final — Staggered Reveal
  // ===========================
  var ctaContent = document.querySelector('.cta-final__content');

  if (ctaContent) {
    var ctaObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          ctaContent.classList.add('is-revealed');
          ctaObserver.unobserve(ctaContent);
        }
      });
    }, { threshold: 0.4 });

    ctaObserver.observe(ctaContent);
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
  // Distribución — Architectural Floor Plan
  // ===========================
  var distribucion = document.querySelector('.distribucion');

  if (distribucion) {
    var distribucionSvg = distribucion.querySelector('.distribucion__svg');
    var distribucionLines = distribucion.querySelectorAll('.distribucion__line--draw');
    var distribucionZones = distribucion.querySelectorAll('.distribucion__zone');
    var distribucionLabels = distribucion.querySelectorAll('.distribucion__label');
    var distribucionFeatures = distribucion.querySelector('#distribucion-features');
    var distribucionDrawn = false;
    var distribucionSwapping = false;

    // Zone content map
    var zoneContent = {
      habitacion: ['King Bed', 'Baño privado', 'Blackout', 'Smart TV 55"'],
      sala: ['Smart TV 55"', 'Zona de lectura', 'Wi-Fi Premium', 'Bocinas Sonos'],
      cocina: ['Nevera', 'Cafetera', 'Microondas', 'Menaje completo'],
      bano: ['Ducha de lluvia', 'Amenities premium', 'Toallas bogotanas', 'Espejo retroiluminado'],
      balcon: ['Balcón privado', 'Zona de lectura', 'Vista panorámica', 'Plantas naturales']
    };

    var defaultFeatures = ['King Bed', 'Sala', 'Cocina equipada', 'Baño privado', 'Zona de trabajo', 'Balcón'];

    function swapFeatures(items) {
      if (distribucionSwapping) return;
      distribucionSwapping = true;

      var currentFeatures = distribucionFeatures.querySelectorAll('.distribucion__feature');

      // Phase 1: fade out current
      currentFeatures.forEach(function(f) {
        f.classList.remove('distribucion__feature--entering');
        f.classList.add('distribucion__feature--leaving');
      });

      setTimeout(function() {
        // Phase 2: replace content
        distribucionFeatures.innerHTML = '';
        items.forEach(function(text) {
          var li = document.createElement('li');
          li.className = 'distribucion__feature distribucion__feature--entering';
          li.textContent = text;
          distribucionFeatures.appendChild(li);
        });

        distribucionSwapping = false;
      }, 250);
    }

    // Scroll reveal
    var distribucionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          distribucion.classList.add('revealed');

          if (!distribucionDrawn) {
            distribucionDrawn = true;
            distribucionDrawLines();
            distribucionShowLabels();
          }

          distribucionObserver.unobserve(distribucion);
        }
      });
    }, { threshold: 0.25 });

    distribucionObserver.observe(distribucion);

    // Line drawing animation
    function distribucionDrawLines() {
      distribucionLines.forEach(function(line, index) {
        var length = line.getTotalLength();
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        line.style.transition = 'none';

        void line.offsetWidth;

        setTimeout(function() {
          line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.strokeDashoffset = '0';
        }, 300 + index * 100);
      });
    }

    // Sequential label appearance
    function distribucionShowLabels() {
      distribucionLabels.forEach(function(label, index) {
        label.style.opacity = '0';
        label.style.transition = 'none';

        void label.offsetWidth;

        setTimeout(function() {
          label.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)';
          label.style.opacity = '1';
        }, 1400 + index * 200);
      });
    }

    // Zone hover interactions
    distribucionZones.forEach(function(zone) {
      var zoneName = zone.getAttribute('data-zone');
      var correspondingLabel = distribucionSvg.querySelector('.distribucion__label[data-label="' + zoneName + '"]');

      zone.addEventListener('mouseenter', function() {
        distribucionZones.forEach(function(z) {
          if (z !== zone) {
            z.style.opacity = '0.2';
          }
        });

        zone.style.fill = 'rgba(196, 168, 110, 0.04)';
        zone.style.opacity = '1';

        distribucionLabels.forEach(function(l) {
          if (l !== correspondingLabel) {
            l.style.fill = 'rgba(255, 255, 255, 0.08)';
          }
        });

        if (correspondingLabel) {
          correspondingLabel.style.fill = '#C4A86E';
        }

        // Swap features
        if (zoneContent[zoneName]) {
          swapFeatures(zoneContent[zoneName]);
        }
      });

      zone.addEventListener('mouseleave', function() {
        distribucionZones.forEach(function(z) {
          z.style.opacity = '1';
          z.style.fill = 'transparent';
        });

        distribucionLabels.forEach(function(l) {
          l.style.fill = 'rgba(255, 255, 255, 0.20)';
        });

        // Restore default features
        swapFeatures(defaultFeatures);
      });
    });
  }

  // ===========================
  // Experiencia Pause — Scroll Reveal
  // ===========================
  var experienciaPause = document.querySelector('.experiencia-pause');

  if (experienciaPause) {
    var expPauseObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          experienciaPause.classList.add('revealed');
          expPauseObserver.unobserve(experienciaPause);
        }
      });
    }, { threshold: 0.2 });

    expPauseObserver.observe(experienciaPause);
  }

  // ===========================
  // Reserva — Scroll Reveal
  // ===========================
  var reserva = document.querySelector('.reserva');

  if (reserva) {
    var reservaObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          reserva.classList.add('revealed');
          reservaObserver.unobserve(reserva);
        }
      });
    }, { threshold: 0.2 });

    reservaObserver.observe(reserva);
  }

  // ===========================
  // Closing Hero — Scroll Reveal
  // ===========================
  var closingHero = document.querySelector('.closing-hero');

  if (closingHero) {
    var closingHeroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          closingHero.classList.add('revealed');
          closingHeroObserver.unobserve(closingHero);
        }
      });
    }, { threshold: 0.15 });

    closingHeroObserver.observe(closingHero);
  }

  // ===========================
  // Site Footer — Scroll Reveal
  // ===========================
  var siteFooter = document.querySelector('.site-footer');

  if (siteFooter) {
    var footerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          siteFooter.classList.add('revealed');
          footerObserver.unobserve(siteFooter);
        }
      });
    }, { threshold: 0.15 });

    footerObserver.observe(siteFooter);
  }

  // ===========================
  // Initialize on Load
  // ===========================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    heroEntrance();
  });

})();
