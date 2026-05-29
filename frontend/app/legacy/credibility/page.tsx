import type { Metadata } from "next";
import { CredibilityPage } from "@/components/legacy/CredibilityPage";

export const metadata: Metadata = {
  title: "DAEHO | Credibility",
  description: "DAEHO credibility proof sequence, process control, and delivery reliability."
};

export default function Page() {
  return <CredibilityPage />;
}
