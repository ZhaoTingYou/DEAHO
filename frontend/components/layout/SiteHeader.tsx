"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type Ref } from "react";
import { Globe2, Menu, Moon, Sun, X } from "lucide-react";
import { useSiteTheme, type SiteTheme } from "@/components/layout/ThemeProvider";
import { branchNavigation, languages, primaryNavigation, siteLinks } from "@/data/navigation";

type SiteHeaderProps = {
  activeBranchHref?: string;
  activeLegacyHref?: string;
  activeSpecialtyHref?: string;
  activeSection?: string;
  ariaLabel?: string;
  className?: string;
  logoRef?: Ref<HTMLAnchorElement>;
  onThemeToggle?: () => void;
  ready?: boolean;
  reveal?: boolean;
  scrollHideEnabled?: boolean;
  theme?: SiteTheme;
  themeLabel?: string;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function SiteHeader({
  activeBranchHref,
  activeLegacyHref,
  activeSpecialtyHref,
  activeSection = "HOME",
  ariaLabel = "DAEHO navigation",
  className,
  logoRef,
  onThemeToggle,
  ready = true,
  reveal = false,
  scrollHideEnabled = true,
  theme,
  themeLabel
}: SiteHeaderProps) {
  const { theme: globalTheme, toggleTheme } = useSiteTheme();
  const mainNavRef = useRef<HTMLElement | null>(null);
  const categoryActiveMaskRef = useRef<HTMLSpanElement | null>(null);
  const categoryHoverMaskRef = useRef<HTMLSpanElement | null>(null);
  const categoryLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const languageControlRef = useRef<HTMLDivElement | null>(null);
  const headerFrameRef = useRef<number | null>(null);
  const lastHeaderScrollYRef = useRef(0);

  const [activeLanguage, setActiveLanguage] = useState("KR");
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openBranchSection, setOpenBranchSection] = useState<string | null>(null);

  const activeCategoryIndex = useMemo(() => {
    const index = primaryNavigation.findIndex((item) => item.label === activeSection);
    return index >= 0 ? index : 0;
  }, [activeSection]);

  const activeTheme = theme ?? globalTheme;
  const handleThemeToggle = onThemeToggle ?? toggleTheme;
  const ThemeIcon = activeTheme === "day" ? Moon : Sun;
  const resolvedThemeLabel = themeLabel ?? (activeTheme === "day" ? "Switch to night version" : "Switch to day version");
  const getActiveBranchHref = useCallback(
    (sectionLabel: string) => {
      if (activeBranchHref) return activeBranchHref;
      if (sectionLabel === "LEGACY") return activeLegacyHref;
      if (sectionLabel === "SPECIALTY") return activeSpecialtyHref;
      return undefined;
    },
    [activeBranchHref, activeLegacyHref, activeSpecialtyHref]
  );

  const positionCategoryMask = useCallback((mask: HTMLSpanElement | null, link: HTMLAnchorElement | null) => {
    const nav = mainNavRef.current;

    if (!mask || !link || !nav || window.getComputedStyle(nav).display === "none") {
      if (mask) mask.style.opacity = "0";
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    mask.style.left = `${linkRect.left - navRect.left}px`;
    mask.style.width = `${linkRect.width}px`;
    mask.style.height = `${linkRect.height}px`;
    mask.style.opacity = "1";
  }, []);

  const syncActiveCategoryMask = useCallback(() => {
    positionCategoryMask(categoryActiveMaskRef.current, categoryLinkRefs.current[activeCategoryIndex] ?? null);
  }, [activeCategoryIndex, positionCategoryMask]);

  const hideCategoryHoverMask = useCallback(() => {
    if (categoryHoverMaskRef.current) {
      categoryHoverMaskRef.current.style.opacity = "0";
    }
  }, []);

  const showHoverMask = useCallback(
    (index: number) => {
      if (index === activeCategoryIndex) {
        hideCategoryHoverMask();
        return;
      }

      positionCategoryMask(categoryHoverMaskRef.current, categoryLinkRefs.current[index] ?? null);
    },
    [activeCategoryIndex, hideCategoryHoverMask, positionCategoryMask]
  );

  useEffect(() => {
    let disposed = false;
    const id = window.setTimeout(syncActiveCategoryMask, 0);

    document.fonts?.ready.then(() => {
      if (!disposed) syncActiveCategoryMask();
    });

    const handleResize = () => syncActiveCategoryMask();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      disposed = true;
      window.clearTimeout(id);
      window.removeEventListener("resize", handleResize);
    };
  }, [syncActiveCategoryMask]);

  useEffect(() => {
    if (!languageOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!languageControlRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [languageOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!scrollHideEnabled) {
      setIsHeaderHidden(false);
      lastHeaderScrollYRef.current = 0;
      return;
    }

    const directionThreshold = 6;
    const topThreshold = 24;

    const updateHeaderVisibility = () => {
      headerFrameRef.current = null;
      const y = window.scrollY;
      const delta = y - lastHeaderScrollYRef.current;

      if (y <= topThreshold) {
        setIsHeaderHidden(false);
      } else if (delta > directionThreshold) {
        setIsHeaderHidden(true);
        setLanguageOpen(false);
      } else if (delta < -directionThreshold) {
        setIsHeaderHidden(false);
      }

      lastHeaderScrollYRef.current = y;
    };

    const requestHeaderVisibilityUpdate = () => {
      if (headerFrameRef.current !== null) return;
      headerFrameRef.current = window.requestAnimationFrame(updateHeaderVisibility);
    };

    lastHeaderScrollYRef.current = window.scrollY;
    updateHeaderVisibility();
    window.addEventListener("scroll", requestHeaderVisibilityUpdate, { passive: true });

    return () => {
      if (headerFrameRef.current !== null) {
        window.cancelAnimationFrame(headerFrameRef.current);
        headerFrameRef.current = null;
      }
      window.removeEventListener("scroll", requestHeaderVisibilityUpdate);
    };
  }, [scrollHideEnabled]);

  const renderThemeControl = (mobile = false) => {
    const controlClassName = mobile
      ? cx("mobile-theme-switch", ready && "is-ready", isHeaderHidden && "is-header-hidden")
      : "icon-button theme-toggle";

    return (
      <button className={controlClassName} type="button" aria-label={resolvedThemeLabel} onClick={handleThemeToggle}>
        <ThemeIcon aria-hidden="true" />
      </button>
    );
  };

  return (
    <>
      <header
        className={cx("hero-header", scrollHideEnabled && "is-scroll-reactive", isHeaderHidden && "is-header-hidden", className)}
        aria-label={ariaLabel}
      >
        <nav className={cx("site-links", reveal && "reveal-item")} aria-label="Site links">
          {siteLinks.map((link) => (
            <a
              href={link.href || "#"}
              key={link.label}
              onClick={(event) => {
                if (!link.href) event.preventDefault();
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="brand-stack">
          <a className="hero-logo-target" href="/" ref={logoRef} aria-label="DAEHO home">
            DAEHO
          </a>
          <nav
            className={cx("main-nav has-category-masks", reveal && "reveal-item")}
            ref={mainNavRef}
            aria-label="Primary navigation"
            onMouseLeave={() => {
              hideCategoryHoverMask();
              setOpenBranchSection(null);
            }}
          >
            <span className="category-mask category-mask-active" ref={categoryActiveMaskRef} aria-hidden="true" />
            <span className="category-mask category-mask-hover" ref={categoryHoverMaskRef} aria-hidden="true" />
            {primaryNavigation.map((item, index) => {
              const isActive = index === activeCategoryIndex;
              const branches = branchNavigation[item.label as keyof typeof branchNavigation] ?? [];
              const hasBranches = branches.length > 0;
              const activeItemBranchHref = getActiveBranchHref(item.label);
              const isCurrentSection = activeSection === item.label;
              const isBranchVisible = hasBranches && (openBranchSection ? openBranchSection === item.label : isCurrentSection);

              return (
                <span
                  className={cx(
                    "main-nav-item",
                    hasBranches && "has-branches",
                    hasBranches && isCurrentSection && "is-current-section",
                    isBranchVisible && "is-branch-visible"
                  )}
                  key={item.label}
                  onPointerEnter={() => setOpenBranchSection(hasBranches ? item.label : null)}
                  onPointerLeave={() => setOpenBranchSection(null)}
                  onFocusCapture={() => setOpenBranchSection(hasBranches ? item.label : null)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenBranchSection(null);
                    }
                  }}
                >
                  <a
                    className={isActive ? "is-active" : ""}
                    href={item.href}
                    ref={(node) => {
                      categoryLinkRefs.current[index] = node;
                    }}
                    onPointerEnter={() => showHoverMask(index)}
                    onMouseEnter={() => showHoverMask(index)}
                    onFocus={() => showHoverMask(index)}
                  >
                    {item.label}
                  </a>
                  {hasBranches ? (
                    <nav className="branch-nav" aria-label={`${item.label.toLowerCase()} branch navigation`}>
                      {branches.map((branch) => (
                        <a className={branch.href === activeItemBranchHref ? "is-active" : ""} href={branch.href} key={branch.label}>
                          {branch.label}
                        </a>
                      ))}
                    </nav>
                  ) : null}
                </span>
              );
            })}
          </nav>
        </div>

        <div className={cx("hero-actions", reveal && "reveal-item")} ref={languageControlRef}>
          {renderThemeControl()}
          <button
            className="icon-button language-toggle"
            type="button"
            aria-label="Language"
            aria-controls="languageMenu"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((value) => !value)}
          >
            <Globe2 aria-hidden="true" />
          </button>
          <nav className={cx("language-menu", languageOpen && "is-open")} id="languageMenu" aria-label="Language options">
            {languages.map((language) => (
              <a
                className={language.label === activeLanguage ? "is-active" : ""}
                href={language.href}
                key={language.label}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveLanguage(language.label);
                  setLanguageOpen(false);
                }}
              >
                {language.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <button
        className={cx("mobile-menu-trigger", ready && "is-ready")}
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((value) => !value)}
      >
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span>MENU</span>
      </button>

      {renderThemeControl(true)}

      <nav className={cx("mobile-menu-panel", mobileMenuOpen && "is-open")} aria-label="Mobile menu">
        <span className="mobile-menu-label">Sites</span>
        {siteLinks.map((link) => (
          <a
            href={link.href || "#"}
            key={link.label}
            onClick={(event) => {
              if (!link.href) event.preventDefault();
              setMobileMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
        <span className="mobile-menu-label">Language</span>
        {languages.map((language) => (
          <a
            className={language.label === activeLanguage ? "is-active" : ""}
            href={language.href}
            key={language.label}
            onClick={(event) => {
              event.preventDefault();
              setActiveLanguage(language.label);
              setMobileMenuOpen(false);
            }}
          >
            {language.label}
          </a>
        ))}
        <span className="mobile-menu-label">Category</span>
        {primaryNavigation.map((item, index) => {
          const branches = branchNavigation[item.label as keyof typeof branchNavigation] ?? [];
          const activeItemBranchHref = getActiveBranchHref(item.label);

          return (
            <div className={cx("mobile-category-group", branches.length > 0 && "has-mobile-branches")} key={item.label}>
              <a
                className={cx("mobile-category-link", index === activeCategoryIndex && "is-active")}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
              {branches.length > 0 ? (
                <div className="mobile-branch-list" aria-label={`${item.label.toLowerCase()} branches`}>
                  {branches.map((branch) => (
                    <a
                      className={cx("mobile-branch-link", branch.href === activeItemBranchHref && "is-active")}
                      href={branch.href}
                      key={branch.label}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {branch.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </>
  );
}
