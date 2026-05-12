import { useState, useEffect, useCallback } from 'react';

export type Theme = 'blue' | 'dark' | 'warm';

const THEME_STORAGE_KEY = 'ai-agent-seminar-theme';

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'blue' || stored === 'dark' || stored === 'warm') {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return 'blue';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const order: Theme[] = ['blue', 'dark', 'warm'];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  }, [theme, setTheme]);

  return { theme, setTheme, cycleTheme };
}
