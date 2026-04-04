'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateReducedMotion);
      return () => mediaQuery.removeEventListener('change', updateReducedMotion);
    }

    mediaQuery.addListener(updateReducedMotion);
    return () => mediaQuery.removeListener(updateReducedMotion);
  }, []);

  return reducedMotion;
}
