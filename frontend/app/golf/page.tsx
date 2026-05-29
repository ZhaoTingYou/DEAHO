import type { Metadata } from "next";
import { GolfPage } from "@/components/golf/GolfPage";

export const metadata: Metadata = {
  title: "DAEHO | Golf",
  description: "DAEHO Golf bracelet product story and collection."
};

export default function Page() {
  return <GolfPage />;
}
