'use client';

import { forwardRef } from 'react';

export const SiteHeader = forwardRef(function SiteHeader(
  {
    contactHref,
    currency,
    navLinksRef,
    navOpen,
    navToggleRef,
    onCurrencyChange,
    onNavLinkClick,
    onNavToggle,
    onThemeToggle,
    showCurrency,
    theme,
  },
  ref
) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const themeIcon = theme === 'dark' ? '☀' : '☾';

  return (
    <header className="site-header" ref={ref}>
      <div className="container nav-bar">
        <a className="brand brand-link" href="index.html">
          <img className="logo-img" src="assets/logo-transparent.png" alt="Ruzo Tech logo" />
          <div className="logo-type">
            <span className="logo-name">Ruzo Tech</span>
            <span className="logo-tag">Web & App Studio</span>
          </div>
        </a>
        <nav className={`nav-links${navOpen ? ' open' : ''}`} ref={navLinksRef}>
          <a href="index.html" onClick={onNavLinkClick}>
            Home
          </a>
          <a href="services.html" onClick={onNavLinkClick}>
            Services
          </a>
          <a href="about.html" onClick={onNavLinkClick}>
            About us
          </a>
        </nav>
        <div className="nav-actions">
          <a className="btn primary small" href={contactHref}>
            Contact
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${nextTheme}`}
            aria-pressed={theme === 'dark'}
            onClick={onThemeToggle}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {themeIcon}
            </span>
            <span className="theme-toggle__text">
              {nextTheme.charAt(0).toUpperCase()}
              {nextTheme.slice(1)}
            </span>
          </button>
          {showCurrency ? (
            <div className="currency-switcher">
              <select
                className="currency-switcher__select"
                data-currency-select
                aria-label="Choose displayed package currency"
                onChange={(event) => onCurrencyChange(event.target.value)}
                value={currency}
              >
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          ) : null}
        </div>
        <button
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          className="nav-toggle"
          onClick={onNavToggle}
          ref={navToggleRef}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
});
