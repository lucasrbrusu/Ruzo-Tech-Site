'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

let isRegistered = false;

export function useGsapPlugins() {
  useEffect(() => {
    if (isRegistered) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    isRegistered = true;
  }, []);
}

export { gsap, ScrollTrigger };
