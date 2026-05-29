import type { Metadata } from "next";
import { ChroniclePage } from "@/components/chronicle/ChroniclePage";

export const metadata: Metadata = {
  title: "DAEHO | Chronicle",
  description: "DAEHO chronicle horizontal timeline."
};

export default function Page() {
  return <ChroniclePage />;
}
