"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Gem, Medal, ShieldCheck, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";

const productAssets = {
  heroRing: "/images/legacy/credibility/motion-assets/products/hero_main_gold_ring.png",
  ringGroup: "/images/legacy/credibility/motion-assets/products/hero_supporting_ring_group.png",
  marbleCollection: "/images/legacy/credibility/motion-assets/products/hero_ring_collection_on_marble.png",
  introReference: "/images/specialty/collection/collection-reference-intro.png",
  hLeagueReference: "/images/specialty/collection/hleague-reference.png",
  championshipReference: "/images/specialty/collection/championship-rings-reference.png",
  awardsReference: "/images/specialty/collection/awards-showcase-reference.png",
  blueprint: "/images/legacy/credibility/motion-assets/backgrounds/rd_blueprint_background_crop.jpg"
};

const collectionNav = [
  { label: "Intro", href: "#collection-intro" },
  { label: "H-League", href: "#h-league" },
  { label: "Rings", href: "#championship-rings" },
  { label: "Awards", href: "#awards-showcase" }
];

const seriesMarks = [
  { label: "BLUE SAPPHIRE", value: "01" },
  { label: "BLACK GOLD", value: "02" },
  { label: "SILVER LEGACY", value: "03" },
  { label: "CEREMONIAL", value: "04" }
];

const awardSystem = [
  { icon: Trophy, title: "Trophies", copy: "Presentation pieces for finals, seasons, and signature ceremonies." },
  { icon: Medal, title: "Medallions", copy: "Scaled keepsakes designed around the same championship language." },
  { icon: ShieldCheck, title: "Display", copy: "Packaging, plaques, and cases composed as one complete honor system." }
];

export function CollectionPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeAnchor, setActiveAnchor] = useState(collectionNav[0].href);
  const { theme, toggleTheme } = useSiteTheme();
  const isDayTheme = theme === "day";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(".collection-section"));
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      root.classList.add("is-reduced-motion");
      sections.forEach((section) => section.classList.add("is-visible"));
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
          gsap.set(root.querySelectorAll("[data-collection-reveal], [data-collection-visual]"), {
            autoAlpha: 0,
            y: 34,
            filter: "blur(12px)"
          });
          gsap.set(root.querySelectorAll(".collection-line path"), { strokeDasharray: 520, strokeDashoffset: 520 });

          sections.forEach((section, index) => {
            const revealItems = Array.from(section.querySelectorAll<HTMLElement>("[data-collection-reveal]"));
            const visuals = Array.from(section.querySelectorAll<HTMLElement>("[data-collection-visual]"));
            const paths = Array.from(section.querySelectorAll<SVGPathElement>(".collection-line path"));
            const lightSweep = section.querySelector<HTMLElement>(".collection-light-sweep");

            const timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: section,
                start: index === 0 ? "top 88%" : "top 72%",
                once: true,
                onEnter: () => {
                  section.classList.add("is-visible");
                  setActiveAnchor(`#${section.id}`);
                }
              }
            });

            timeline.to(revealItems, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.86, stagger: 0.075 }, 0);
            timeline.to(visuals, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.05, stagger: 0.08 }, 0.18);

            if (paths.length) {
              timeline.to(paths, { strokeDashoffset: 0, duration: 1.35, stagger: 0.05, ease: "power2.out" }, 0.34);
            }

            if (lightSweep) {
              timeline.fromTo(
                lightSweep,
                { xPercent: -70, autoAlpha: 0 },
                { xPercent: 80, autoAlpha: 0.46, duration: 1.5, ease: "power2.inOut" },
                0.55
              );
            }

            ScrollTrigger.create({
              trigger: section,
              start: "top 46%",
              end: "bottom 46%",
              onEnter: () => setActiveAnchor(`#${section.id}`),
              onEnterBack: () => setActiveAnchor(`#${section.id}`)
            });

            visuals.forEach((visual) => {
              gsap.fromTo(
                visual,
                { yPercent: -1.4 },
                {
                  yPercent: 1.4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.9
                  }
                }
              );
            });
          });

          gsap.to(root.querySelectorAll(".collection-floating-ring"), {
            y: -8,
            duration: 4.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.18
          });
        }, root);

        ScrollTrigger.refresh();
      } catch {
        if (!cancelled) {
          root.classList.remove("is-motion-enhanced");
          sections.forEach((section) => section.classList.add("is-visible"));
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
    () => `collection-page ${isDayTheme ? "is-day-theme" : "is-night-theme"}`,
    [isDayTheme]
  );

  return (
    <main className={pageClassName} ref={rootRef}>
      <SiteHeader
        activeSection="SPECIALTY"
        activeSpecialtyHref="/specialty/collection"
        ariaLabel="DAEHO collection navigation"
        onThemeToggle={toggleTheme}
        scrollHideEnabled
        theme={theme}
        themeLabel={isDayTheme ? "Switch to night version" : "Switch to day version"}
      />

      <nav className="collection-progress" aria-label="Collection sections">
        {collectionNav.map((item) => (
          <a className={activeAnchor === item.href ? "is-active" : ""} href={item.href} key={item.href}>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <section className="collection-section collection-intro" id="collection-intro" aria-labelledby="collection-title">
        <div className="collection-blueprint" aria-hidden="true" />
        <div className="collection-inner collection-intro-layout">
          <div className="collection-copy">
            <div className="collection-tabs" data-collection-reveal>
              <a href="/specialty/technique">Technique</a>
              <a className="is-active" href="/specialty/collection">
                Collection
              </a>
            </div>
            <span className="collection-eyebrow" data-collection-reveal>
              DAEHO SPECIALTY
            </span>
            <h1 id="collection-title" data-collection-reveal>
              THE COLLECTION
            </h1>
            <i className="collection-rule" data-collection-reveal />
            <p data-collection-reveal>
              Championship rings, presentation objects, and ceremonial keepsakes formed as one collected language of
              victory. Each piece is designed to carry a season, a team, and a moment that should not fade.
            </p>
            <div className="collection-principles" data-collection-reveal>
              <span>Innovation</span>
              <span>Longevity</span>
              <span>Reliability</span>
            </div>
          </div>

          <div className="collection-intro-visual" data-collection-visual>
            <svg className="collection-line collection-blueprint-ring" viewBox="0 0 520 520" aria-hidden="true">
              <path d="M96 260c0-91 73-164 164-164s164 73 164 164-73 164-164 164S96 351 96 260Z" />
              <path d="M151 260c0-60 49-109 109-109s109 49 109 109-49 109-109 109-109-49-109-109Z" />
              <path d="M260 62v396M62 260h396M132 132l256 256M388 132 132 388" />
            </svg>
            <figure className="collection-ring-stage">
              <img className="collection-floating-ring collection-day-ring" src={productAssets.heroRing} alt="" />
              <img className="collection-floating-ring collection-night-ring" src={productAssets.introReference} alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section className="collection-section collection-hleague" id="h-league" aria-labelledby="h-league-title">
        <div className="collection-inner collection-feature-layout">
          <div className="collection-copy">
            <span className="collection-eyebrow" data-collection-reveal>
              The Ultimate Glory
            </span>
            <h2 id="h-league-title" data-collection-reveal>
              H-LEAGUE
              <br />
              CHAMPIONS RING
            </h2>
            <p data-collection-reveal>
              A signature championship ring composed around sport, ceremony, and lasting recognition. The form is bold;
              the finish remains precise.
            </p>
            <a className="collection-cta" href="#championship-rings" data-collection-reveal>
              <span>Discover More</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <figure className="collection-product-hero" data-collection-visual>
            <img src={productAssets.hLeagueReference} alt="" />
            <span className="collection-light-sweep" aria-hidden="true" />
          </figure>
        </div>
      </section>

      <section className="collection-section collection-rings" id="championship-rings" aria-labelledby="rings-title">
        <div className="collection-inner collection-rings-layout">
          <div className="collection-copy">
            <span className="collection-eyebrow" data-collection-reveal>
              Legends Are Earned
            </span>
            <h2 id="rings-title" data-collection-reveal>
              CHAMPIONSHIP
              <br />
              RINGS
            </h2>
            <p data-collection-reveal>
              Series pieces are arranged as a legacy set, not a product shelf. Color, crest, and silhouette are balanced
              so every ring feels distinct while belonging to one family.
            </p>
            <a className="collection-cta" href="#awards-showcase" data-collection-reveal>
              <span>Discover More</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="collection-rings-showcase" data-collection-visual>
            <img className="collection-rings-crop" src={productAssets.championshipReference} alt="" />
            <div className="collection-series-strip" aria-label="Collection series marks">
              {seriesMarks.map((mark) => (
                <span key={mark.value}>
                  <small>{mark.value}</small>
                  {mark.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="collection-section collection-awards" id="awards-showcase" aria-labelledby="awards-title">
        <div className="collection-inner collection-awards-layout">
          <div className="collection-copy">
            <span className="collection-eyebrow" data-collection-reveal>
              Specialty Collection
            </span>
            <h2 id="awards-title" data-collection-reveal>
              AWARDS
              <br />
              SHOWCASE
            </h2>
            <p data-collection-reveal>
              Beyond the ring, DAEHO builds a complete ceremonial system: trophies, medallions, display boxes, plaques,
              and keepsakes that preserve the moment from presentation to archive.
            </p>
            <div className="collection-award-grid" data-collection-reveal>
              {awardSystem.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title}>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <figure className="collection-awards-visual" data-collection-visual>
            <img src={productAssets.awardsReference} alt="" />
            <figcaption>
              <Gem aria-hidden="true" />
              <span>Legacy of Excellence</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
