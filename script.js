const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggles = document.querySelectorAll('.theme-toggle');
const currencySelect = document.querySelector('[data-currency-select]');
const priceLines = document.querySelectorAll('[data-price-gbp]');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const landingIntro = document.querySelector('.landing-intro');
const landingPromoLines = document.querySelectorAll('[data-landing-line]');
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
  if (window.scrollY > 32) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
};

const updateLandingIntroState = () => {
  if (!landingIntro) return;

  const fadeDistance = Math.max(landingIntro.offsetHeight * 0.7, 1);
  const progress = Math.min(window.scrollY / fadeDistance, 1);
  landingIntro.style.opacity = String(1 - progress);
};

const updateScrollState = () => {
  updateHeaderState();
  updateLandingIntroState();
};

window.addEventListener('scroll', updateScrollState);
window.addEventListener('resize', updateLandingIntroState);
updateScrollState();

anchorLinks.forEach((link) => {
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;

  link.addEventListener('click', (event) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
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
