'use strict';

/*-----------------------------------*\
  #HELPERS
\*-----------------------------------*/

/**
 * Attach the same event listener to several elements.
 * @param {NodeList} elements - collection of elements
 * @param {string} eventType - event name
 * @param {Function} callback - handler
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*-----------------------------------*\
  #PRELOADER
\*-----------------------------------*/

const preloader = document.querySelector('[data-preloader]');

if (preloader) {
  window.addEventListener('DOMContentLoaded', function () {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
  });
}

/*-----------------------------------*\
  #NAVIGATION
  Mobile drawer + overlay + Escape key
\*-----------------------------------*/

const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navLinks = document.querySelectorAll('.navbar-link');

const closeNavbar = function () {
  if (!navbar) return;
  navbar.classList.remove('active');
  navToggleBtn.classList.remove('active');
  navToggleBtn.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('active');
  document.body.classList.remove('nav-active');
};

const toggleNavbar = function () {
  if (!navbar) return;
  const isOpen = navbar.classList.toggle('active');
  navToggleBtn.classList.toggle('active', isOpen);
  navToggleBtn.setAttribute('aria-expanded', String(isOpen));
  overlay.classList.toggle('active', isOpen);
  document.body.classList.toggle('nav-active', isOpen);
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

// close the drawer after choosing a destination
addEventOnElements(navLinks, 'click', closeNavbar);

// close with the Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeNavbar();
});

/*-----------------------------------*\
  #HEADER
  Add a solid background once the page is scrolled
\*-----------------------------------*/

const header = document.querySelector('[data-header]');

if (header) {
  const updateHeader = function () {
    header.classList.toggle('active', window.scrollY >= 40);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/*-----------------------------------*\
  #SCROLL PROGRESS
  A thin reading-progress line at the top
\*-----------------------------------*/

const scrollProgress = document.querySelector('[data-scroll-progress]');

if (scrollProgress) {
  let progressTicking = false;

  const updateScrollProgress = function () {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
    progressTicking = false;
  };

  const requestProgressUpdate = function () {
    if (progressTicking) return;
    progressTicking = true;
    window.requestAnimationFrame(updateScrollProgress);
  };

  updateScrollProgress();
  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate);
  window.addEventListener('load', updateScrollProgress);

  if ('ResizeObserver' in window) {
    new ResizeObserver(requestProgressUpdate).observe(document.body);
  }
}

/*-----------------------------------*\
  #TYPING ANIMATION
  Any element with data-typing="phrase one|phrase two"
\*-----------------------------------*/

const typedElements = document.querySelectorAll('[data-typing]');

typedElements.forEach(function (element) {
  const phrases = element.dataset.typing.split('|').filter(Boolean);

  if (!phrases.length) return;

  // respect users who prefer less motion
  if (prefersReducedMotion) {
    element.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = function () {
    const phrase = phrases[phraseIndex];
    element.textContent = phrase.slice(0, charIndex);

    if (!isDeleting) {
      if (charIndex < phrase.length) {
        charIndex++;
        setTimeout(tick, 65);
      } else {
        isDeleting = true;
        setTimeout(tick, 1800);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(tick, 32);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 350);
      }
    }
  };

  tick();
});

/*-----------------------------------*\
  #SCROLL REVEAL
  Fade content in as it enters the viewport
\*-----------------------------------*/

const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add('revealed');
  });
}

/*-----------------------------------*\
  #ANIMATED SKILL BARS
  Fill each bar when it scrolls into view
\*-----------------------------------*/

const progressBars = document.querySelectorAll('[data-progress]');

const fillBar = function (bar) {
  bar.style.width = bar.dataset.progress + '%';
};

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const barObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        fillBar(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  progressBars.forEach(function (bar) {
    barObserver.observe(bar);
  });
} else {
  progressBars.forEach(fillBar);
}

/*-----------------------------------*\
  #SLIDERS
  Prev/next controls for [data-slider]
\*-----------------------------------*/

const sliders = document.querySelectorAll('[data-slider]');

sliders.forEach(function (slider) {
  const container = slider.querySelector('[data-slider-container]');
  const prevButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');

  if (!container || !prevButton || !nextButton) return;

  let index = 0;

  const getItems = function () {
    return Array.from(container.children);
  };

  const getVisibleCount = function () {
    const value = parseInt(getComputedStyle(slider).getPropertyValue('--slider-items'), 10);
    return isNaN(value) || value < 1 ? 1 : value;
  };

  const getStep = function () {
    const items = getItems();
    if (!items.length) return 0;

    const itemWidth = items[0].getBoundingClientRect().width;
    const styles = getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    return itemWidth + (isNaN(gap) ? 0 : gap);
  };

  const getMaxIndex = function () {
    return Math.max(0, getItems().length - getVisibleCount());
  };

  const update = function () {
    const maxIndex = getMaxIndex();

    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    container.style.transform = 'translate3d(' + (-index * getStep()) + 'px, 0, 0)';

    prevButton.disabled = index === 0;
    nextButton.disabled = index >= maxIndex;
  };

  prevButton.addEventListener('click', function () {
    index -= 1;
    update();
  });

  nextButton.addEventListener('click', function () {
    index += 1;
    update();
  });

  window.addEventListener('resize', update);
  window.addEventListener('load', update);

  update();
});

/*-----------------------------------*\
  #FOOTER YEAR
\*-----------------------------------*/

const yearElements = document.querySelectorAll('[data-year]');

yearElements.forEach(function (element) {
  element.textContent = new Date().getFullYear();
});
