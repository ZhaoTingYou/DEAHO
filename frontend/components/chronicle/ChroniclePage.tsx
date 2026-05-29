"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";

const chronicleSlides = [
  {
    year: "1994",
    label: "HERITAGE",
    title: "첫 번째 걸음",
    desc: "1994년, 완벽을 향한 DAEHO의 집념이 담긴 첫 번째 컬렉션이 세상에 공개되었습니다.",
    image: "/images/legacy/credibility/ring-hero-day-layout.png"
  },
  {
    year: "2001",
    label: "CRAFTSMANSHIP",
    title: "변치 않는 가치",
    desc: "시간은 흐르지만, 우리가 추구하는 정밀함의 본질은 결코 변하지 않습니다.",
    image: "/images/home-featured-categories.png"
  },
  {
    year: "2012",
    label: "INNOVATION",
    title: "기술의 비상",
    desc: "2012년, 새로운 이스케이프먼트 시스템 개발을 통해 기계식 시계의 한계를 다시 한번 뛰어넘었습니다.",
    image: "/images/project-3.png"
  },
  {
    year: "2026",
    label: "FUTURE",
    title: "미래를 향한 박동",
    desc: "이제 DAEHO는 다음 세대를 위한 서사를 준비합니다. 여정은 멈추지 않습니다.",
    image: "/images/home-recent-projects.png"
  }
];

const chronicleYearStops = chronicleSlides.map((slide, index) => ({ index, year: slide.year }));

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function ChroniclePage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const yearResetRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayYear, setDisplayYear] = useState(chronicleSlides[0].year);
  const [yearSwitching, setYearSwitching] = useState(false);
  const [stageVisible, setStageVisible] = useState(false);
  const [introExiting, setIntroExiting] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const { theme, toggleTheme } = useSiteTheme();
  const isDayTheme = theme === "day";
  const themeLabel = theme === "day" ? "Switch to night version" : "Switch to day version";

  useEffect(() => {
    document.documentElement.classList.add("is-chronicle-intro-locked");
    document.body.classList.add("is-chronicle-intro-locked");
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.classList.remove("is-chronicle-intro-locked");
      document.body.classList.remove("is-chronicle-intro-locked");
    };
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    document.documentElement.classList.remove("is-chronicle-intro-locked");
    document.body.classList.remove("is-chronicle-intro-locked");
  }, [introComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setStageVisible(true);
      setIntroExiting(true);
      setIntroComplete(true);
      return;
    }

    const stageTimer = window.setTimeout(() => setStageVisible(true), 2250);
    const exitTimer = window.setTimeout(() => setIntroExiting(true), 2750);
    const completeTimer = window.setTimeout(() => setIntroComplete(true), 5100);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(stageTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / travel);
      targetProgressRef.current = nextProgress;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const animateProgress = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const isMobile = window.innerWidth <= 960 || window.matchMedia("(max-aspect-ratio: 3 / 4)").matches;
      const next = isMobile ? target : current + (target - current) * 0.07;
      const settled = Math.abs(target - next) < 0.0005;
      const resolved = settled ? target : next;
      const nextIndex = Math.min(chronicleSlides.length - 1, Math.round(resolved * (chronicleSlides.length - 1)));

      smoothProgressRef.current = resolved;
      setProgress(resolved);
      setActiveIndex(nextIndex);
      frameRef.current = window.requestAnimationFrame(animateProgress);
    };

    update();
    frameRef.current = window.requestAnimationFrame(animateProgress);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const nextYear = chronicleSlides[activeIndex]?.year ?? chronicleSlides[0].year;
    if (nextYear === displayYear) return;

    if (yearResetRef.current) {
      window.clearTimeout(yearResetRef.current);
    }

    setYearSwitching(true);
    yearResetRef.current = window.setTimeout(() => {
      setDisplayYear(nextYear);
      setYearSwitching(false);
      yearResetRef.current = null;
    }, 600);

    return () => {
      if (yearResetRef.current) {
        window.clearTimeout(yearResetRef.current);
        yearResetRef.current = null;
      }
    };
  }, [activeIndex, displayYear]);

  const trackStyle = useMemo(
    () =>
      ({
        "--chronicle-shift": `${-progress * (chronicleSlides.length - 1) * 100}vw`
      }) as CSSProperties,
    [progress]
  );

  const scrollToChronicleYear = (index: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    const targetProgress = clamp(index / Math.max(1, chronicleSlides.length - 1));
    const isMobile = window.innerWidth <= 960 || window.matchMedia("(max-aspect-ratio: 3 / 4)").matches;

    if (isMobile) {
      stage.querySelectorAll<HTMLElement>(".chronicle-slide")[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const rect = stage.getBoundingClientRect();
    const stageTop = window.scrollY + rect.top;
    const travel = Math.max(1, rect.height - window.innerHeight);
    window.scrollTo({ top: stageTop + targetProgress * travel, behavior: "smooth" });
  };

  return (
    <main className={`chronicle-page ${isDayTheme ? "is-day-theme" : "is-night-theme"} ${stageVisible ? "is-stage-visible" : ""}`}>
      <SiteHeader
        activeSection="CHRONICLE"
        ariaLabel="DAEHO chronicle navigation"
        ready={stageVisible || introComplete}
        scrollHideEnabled
        onThemeToggle={toggleTheme}
        theme={theme}
        themeLabel={themeLabel}
      />

      <nav className="chronicle-year-nav" aria-label="Chronicle year navigation">
        {chronicleYearStops.map((stop) => (
          <button
            className={activeIndex === stop.index ? "is-active" : ""}
            type="button"
            aria-current={activeIndex === stop.index ? "step" : undefined}
            onClick={() => scrollToChronicleYear(stop.index)}
            key={`${stop.year}-${stop.index}`}
          >
            {stop.year}
          </button>
        ))}
      </nav>

      <section
        className="chronicle-stage"
        ref={stageRef}
        style={{ "--chronicle-slides": chronicleSlides.length } as CSSProperties}
        aria-label="DAEHO chronicle horizontal timeline"
      >
        <div className="chronicle-viewport">
          <div className="chronicle-bg-year" aria-hidden="true">
            <span className={yearSwitching ? "is-switching" : ""}>{displayYear}</span>
          </div>

          <div className="chronicle-track" style={trackStyle}>
            {chronicleSlides.map((slide, index) => {
              const textThreshold = Math.max(0, (index - 0.75) / Math.max(1, chronicleSlides.length - 1));
              const imageThreshold = Math.max(0, (index - 0.65) / Math.max(1, chronicleSlides.length - 1));
              const isTextVisible = progress >= textThreshold;
              const isImageVisible = progress >= imageThreshold;

              return (
                <section
                  className={[
                    "chronicle-slide",
                    index === activeIndex ? "is-active" : "",
                    isTextVisible ? "is-text-visible" : "",
                    isImageVisible ? "is-image-visible" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-year={slide.year}
                  key={`${slide.year}-${slide.title}`}
                >
                  <div className="chronicle-content">
                    <div className="chronicle-copy">
                      <span>{slide.label}</span>
                      <h1>{slide.title}</h1>
                      <p>{slide.desc}</p>
                    </div>
                    <div className="chronicle-image-frame">
                      <img src={slide.image} alt="" />
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </section>

      <div className="chronicle-progress" aria-hidden="true">
        <i style={{ width: `${progress * 100}%` }} />
      </div>

      <div className={`chronicle-intro ${introExiting ? "is-exiting" : ""} ${introComplete ? "is-complete" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="135" />
        </svg>
        <span>DAEHO</span>
      </div>
    </main>
  );
}
