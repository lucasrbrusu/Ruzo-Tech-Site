const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggles = document.querySelectorAll('.theme-toggle');
const currencySelect = document.querySelector('[data-currency-select]');
const priceLines = document.querySelectorAll('[data-price-gbp]');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const landingIntro = document.querySelector('.landing-intro');
const aboutIntro = document.querySelector('.about-intro');
const homeHero = document.querySelector('.hero');
const homePanels = Array.from(document.querySelectorAll('[data-home-panel]'));
const servicePanelCards = Array.from(document.querySelectorAll('#projects .project-card[data-service-panel]'));
const aboutDetailTriggers = Array.from(document.querySelectorAll('[data-about-detail-trigger]'));
const aboutModal = document.querySelector('.about-modal');
const aboutModalPanel = aboutModal?.querySelector('.service-modal__panel');
const aboutModalCloseButton = aboutModal?.querySelector('[data-about-modal-close]');
const aboutModalContent = aboutModal?.querySelector('.service-modal__content');
const aboutModalMediaPill = aboutModal?.querySelector('.about-modal__media-pill');
const aboutModalMediaCopy = aboutModal?.querySelector('.about-modal__media-copy');
const aboutModalPill = aboutModal?.querySelector('.about-modal__pill');
const aboutModalTitle = aboutModal?.querySelector('.about-modal__title');
const aboutModalLead = aboutModal?.querySelector('.about-modal__lead');
const aboutModalCopy = aboutModal?.querySelector('[data-about-modal-copy]');
const landingPromoLines = document.querySelectorAll('[data-landing-line]');
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const isHomePage = document.body.classList.contains('home-page');
const isServicesPage = document.body.classList.contains('services-page');
const hasScrollReactiveHeader = isHomePage || isServicesPage;

const THEME_KEY = 'ruzotech-theme';
const CURRENCY_KEY = 'ruzotech-currency';
const CURRENCIES = {
  GBP: { symbol: '\u00A3' },
  USD: { symbol: '$' },
  EUR: { symbol: '\u20AC' },
};
const CURRENCY_PRICES = {
  GBP: {
    'landing-page': 200,
    business: 450,
    'basic-care': 19,
    'care-plus': 39,
    'ultimate-growth': 79,
    'unlimited-care': 129,
  },
  USD: {
    'landing-page': 250,
    business: 550,
    'basic-care': 24,
    'care-plus': 50,
    'ultimate-growth': 100,
    'unlimited-care': 165,
  },
  EUR: {
    'landing-page': 230,
    business: 530,
    'basic-care': 22,
    'care-plus': 49,
    'ultimate-growth': 90,
    'unlimited-care': 150,
  },
};

const HOME_PANEL_BREAKPOINT = 900;
const HOME_PANEL_LERP = 0.13;
const HOME_PANEL_SETTLE_EPSILON = 0.12;
const HOME_PANEL_VISUAL_EPSILON = 0.002;
const HOME_PANEL_TRACKING_MS = 220;
const HOME_HEADER_HIDE_SCROLL_Y = 140;
const HOME_HEADER_TOP_ZONE = 40;
const HOME_HEADER_DIRECTION_THRESHOLD = 10;
const INTRO_FADE_DELAY_RATIO = 0.24;
const ABOUT_INTRO_FADE_DISTANCE_RATIO = 0.68;
const HOME_PANEL_ENTRY_START_RATIO = 0.56;
const HOME_PANEL_ENTRY_END_RATIO = 0.08;
const HOME_PANEL_EXIT_START_RATIO = 0.08;
const HOME_PANEL_ACTIVE_ABOVE_RATIO = 0.55;
const HOME_PANEL_ACTIVE_BELOW_RATIO = 1.35;
const HOME_PANEL_DEPTH_STEP = 10;
const SERVICE_MODAL_DURATION = 560;
const SERVICE_MODAL_PADDING = 24;

const SERVICE_PANEL_DETAILS = {
  maintenance: {
    copy: 'This service is built for teams that need the site to stay sharp after launch without treating every update as a separate project. We handle the ongoing technical upkeep and practical changes that keep the website reliable, current, and conversion-ready.',
    points: [
      'Routine edits, content swaps, layout refinements, and post-launch polish.',
      'Bug fixes, plugin or dependency updates, backup checks, and release housekeeping.',
      'Performance reviews and technical cleanup to keep the site loading cleanly.',
      'A consistent support layer so issues are handled before they affect users.',
    ],
  },
  optimisation: {
    copy: 'This is for websites that are already live but need stronger performance in search, speed, and conversion. We review the page structure, technical setup, and user flow, then make targeted improvements that support visibility and lead generation.',
    points: [
      'SEO-focused page structure, metadata, headings, and on-page content refinements.',
      'Performance improvements across load speed, media handling, and front-end delivery.',
      'Analytics-led CRO changes to sharpen user flow and reduce friction.',
      'Post-launch reporting priorities so changes connect back to real outcomes.',
    ],
  },
  integrations: {
    copy: 'This service connects your website to the systems behind the business. We set up the technical handoff between the site and the tools you rely on so data, forms, admin workflows, and automations move properly end to end.',
    points: [
      'Database, CMS, and structured form connections tailored to the site workflow.',
      'CRM, booking, payment, and third-party platform integration support.',
      'Admin-side workflow setup for enquiries, content, and internal processing.',
      'Reliable implementation that keeps the website useful beyond the front end alone.',
    ],
  },
};

const ABOUT_PANEL_DETAILS = {
  story: {
    mediaLabel: 'Ruzo Tech',
    mediaCopy: 'Bespoke design, thoughtful development, and uncompromising quality at the centre of every build.',
    label: 'Learn more',
    title: 'The creative standard behind Ruzo Tech',
    lead: 'Creativity, collaboration, and performance-led execution shape the way we design and build.',
    copy: [
      'At Ruzo Tech, creativity is at the core of everything we create. What started as a passion for crafting distinctive digital experiences has evolved into a brand centred around bespoke design, thoughtful development, and uncompromising quality. We create websites and applications that are tailored to reflect the ambition, identity, and professionalism of the businesses behind them, helping brands present themselves with confidence and stand apart in a crowded digital space.',
      'We take pride in building with intention, because exceptional results come from genuine care, close collaboration, and a clear creative vision. By involving our clients throughout the journey, we ensure every final product feels true to their brand while carrying the elevated finish and performance-driven approach that defines our work. The result is more than just a digital product, it is a carefully crafted experience designed to inspire trust, strengthen presence, and deliver the kind of impact that moves a brand forward.',
    ],
  },
  founder: {
    mediaLabel: 'Meet Lucas',
    mediaCopy: 'Founder-led development with full stack depth across web and mobile.',
    label: 'Founder story',
    title: 'Meet Lucas',
    lead: 'Lucas is the founder of Ruzo Tech, a full stack developer who combines technical depth with creative thinking and a strong focus on digital craftsmanship.',
    copy: [
      'Lucas is the founder of Ruzo Tech, a full stack developer with experience in both web and mobile application development, spanning frontend and backend technologies. Currently studying Software Engineering at the University of Portsmouth, he brings together technical depth, creative thinking, and a genuine passion for digital craftsmanship. Ruzo Tech was founded as a way to turn that passion into something meaningful, creating bespoke digital experiences that help brands, businesses, and individuals bring their ideas to life with clarity and confidence.',
      'At the heart of Lucas\' approach is a strong belief in collaboration and personal connection. He works closely with every client to understand their vision, their goals, and the identity behind what they want to build, allowing each project to feel intentional, refined, and truly tailored. For him, development is not just about functionality, it is about creating digital products that feel distinctive, perform exceptionally, and deliver real value.',
      'His experience also extends into mobile applications, with projects published on major digital storefronts including the App Store. One of the most notable examples is Pillaflow, an application he fully developed and continues to grow through ongoing development and strategic marketing. Lucas\' path into software began early, shaped by a natural curiosity for technology, computers, and the possibilities behind them. What started as an interest in devices, performance, and hardware gradually evolved into a deeper passion for building software and exploring what technology could create.',
      'Looking to the future, Lucas envisions Ruzo Tech growing beyond an individual venture into a wider creative development brand, one that brings together talented collaborators who share the same passion for building exceptional digital products. The goal is to continue shaping ideas into impactful experiences and to grow Ruzo Tech into a name associated with creativity, quality, and purposeful innovation.',
    ],
  },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + ((end - start) * amount);
const getRangedProgress = (value, start, end) => {
  if (start === end) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
};

const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - (((-2 * value) + 2) ** 3) / 2
);

const getPanelSurface = (section) => section.querySelector('.home-stage__panel');

const createHomePanelValues = () => ({
  x: 0,
  y: 0,
  z: 0,
  rotateY: 0,
  rotateX: 0,
  opacity: 1,
});

const homePanelStates = homePanels
  .map((section, index) => {
    const panel = getPanelSurface(section);
    if (!panel) return null;

    return {
      index,
      section,
      panel,
      current: createHomePanelValues(),
      target: createHomePanelValues(),
      isActive: false,
      isPrimed: false,
    };
  })
  .filter(Boolean);

let homePanelAnimationFrame = 0;
let homePanelLastTimestamp = 0;
let homePanelTrackingUntil = 0;
let scrollStateFrame = 0;
let lastScrollY = window.scrollY;
let serviceModalElements = null;
let serviceModalTimer = 0;
let activeServiceCard = null;
let lastFocusedServiceElement = null;
let isServiceModalOpen = false;
let isServiceModalAnimating = false;
let shouldRestoreServiceFocus = false;
let aboutModalTimer = 0;
let lastFocusedAboutElement = null;
let isAboutModalOpen = false;
let isAboutModalAnimating = false;
let activeAboutTrigger = null;

const applyHomePanelValues = (panel, values) => {
  panel.style.transform = `translate3d(${values.x.toFixed(2)}px, ${values.y.toFixed(2)}px, ${values.z.toFixed(2)}px) rotateY(${values.rotateY.toFixed(2)}deg) rotateX(${values.rotateX.toFixed(2)}deg)`;
  panel.style.opacity = values.opacity.toFixed(3);
};

const assignHomePanelValues = (target, values) => {
  target.x = values.x;
  target.y = values.y;
  target.z = values.z;
  target.rotateY = values.rotateY;
  target.rotateX = values.rotateX;
  target.opacity = values.opacity;
};

const isHomePanelSettled = (current, target) => (
  Math.abs(current.x - target.x) < HOME_PANEL_SETTLE_EPSILON
  && Math.abs(current.y - target.y) < HOME_PANEL_SETTLE_EPSILON
  && Math.abs(current.z - target.z) < HOME_PANEL_SETTLE_EPSILON
  && Math.abs(current.rotateY - target.rotateY) < HOME_PANEL_SETTLE_EPSILON
  && Math.abs(current.rotateX - target.rotateX) < HOME_PANEL_SETTLE_EPSILON
  && Math.abs(current.opacity - target.opacity) < HOME_PANEL_VISUAL_EPSILON
);

const isHomePanelActive = (rect, viewportHeight) => (
  rect.bottom > -(viewportHeight * HOME_PANEL_ACTIVE_ABOVE_RATIO)
  && rect.top < (viewportHeight * HOME_PANEL_ACTIVE_BELOW_RATIO)
);

const getHomePanelTargetValues = (state, rect, viewportHeight) => {
  const direction = state.section.dataset.panelSide === 'left' ? -1 : 1;
  const entryStart = viewportHeight * HOME_PANEL_ENTRY_START_RATIO;
  const entryEnd = viewportHeight * HOME_PANEL_ENTRY_END_RATIO;
  const entryProgress = easeInOutCubic(getRangedProgress(rect.top, entryStart, entryEnd));
  const exitStart = viewportHeight * HOME_PANEL_EXIT_START_RATIO;
  const exitEnd = -Math.min(rect.height * 0.3, viewportHeight * 0.38);
  const exitProgress = easeInOutCubic(getRangedProgress(rect.bottom, exitStart, exitEnd));
  const depthBias = state.index * HOME_PANEL_DEPTH_STEP;

  return {
    x: direction * (((1 - entryProgress) * 400) - (exitProgress * 48)),
    y: ((1 - entryProgress) * 108) - (exitProgress * 32),
    z: -((1 - entryProgress) * 500) - (exitProgress * 104) - depthBias,
    rotateY: direction * (((1 - entryProgress) * 38) - (exitProgress * 10)),
    rotateX: ((1 - entryProgress) * 7.5) - (exitProgress * 2.8),
    opacity: clamp(0.02 + (entryProgress * 0.98) - (exitProgress * 0.08), 0, 1),
  };
};

const updateHomePanelTargets = () => {
  if (!homePanelStates.length) return false;

  if (!shouldAnimateHomePanels()) {
    resetHomePanelState();
    return false;
  }

  const viewportHeight = Math.max(window.innerHeight, 1);
  let needsAnimation = false;

  homePanelStates.forEach((state) => {
    const rect = state.section.getBoundingClientRect();
    const nextValues = getHomePanelTargetValues(state, rect, viewportHeight);
    state.isActive = isHomePanelActive(rect, viewportHeight);
    assignHomePanelValues(state.target, nextValues);

    if (!state.isPrimed || !state.isActive) {
      const shouldSyncImmediately = !state.isPrimed || !isHomePanelSettled(state.current, nextValues);
      assignHomePanelValues(state.current, nextValues);
      state.isPrimed = true;
      if (shouldSyncImmediately) {
        applyHomePanelValues(state.panel, state.current);
      }
      return;
    }

    if (!isHomePanelSettled(state.current, state.target)) {
      needsAnimation = true;
    }
  });

  return needsAnimation;
};

const stopHomePanelAnimation = () => {
  if (homePanelAnimationFrame) {
    window.cancelAnimationFrame(homePanelAnimationFrame);
    homePanelAnimationFrame = 0;
  }

  homePanelLastTimestamp = 0;
};

const runHomePanelAnimation = (timestamp) => {
  homePanelAnimationFrame = 0;

  if (!shouldAnimateHomePanels()) {
    resetHomePanelState();
    return;
  }

  const isTrackingScroll = timestamp < homePanelTrackingUntil;
  if (isTrackingScroll) {
    updateHeaderState();
    updateLandingIntroState();
    updateHomePanelTargets();
  }

  const frameRatio = homePanelLastTimestamp
    ? clamp((timestamp - homePanelLastTimestamp) / 16.67, 0.65, 2.2)
    : 1;
  const amount = 1 - ((1 - HOME_PANEL_LERP) ** frameRatio);
  homePanelLastTimestamp = timestamp;

  let needsAnotherFrame = false;

  homePanelStates.forEach((state) => {
    if (!state.isPrimed || !state.isActive) return;

    const { current, target, panel } = state;

    current.x = lerp(current.x, target.x, amount);
    current.y = lerp(current.y, target.y, amount);
    current.z = lerp(current.z, target.z, amount);
    current.rotateY = lerp(current.rotateY, target.rotateY, amount);
    current.rotateX = lerp(current.rotateX, target.rotateX, amount);
    current.opacity = lerp(current.opacity, target.opacity, amount);

    if (isHomePanelSettled(current, target)) {
      assignHomePanelValues(current, target);
    } else {
      needsAnotherFrame = true;
    }

    applyHomePanelValues(panel, current);
  });

  if (needsAnotherFrame || isTrackingScroll) {
    homePanelAnimationFrame = window.requestAnimationFrame(runHomePanelAnimation);
  } else {
    homePanelLastTimestamp = 0;
  }
};

const startHomePanelAnimation = () => {
  if (homePanelAnimationFrame || !shouldAnimateHomePanels()) return;
  homePanelAnimationFrame = window.requestAnimationFrame(runHomePanelAnimation);
};

const resetHomePanelState = () => {
  stopHomePanelAnimation();

  homePanelStates.forEach((state) => {
    const defaults = createHomePanelValues();
    assignHomePanelValues(state.current, defaults);
    assignHomePanelValues(state.target, defaults);
    state.isActive = false;
    state.isPrimed = false;

    const { panel } = state;
    panel.style.removeProperty('transform');
    panel.style.removeProperty('opacity');
  });
};

const shouldAnimateHomePanels = () => (
  homePanelStates.length > 0
  && !reduceMotionQuery.matches
  && window.innerWidth > HOME_PANEL_BREAKPOINT
);

const getServiceModalDuration = () => (reduceMotionQuery.matches ? 0 : SERVICE_MODAL_DURATION);

const clearServiceModalTimer = () => {
  if (!serviceModalTimer) return;
  window.clearTimeout(serviceModalTimer);
  serviceModalTimer = 0;
};

const getServiceCardRect = (card) => {
  const rect = card.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
};

const getServiceModalTargetRect = () => {
  const padding = window.innerWidth <= 640 ? 12 : SERVICE_MODAL_PADDING;
  const width = Math.min(1080, Math.max(window.innerWidth - (padding * 2), 240));
  const height = Math.min(
    window.innerWidth <= 900 ? 760 : 680,
    Math.max(window.innerHeight - (padding * 2), 280),
  );

  return {
    top: Math.max((window.innerHeight - height) / 2, padding),
    left: Math.max((window.innerWidth - width) / 2, padding),
    width,
    height,
  };
};

const setServiceModalRect = (panel, rect) => {
  panel.style.top = `${rect.top.toFixed(2)}px`;
  panel.style.left = `${rect.left.toFixed(2)}px`;
  panel.style.width = `${rect.width.toFixed(2)}px`;
  panel.style.height = `${rect.height.toFixed(2)}px`;
};

const getServiceCardData = (card) => {
  if (!card) return null;

  const key = card.dataset.servicePanel;
  const details = SERVICE_PANEL_DETAILS[key];
  const image = card.querySelector('img');
  const pill = card.querySelector('.pill');
  const title = card.querySelector('h3');
  const summary = card.querySelector('.project-body p');

  if (!details || !image || !title || !summary) return null;

  return {
    key,
    label: pill?.textContent?.trim() || '',
    title: title.textContent.trim(),
    summary: summary.textContent.trim(),
    copy: details.copy,
    points: details.points,
    imageSrc: image.currentSrc || image.getAttribute('src') || '',
    imageAlt: image.getAttribute('alt') || title.textContent.trim(),
  };
};

const ensureServiceModalElements = () => {
  if (serviceModalElements) return serviceModalElements;

  const modal = document.createElement('div');
  modal.className = 'service-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="service-modal__panel" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <button class="service-modal__close" type="button" aria-label="Close service details">X</button>
      <div class="service-modal__card-preview" aria-hidden="true"></div>
      <div class="service-modal__inner">
        <div class="service-modal__media">
          <div class="service-modal__image-frame">
            <img class="service-modal__image" alt="" />
          </div>
        </div>
        <div class="service-modal__content">
          <div class="pill light service-modal__pill"></div>
          <h3 class="service-modal__title" id="service-modal-title"></h3>
          <p class="service-modal__lead"></p>
          <p class="service-modal__copy"></p>
          <ul class="service-modal__points"></ul>
          <div class="service-modal__actions">
            <a class="btn primary service-modal__link" href="services.html">Go to services &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  serviceModalElements = {
    modal,
    panel: modal.querySelector('.service-modal__panel'),
    closeButton: modal.querySelector('.service-modal__close'),
    image: modal.querySelector('.service-modal__image'),
    pill: modal.querySelector('.service-modal__pill'),
    title: modal.querySelector('.service-modal__title'),
    lead: modal.querySelector('.service-modal__lead'),
    copy: modal.querySelector('.service-modal__copy'),
    points: modal.querySelector('.service-modal__points'),
    preview: modal.querySelector('.service-modal__card-preview'),
    content: modal.querySelector('.service-modal__content'),
  };

  serviceModalElements.closeButton?.addEventListener('click', () => {
    closeServiceModal();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeServiceModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isServiceModalOpen) {
      event.preventDefault();
      closeServiceModal();
    }
  });

  window.addEventListener('resize', () => {
    if (!isServiceModalOpen || !serviceModalElements) return;
    setServiceModalRect(serviceModalElements.panel, getServiceModalTargetRect());
  });

  return serviceModalElements;
};

const populateServiceModal = (card) => {
  const elements = ensureServiceModalElements();
  const data = getServiceCardData(card);
  if (!data) return null;

  elements.image.src = data.imageSrc;
  elements.image.alt = data.imageAlt;
  elements.pill.textContent = data.label;
  elements.title.textContent = data.title;
  elements.lead.textContent = data.summary;
  elements.copy.textContent = data.copy;
  elements.points.innerHTML = data.points.map((point) => `<li>${point}</li>`).join('');
  if (elements.content) elements.content.scrollTop = 0;

  if (elements.preview) {
    const previewCard = card.cloneNode(true);
    previewCard.removeAttribute('tabindex');
    previewCard.removeAttribute('role');
    previewCard.removeAttribute('aria-haspopup');
    previewCard.removeAttribute('aria-label');
    previewCard.removeAttribute('aria-expanded');
    previewCard.removeAttribute('data-service-panel');
    elements.preview.replaceChildren(previewCard);
  }

  return elements;
};

const finalizeServiceModalClose = () => {
  clearServiceModalTimer();

  if (serviceModalElements) {
    serviceModalElements.modal.classList.remove('is-open', 'is-visible', 'is-closing');
    serviceModalElements.modal.setAttribute('aria-hidden', 'true');
  }

  document.body.classList.remove('service-modal-open');
  document.documentElement.classList.remove('service-modal-open');
  activeServiceCard?.setAttribute('aria-expanded', 'false');
  isServiceModalOpen = false;
  isServiceModalAnimating = false;

  if (shouldRestoreServiceFocus && lastFocusedServiceElement instanceof HTMLElement) {
    lastFocusedServiceElement.focus({ preventScroll: true });
  } else if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  activeServiceCard = null;
  lastFocusedServiceElement = null;
  shouldRestoreServiceFocus = false;
};

const closeServiceModal = () => {
  if (!serviceModalElements || !isServiceModalOpen || isServiceModalAnimating) return;

  clearServiceModalTimer();
  isServiceModalAnimating = true;
  isServiceModalOpen = false;

  const { modal, panel } = serviceModalElements;
  const duration = getServiceModalDuration();
  const endRect = activeServiceCard ? getServiceCardRect(activeServiceCard) : getServiceModalTargetRect();

  modal.classList.add('is-closing');
  modal.classList.remove('is-open');

  if (duration === 0) {
    setServiceModalRect(panel, endRect);
    finalizeServiceModalClose();
    return;
  }

  window.requestAnimationFrame(() => {
    setServiceModalRect(panel, endRect);
  });

  serviceModalTimer = window.setTimeout(() => {
    finalizeServiceModalClose();
  }, duration);
};

const openServiceModal = (card, restoreFocusOnClose = false) => {
  if (!card || isServiceModalAnimating || isServiceModalOpen) return;

  const elements = populateServiceModal(card);
  if (!elements) return;

  clearServiceModalTimer();
  activeServiceCard = card;
  lastFocusedServiceElement = document.activeElement instanceof HTMLElement ? document.activeElement : card;
  shouldRestoreServiceFocus = restoreFocusOnClose;
  activeServiceCard.setAttribute('aria-expanded', 'true');

  const startRect = getServiceCardRect(card);
  const endRect = getServiceModalTargetRect();
  const duration = getServiceModalDuration();

  isServiceModalAnimating = true;
  isServiceModalOpen = true;

  document.body.classList.add('service-modal-open');
  document.documentElement.classList.add('service-modal-open');
  elements.modal.setAttribute('aria-hidden', 'false');
  elements.modal.classList.remove('is-open', 'is-closing');
  elements.panel.style.transition = 'none';
  setServiceModalRect(elements.panel, startRect);
  void elements.panel.offsetWidth;
  elements.panel.style.removeProperty('transition');
  elements.modal.classList.add('is-visible');

  if (duration === 0) {
    setServiceModalRect(elements.panel, endRect);
    elements.modal.classList.add('is-open');
    isServiceModalAnimating = false;
    elements.closeButton.focus({ preventScroll: true });
    return;
  }

  window.requestAnimationFrame(() => {
    setServiceModalRect(elements.panel, endRect);
    elements.modal.classList.add('is-open');
  });

  serviceModalTimer = window.setTimeout(() => {
    isServiceModalAnimating = false;
    elements.closeButton.focus({ preventScroll: true });
  }, duration);
};

const clearAboutModalTimer = () => {
  if (!aboutModalTimer) return;
  window.clearTimeout(aboutModalTimer);
  aboutModalTimer = 0;
};

const getAboutModalTargetRect = () => {
  const padding = window.innerWidth <= 640 ? 12 : SERVICE_MODAL_PADDING;
  const width = Math.min(960, Math.max(window.innerWidth - (padding * 2), 240));
  const height = Math.min(
    window.innerWidth <= 900 ? 760 : 660,
    Math.max(window.innerHeight - (padding * 2), 280),
  );

  return {
    top: Math.max((window.innerHeight - height) / 2, padding),
    left: Math.max((window.innerWidth - width) / 2, padding),
    width,
    height,
  };
};

const populateAboutModal = (detailKey) => {
  const details = ABOUT_PANEL_DETAILS[detailKey];

  if (
    !details
    || !aboutModalMediaPill
    || !aboutModalMediaCopy
    || !aboutModalPill
    || !aboutModalTitle
    || !aboutModalLead
    || !aboutModalCopy
  ) {
    return false;
  }

  aboutModalMediaPill.textContent = details.mediaLabel;
  aboutModalMediaCopy.textContent = details.mediaCopy;
  aboutModalPill.textContent = details.label;
  aboutModalTitle.textContent = details.title;
  aboutModalLead.textContent = details.lead;
  aboutModalCopy.innerHTML = details.copy.map((paragraph) => `<p>${paragraph}</p>`).join('');

  return true;
};

const getAboutModalSourceRect = (trigger) => {
  const card = trigger?.closest('[data-about-detail-card]');
  if (!card) return getAboutModalTargetRect();

  const rect = card.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
};

const finalizeAboutModalClose = () => {
  clearAboutModalTimer();

  if (aboutModal) {
    aboutModal.classList.remove('is-open', 'is-visible', 'is-closing');
    aboutModal.setAttribute('aria-hidden', 'true');
  }

  document.body.classList.remove('about-modal-open');
  document.documentElement.classList.remove('about-modal-open');
  activeAboutTrigger?.setAttribute('aria-expanded', 'false');
  isAboutModalOpen = false;
  isAboutModalAnimating = false;

  if (lastFocusedAboutElement instanceof HTMLElement) {
    lastFocusedAboutElement.focus({ preventScroll: true });
  }

  lastFocusedAboutElement = null;
  activeAboutTrigger = null;
};

const closeAboutModal = () => {
  if (!aboutModal || !isAboutModalOpen || isAboutModalAnimating) return;

  clearAboutModalTimer();
  isAboutModalAnimating = true;
  isAboutModalOpen = false;

  aboutModal.classList.add('is-closing');
  aboutModal.classList.remove('is-open');

  const duration = getServiceModalDuration();
  if (duration === 0) {
    finalizeAboutModalClose();
    return;
  }

  aboutModalTimer = window.setTimeout(() => {
    finalizeAboutModalClose();
  }, duration);
};

const openAboutModal = (trigger) => {
  if (!aboutModal || !trigger || !aboutModalPanel || !aboutModalCloseButton || isAboutModalAnimating || isAboutModalOpen) return;
  if (!populateAboutModal(trigger.dataset.aboutDetailTrigger)) return;

  clearAboutModalTimer();
  activeAboutTrigger = trigger;
  lastFocusedAboutElement = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
  activeAboutTrigger.setAttribute('aria-expanded', 'true');

  const startRect = getAboutModalSourceRect(trigger);
  const endRect = getAboutModalTargetRect();
  const duration = getServiceModalDuration();

  isAboutModalAnimating = true;
  isAboutModalOpen = true;

  document.body.classList.add('about-modal-open');
  document.documentElement.classList.add('about-modal-open');
  aboutModal.setAttribute('aria-hidden', 'false');
  aboutModal.classList.remove('is-open', 'is-closing');
  aboutModalPanel.style.transition = 'none';
  setServiceModalRect(aboutModalPanel, startRect);
  aboutModalPanel.style.removeProperty('opacity');
  aboutModalPanel.style.removeProperty('transform');
  if (aboutModalContent) aboutModalContent.scrollTop = 0;
  void aboutModalPanel.offsetWidth;
  aboutModalPanel.style.removeProperty('transition');
  aboutModal.classList.add('is-visible');

  if (duration === 0) {
    setServiceModalRect(aboutModalPanel, endRect);
    aboutModal.classList.add('is-open');
    isAboutModalAnimating = false;
    aboutModalCloseButton.focus({ preventScroll: true });
    return;
  }

  window.requestAnimationFrame(() => {
    setServiceModalRect(aboutModalPanel, endRect);
    aboutModal.classList.add('is-open');
  });

  aboutModalTimer = window.setTimeout(() => {
    isAboutModalAnimating = false;
    aboutModalCloseButton.focus({ preventScroll: true });
  }, duration);
};

const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch (e) {
    return null;
  }
};

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;
  return 'dark';
};

const getStoredCurrency = () => {
  try {
    const storedCurrency = localStorage.getItem(CURRENCY_KEY);
    return storedCurrency && CURRENCIES[storedCurrency] ? storedCurrency : null;
  } catch (e) {
    return null;
  }
};

const formatPriceAmount = (value) => (
  new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 0,
  }).format(value)
);

const updateThemeToggle = (button, theme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const icon = button.querySelector('.theme-toggle__icon');
  const text = button.querySelector('.theme-toggle__text');

  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.setAttribute('aria-label', `Switch to ${nextTheme}`);
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
  if (text) text.textContent = `${nextTheme.charAt(0).toUpperCase()}${nextTheme.slice(1)}`;
};

const applyTheme = (theme, persist = false) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggles.forEach((button) => updateThemeToggle(button, theme));

  if (!persist) return;

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // Ignore storage errors and keep the theme for the current session.
  }
};

const applyCurrency = (currencyCode, persist = false) => {
  if (!currencySelect || !priceLines.length) return;

  const currency = CURRENCIES[currencyCode] || CURRENCIES.GBP;
  currencySelect.value = currencyCode in CURRENCIES ? currencyCode : 'GBP';

  priceLines.forEach((line) => {
    const priceId = line.dataset.priceId;
    const currencyNode = line.querySelector('.price-currency');
    const amountNode = line.querySelector('.price-amount');
    if (!priceId || !currencyNode || !amountNode) return;

    const displayAmount = CURRENCY_PRICES[currencySelect.value]?.[priceId];
    if (!Number.isFinite(displayAmount)) return;

    currencyNode.textContent = currency.symbol;
    amountNode.textContent = formatPriceAmount(displayAmount);
  });

  if (!persist) return;

  try {
    localStorage.setItem(CURRENCY_KEY, currencySelect.value);
  } catch (e) {
    // Ignore storage errors and keep the selected currency for the current session.
  }
};

themeToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });
});

applyTheme(getPreferredTheme());

if (currencySelect && priceLines.length) {
  applyCurrency(getStoredCurrency() || 'GBP');

  currencySelect.addEventListener('change', (event) => {
    applyCurrency(event.target.value, true);
  });
}

if (landingPromoLines.length > 1 && !reduceMotionQuery.matches) {
  let activeLandingPromoIndex = 0;

  window.setInterval(() => {
    const currentLine = landingPromoLines[activeLandingPromoIndex];
    const nextIndex = (activeLandingPromoIndex + 1) % landingPromoLines.length;
    const nextLine = landingPromoLines[nextIndex];

    currentLine.classList.remove('is-active');
    currentLine.classList.add('is-exit');
    currentLine.setAttribute('aria-hidden', 'true');
    nextLine.setAttribute('aria-hidden', 'false');
    nextLine.classList.add('is-active');

    window.setTimeout(() => {
      currentLine.classList.remove('is-exit');
    }, 760);

    activeLandingPromoIndex = nextIndex;
  }, 5000);
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

const updateHeaderState = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 32) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }

  if (!header || !hasScrollReactiveHeader) {
    lastScrollY = currentScrollY;
    return;
  }

  const isNavOpen = navLinks?.classList.contains('open') || false;
  const scrollDelta = currentScrollY - lastScrollY;

  if (currentScrollY <= HOME_HEADER_TOP_ZONE || isNavOpen) {
    header.classList.remove('is-hidden');
  } else if (scrollDelta > HOME_HEADER_DIRECTION_THRESHOLD && currentScrollY > HOME_HEADER_HIDE_SCROLL_Y) {
    header.classList.add('is-hidden');
  } else if (scrollDelta < -HOME_HEADER_DIRECTION_THRESHOLD) {
    header.classList.remove('is-hidden');
  }

  lastScrollY = currentScrollY;
};

const updateLandingIntroState = () => {
  if (!landingIntro) return;

  const fadeDistance = Math.max(landingIntro.offsetHeight * 0.7, 1);
  const fadeDelay = fadeDistance * INTRO_FADE_DELAY_RATIO;
  const rawProgress = getRangedProgress(window.scrollY, fadeDelay, fadeDistance);
  const progress = easeInOutCubic(rawProgress);

  landingIntro.style.opacity = String(1 - progress);
  if (homeHero) homeHero.style.opacity = String(progress);
};

const updateAboutIntroState = () => {
  if (!aboutIntro) return;

  const fadeDistance = Math.max(aboutIntro.offsetHeight * ABOUT_INTRO_FADE_DISTANCE_RATIO, 1);
  const fadeDelay = fadeDistance * INTRO_FADE_DELAY_RATIO;
  const rawProgress = getRangedProgress(window.scrollY, fadeDelay, fadeDistance);
  const progress = easeInOutCubic(rawProgress);

  aboutIntro.style.opacity = String(1 - progress);
};

const updateScrollState = () => {
  updateHeaderState();
  updateLandingIntroState();
  updateAboutIntroState();
  const needsAnimation = updateHomePanelTargets();

  if (needsAnimation) {
    startHomePanelAnimation();
  }
};

const scheduleScrollState = () => {
  homePanelTrackingUntil = performance.now() + HOME_PANEL_TRACKING_MS;

  if (shouldAnimateHomePanels()) {
    startHomePanelAnimation();
  }

  if (scrollStateFrame) return;

  scrollStateFrame = window.requestAnimationFrame(() => {
    scrollStateFrame = 0;
    updateScrollState();
  });
};

window.addEventListener('scroll', scheduleScrollState, { passive: true });
window.addEventListener('resize', scheduleScrollState);
updateScrollState();

if (typeof reduceMotionQuery.addEventListener === 'function') {
  reduceMotionQuery.addEventListener('change', scheduleScrollState);
} else if (typeof reduceMotionQuery.addListener === 'function') {
  reduceMotionQuery.addListener(scheduleScrollState);
}

servicePanelCards.forEach((card) => {
  card.setAttribute('aria-expanded', 'false');

  card.addEventListener('click', () => {
    openServiceModal(card, false);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openServiceModal(card, true);
  });
});

if (aboutDetailTriggers.length && aboutModal && aboutModalPanel && aboutModalCloseButton) {
  aboutDetailTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openAboutModal(trigger);
    });
  });

  aboutModalCloseButton.addEventListener('click', () => {
    closeAboutModal();
  });

  aboutModal.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
      closeAboutModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isAboutModalOpen) {
      event.preventDefault();
      closeAboutModal();
    }
  });

  window.addEventListener('resize', () => {
    if (!isAboutModalOpen || !aboutModalPanel || aboutModal.classList.contains('is-closing')) return;
    setServiceModalRect(aboutModalPanel, getAboutModalTargetRect());
  });
}

const getElementDocumentTop = (element) => {
  let top = 0;
  let current = element;

  while (current) {
    top += current.offsetTop || 0;
    current = current.offsetParent;
  }

  return top;
};

const getAnchorScrollOffset = () => {
  const headerHeight = header?.offsetHeight || 0;
  return headerHeight + 12;
};

anchorLinks.forEach((link) => {
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;

  link.addEventListener('click', (event) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const top = Math.max(getElementDocumentTop(target) - getAnchorScrollOffset(), 0);
    window.scrollTo({
      top,
      left: 0,
      behavior: reduceMotionQuery.matches ? 'auto' : 'smooth',
    });
  });
});

// Redirect old in-page services anchors to the dedicated page
if (window.location.hash === '#services' && !window.location.pathname.includes('services.html')) {
  window.location.href = 'services.html';
}

// Cookie consent (EU/UK compliant, analytics opt-in)
(() => {
  const CONSENT_KEY = 'ruzotech-cookie-consent';
  const defaultPrefs = { necessary: true, analytics: false };

  const setCookieBannerState = (isVisible) => {
    document.body.classList.toggle('has-cookie-banner', Boolean(isVisible));
  };

  const parseConsent = () => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return {
        necessary: true,
        analytics: Boolean(parsed?.analytics),
      };
    } catch (e) {
      return null;
    }
  };

  const applyConsent = (prefs) => {
    window.__cookieConsent = prefs;
    window.__analyticsAllowed = prefs.analytics;
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: prefs }));
    if (!prefs.analytics) {
      // Placeholder flag to keep Google Analytics disabled until user opts in.
      window['ga-disable-ANALYTICS-ID'] = true;
    }
    if (prefs.analytics && typeof window.loadAnalytics === 'function') {
      window.loadAnalytics();
    }
  };

  const saveConsent = (prefs) => {
    const normalized = { necessary: true, analytics: Boolean(prefs.analytics) };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(normalized));
    applyConsent(normalized);
  };

  const createBanner = (showPreferences = false) => {
    const existingBanner = document.querySelector('.cookie-banner');
    if (existingBanner) {
      setCookieBannerState(true);
      return existingBanner;
    }

    const consent = parseConsent() || defaultPrefs;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner__header">
        <div>
          <p class="eyebrow">Cookies</p>
          <p class="cookie-banner__title">Control your cookies</p>
          <p class="cookie-banner__text">We use necessary cookies for the site to work. Analytics cookies are off until you enable them.</p>
        </div>
      </div>
      <div class="cookie-actions">
        <button type="button" class="btn primary small" data-cookie-accept>Accept all</button>
        <button type="button" class="btn ghost small" data-cookie-reject>Reject non-essential</button>
        <button type="button" class="btn small" data-cookie-manage>Manage preferences</button>
      </div>
      <div class="cookie-preferences" data-cookie-preferences>
        <div class="cookie-toggle">
          <div>
            <label for="cookie-analytics">Analytics</label>
            <p class="toggle-note">Optional. Helps us improve the site. Disabled by default.</p>
          </div>
          <input id="cookie-analytics" type="checkbox" data-cookie-analytics />
        </div>
        <div class="cookie-actions">
          <button type="button" class="btn primary small" data-cookie-save>Save choices</button>
        </div>
      </div>
    `;

    const prefsPanel = banner.querySelector('[data-cookie-preferences]');
    const analyticsToggle = banner.querySelector('[data-cookie-analytics]');
    const acceptBtn = banner.querySelector('[data-cookie-accept]');
    const rejectBtn = banner.querySelector('[data-cookie-reject]');
    const manageBtn = banner.querySelector('[data-cookie-manage]');
    const saveBtn = banner.querySelector('[data-cookie-save]');

    if (analyticsToggle) analyticsToggle.checked = Boolean(consent.analytics);

    const closeBanner = () => {
      setCookieBannerState(false);
      banner.remove();
    };

    acceptBtn?.addEventListener('click', () => {
      saveConsent({ analytics: true });
      closeBanner();
    });

    rejectBtn?.addEventListener('click', () => {
      saveConsent({ analytics: false });
      closeBanner();
    });

    manageBtn?.addEventListener('click', () => {
      prefsPanel?.classList.toggle('open');
    });

    saveBtn?.addEventListener('click', () => {
      saveConsent({ analytics: analyticsToggle?.checked });
      closeBanner();
    });

    document.body.appendChild(banner);
    setCookieBannerState(true);
    if (showPreferences && prefsPanel) {
      prefsPanel.classList.add('open');
    }

    return banner;
  };

  const consent = parseConsent();
  if (consent) {
    applyConsent(consent);
    setCookieBannerState(false);
  } else {
    createBanner();
  }

  // Allow users to reopen the preferences UI from any "cookie-preferences-trigger" link/button.
  const openPreferences = () => {
    const existing = document.querySelector('.cookie-banner');
    if (existing) {
      setCookieBannerState(true);
      const panel = existing.querySelector('[data-cookie-preferences]');
      panel?.classList.add('open');
      return;
    }
    createBanner(true);
  };

  document.querySelectorAll('.cookie-preferences-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openPreferences();
    });
  });

  window.cookiePreferences = {
    get: () => parseConsent() || defaultPrefs,
    set: saveConsent,
    open: openPreferences,
  };
})();
