"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";
import { featuredNews, newsArticles, newsFilters, type NewsFilter } from "@/data/news";

const formatNewsDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
    .format(new Date(`${date}T00:00:00`))
    .replace(",", "");

export function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<NewsFilter>("ALL");
  const [sortDirection, setSortDirection] = useState<"latest" | "oldest">("latest");
  const { theme, toggleTheme } = useSiteTheme();
  const isDayTheme = theme === "day";
  const themeLabel = isDayTheme ? "Switch to night version" : "Switch to day version";
  const featuredHref = `/news/${featuredNews.slug}`;

  const visibleArticles = useMemo(() => {
    const filtered =
      activeFilter === "ALL" ? newsArticles : newsArticles.filter((article) => article.category === activeFilter);
    const direction = sortDirection === "latest" ? -1 : 1;

    return [...filtered].sort(
      (first, second) => (new Date(first.date).getTime() - new Date(second.date).getTime()) * direction
    );
  }, [activeFilter, sortDirection]);

  return (
    <main className={`news-page ${isDayTheme ? "is-day-theme" : "is-night-theme"}`}>
      <SiteHeader
        activeSection="NEWS"
        ariaLabel="DAEHO news navigation"
        onThemeToggle={toggleTheme}
        scrollHideEnabled
        theme={theme}
        themeLabel={themeLabel}
      />

      <section className="news-hero" aria-labelledby="news-title">
        <div className="news-heading">
          <span>DAEHO JOURNAL</span>
          <h1 id="news-title">NEWS</h1>
          <i aria-hidden="true" />
          <p>The latest stories from DAEHO</p>
        </div>

        <article className="news-featured">
          <a className="news-featured-image" href={featuredHref} aria-label={featuredNews.title}>
            <img src={featuredNews.image} alt="" />
          </a>
          <div className="news-featured-copy">
            <div className="news-kicker-row">
              <span>{featuredNews.category}</span>
              <i aria-hidden="true" />
              <time dateTime={featuredNews.date}>{formatNewsDate(featuredNews.date)}</time>
            </div>
            <h2>{featuredNews.title}</h2>
            <p>{featuredNews.excerpt}</p>
            <a className="news-read-more" href={featuredHref}>
              <span>Read more</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </article>
      </section>

      <section className="news-index" aria-label="DAEHO news stories">
        <div className="news-toolbar">
          <div className="news-filters" aria-label="Filter news">
            {newsFilters.map((filter) => (
              <button
                className={filter === activeFilter ? "is-active" : ""}
                type="button"
                aria-pressed={filter === activeFilter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            className="news-sort"
            type="button"
            aria-label="Toggle news sort order"
            onClick={() => setSortDirection((current) => (current === "latest" ? "oldest" : "latest"))}
          >
            <span>{sortDirection === "latest" ? "Latest" : "Oldest"}</span>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>

        <div className="news-grid">
          {visibleArticles.map((article) => (
            <article className="news-card" key={article.slug}>
              <a className="news-card-image" href={`/news/${article.slug}`} aria-label={article.title}>
                <img src={article.image} alt="" style={{ objectPosition: article.imagePosition ?? "center center" }} />
              </a>
              <div className="news-card-meta">
                <span>{article.category}</span>
                <time dateTime={article.date}>{article.date.replaceAll("-", ".")}</time>
              </div>
              <h2>
                <a href={`/news/${article.slug}`}>{article.title}</a>
              </h2>
              <p>{article.excerpt}</p>
              <a className="news-card-link" href={`/news/${article.slug}`}>
                <span>Read more</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="news-footer" aria-label="DAEHO footer">
        <div className="news-footer-brand">
          <strong>DAEHO</strong>
          <p>Design to be remembered</p>
          <span>Victory. Pride. Legacy.</span>
        </div>
        <nav aria-label="Brand links">
          <h2>Brand</h2>
          <a href="/chronicle">Chronicle</a>
          <a href="/legacy/credibility">Credibility</a>
          <a href="/specialty/technique">Craftsmanship</a>
        </nav>
        <nav aria-label="Collection links">
          <h2>Collection</h2>
          <a href="/specialty/collection">Championship Rings</a>
          <a href="/specialty/collection">Custom Designs</a>
          <a href="/golf">Golf Collection</a>
        </nav>
        <nav aria-label="Support links">
          <h2>Support</h2>
          <a href="/news">FAQ</a>
          <a href="/news">Care Guide</a>
          <a href="/news">Contact Us</a>
        </nav>
      </footer>
    </main>
  );
}
