import type { Metadata } from "next";
import { ArrowUpRight, Heart } from "lucide-react";
import { MembershipGrid } from "@/components/app/membership/membership-grid";
import { FaqSection } from "@/components/app/membership/faq-section";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Support Kinetic UI and unlock early access, source files, and more. Free forever with optional Pro and Sponsor tiers.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Membership · Kinetic UI",
    description:
      "Support Kinetic UI and unlock early access, source files, and more.",
    url: "/sponsors",
    type: "website",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Membership · Kinetic UI",
    images: ["/api/og"],
  },
};

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="mb-14 flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Heart className="h-3 w-3 text-accent" />
          Membership
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Built in the open,{" "}
          <span className="text-muted-foreground font-normal">
            sustained by you
          </span>
        </h1>
        <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
          Every component is free and MIT-licensed. Membership keeps the project
          alive and unlocks extras for developers who want more.
        </p>
      </div>

      {/* Plans */}
      <MembershipGrid />

      {/* FAQ */}
      <FaqSection />

      {/* Bottom CTA */}
      <div className="mt-24 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Just want to say thanks?
        </p>
        <a
          href="https://github.com/sponsors/starc007"
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          One-time sponsorship on GitHub
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
