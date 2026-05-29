"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteTheme } from "@/components/layout/ThemeProvider";
import { featuredNews, newsArticles } from "@/data/news";

const allStories = [featuredNews, ...newsArticles];

const formatArticleDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));

export function NewsArticlePage({ slug }: { slug: string }) {
  const story = allStories.find((item) => item.slug === slug);
  const relatedStories = story
    ? allStories
        .filter((item) => item.slug !== story.slug)
        .sort((first, second) => {
          if (first.category === story.category && second.category !== story.category) return -1;
          if (first.category !== story.category && second.category === story.category) return 1;
          return new Date(second.date).getTime() - new Date(first.date).getTime();
        })
        .slice(0, 3)
    : allStories.slice(0, 3);
  const { theme, toggleTheme } = useSiteTheme();
  const isDayTheme = theme === "day";
  const themeLabel = isDayTheme ? "Switch to night version" : "Switch to day version";

  return (
    <main className={`news-page news-article-page ${isDayTheme ? "is-day-theme" : "is-night-theme"}`}>
      <SiteHeader
        activeSection="NEWS"
        ariaLabel="DAEHO news article navigation"
        onThemeToggle={toggleTheme}
        scrollHideEnabled
        theme={theme}
        themeLabel={themeLabel}
      />

      <article className="news-article-detail">
        <a className="news-back-link" href="/news">
          <ArrowLeft aria-hidden="true" />
          <span>Back to news</span>
        </a>

        {story ? (
          <>
            <div className="news-article-heading">
              <div className="news-article-eyebrow">
                <span>{story.category}</span>
                <time dateTime={story.date}>{formatArticleDate(story.date)}</time>
                <span>{story.readingTime}</span>
              </div>
              <h1>{story.title}</h1>
              <p>{story.excerpt}</p>
            </div>
            <figure className="news-article-hero-frame">
              <img className="news-article-image" src={story.image} alt="" style={{ objectPosition: story.imagePosition ?? "center center" }} />
              <figcaption>
                <span>DAEHO JOURNAL</span>
                <strong>{story.category}</strong>
              </figcaption>
            </figure>

            <div className="news-article-content-grid">
              <aside className="news-article-aside" aria-label="Article notes">
                <span>Article notes</span>
                <dl>
                  <div>
                    <dt>Category</dt>
                    <dd>{story.category}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{formatArticleDate(story.date)}</dd>
                  </div>
                  <div>
                    <dt>Read</dt>
                    <dd>{story.readingTime}</dd>
                  </div>
                </dl>
                <ul>
                  {story.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </aside>

              <div className="news-article-body">
                {story.body.map((section) => (
                  <section key={section.heading ?? section.paragraphs[0]}>
                    {section.heading ? <h2>{section.heading}</h2> : null}
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <blockquote>{story.quote}</blockquote>
              </div>
            </div>

            <section className="news-related" aria-label="Related DAEHO stories">
              <div className="news-related-heading">
                <span>Continue reading</span>
                <h2>Related Stories</h2>
              </div>
              <div className="news-related-grid">
                {relatedStories.map((item) => (
                  <a className="news-related-card" href={`/news/${item.slug}`} key={item.slug}>
                    <img src={item.image} alt="" style={{ objectPosition: item.imagePosition ?? "center center" }} />
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                    <small>
                      Read story <ArrowRight aria-hidden="true" />
                    </small>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="news-article-heading">
            <div className="news-article-eyebrow">
              <span>DAEHO JOURNAL</span>
            </div>
            <h1>Story not found</h1>
            <p>The requested story is not available yet.</p>
          </div>
        )}
      </article>
    </main>
  );
}
