import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'simplifyl-theme';
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

function readInitial() {
  if (typeof document === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* ignore storage access issues */
  }
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync with OS setting if visitor hasn't made an explicit manual choice
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (saved) return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

