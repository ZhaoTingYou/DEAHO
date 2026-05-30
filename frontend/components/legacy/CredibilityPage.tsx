"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";
import {
  credibilityDecorativePath,
  credibilityMotionProductPath,
  credibilitySections,
  type CredibilitySection
} from "@/data/credibility";

const marketBars = [42, 58, 72, 88];
const integrationNodes = ["Planning", "Design", "Production", "QC", "Packing", "Delivery"];

function formatMetric(target: number, suffix = "") {
  return `${target.toLocaleString("en-US")}${suffix}`;
}

function splitTitle(title: string) {
  return title.split("\n").map((line) => line.trim());
}

export function CredibilityPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>(credibilitySections[0].id);
  const { theme, toggleTheme } = useSiteTheme();
  const isNightTheme = theme === "night";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(".credibility2026-real-section"));
    const numberNodes = Array.from(root.querySelectorAll<HTMLElement>("[data-count-target]"));

    const setFinalNumbers = () => {
      numberNodes.forEach((node) => {
        const target = Number(node.dataset.countTarget ?? "0");
        const suffix = node.dataset.countSuffix ?? "";
        node.textContent = formatMetric(target, suffix);
      });
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      root.classList.add("is-reduced-motion");
      sections.forEach((section) => section.classList.add("is-visible"));
      setFinalNumbers();
      return;
    }

    let cancelled = false;
    let context: { revert: () => void } | null = null;

    root.classList.add("is-motion-enhanced");
    sections[0]?.classList.add("is-visible");

    void (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          gsap.set(root.querySelectorAll("[data-cred-motion], [data-cred-visual]"), {
            autoAlpha: 0,
            y: 34,
            filter: "blur(10px)"
          });
          gsap.set(root.querySelectorAll(".credibility2026-market-bar"), { scaleY: 0, transformOrigin: "bottom center" });
          gsap.set(root.querySelectorAll(".credibility2026-process-node, .credibility2026-defect-node, .credibility2026-rd-node"), {
            autoAlpha: 0,
            scale: 0.82
          });
          gsap.set(root.querySelectorAll(".credibility2026-hero-card"), {
            autoAlpha: 0,
            y: 28,
            scale: 0.96
          });

          sections.forEach((section, index) => {
            const motionItems = Array.from(section.querySelectorAll<HTMLElement>("[data-cred-motion]"));
            const visual = section.querySelector<HTMLElement>("[data-cred-visual]");
            const paths = Array.from(section.querySelectorAll<SVGPathElement>(".credibility2026-visual-line path"));
            const bars = Array.from(section.querySelectorAll<HTMLElement>(".credibility2026-market-bar"));
            const nodes = Array.from(
              section.querySelectorAll<HTMLElement>(".credibility2026-process-node, .credibility2026-defect-node, .credibility2026-rd-node")
            );
            const heroCards = Array.from(section.querySelectorAll<HTMLElement>(".credibility2026-hero-card"));
            const sweep = section.querySelector<HTMLElement>(".credibility2026-light-sweep");

            paths.forEach((path) => {
              const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 560;
              gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            });

            const timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: section,
                start: index === 0 ? "top 88%" : "top 72%",
                once: true,
                onEnter: () => {
                  section.classList.add("is-visible");
                  setActiveSectionId(section.id);
                }
              }
            });

            timeline.to(motionItems, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.82, stagger: 0.07 }, 0);

            if (visual) {
              timeline.to(visual, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.08 }, 0.18);
            }

            if (heroCards.length) {
              timeline.to(heroCards, { autoAlpha: 1, y: 0, scale: 1, duration: 1.08, stagger: 0.08 }, 0.34);
              gsap.to(section.querySelectorAll(".credibility2026-hero-card.is-primary"), {
                y: -8,
                duration: 4.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }

            if (paths.length) {
              timeline.to(paths, { strokeDashoffset: 0, duration: 1.45, stagger: 0.04, ease: "power2.out" }, 0.46);
            }

            if (bars.length) {
              timeline.to(bars, { scaleY: 1, duration: 1.05, stagger: 0.1, ease: "power3.out" }, 0.5);
            }

            if (nodes.length) {
              timeline.to(nodes, { autoAlpha: 1, scale: 1, duration: 0.58, stagger: 0.09, ease: "power2.out" }, 0.68);
            }

            if (sweep) {
              timeline.fromTo(
                sweep,
                { xPercent: -90, autoAlpha: 0 },
                { xPercent: 90, autoAlpha: 0.46, duration: 1.55, ease: "power2.inOut" },
                0.72
              );
            }

            ScrollTrigger.create({
              trigger: section,
              start: "top 48%",
              end: "bottom 48%",
              onEnter: () => setActiveSectionId(section.id),
              onEnterBack: () => setActiveSectionId(section.id)
            });

            if (visual) {
              gsap.fromTo(
                visual,
                { yPercent: -1.6 },
                {
                  yPercent: 1.6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.9
                  }
                }
              );
            }
          });

          numberNodes.forEach((node) => {
            const target = Number(node.dataset.countTarget ?? "0");
            const suffix = node.dataset.countSuffix ?? "";

            ScrollTrigger.create({
              trigger: node,
              start: "top 82%",
              once: true,
              onEnter: () => {
                if (target === 0) {
                  node.textContent = formatMetric(0, suffix);
                  return;
                }

                const counter = { value: 0 };
                gsap.to(counter, {
                  value: target,
                  duration: 1.55,
                  ease: "power3.out",
                  onUpdate: () => {
                    node.textContent = formatMetric(Math.round(counter.value), suffix);
                  },
                  onComplete: () => {
                    node.textContent = formatMetric(target, suffix);
                  }
                });
              }
            });
          });
        }, root);

        ScrollTrigger.refresh();
      } catch {
        if (!cancelled) {
          root.classList.remove("is-motion-enhanced");
          sections.forEach((section) => section.classList.add("is-visible"));
          setFinalNumbers();
        }
      }
    })();

    return () => {
      cancelled = true;
      context?.revert();
      root.classList.remove("is-motion-enhanced");
    };
  }, []);

  const pageClassName = useMemo(
    () =>
      [
        "credibility-page",
        "credibility2026",
        isNightTheme ? "is-night-theme is-night-locked" : "is-day-theme is-day-locked is-header-on-light"
      ].join(" "),
    [isNightTheme]
  );

  return (
    <main className={pageClassName} ref={rootRef}>
      <SiteHeader
        activeLegacyHref="/legacy/credibility"
        activeSection="LEGACY"
        ariaLabel="DAEHO credibility navigation"
        className="credibility2026-site-header"
        onThemeToggle={toggleTheme}
        theme={theme}
        themeLabel={isNightTheme ? "Switch to day version" : "Switch to night version"}
      />

      <nav className="credibility2026-rail" aria-label="Credibility section navigation">
        {credibilitySections.map((section) => (
          <a className={activeSectionId === section.id ? "is-active" : ""} href={`#${section.id}`} key={section.id}>
            <span>{section.index}</span>
          </a>
        ))}
      </nav>

      {credibilitySections.map((section) => (
        <CredibilitySectionBlock key={section.id} section={section} />
      ))}
    </main>
  );
}

function CredibilitySectionBlock({ section }: { section: CredibilitySection }) {
  const Heading = section.id === "hero" ? "h1" : "h2";

  return (
    <section className={`credibility2026-section credibility2026-real-section credibility2026-${section.id} is-${section.tone}`} id={section.id}>
      <div className="credibility2026-section-grid" aria-hidden="true" />
      <span className="credibility2026-light-sweep" aria-hidden="true" />

      <div className="credibility2026-real-inner">
        <div className="credibility2026-real-copy">
          <span className="credibility2026-real-index" data-cred-motion>
            {section.index}
          </span>
          <p className="credibility2026-real-kicker" data-cred-motion>
            {section.eyebrow}
          </p>
          <Heading className="credibility2026-real-title">
            {splitTitle(section.title).map((line) => (
              <span className="credibility2026-real-title-line" data-cred-motion key={line}>
                {line}
              </span>
            ))}
          </Heading>
          <p className="credibility2026-real-subtitle" data-cred-motion>
            {section.subtitle}
          </p>
          <div className="credibility2026-real-body" data-cred-motion>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {section.metric ? (
            <div className="credibility2026-real-metric" data-cred-motion>
              <strong data-count-target={section.metric.target} data-count-suffix={section.metric.suffix ?? ""}>
                {formatMetric(0, section.metric.suffix)}
              </strong>
              <span>{section.metric.label}</span>
            </div>
          ) : null}
        </div>

        <div className="credibility2026-real-visual" data-cred-visual>
          <CredibilityVisual section={section} />
        </div>

        {section.points ? (
          <div className="credibility2026-real-points" data-cred-motion>
            {section.points.map((point) => (
              <article key={point.label}>
                <img src={point.icon} alt="" aria-hidden="true" />
                <span>{point.label}</span>
                <strong>{point.value}</strong>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CredibilityVisual({ section }: { section: CredibilitySection }) {
  switch (section.visualKind) {
    case "hero":
      return <HeroVisual section={section} />;
    case "journey":
      return <JourneyVisual />;
    case "market":
      return <MarketVisual />;
    case "defect":
      return <DefectVisual />;
    case "rd":
      return <RdVisual />;
    case "integration":
      return <IntegrationVisual />;
    default:
      return null;
  }
}

function HeroVisual({ section }: { section: CredibilitySection }) {
  return (
    <div className="credibility2026-hero-display">
      <div className="credibility2026-hero-architecture" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="credibility2026-hero-podium" aria-hidden="true">
        <span className="credibility2026-hero-podium-top" />
        <span className="credibility2026-hero-podium-base" />
      </div>
      {section.heroPhotos?.map((photo) => (
        <figure className={`credibility2026-hero-card ${photo.className}`} key={photo.src}>
          <img src={photo.src} alt={photo.alt} />
        </figure>
      ))}
    </div>
  );
}

function JourneyVisual() {
  return (
    <div className="credibility2026-journey-visual">
      <span className="credibility2026-orbit-glow" aria-hidden="true" />
      <svg className="credibility2026-journey-landscape credibility2026-visual-line" viewBox="0 0 640 420" aria-hidden="true">
        <path className="credibility2026-journey-horizon" d="M36 302 C118 258, 164 278, 230 226 C296 174, 345 202, 420 134 C488 72, 542 88, 604 36" />
        <path className="credibility2026-journey-ridge" d="M58 344 C132 318, 188 330, 258 286 C330 242, 380 260, 462 204 C516 168, 562 164, 614 136" />
        <path className="credibility2026-journey-contour" d="M80 374 C156 354, 242 362, 330 334 C416 306, 498 310, 582 274" />
        <path className="credibility2026-journey-contour" d="M112 256 C188 234, 238 244, 304 206 C366 170, 420 178, 502 112" />
      </svg>
      <svg className="credibility2026-visual-line credibility2026-journey-route" viewBox="0 0 640 420" aria-hidden="true">
        <path d="M70 330 C 150 290, 190 220, 260 235 C 335 250, 355 135, 430 145 C 500 155, 530 82, 585 96" />
        <circle cx="70" cy="330" r="7" />
        <circle cx="260" cy="235" r="7" />
        <circle cx="430" cy="145" r="7" />
        <circle cx="585" cy="96" r="7" />
      </svg>
      <div className="credibility2026-journey-number">
        <strong data-count-target="38">0</strong>
        <span>years</span>
      </div>
    </div>
  );
}

function MarketVisual() {
  return (
    <div className="credibility2026-market-visual">
      <div className="credibility2026-market-photo">
        <img src={`${credibilityMotionProductPath}/market_leader_ring_on_podium.png`} alt="Championship ring detail on a marble podium" />
      </div>
      <div className="credibility2026-market-chart" aria-hidden="true">
        {marketBars.map((height, index) => (
          <span
            className="credibility2026-market-bar"
            style={{ "--bar-height": `${height}%` } as CSSProperties}
            key={`${height}-${index}`}
          />
        ))}
      </div>
      <svg className="credibility2026-visual-line credibility2026-market-line" viewBox="0 0 640 300" aria-hidden="true">
        <path d="M70 230 C 185 210, 250 168, 330 176 C 430 186, 474 96, 575 62" />
        <circle cx="575" cy="62" r="8" />
      </svg>
    </div>
  );
}

function DefectVisual() {
  return (
    <div className="credibility2026-defect-visual">
      <div className="credibility2026-defect-package">
        <img src={`${credibilityMotionProductPath}/zero_defect_package_box.png`} alt="DAEHO delivery package box" />
      </div>
      <svg className="credibility2026-visual-line credibility2026-shield-line" viewBox="0 0 360 420" aria-hidden="true">
        <path d="M180 42 C 210 72, 254 88, 300 96 L300 188 C300 286 242 353 180 382 C118 353 60 286 60 188 L60 96 C106 88 150 72 180 42 Z" />
        <path d="M126 213 L162 249 L238 167" />
      </svg>
      <div className="credibility2026-defect-score">
        <strong data-count-target="0" data-count-suffix="%">
          0%
        </strong>
        <span>delivery failure</span>
      </div>
      <div className="credibility2026-defect-nodes">
        <img className="credibility2026-defect-node" src={`${credibilityDecorativePath}/icon_clipboard.png`} alt="" aria-hidden="true" />
        <img className="credibility2026-defect-node" src={`${credibilityDecorativePath}/icon_box.png`} alt="" aria-hidden="true" />
        <img className="credibility2026-defect-node" src={`${credibilityDecorativePath}/icon_truck.png`} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}

function RdVisual() {
  return (
    <div className="credibility2026-rd-visual">
      <svg className="credibility2026-visual-line credibility2026-factory-line" viewBox="0 0 680 420" aria-hidden="true">
        <path d="M80 330 L80 218 L180 252 L180 218 L282 252 L282 185 L362 185 L362 330 Z" />
        <path d="M398 330 L398 142 L520 142 L520 330" />
        <path d="M434 142 L434 92 L484 92 L484 142" />
        <path d="M95 330 H610" />
        <path d="M438 234 C468 198, 522 202, 548 238" />
        <path d="M548 238 L588 278" />
      </svg>
      <img className="credibility2026-rd-robot credibility2026-rd-node" src={`${credibilityDecorativePath}/icon_robot_arm.png`} alt="" aria-hidden="true" />
      <div className="credibility2026-rd-belt" aria-hidden="true">
        <span className="credibility2026-rd-node" />
        <span className="credibility2026-rd-node" />
        <span className="credibility2026-rd-node" />
      </div>
    </div>
  );
}

function IntegrationVisual() {
  return (
    <div className="credibility2026-integration-visual">
      <svg className="credibility2026-visual-line credibility2026-process-line" viewBox="0 0 520 520" aria-hidden="true">
        <path d="M260 64 A196 196 0 1 1 259.9 64" />
        <path d="M383 108 L420 114 L405 148" />
      </svg>
      <div className="credibility2026-process-center">
        <strong data-count-target="100" data-count-suffix="%">
          0%
        </strong>
        <span>integrated</span>
      </div>
      {integrationNodes.map((node, index) => (
        <span
          className="credibility2026-process-node"
          style={{ "--node-index": index } as CSSProperties}
          key={node}
        >
          {node}
        </span>
      ))}
    </div>
  );
}
