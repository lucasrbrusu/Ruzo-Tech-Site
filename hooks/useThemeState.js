'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY } from '@/lib/site-data';

function getStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch {
    return null;
  }
}

export function useThemeState() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const initialTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : getStoredTheme() || 'dark';

    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);

  const applyTheme = (nextTheme, persist = false) => {
    document.documentElement.setAttribute('data-theme', nextTheme);
    setTheme(nextTheme);

    if (!persist) return;

    try {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // Ignore localStorage failures and keep the in-memory theme.
    }
  };

  return {
    theme,
    setTheme: applyTheme,
    toggleTheme: () => applyTheme(theme === 'dark' ? 'light' : 'dark', true),
  };
}
