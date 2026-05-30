"use client";

import { useCallback, useEffect, useMemo, useState, type MouseEvent, type PointerEvent } from "react";
import { ArrowRight, Gem, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { golfDetails, golfPackagingNotes, golfShaftColors } from "@/data/golf";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
const golfViews = ["FRONT", "SIDE", "ANGLE", "DETAIL"] as const;

export function GolfPage() {
  const [activeColor, setActiveColor] = useState(golfShaftColors[3].label);
  const [activeView, setActiveView] = useState<(typeof golfViews)[number]>("FRONT");
  const { theme, toggleTheme } = useSiteTheme();
  const isDayTheme = theme === "day";
  const themeLabel = isDayTheme ? "Switch to night version" : "Switch to day version";
  const selectedColor = useMemo(
    () => golfShaftColors.find((color) => color.label === activeColor) ?? golfShaftColors[0],
    [activeColor]
  );
  const activeViewKey = activeView.toLowerCase();

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".golf-reveal"));

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = useCallback((event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  }, []);

  const handleHeroPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--golf-pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--golf-pointer-y", y.toFixed(3));
  }, []);

  const resetHeroPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--golf-pointer-x", "0");
    event.currentTarget.style.setProperty("--golf-pointer-y", "0");
  }, []);

  return (
    <main className={`golf-page ${isDayTheme ? "is-day-theme" : "is-night-theme"}`}>
      <SiteHeader
        activeSection="GOLF"
        ariaLabel="DAEHO golf navigation"
        onThemeToggle={toggleTheme}
        scrollHideEnabled
        theme={theme}
        themeLabel={themeLabel}
      />

      <section className="golf-hero" aria-labelledby="golf-title">
        <div className="golf-section-index" aria-hidden="true">
          <span>01</span>
          <i />
          <span>06</span>
        </div>
        <div className="golf-hero-copy golf-reveal">
          <span>Premium customized golf bracelet</span>
          <h1 id="golf-title">
            FORM
            <br />
            OF
            <br />
            THE GAME
          </h1>
          <p>골프의 구조를 하나의 오브제로 재해석하다</p>
          <a className="golf-button" href="#golf-collection" onClick={(event) => handleAnchorClick(event, "golf-collection")}>
            <span>Discover collection</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="golf-hero-visual golf-reveal" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer}>
          <img
            src={isDayTheme ? "/images/golf/golf-day-hero-product.jpg" : "/images/golf/golf-night-hero-product.jpg"}
            alt=""
          />
        </div>
      </section>

      <section className="golf-detail-section" aria-labelledby="golf-detail-title">
        <div className="golf-section-label">DAEHO</div>
        <div className="golf-detail-copy golf-reveal">
          <span>02</span>
          <h2 id="golf-detail-title">
            DESIGN
            <br />
            IN EVERY
            <br />
            DETAIL
          </h2>
          <p>정교한 디테일과 최고의 소재, 시간이 지나도 변치 않는 가치.</p>
        </div>
        <div className="golf-detail-grid">
          {golfDetails.map((detail) => (
            <article className="golf-detail-card golf-reveal" key={detail.label}>
              <div className="golf-detail-image">
                <img src={isDayTheme ? detail.image : detail.nightImage} alt="" />
              </div>
              <span>{detail.number}</span>
              <h3>{detail.label}</h3>
              <p>{detail.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="golf-colors" id="golf-collection" aria-labelledby="golf-colors-title">
        <div className="golf-centered-heading golf-reveal">
          <span>03</span>
          <h2 id="golf-colors-title">SHAFT COLOR</h2>
          <p>감정선이 스며든 컬러와 구조적인 라인 선택</p>
        </div>
        <div className="golf-color-grid" role="list">
          {golfShaftColors.map((color) => (
            <button
              className={cx("golf-color-card golf-reveal", color.label === activeColor && "is-active")}
              type="button"
              aria-pressed={color.label === activeColor}
              key={color.label}
              onFocus={() => setActiveColor(color.label)}
              onMouseEnter={() => setActiveColor(color.label)}
              onClick={() => setActiveColor(color.label)}
            >
              <img src={color.image} alt="" />
              <span className="golf-swatch" style={{ background: color.swatch }} aria-hidden="true" />
              <strong>{color.label}</strong>
              <small>{color.description}</small>
            </button>
          ))}
        </div>
        <div className="golf-color-selected golf-reveal" aria-live="polite">
          <span>{selectedColor.label}</span>
          <p>{selectedColor.description}</p>
          <i style={{ background: selectedColor.swatch }} aria-hidden="true" />
        </div>
      </section>

      <section className="golf-crafted" aria-labelledby="golf-crafted-title">
        <div className="golf-crafted-copy golf-reveal">
          <span>DAEHO GOLF</span>
          <small>04</small>
          <h2 id="golf-crafted-title">
            CRAFTED
            <br />
            TO LAST
          </h2>
          <p>정교한 디테일과 최고의 소재. 시간이 지나도 빛나는 가치.</p>
        </div>
        <div className="golf-crafted-detail golf-reveal">
          <img src="/images/golf/golf-day-crafted-engraving.jpg" alt="" />
        </div>
        <figure className="golf-crafted-main golf-reveal">
          <img src="/images/golf/golf-day-crafted-main.jpg" alt="" />
          <figcaption>
            <Gem aria-hidden="true" />
            <span>Precision. Strength. Timeless.</span>
          </figcaption>
        </figure>
      </section>

      <section className="golf-statement" aria-labelledby="golf-statement-title">
        <div className="golf-statement-image golf-reveal">
          <img src={isDayTheme ? "/images/golf/golf-day-statement-wrist.jpg" : "/images/golf/golf-night-statement.jpg"} alt="" />
        </div>
        <div className="golf-statement-copy golf-reveal">
          <span>05 Statement</span>
          <h2 id="golf-statement-title">
            MORE THAN
            <br />
            A BRACELET,
            <br />
            A STATEMENT.
          </h2>
          <p>필드 위의 취향, 일상에 새겨지는 선언.</p>
          <a className="golf-button is-dark" href="#golf-package" onClick={(event) => handleAnchorClick(event, "golf-package")}>
            <span>View collection</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <img
          className="golf-statement-product golf-reveal"
          data-view={activeViewKey}
          src="/images/golf/golf-day-statement-product.jpg"
          alt=""
        />
        <div className="golf-spec-strip golf-reveal" aria-label="Golf bracelet views">
          {golfViews.map((item, index) => (
            <button
              className={item === activeView ? "is-active" : ""}
              type="button"
              aria-pressed={item === activeView}
              key={item}
              onClick={() => setActiveView(item)}
              onFocus={() => setActiveView(item)}
              onMouseEnter={() => setActiveView(item)}
            >
              <i>{String(index + 1).padStart(2, "0")}</i>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="golf-package" id="golf-package" aria-labelledby="golf-package-title">
        <div className="golf-package-copy golf-reveal">
          <span>06</span>
          <h2 id="golf-package-title">
            PACKAGED
            <br />
            WITH PURPOSE.
          </h2>
          <p>선물로 전해지는 순간까지, 브랜드의 감각을 세심하게 완성합니다.</p>
          <div className="golf-package-badge">
            <PackageCheck aria-hidden="true" />
            <span>Created to protect. Crafted to impress.</span>
          </div>
        </div>
        <figure className="golf-package-main golf-reveal">
          <img src="/images/golf/golf-day-package.jpg" alt="" />
        </figure>
        <div className="golf-package-notes golf-reveal">
          {golfPackagingNotes.map((note, index) => (
            <article key={note}>
              {index === 0 ? <Sparkles aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
              <span>{note}</span>
              <p>{index === 0 ? "A restrained first impression." : "Small decisions that make the object feel complete."}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
