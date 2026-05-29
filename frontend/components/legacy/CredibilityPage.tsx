"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";
import { credibilityDetailBlocks, credibilityScrollSheets, type CredibilityScrollSheet } from "@/data/credibility";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function CredibilityPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollStageRef = useRef<HTMLElement | null>(null);
  const [activeSheet, setActiveSheet] = useState(0);
  const { theme, toggleTheme } = useSiteTheme();
  const isNightTheme = theme === "night";

  useEffect(() => {
    const root = rootRef.current;
    const stage = scrollStageRef.current;
    if (!root || !stage) return;

    let frame = 0;
    const sheetCount = credibilityScrollSheets.length;

    const updateScrollSequence = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const maxTravel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / maxTravel);
      const tone = isNightTheme ? 1 : 0;
      const sheetTravel = Math.max(1, sheetCount - 1);
      const rawSheetProgress = progress * sheetTravel;
      const sheetBase = Math.min(sheetTravel - 1, Math.floor(rawSheetProgress));
      const localSheetProgress = rawSheetProgress - sheetBase;
      const heldSheetProgress =
        rawSheetProgress >= sheetTravel
          ? sheetTravel
          : sheetBase + smoothstep(clamp((localSheetProgress - 0.58) / 0.36));
      const currentSheet = Math.min(sheetCount - 1, Math.max(0, Math.round(heldSheetProgress)));

      root.style.setProperty("--credibility-progress", progress.toFixed(4));
      root.style.setProperty("--credibility-tone", tone.toFixed(4));
      stage.style.setProperty("--scroll-shift", `${-(heldSheetProgress * 100).toFixed(3)}vw`);
      setActiveSheet(currentSheet);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollSequence);
    };

    updateScrollSequence();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isNightTheme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".credibility-sheet, .credibility-detail-card, .credibility-cta a")
    );
    if (!targets.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-mobile-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-mobile-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.16 }
    );

    targets.forEach((target, index) => {
      target.style.setProperty("--mobile-reveal-delay", `${Math.min(index * 70, 280)}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const pageClassName = useMemo(
    () =>
      [
        "credibility-page",
        isNightTheme ? "is-night-locked" : "",
        !isNightTheme ? "is-day-locked" : "",
        !isNightTheme ? "is-header-on-light" : ""
      ]
        .filter(Boolean)
        .join(" "),
    [activeSheet, isNightTheme]
  );

  return (
    <main className={pageClassName} ref={rootRef}>
      <SiteHeader
        activeLegacyHref="/legacy/credibility"
        activeSection="LEGACY"
        ariaLabel="DAEHO credibility navigation"
        className="credibility-site-header"
        onThemeToggle={toggleTheme}
        theme={theme}
        themeLabel={isNightTheme ? "Switch to day version" : "Switch to night version"}
      />

      <section
        className="credibility-scroll-stage"
        ref={scrollStageRef}
        style={
          {
            "--sheet-count": credibilityScrollSheets.length,
            height: `${credibilityScrollSheets.length * 108}svh`
          } as CSSProperties
        }
        aria-label="Credibility scroll proof sequence"
      >
        <div className="credibility-scroll-viewport">
          <div className="credibility-night-field" aria-hidden="true" />
          <div className="credibility-scroll-track">
            {credibilityScrollSheets.map((sheet, index) => (
              <ScrollSheet
                active={index <= activeSheet}
                index={index}
                key={sheet.id}
                sheet={sheet}
              />
            ))}
          </div>
          <div className="credibility-scroll-progress" aria-hidden="true">
            <span style={{ width: `${((activeSheet + 1) / credibilityScrollSheets.length) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="credibility-details" aria-label="Credibility process detail">
        <div className="credibility-details-heading">
          <span>PROOF SYSTEM</span>
          <h2>Built around control, inspection, and delivery.</h2>
        </div>
        <div className="credibility-detail-list">
          {credibilityDetailBlocks.map((block) => (
            <article className="credibility-detail-card" key={block.title}>
              <img src={block.image} alt="" />
              <div>
                <span>{block.number}</span>
                <h3>{block.title}</h3>
                <p>{block.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="credibility-cta" aria-label="Credibility next steps">
        <a href="/specialty/technique">
          <span>VIEW OUR PROCESS</span>
          <small>Technique</small>
        </a>
        <a href="/legacy/achievement">
          <span>SEE ACHIEVEMENTS</span>
          <small>Delivery record</small>
        </a>
      </section>
    </main>
  );
}

function ScrollSheet({ active, index, sheet }: { active: boolean; index: number; sheet: CredibilityScrollSheet }) {
  if (sheet.type === "asset") {
    return (
      <article className={`credibility-sheet credibility-sheet-asset ${active ? "is-active" : ""}`} aria-label={sheet.title}>
        <div className="scroll-sheet-frame">
          <img className="scroll-sheet-image scroll-sheet-image-day" src={sheet.dayAsset} alt="" />
          <img className="scroll-sheet-image scroll-sheet-image-night" src={sheet.nightAsset} alt="" />
          {sheet.mobileDayAsset ? (
            <img className="scroll-sheet-image scroll-sheet-image-mobile scroll-sheet-image-mobile-day" src={sheet.mobileDayAsset} alt="" />
          ) : null}
          {sheet.mobileNightAsset ? (
            <img className="scroll-sheet-image scroll-sheet-image-mobile scroll-sheet-image-mobile-night" src={sheet.mobileNightAsset} alt="" />
          ) : null}
          <div className="scroll-sheet-mobile-title" aria-hidden="true">
            <span>DAEHO CREDIBILITY</span>
            <h1>{sheet.title}</h1>
            <p>38년 동안 쌓아온 신뢰와 안정적인 납품 경험</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`credibility-sheet credibility-sheet-metric is-${sheet.accent} ${active ? "is-active" : ""}`}>
      <div className="credibility-sheet-copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{sheet.metric}</strong>
        <h2>{sheet.label}</h2>
        <p>{sheet.support}</p>
        <div className="credibility-dash-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <ProofIllustration visual={sheet.visual} />
    </article>
  );
}

function ProofIllustration({ visual }: { visual: Extract<CredibilityScrollSheet, { type: "metric" }>["visual"] }) {
  if (visual === "growth-history") {
    return (
      <svg className="proof-illustration proof-growth" viewBox="0 0 560 360" aria-hidden="true">
        <path d="M60 290H500" />
        <path d="M86 272L160 250L230 212L300 176L370 110L466 48" />
        <path d="M430 50L466 48L454 84" />
        <path d="M120 288V220H154V288M186 288V178H220V288M252 288V134H286V288M318 288V194H352V288M384 288V156H418V288" />
        <circle cx="160" cy="250" r="8" />
        <circle cx="300" cy="176" r="8" />
        <circle cx="370" cy="110" r="8" />
        <text x="152" y="95">38</text>
      </svg>
    );
  }

  if (visual === "controlled-process") {
    return (
      <svg className="proof-illustration proof-process-flow" viewBox="0 0 560 360" aria-hidden="true">
        <path className="dotted" d="M108 178C174 98 248 260 314 178S436 132 468 210" />
        <rect x="70" y="110" width="92" height="68" rx="8" />
        <path d="M92 196H140M116 178V196" />
        <circle cx="280" cy="174" r="52" />
        <path d="M280 132V154M280 194V216M238 174H260M300 174H322M250 144L264 158M296 190L310 204M250 204L264 190M296 158L310 144" />
        <circle cx="404" cy="130" r="44" />
        <path d="M432 158L466 192" />
        <path d="M386 130H422M404 112V148" />
        <rect x="392" y="222" width="104" height="50" rx="8" />
        <path d="M416 222V196H472V222M416 272C416 286 438 286 438 272M456 272C456 286 478 286 478 272" />
      </svg>
    );
  }

  if (visual === "delivery-shield") {
    return (
      <svg className="proof-illustration proof-shield" viewBox="0 0 560 360" aria-hidden="true">
        <path d="M280 44C232 78 188 84 148 88V172C148 240 198 292 280 324C362 292 412 240 412 172V88C372 84 328 78 280 44Z" />
        <path d="M280 76C242 102 210 108 180 112V172C180 224 218 264 280 292C342 264 380 224 380 172V112C350 108 318 102 280 76Z" />
        <text x="234" y="202">0%</text>
        <path d="M392 250L424 282L482 214" />
        <circle cx="436" cy="248" r="62" />
        <path d="M116 112C94 142 82 184 82 224M444 112C466 142 478 184 478 224" />
      </svg>
    );
  }

  return (
    <svg className="proof-illustration proof-delivery" viewBox="0 0 560 360" aria-hidden="true">
      <path d="M52 122C150 70 260 70 360 112C420 136 466 174 508 220" />
      <path d="M72 196C174 150 282 150 382 190C430 210 470 238 504 272" />
      <path d="M96 92C116 102 132 120 142 142M206 66C216 92 218 120 212 150M326 76C304 104 292 132 292 164M430 136C398 154 374 178 358 210" />
      <rect x="120" y="228" width="240" height="62" rx="8" />
      <path d="M360 246H436L480 290H360V246Z" />
      <path d="M154 290C154 312 188 312 188 290M386 290C386 312 420 312 420 290" />
      <path d="M172 210H254M190 194H290M208 178H326" />
      <path d="M252 228V184H318V228" />
    </svg>
  );
}
