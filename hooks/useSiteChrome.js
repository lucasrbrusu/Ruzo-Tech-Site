'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/hooks/useGsapPlugins';

const HOME_HEADER_HIDE_SCROLL_Y = 140;
const HOME_HEADER_TOP_ZONE = 40;
const HOME_HEADER_DIRECTION_THRESHOLD = 10;

function getElementDocumentTop(element) {
  let top = 0;
  let current = element;

  while (current) {
    top += current.offsetTop || 0;
    current = current.offsetParent;
  }

  return top;
}

export function useSiteChrome({
  headerRef,
  navLinksRef,
  navOpen,
  navToggleRef,
  pageKey,
  reduceMotion,
  setNavOpen,
}) {
  const router = useRouter();
  const hasScrollReactiveHeader = pageKey === 'home' || pageKey === 'services' || pageKey === 'about';

  useLayoutEffect(() => {
    const navLinks = navLinksRef.current;
    const navToggle = navToggleRef.current;

    if (!navLinks || !navToggle) return;

    const navLines = Array.from(navToggle.querySelectorAll('span'));
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    gsap.killTweensOf([navLinks, ...navLines]);

    if (!isMobile) {
      gsap.set(navLinks, { clearProps: 'all' });
      gsap.set(navLines, { clearProps: 'all' });
      return;
    }

    if (navOpen) {
      gsap.set(navLinks, { display: 'flex' });
      gsap.fromTo(
        navLinks,
        { autoAlpha: 0, y: -12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.28,
          ease: 'power2.out',
          overwrite: true,
        }
      );
      gsap.to(navLines[0], {
        y: 7,
        rotate: 45,
        duration: reduceMotion ? 0 : 0.24,
        ease: 'power2.out',
      });
      gsap.to(navLines[1], {
        autoAlpha: 0,
        duration: reduceMotion ? 0 : 0.18,
        ease: 'power2.out',
      });
      gsap.to(navLines[2], {
        y: -7,
        rotate: -45,
        duration: reduceMotion ? 0 : 0.24,
        ease: 'power2.out',
      });
      return;
    }

    gsap.to(navLinks, {
      autoAlpha: 0,
      y: -12,
      duration: reduceMotion ? 0 : 0.2,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => {
        gsap.set(navLinks, { clearProps: 'opacity,transform' });
        navLinks.style.removeProperty('display');
      },
    });
    gsap.to(navLines[0], {
      y: 0,
      rotate: 0,
      duration: reduceMotion ? 0 : 0.2,
      ease: 'power2.out',
    });
    gsap.to(navLines[1], {
      autoAlpha: 1,
      duration: reduceMotion ? 0 : 0.18,
      ease: 'power2.out',
    });
    gsap.to(navLines[2], {
      y: 0,
      rotate: 0,
      duration: reduceMotion ? 0 : 0.2,
      ease: 'power2.out',
    });
  }, [navLinksRef, navOpen, navToggleRef, reduceMotion]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setNavOpen]);

  useLayoutEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    let lastScrollY = window.scrollY;
    const showHeader = () => {
      gsap.to(header, {
        y: 0,
        duration: reduceMotion ? 0 : 0.34,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    const hideHeader = () => {
      gsap.to(header, {
        y: -(header.offsetHeight + 12),
        duration: reduceMotion ? 0 : 0.34,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    const updateScrolledState = () => {
      header.classList.toggle('scrolled', window.scrollY > 32);
    };

    updateScrolledState();
    showHeader();

    if (!hasScrollReactiveHeader) {
      return () => {
        gsap.killTweensOf(header);
        gsap.set(header, { clearProps: 'transform' });
      };
    }

    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const currentScrollY = self.scroll();
        const scrollDelta = currentScrollY - lastScrollY;

        updateScrolledState();

        if (currentScrollY <= HOME_HEADER_TOP_ZONE || navOpen) {
          showHeader();
          lastScrollY = currentScrollY;
          return;
        }

        if (
          scrollDelta > HOME_HEADER_DIRECTION_THRESHOLD &&
          currentScrollY > HOME_HEADER_HIDE_SCROLL_Y
        ) {
          hideHeader();
        } else if (scrollDelta < -HOME_HEADER_DIRECTION_THRESHOLD) {
          showHeader();
        }

        lastScrollY = currentScrollY;
      },
    });

    return () => {
      scrollTrigger.kill();
      gsap.killTweensOf(header);
      gsap.set(header, { clearProps: 'transform' });
    };
  }, [hasScrollReactiveHeader, headerRef, navOpen, reduceMotion]);

  useEffect(() => {
    const routeMap = {
      'index.html': '/',
      'services.html': '/services/',
      'about.html': '/about/',
      'request.html': '/request/',
      'privacy.html': '/privacy/',
      'terms.html': '/terms/',
      'cookies.html': '/cookies/',
    };
    const getScrollOffset = () => (headerRef.current?.offsetHeight || 0) + 12;
    const getInternalRoute = (href) => {
      if (!href || href.startsWith('#')) return null;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return null;

      const normalizedPath = url.pathname.replace(/^\/+/, '');
      const nextPath = routeMap[normalizedPath];
      if (!nextPath) return null;

      return `${nextPath}${url.search}${url.hash}`;
    };
    const scrollToHash = (hash, animate) => {
      const target = document.querySelector(hash);
      if (!target) return;

      const top = Math.max(getElementDocumentTop(target) - getScrollOffset(), 0);

      if (animate && !reduceMotion) {
        gsap.to(window, {
          duration: 0.72,
          ease: 'power3.out',
          scrollTo: {
            y: top,
            autoKill: true,
          },
        });
        return;
      }

      window.scrollTo({ top, left: 0, behavior: 'auto' });
    };
    const handleDocumentClick = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');
      if (
        !link ||
        link.target === '_blank' ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const internalRoute = getInternalRoute(link.getAttribute('href'));
      if (!internalRoute) return;

      event.preventDefault();
      setNavOpen(false);
      router.push(internalRoute);
    };

    const handleAnchorClick = (event) => {
      const targetId = event.currentTarget.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      scrollToHash(targetId, true);
      setNavOpen(false);
    };

    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    document.addEventListener('click', handleDocumentClick);
    anchorLinks.forEach((link) => {
      link.addEventListener('click', handleAnchorClick);
    });

    const correctInitialHash = () => {
      if (
        window.location.hash === '#services' &&
        !window.location.pathname.endsWith('/services') &&
        !window.location.pathname.endsWith('/services/')
      ) {
        window.location.href = '/services/';
        return;
      }

      if (window.location.hash && window.location.hash !== '#') {
        scrollToHash(window.location.hash, false);
      }
    };

    const frame = window.requestAnimationFrame(correctInitialHash);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('click', handleDocumentClick);
      anchorLinks.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [headerRef, pageKey, reduceMotion, router, setNavOpen]);
}
