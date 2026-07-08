import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono, Space_Grotesk, Syne, Plus_Jakarta_Sans } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import { GoogleAnalytics } from "@/components/app/analytics/google-analytics";
import { ThemeProvider } from "@/components/app/chrome/theme-provider";
import { PreferencesProvider } from "@/components/app/preferences/preferences-provider";
import { PreferencesPanel } from "@/components/app/preferences/preferences-panel";
import { SiteHeader } from "@/components/app/chrome/site-header";
import { SiteDock } from "@/components/app/chrome/site-dock";
import { AuthProvider } from "@/components/app/auth/auth-provider";
import { AuthModal } from "@/components/app/auth/auth-modal";
import { SiteFrame } from "@/components/app/chrome/site-frame";
import { KeyboardShortcuts } from "@/components/app/chrome/keyboard-shortcuts";
import { JsonLd } from "@/components/app/analytics/json-ld";
import { getGithubStarCount } from "@/lib/github";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, siteJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const pixel = GeistPixelSquare;
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Kinetic UI · The UI component toolkit for React & Next.js",
    template: "%s · Kinetic UI",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR, url: "https://github.com/starc007" }],
  creator: AUTHOR,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    types: {
      "application/json": "/registry.json",
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    title: "Kinetic UI · The UI component toolkit for React & Next.js",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Kinetic UI · The UI component toolkit for React & Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic UI · The UI component toolkit for React & Next.js",
    description: SITE_DESCRIPTION,
    images: ["/api/og"],
  },
  keywords: [
    "React motion components",
    "best motion components",
    "free motion components",
    "open source motion components",
    "open source React components",
    "free React components",
    "Tailwind CSS components",
    "Next.js components",
    "shadcn registry",
    "shadcn-compatible components",
    "framer motion components",
    "best framer motion components",
    "framer motion templates",
    "framer motion components and templates",
    "animated UI components",
    "component library",
    "copy paste components",
    "free",
    "open source",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const githubStarCount = await getGithubStarCount();
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, mono.variable, pixel.variable, spaceGrotesk.variable, syne.variable, plusJakarta.variable)}>
      <head>
        {/* Blocking script — sets data-theme before first paint so no flash of the
            default mono palette occurs. Must stay in <head>, not <body>. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.theme="blood-orange";` }} />
        <link rel="icon" type="image/svg+xml" href="/kinetic-mark.svg" />
        <link rel="icon" type="image/png" href="/kinetic-mark.png" sizes="32x32" />
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <link rel="alternate" type="application/json" title="Component registry" href="/r" />
        <link rel="alternate" type="application/json" title="shadcn registry" href="/registry.json" />
      </head>
      <body className="min-h-screen antialiased">
        <JsonLd data={siteJsonLd()} />
        <ThemeProvider>
          <PreferencesProvider>
            <AuthProvider>
              <KeyboardShortcuts />
              <SiteHeader githubStarCount={githubStarCount} />
              <main className="pt-14 pb-32">
                <SiteFrame>{children}</SiteFrame>
              </main>
              <SiteDock />
              <PreferencesPanel />
              <AuthModal />
            </AuthProvider>
            {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
            {process.env.NEXT_PUBLIC_VERCEL_ENV && <SpeedInsights />}
            <GoogleAnalytics measurementId={googleAnalyticsId} />
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
