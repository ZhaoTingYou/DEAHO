import type { Metadata } from "next";
import { NewsArticlePage } from "@/components/news/NewsArticlePage";
import { featuredNews, newsArticles } from "@/data/news";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return [featuredNews, ...newsArticles].map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = [featuredNews, ...newsArticles].find((item) => item.slug === params.slug);

  return {
    title: article ? `DAEHO | ${article.title}` : "DAEHO | News",
    description: article?.excerpt ?? "DAEHO news article."
  };
}

export default function Page({ params }: PageProps) {
  return <NewsArticlePage slug={params.slug} />;
}
