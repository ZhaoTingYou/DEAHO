"use client";

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme, type SiteTheme } from "@/components/layout/ThemeProvider";
import { brandRows, featuredCategories, proofCards, recentProjects } from "@/data/home";
import { primaryNavigation } from "@/data/navigation";

const openingTiming = {
  blurIn: 900,
  hold: 520,
  flight: 1450,
  reveal: 620
};

const openingPlayedKey = "daeho-opening-played";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const easeInOutCubic = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

function hasOpeningPlayed() {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(openingPlayedKey) === "true";
  } catch {
    return false;
  }
}

function markOpeningPlayed() {
  try {
    window.sessionStorage.setItem(openingPlayedKey, "true");
    document.documentElement.classList.add("is-opening-skipped");
  } catch {
    document.documentElement.classList.add("is-opening-skipped");
  }
}

export function HomePage({ initialTheme }: { initialTheme?: SiteTheme }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroStageRef = useRef<HTMLElement | null>(null);
  const logoTargetRef = useRef<HTMLAnchorElement | null>(null);
  const introLogoRef = useRef<HTMLDivElement | null>(null);
  const openingRef = useRef<HTMLDivElement | null>(null);
  const openingVeilRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLElement | null>(null);
  const proofRef = useRef<HTMLElement | null>(null);
  const recentRef = useRef<HTMLElement | null>(null);
  const openingTimersRef = useRef<number[]>([]);
  const openingRunRef = useRef(0);

  const [activeCategory, setActiveCategory] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLogoLanded, setIsLogoLanded] = useState(false);
  const [isOpeningGone, setIsOpeningGone] = useState(false);
  const [isOpeningHidden, setIsOpeningHidden] = useState(false);
  const [featuredEntered, setFeaturedEntered] = useState(false);
  const [proofEntered, setProofEntered] = useState(false);
  const [recentEntered, setRecentEntered] = useState(false);
  const { isDayTheme, setTheme, theme, toggleTheme } = useSiteTheme();
  const themeLabel = isDayTheme ? "Switch to night version" : "Switch to day version";

  const clearOpeningTimers = useCallback(() => {
    openingTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    openingTimersRef.current = [];
  }, []);

  const wait = useCallback((duration: number) => {
    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, duration);
      openingTimersRef.current.push(timer);
    });
  }, []);

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [initialTheme, setTheme]);

  const runOpening = useCallback(async () => {
    const runId = openingRunRef.current + 1;
    openingRunRef.current = runId;
    const logo = introLogoRef.current;
    const target = logoTargetRef.current;
    const opening = openingRef.current;
    const openingVeil = openingVeilRef.current;
    const page = heroRef.current;
    clearOpeningTimers();
    window.scrollTo(0, 0);

    setIsRevealing(false);
    setIsRevealed(false);
    setIsLogoLanded(false);
    setIsOpeningGone(false);
    setIsOpeningHidden(false);

    if (opening) {
      opening.hidden = false;
    }

    const isCurrentRun = () => openingRunRef.current === runId;

    if (!logo || !target || !opening || !openingVeil || !page) {
      setIsRevealing(true);
      setIsRevealed(true);
      setIsLogoLanded(true);
      setIsOpeningGone(true);
      setIsOpeningHidden(true);
      markOpeningPlayed();
      return;
    }

    for (const element of [opening, openingVeil, logo, page]) {
      element.getAnimations().forEach((animation) => animation.cancel());
    }

    openingVeil.style.opacity = "1";
    openingVeil.style.transform = "translateY(0) scale(1)";
    logo.style.opacity = "0";
    logo.style.filter = "blur(24px)";
    logo.style.transform = "translate3d(-50%, -50%, 0) scale(1)";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsRevealing(true);
      setIsRevealed(true);
      setIsLogoLanded(true);
      setIsOpeningGone(true);
      markOpeningPlayed();
      openingVeil.style.opacity = "0";
      logo.style.opacity = "0";
      await wait(260);
      if (isCurrentRun()) {
        opening.hidden = true;
        setIsOpeningHidden(true);
      }
      return;
    }

    await document.fonts.ready;
    await wait(90);
    if (!isCurrentRun()) return;

    await logo
      .animate(
        [
          { opacity: 0, filter: "blur(24px)" },
          { opacity: 1, filter: "blur(0)" }
        ],
        {
          duration: openingTiming.blurIn,
          easing: "cubic-bezier(.16, 1, .3, 1)",
          fill: "forwards"
        }
      )
      .finished.catch(() => undefined);

    await wait(openingTiming.hold);
    if (!isCurrentRun()) return;

    const logoRect = logo.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = targetRect.left + targetRect.width / 2 - (logoRect.left + logoRect.width / 2);
    const y = targetRect.top + targetRect.height / 2 - (logoRect.top + logoRect.height / 2);
    const scale = targetRect.width / Math.max(logoRect.width, 1);

    setIsRevealing(true);

    const logoFlight = logo.animate(
      [
        {
          transform: "translate3d(-50%, -50%, 0) scale(1)",
          filter: "blur(0)",
          opacity: 1,
          offset: 0
        },
        {
          transform: `translate3d(calc(-50% + ${x * 0.18}px), calc(-50% + ${y * 0.18}px), 0) scale(${
            1 + (scale - 1) * 0.18
          })`,
          filter: "blur(0)",
          opacity: 1,
          offset: 0.3
        },
        {
          transform: `translate3d(calc(-50% + ${x * 0.72}px), calc(-50% + ${y * 0.72}px), 0) scale(${
            1 + (scale - 1) * 0.72
          })`,
          filter: "blur(0)",
          opacity: 1,
          offset: 0.76
        },
        {
          transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
          filter: "blur(0)",
          opacity: 1,
          offset: 1
        }
      ],
      {
        duration: openingTiming.flight,
        easing: "cubic-bezier(.45, 0, .18, 1)",
        fill: "forwards"
      }
    );

    const veilLift = openingVeil.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(-6px) scale(.998)" }
      ],
      {
        duration: openingTiming.flight,
        easing: "cubic-bezier(.16, 1, .3, 1)",
        fill: "forwards"
      }
    );

    await Promise.all([logoFlight.finished, veilLift.finished]).catch(() => undefined);
    if (!isCurrentRun()) return;

    setIsLogoLanded(true);
    setIsRevealed(true);

    await logo
      .animate(
        [
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: 180,
          easing: "ease-out",
          fill: "forwards"
        }
      )
      .finished.catch(() => undefined);

    if (!isCurrentRun()) return;
    setIsOpeningGone(true);

    await wait(openingTiming.reveal);
    if (!isCurrentRun()) return;

    opening.hidden = true;
    markOpeningPlayed();
    setIsOpeningHidden(true);
  }, [clearOpeningTimers, wait]);

  useEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (hasOpeningPlayed()) {
      root.classList.remove("is-opening-locked");
      body.classList.remove("is-opening-locked");
      root.classList.add("is-opening-skipped");
      return;
    }

    if (isOpeningHidden) {
      root.classList.remove("is-opening-locked");
      body.classList.remove("is-opening-locked");
      return;
    }

    const lockedScrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
    const preventScroll = (event: Event) => {
      event.preventDefault();
    };
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (lockedScrollKeys.has(event.key)) {
        event.preventDefault();
      }
    };
    const keepAtTop = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    root.classList.add("is-opening-locked");
    body.classList.add("is-opening-locked");
    keepAtTop();

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyboardScroll);
    window.addEventListener("scroll", keepAtTop, { passive: true });

    return () => {
      root.classList.remove("is-opening-locked");
      body.classList.remove("is-opening-locked");
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyboardScroll);
      window.removeEventListener("scroll", keepAtTop);
    };
  }, [isOpeningHidden]);

  useEffect(() => {
    if (hasOpeningPlayed()) {
      openingRunRef.current += 1;
      clearOpeningTimers();
      window.scrollTo(0, 0);
      setIsRevealing(true);
      setIsRevealed(true);
      setIsLogoLanded(true);
      setIsOpeningGone(true);
      setIsOpeningHidden(true);

      if (openingRef.current) {
        openingRef.current.hidden = true;
      }

      return;
    }

    document.documentElement.classList.remove("is-opening-skipped");

    const id = window.setTimeout(() => {
      void runOpening();
    }, 120);
    return () => {
      window.clearTimeout(id);
      openingRunRef.current += 1;
      clearOpeningTimers();
    };
  }, [clearOpeningTimers, runOpening]);

  useEffect(() => {
    const handleResize = () => {
      if (hasOpeningPlayed()) return;

      if (openingRef.current && !openingRef.current.hidden) {
        void runOpening();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [runOpening]);

  useEffect(() => {
    const stage = heroStageRef.current;
    if (!stage) return;

    let frame = 0;
    const updateTransition = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const maxTravel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / maxTravel);
      const isCompact = window.innerWidth <= 960 || window.matchMedia("(max-aspect-ratio: 3 / 4)").matches;
      const featuredIn = isCompact ? 1 : easeInOutCubic(clamp((progress - 0.22) / 0.48));
      const heroExit = isCompact ? 0 : easeOutCubic(clamp((progress - 0.4) / 0.48));

      stage.style.setProperty("--featured-in", featuredIn.toFixed(4));
      stage.style.setProperty("--hero-exit", heroExit.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTransition);
    };

    updateTransition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target === featuredRef.current) {
            window.setTimeout(() => setFeaturedEntered(true), 80);
          }
          if (entry.isIntersecting && entry.target === proofRef.current) {
            window.setTimeout(() => setProofEntered(true), 220);
          }
          if (entry.isIntersecting && entry.target === recentRef.current) {
            setRecentEntered(true);
          }
        }
      },
      { threshold: 0.24, rootMargin: "0px 0px -12% 0px" }
    );

    if (featuredRef.current) observer.observe(featuredRef.current);
    if (proofRef.current) observer.observe(proofRef.current);
    if (recentRef.current) observer.observe(recentRef.current);

    return () => observer.disconnect();
  }, []);

  const heroClassName = useMemo(
    () =>
      [
        "home-hero",
        isRevealing ? "is-revealing" : "",
        isRevealed ? "is-revealed" : "",
        isLogoLanded ? "is-logo-landed" : ""
      ]
        .filter(Boolean)
        .join(" "),
    [isLogoLanded, isRevealed, isRevealing]
  );

  const homeClassName = useMemo(
    () =>
      [
        "home-page",
        isDayTheme ? "is-day-theme" : "is-night-theme",
        isLogoLanded ? "is-logo-landed" : "",
        isRevealing ? "is-revealing" : "",
        isRevealed ? "is-revealed" : ""
      ]
        .filter(Boolean)
        .join(" "),
    [isDayTheme, isLogoLanded, isRevealed, isRevealing]
  );

  return (
    <main className={homeClassName}>
      <SiteHeader
        activeSection="HOME"
        ariaLabel="DAEHO home navigation"
        logoRef={logoTargetRef}
        ready={isRevealing || isRevealed}
        reveal
        scrollHideEnabled={isOpeningHidden}
        onThemeToggle={toggleTheme}
        theme={theme}
        themeLabel={themeLabel}
      />

      <section className="hero-featured-stage" ref={heroStageRef} aria-label="DAEHO home opening and featured categories">
        <section className={heroClassName} ref={heroRef} aria-label="DAEHO home hero">
          <div className="hero-blueprint" aria-hidden="true" />

          <section className="hero-copy" aria-label="DAEHO campaign headline">
            <p className="hero-kicker reveal-item">VICTORY. PRIDE. LEGACY</p>
            <h1 className="hero-title reveal-item">
              DESIGN
              <br />
              TO BE
              <br />
              REMEMBERED
            </h1>
            <p className="hero-subtitle reveal-item">
              승리의 순간을 영원히 빛내는
              <br />
              단 하나의 챔피언십 링
            </p>
            <a className="hero-cta reveal-item" href="/specialty/collection">
              DISCOVER COLLECTION <span aria-hidden="true">→</span>
            </a>
          </section>

          <div className="scroll-indicator reveal-item" aria-hidden="true">
            <span className="mouse" />
            <span>SCROLL</span>
          </div>
        </section>

        <section
          className={`featured-overlay ${featuredEntered ? "is-entered" : ""}`}
          ref={featuredRef}
          aria-label="Featured categories"
        >
          <FeaturedCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </section>
      </section>

      <ProofBento proofEntered={proofEntered} proofRef={proofRef} />
      <RecentProjects recentEntered={recentEntered} recentRef={recentRef} />
      <Footer />

      <div className={`home-opening ${isOpeningGone ? "is-gone" : ""}`} ref={openingRef} hidden={isOpeningHidden} aria-hidden="true">
        <div className="opening-veil" ref={openingVeilRef} />
        <div className="opening-logo" ref={introLogoRef}>
          DAEHO
        </div>
      </div>
    </main>
  );
}

function FeaturedCategories({
  activeCategory,
  setActiveCategory
}: {
  activeCategory: number;
  setActiveCategory: (index: number) => void;
}) {
  const hoverIntentRef = useRef<number | null>(null);

  const clearHoverIntent = () => {
    if (hoverIntentRef.current) {
      window.clearTimeout(hoverIntentRef.current);
      hoverIntentRef.current = null;
    }
  };

  const scheduleCategory = (index: number) => {
    clearHoverIntent();
    if (index === activeCategory) return;

    hoverIntentRef.current = window.setTimeout(() => {
      setActiveCategory(index);
      hoverIntentRef.current = null;
    }, 80);
  };

  const commitCategory = (index: number) => {
    clearHoverIntent();
    if (index !== activeCategory) {
      setActiveCategory(index);
    }
  };

  useEffect(() => clearHoverIntent, []);

  return (
    <div className="featured-shell">
      <div className="featured-panels" role="list">
        {featuredCategories.map((category, index) => (
          <article
            className={`featured-panel ${index === activeCategory ? "is-active" : ""}`}
            key={category.title}
            role="listitem"
            onMouseEnter={() => scheduleCategory(index)}
            onMouseLeave={clearHoverIntent}
            onFocus={() => commitCategory(index)}
            onClick={() => commitCategory(index)}
            tabIndex={0}
          >
            <div
              className="featured-image"
              style={
                {
                  "--featured-image": `url(${category.image})`,
                  backgroundPosition: category.imagePosition
                } as CSSProperties
              }
              aria-hidden="true"
            />
            <div className="featured-scrim" aria-hidden="true" />
            <div className="featured-copy">
              <p>{category.label}</p>
              <h2>{category.title}</h2>
              <span>{category.english}</span>
              <small>{category.copy}</small>
              <a href="/specialty/collection">CLICK</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProofBento({
  proofEntered,
  proofRef
}: {
  proofEntered: boolean;
  proofRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section className="proof-section" ref={proofRef} aria-label="DAEHO proof bento">
      <div className={`proof-grid ${proofEntered ? "is-entered" : ""}`}>
        {proofCards.map((card) => {
          if (card.type === "intro") {
            return (
              <article className="proof-card proof-intro" key={card.key}>
                <span className="proof-kicker">{card.kicker}</span>
                <h2>{card.title?.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
                <p>{card.copy}</p>
                <span className="proof-stamp">1986</span>
                <span className="proof-ring" aria-hidden="true" />
              </article>
            );
          }

          if (card.type === "cta") {
            return (
              <a className="proof-card proof-cta" href="/legacy" key={card.key}>
                <span>{card.title}</span>
                <small>{card.copy}</small>
              </a>
            );
          }

          return (
            <article className={`proof-card proof-${card.key}`} key={card.key}>
              <strong>
                {card.metric?.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </strong>
              <p>{card.label}</p>
              <span className="proof-line-art" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RecentProjects({
  recentEntered,
  recentRef
}: {
  recentEntered: boolean;
  recentRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section className={`recent-section ${recentEntered ? "is-entered" : ""}`} ref={recentRef} aria-label="Recent projects">
      <div className="recent-inner">
        <h2>RECENT PROJECTS</h2>
        <div className="project-reel">
          {recentProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <img src={project.image} alt={project.title} />
              <span className="project-medal" aria-hidden="true">
                Champion
              </span>
              <p>{project.title}</p>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
        <a className="view-more-link" href="/news">
          VIEW MORE
        </a>
        <aside className="brand-official" aria-label="Brand official">
          <h3>BRAND OFFICIAL</h3>
          <div className="brand-marquee">
            {brandRows.map((row, index) => (
              <div className="brand-row" key={index}>
                {[...row, ...row].map((brand, rowIndex) => (
                  <span key={`${brand}-${rowIndex}`}>{brand}</span>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <strong>DAEHO</strong>
      <nav aria-label="Footer navigation">
        {primaryNavigation.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <span>© 2026 DAEHO. Crafted for victory, pride, and legacy.</span>
    </footer>
  );
}
