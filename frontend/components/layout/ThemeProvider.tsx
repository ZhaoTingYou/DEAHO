"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteTheme = "night" | "day";

type ThemeContextValue = {
  isDayTheme: boolean;
  setTheme: (theme: SiteTheme) => void;
  theme: SiteTheme;
  toggleTheme: () => void;
};

const storageKey = "daeho-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function isSiteTheme(value: string | null | undefined): value is SiteTheme {
  return value === "day" || value === "night";
}

function applyTheme(theme: SiteTheme) {
  document.documentElement.dataset.siteTheme = theme;
  document.documentElement.classList.toggle("site-theme-day", theme === "day");
  document.documentElement.classList.toggle("site-theme-night", theme === "night");
}

function persistTheme(theme: SiteTheme) {
  window.localStorage.setItem(storageKey, theme);
  document.cookie = `${storageKey}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function getStoredTheme(fallback: SiteTheme): SiteTheme {
  if (typeof window === "undefined") return fallback;

  const routeTheme = window.location.pathname === "/day" ? "day" : null;
  if (routeTheme) return routeTheme;

  const storedTheme = window.localStorage.getItem(storageKey);
  return isSiteTheme(storedTheme) ? storedTheme : fallback;
}

export function ThemeProvider({ children, initialTheme = "night" }: { children: ReactNode; initialTheme?: SiteTheme }) {
  const [theme, setThemeState] = useState<SiteTheme>(initialTheme);

  const setTheme = useCallback((nextTheme: SiteTheme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "day" ? "night" : "day";
      applyTheme(nextTheme);
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    const storedTheme = getStoredTheme(initialTheme);
    setTheme(storedTheme);
  }, [initialTheme, setTheme]);

  const value = useMemo(
    () => ({
      isDayTheme: theme === "day",
      setTheme,
      theme,
      toggleTheme
    }),
    [setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useSiteTheme must be used inside ThemeProvider");
  }

  return context;
}
