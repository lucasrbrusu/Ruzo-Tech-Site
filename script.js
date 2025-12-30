const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

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

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

anchorLinks.forEach((link) => {
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;
  link.addEventListener('click', (event) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
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
    if (document.querySelector('.cookie-banner')) return document.querySelector('.cookie-banner');
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
    if (showPreferences && prefsPanel) {
      prefsPanel.classList.add('open');
    }

    return banner;
  };

  const consent = parseConsent();
  if (consent) {
    applyConsent(consent);
  } else {
    createBanner();
  }

  // Allow users to reopen the preferences UI from any "cookie-preferences-trigger" link/button.
  const openPreferences = () => {
    const existing = document.querySelector('.cookie-banner');
    if (existing) {
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
