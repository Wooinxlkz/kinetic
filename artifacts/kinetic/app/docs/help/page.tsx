import type { Metadata } from "next";
import { HelpPageClient } from "./help-page-client";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "Get help with Kinetic UI — browse FAQs, report a bug, or reach out directly for support with components, installation, or theming.",
  alternates: { canonical: "/docs/help" },
  openGraph: {
    title: "Help & Support · Kinetic UI",
    description: "Get help with Kinetic UI components, installation, and theming.",
    url: "/docs/help",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

export default function HelpPage() {
  return <HelpPageClient />;
}
