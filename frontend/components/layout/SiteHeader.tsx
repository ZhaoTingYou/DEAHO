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
  const headerElementRef = useRef<HTMLElement | null>(null);
  const mainNavRef = useRef<HTMLElement | null>(null);
  const categoryActiveMaskRef = useRef<HTMLSpanElement | null>(null);
  const categoryHoverMaskRef = useRef<HTMLSpanElement | null>(null);
  const categoryLinkRefs = useRef<Array<HTMLElement | null>>([]);
  const languageControlRef = useRef<HTMLDivElement | null>(null);
  const headerFrameRef = useRef<number | null>(null);
  const headerHoverCloseTimerRef = useRef<number | null>(null);
  const categoryMaskReadyTimerRef = useRef<number | null>(null);
  const isHeaderHoveredRef = useRef(false);
  const isHeaderHiddenRef = useRef(false);
  const lastHeaderScrollYRef = useRef(0);

  const [activeLanguage, setActiveLanguage] = useState("KR");
  const [isCategoryMaskReady, setIsCategoryMaskReady] = useState(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
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
  const isHeaderActuallyHidden = isHeaderHidden && !isHeaderHovered;
  const isHeaderSolid = isHeaderHovered || languageOpen || openBranchSection !== null;
  const getActiveBranchHref = useCallback(
    (sectionLabel: string) => {
      if (activeBranchHref) return activeBranchHref;
      if (sectionLabel === "LEGACY") return activeLegacyHref;
      if (sectionLabel === "SPECIALTY") return activeSpecialtyHref;
      return undefined;
    },
    [activeBranchHref, activeLegacyHref, activeSpecialtyHref]
  );

  const positionCategoryMask = useCallback((mask: HTMLSpanElement | null, link: HTMLElement | null) => {
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

  const clearCategoryMaskReadyTimer = useCallback(() => {
    if (categoryMaskReadyTimerRef.current !== null) {
      window.clearTimeout(categoryMaskReadyTimerRef.current);
      categoryMaskReadyTimerRef.current = null;
    }
  }, []);

  const showCategoryMasksWhenStable = useCallback(
    (delay = 0) => {
      clearCategoryMaskReadyTimer();

      const sync = () => {
        setIsCategoryMaskReady(true);
        window.requestAnimationFrame(syncActiveCategoryMask);
      };

      if (delay <= 0) {
        sync();
        return;
      }

      setIsCategoryMaskReady(false);
      categoryMaskReadyTimerRef.current = window.setTimeout(() => {
        categoryMaskReadyTimerRef.current = null;
        sync();
      }, delay);
    },
    [clearCategoryMaskReadyTimer, syncActiveCategoryMask]
  );

  const hideCategoryMasksDuringMotion = useCallback(() => {
    clearCategoryMaskReadyTimer();
    setIsCategoryMaskReady(false);
    hideCategoryHoverMask();
  }, [clearCategoryMaskReadyTimer, hideCategoryHoverMask]);

  const showHoverMask = useCallback(
    (index: number) => {
      if (!isCategoryMaskReady) return;

      if (index === activeCategoryIndex) {
        hideCategoryHoverMask();
        return;
      }

      positionCategoryMask(categoryHoverMaskRef.current, categoryLinkRefs.current[index] ?? null);
    },
    [activeCategoryIndex, hideCategoryHoverMask, isCategoryMaskReady, positionCategoryMask]
  );

  const revealHeaderFromHover = useCallback(() => {
    const wasHidden = isHeaderHiddenRef.current || isHeaderActuallyHidden;

    if (headerHoverCloseTimerRef.current !== null) {
      window.clearTimeout(headerHoverCloseTimerRef.current);
      headerHoverCloseTimerRef.current = null;
    }

    isHeaderHoveredRef.current = true;
    isHeaderHiddenRef.current = false;
    setIsHeaderHovered(true);
    setIsHeaderHidden(false);

    if (wasHidden) {
      hideCategoryMasksDuringMotion();
      showCategoryMasksWhenStable(320);
    } else {
      showCategoryMasksWhenStable();
    }
  }, [hideCategoryMasksDuringMotion, isHeaderActuallyHidden, showCategoryMasksWhenStable]);

  const releaseHeaderHover = useCallback(() => {
    if (headerHoverCloseTimerRef.current !== null) {
      window.clearTimeout(headerHoverCloseTimerRef.current);
    }

    headerHoverCloseTimerRef.current = window.setTimeout(() => {
      isHeaderHoveredRef.current = false;
      setIsHeaderHovered(false);
      setOpenBranchSection(null);
      hideCategoryHoverMask();

      if (scrollHideEnabled && window.scrollY > 24) {
        isHeaderHiddenRef.current = true;
        setIsHeaderHidden(true);
        hideCategoryMasksDuringMotion();
        setLanguageOpen(false);
      } else {
        showCategoryMasksWhenStable();
      }

      headerHoverCloseTimerRef.current = null;
    }, 140);
  }, [hideCategoryHoverMask, hideCategoryMasksDuringMotion, scrollHideEnabled, showCategoryMasksWhenStable]);

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
    return () => {
      if (headerHoverCloseTimerRef.current !== null) {
        window.clearTimeout(headerHoverCloseTimerRef.current);
      }
      clearCategoryMaskReadyTimer();
    };
  }, [clearCategoryMaskReadyTimer]);

  useEffect(() => {
    if (!scrollHideEnabled || !isHeaderHovered) return;

    const clearPendingClose = () => {
      if (headerHoverCloseTimerRef.current !== null) {
        window.clearTimeout(headerHoverCloseTimerRef.current);
        headerHoverCloseTimerRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const header = headerElementRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      const verticalBuffer = openBranchSection ? 22 : 6;
      const isInsideHeader =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom + verticalBuffer;

      if (isInsideHeader) {
        clearPendingClose();
        return;
      }

      releaseHeaderHover();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", releaseHeaderHover);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", releaseHeaderHover);
    };
  }, [isHeaderHovered, openBranchSection, releaseHeaderHover, scrollHideEnabled]);

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
      isHeaderHiddenRef.current = false;
      setIsHeaderHidden(false);
      showCategoryMasksWhenStable();
      lastHeaderScrollYRef.current = 0;
      return;
    }

    const directionThreshold = 6;
    const topThreshold = 24;

    const updateHeaderVisibility = () => {
      headerFrameRef.current = null;
      const y = window.scrollY;
      const delta = y - lastHeaderScrollYRef.current;

      if (isHeaderHoveredRef.current) {
        isHeaderHiddenRef.current = false;
        setIsHeaderHidden(false);
        lastHeaderScrollYRef.current = y;
        return;
      }

      if (y <= topThreshold) {
        const wasHidden = isHeaderHiddenRef.current;
        isHeaderHiddenRef.current = false;
        setIsHeaderHidden(false);
        if (wasHidden) showCategoryMasksWhenStable(240);
      } else if (delta > directionThreshold) {
        isHeaderHiddenRef.current = true;
        setIsHeaderHidden(true);
        setLanguageOpen(false);
        setOpenBranchSection(null);
        hideCategoryMasksDuringMotion();
      } else if (delta < -directionThreshold) {
        const wasHidden = isHeaderHiddenRef.current;
        isHeaderHiddenRef.current = false;
        setIsHeaderHidden(false);
        if (wasHidden) showCategoryMasksWhenStable(260);
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
  }, [hideCategoryMasksDuringMotion, scrollHideEnabled, showCategoryMasksWhenStable]);

  const renderThemeControl = (mobile = false) => {
    const controlClassName = mobile
      ? cx("mobile-theme-switch", ready && "is-ready", isHeaderActuallyHidden && "is-header-hidden")
      : "icon-button theme-toggle";

    return (
      <button className={controlClassName} type="button" aria-label={resolvedThemeLabel} onClick={handleThemeToggle}>
        <ThemeIcon aria-hidden="true" />
      </button>
    );
  };

  return (
    <>
      {scrollHideEnabled ? (
        <div
          aria-hidden="true"
          className={cx("hero-header-hover-zone", isHeaderActuallyHidden && "is-enabled")}
          onPointerEnter={revealHeaderFromHover}
        />
      ) : null}

      <header
        ref={headerElementRef}
        className={cx(
          "hero-header",
          scrollHideEnabled && "is-scroll-reactive",
          isHeaderActuallyHidden && "is-header-hidden",
          isHeaderSolid && "is-header-solid",
          isCategoryMaskReady && "is-category-mask-ready",
          className
        )}
        aria-label={ariaLabel}
        onPointerEnter={revealHeaderFromHover}
        onPointerLeave={releaseHeaderHover}
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
                  {hasBranches ? (
                    <button
                      className={isActive ? "is-active" : ""}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isBranchVisible}
                      ref={(node) => {
                        categoryLinkRefs.current[index] = node;
                      }}
                      onPointerEnter={() => showHoverMask(index)}
                      onMouseEnter={() => showHoverMask(index)}
                      onFocus={() => showHoverMask(index)}
                    >
                      {item.label}
                    </button>
                  ) : (
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
                  )}
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
                href={branches.length > 0 ? "#" : item.href}
                onClick={(event) => {
                  if (branches.length > 0) {
                    event.preventDefault();
                    return;
                  }

                  setMobileMenuOpen(false);
                }}
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
