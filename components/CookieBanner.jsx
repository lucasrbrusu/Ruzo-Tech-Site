'use client';

import { useEffect, useMemo, useState } from 'react';
import { COOKIE_CONSENT_KEY, GOOGLE_ANALYTICS_ID } from '@/lib/site-data';

const defaultConsent = {
  necessary: true,
  analytics: false,
};

function parseConsent() {
  try {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) return null;

    const parsedConsent = JSON.parse(storedConsent);
    return {
      necessary: true,
      analytics: Boolean(parsedConsent?.analytics),
    };
  } catch {
    return null;
  }
}

function ensureAnalyticsLoaded() {
  if (window.__analyticsLoaded) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_ID);

  if (!document.querySelector(`[data-google-analytics="${GOOGLE_ANALYTICS_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    script.dataset.googleAnalytics = GOOGLE_ANALYTICS_ID;
    document.head.appendChild(script);
  }

  window.__analyticsLoaded = true;
}

function applyConsent(consent) {
  window.__cookieConsent = consent;
  window.__analyticsAllowed = consent.analytics;
  window[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = !consent.analytics;
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: consent }));

  if (consent.analytics) {
    ensureAnalyticsLoaded();
  }
}

export function CookieBanner() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const currentConsent = useMemo(
    () => ({
      necessary: true,
      analytics: analyticsEnabled,
    }),
    [analyticsEnabled]
  );

  useEffect(() => {
    const storedConsent = parseConsent();
    const nextConsent = storedConsent || defaultConsent;

    setAnalyticsEnabled(Boolean(nextConsent.analytics));
    setIsVisible(!storedConsent);
    setShowPreferences(false);
    applyConsent(nextConsent);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', isVisible);

    return () => {
      document.body.classList.remove('has-cookie-banner');
    };
  }, [isVisible]);

  useEffect(() => {
    const openPreferences = () => {
      const storedConsent = parseConsent() || defaultConsent;
      setAnalyticsEnabled(Boolean(storedConsent.analytics));
      setShowPreferences(true);
      setIsVisible(true);
    };

    const handleTriggerClick = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest('.cookie-preferences-trigger');
      if (!trigger) return;

      event.preventDefault();
      openPreferences();
    };

    document.addEventListener('click', handleTriggerClick);
    window.cookiePreferences = {
      get: () => parseConsent() || defaultConsent,
      set: (nextConsent) => {
        const normalizedConsent = {
          necessary: true,
          analytics: Boolean(nextConsent?.analytics),
        };

        try {
          window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(normalizedConsent));
        } catch {
          // Ignore localStorage failures and keep the current in-memory consent state.
        }
        setAnalyticsEnabled(normalizedConsent.analytics);
        setShowPreferences(false);
        setIsVisible(false);
        applyConsent(normalizedConsent);
      },
      open: openPreferences,
    };

    return () => {
      document.removeEventListener('click', handleTriggerClick);
      delete window.cookiePreferences;
    };
  }, []);

  const saveConsent = (nextConsent) => {
    const normalizedConsent = {
      necessary: true,
      analytics: Boolean(nextConsent.analytics),
    };

    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(normalizedConsent));
    } catch {
      // Ignore localStorage failures and keep the current in-memory consent state.
    }
    setAnalyticsEnabled(normalizedConsent.analytics);
    setShowPreferences(false);
    setIsVisible(false);
    applyConsent(normalizedConsent);
  };

  return (
    <div
      className="cookie-banner"
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      <div className="cookie-banner__header">
        <div>
          <p className="eyebrow">Cookies</p>
          <p className="cookie-banner__title">Control your cookies</p>
          <p className="cookie-banner__text">
            We use necessary cookies for the site to work. Analytics cookies are off until you
            enable them.
          </p>
        </div>
      </div>
      <div className="cookie-actions">
        <button
          className="btn primary small"
          onClick={() => saveConsent({ analytics: true })}
          type="button"
        >
          Accept all
        </button>
        <button
          className="btn ghost small"
          onClick={() => saveConsent({ analytics: false })}
          type="button"
        >
          Reject non-essential
        </button>
        <button
          className="btn small"
          onClick={() => setShowPreferences((current) => !current)}
          type="button"
        >
          Manage preferences
        </button>
      </div>
      <div className={`cookie-preferences${showPreferences ? ' open' : ''}`} data-cookie-preferences>
        <div className="cookie-toggle">
          <div>
            <label htmlFor="cookie-analytics">Analytics</label>
            <p className="toggle-note">Optional. Helps us improve the site. Disabled by default.</p>
          </div>
          <input
            checked={analyticsEnabled}
            id="cookie-analytics"
            onChange={(event) => setAnalyticsEnabled(event.target.checked)}
            type="checkbox"
          />
        </div>
        <div className="cookie-actions">
          <button
            className="btn primary small"
            onClick={() => saveConsent(currentConsent)}
            type="button"
          >
            Save choices
          </button>
        </div>
      </div>
    </div>
  );
}
