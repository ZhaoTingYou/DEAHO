import type { Metadata } from "next";
import { NewsPage } from "@/components/news/NewsPage";

export const metadata: Metadata = {
  title: "DAEHO | News",
  description: "Latest DAEHO brand stories, craftsmanship notes, projects, and championship ring news."
};

export default function Page() {
  return <NewsPage />;
}
