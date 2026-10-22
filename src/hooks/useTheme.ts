import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';
export type GraphicQuality = 'high' | 'low';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('pp_theme');
    return (saved as Theme) || 'dark';
  });

  const [graphicQuality, setGraphicQuality] = useState<GraphicQuality>(() => {
    const saved = localStorage.getItem('pp_quality');
    return (saved as GraphicQuality) || 'high';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('pp_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pp_quality', graphicQuality);
  }, [graphicQuality]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    graphicQuality,
    setGraphicQuality,
  };
}
