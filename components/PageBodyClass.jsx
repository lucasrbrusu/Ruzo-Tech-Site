'use client';

import { useEffect } from 'react';

export function PageBodyClass({ className = '' }) {
  useEffect(() => {
    const classNames = className.split(' ').filter(Boolean);

    if (classNames.length) {
      document.body.classList.add(...classNames);
    }

    return () => {
      if (classNames.length) {
        document.body.classList.remove(...classNames);
      }
    };
  }, [className]);

  return null;
}
