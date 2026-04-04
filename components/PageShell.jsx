'use client';

import { useRef, useState } from 'react';
import { AboutModal } from '@/components/AboutModal';
import { CookieBanner } from '@/components/CookieBanner';
import { PageBodyClass } from '@/components/PageBodyClass';
import { ServiceModal } from '@/components/ServiceModal';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { useGsapPlugins } from '@/hooks/useGsapPlugins';
import {
  useAboutModalController,
  useServiceModalController,
} from '@/hooks/useModalControllers';
import { usePageAnimations } from '@/hooks/usePageAnimations';
import { usePricing } from '@/hooks/usePricing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRequestForm } from '@/hooks/useRequestForm';
import { useSiteChrome } from '@/hooks/useSiteChrome';
import { useThemeState } from '@/hooks/useThemeState';

export function PageShell({ bodyClassName, children, footer, header, pageKey }) {
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const navLinksRef = useRef(null);
  const navToggleRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);

  useGsapPlugins();

  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useThemeState();
  const { currency, setCurrency } = usePricing(pageKey, contentRef);
  const { serviceModalState, clearServiceModal } = useServiceModalController(pageKey, contentRef);
  const { aboutModalState, clearAboutModal } = useAboutModalController(pageKey, contentRef);

  useSiteChrome({
    headerRef,
    navLinksRef,
    navOpen,
    navToggleRef,
    pageKey,
    reduceMotion,
    setNavOpen,
  });
  usePageAnimations({
    contentRef,
    pageKey,
    reduceMotion,
  });
  useRequestForm(pageKey, contentRef);

  return (
    <>
      <PageBodyClass className={bodyClassName} />
      <SiteHeader
        contactHref={header.contactHref}
        currency={currency}
        navLinksRef={navLinksRef}
        navOpen={navOpen}
        navToggleRef={navToggleRef}
        onCurrencyChange={setCurrency}
        onNavLinkClick={() => setNavOpen(false)}
        onNavToggle={() => setNavOpen((current) => !current)}
        onThemeToggle={toggleTheme}
        ref={headerRef}
        showCurrency={header.showCurrency}
        theme={theme}
      />
      <div ref={contentRef}>{children}</div>
      <SiteFooter copy={footer.copy} workHref={footer.workHref} bookHref={footer.bookHref} />
      <CookieBanner />
      <ServiceModal
        modalState={serviceModalState}
        onClosed={clearServiceModal}
        reduceMotion={reduceMotion}
      />
      <AboutModal
        modalState={aboutModalState}
        onClosed={clearAboutModal}
        reduceMotion={reduceMotion}
      />
    </>
  );
}
