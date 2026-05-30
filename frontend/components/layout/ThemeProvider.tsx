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

function getCookieTheme(): SiteTheme | null {
  const cookieTheme = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${storageKey}=`))
    ?.split("=")[1];

  return isSiteTheme(cookieTheme) ? cookieTheme : null;
}

function getPageTone(theme: SiteTheme) {
  const path = window.location.pathname;

  if (path === "/day") return "light";
  if (
    (path === "/" || path === "/chronicle" || path.startsWith("/news") || path === "/golf" || path.startsWith("/specialty")) &&
    theme === "day"
  )
    return "light";
  if (path.startsWith("/legacy/credibility") && theme === "day") return "light";
  return "dark";
}

function applyTheme(theme: SiteTheme) {
  const root = document.documentElement;
  const pageTone = getPageTone(theme);

  root.dataset.siteTheme = theme;
  root.classList.toggle("site-theme-day", theme === "day");
  root.classList.toggle("site-theme-night", theme === "night");
  root.classList.toggle("page-tone-light", pageTone === "light");
  root.classList.toggle("page-tone-dark", pageTone === "dark");
}

function persistTheme(theme: SiteTheme) {
  try {
    window.localStorage?.setItem(storageKey, theme);
  } catch {
    // Cookie fallback keeps theme persistence working in restricted WebViews.
  }

  try {
    document.cookie = `${storageKey}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {
    // Theme still applies for the current page even if persistence is blocked.
  }
}

function getStoredTheme(fallback: SiteTheme): SiteTheme {
  if (typeof window === "undefined") return fallback;

  const routeTheme = window.location.pathname === "/day" ? "day" : null;
  if (routeTheme) return routeTheme;

  try {
    const storedTheme = window.localStorage?.getItem(storageKey);
    if (isSiteTheme(storedTheme)) return storedTheme;
  } catch {
    return getCookieTheme() ?? fallback;
  }

  return getCookieTheme() ?? fallback;
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
