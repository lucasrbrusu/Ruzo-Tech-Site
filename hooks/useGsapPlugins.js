'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

let isRegistered = false;

export function ensureGsapPlugins() {
  if (isRegistered || typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  isRegistered = true;
}

ensureGsapPlugins();

export function useGsapPlugins() {
  useLayoutEffect(() => {
    ensureGsapPlugins();
  }, []);
}

export { gsap, ScrollTrigger };
