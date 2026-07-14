"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Mail,
  BookOpen,
  ArrowRight,
  MessageSquarePlus,
  MessageCircleQuestion,
  Check,
  Copy,
} from "lucide-react";
import { GithubIcon } from "@/components/app/icons";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import {
  ActionSwapCascadeButton,
  type ActionSwapItem,
} from "@/components/motion/action-swap-cascade";
import { ContactDialog, CONTACT_EMAIL } from "@/components/app/contact-dialog";

const EMAIL = CONTACT_EMAIL;
const GITHUB_REPO = "https://github.com/Wooinxlkz";

const COPY_ITEMS: ActionSwapItem[] = [
  {
    id: "copy",
    label: "Email us",
    icon: <Copy className="h-4 w-4" />,
    ariaLabel: "Copy email address",
  },
  {
    id: "copied",
    label: "Copied!",
    icon: <Check className="h-4 w-4" />,
    ariaLabel: "Email copied",
  },
];

const FAQ_ITEMS = [
  {
    id: "pro",
    title: "Do I need a Pro membership to use components?",
    description:
      "No. Every component in the registry is free and open source — copy-paste or install via the shadcn registry with no account required. Pro unlocks early access to new components, private blocks, and priority support.",
  },
  {
    id: "broken",
    title: "A component I installed isn't working. What should I check first?",
    description:
      "Confirm you're on Node 18+, Tailwind CSS v4, and React 18+, and that your globals.css imports theme.css (see Theme Setup). Most breakage comes from a missing token import or a peer dependency the component page lists under its Dependencies section.",
  },
  {
    id: "vite",
    title: "Can I use these components outside of Next.js?",
    description:
      "Yes — everything works in any Vite + React 18+ project. The install steps are the same; just skip anything App Router–specific in the examples.",
  },
  {
    id: "update",
    title: "How do I update a component after it changes upstream?",
    description:
      "Since components are copied into your project rather than installed as a dependency, re-run the shadcn add command for that component, or re-copy the source from its page and reapply any local edits.",
  },
  {
    id: "profile",
    title: "Where do I manage my profile, avatar, or account settings?",
    description:
      "Open the profile menu in the top-right corner of the site and choose Your profile to edit your details, or Appearance to change the theme.",
  },
  {
    id: "membership",
    title: "How do I cancel or change my Pro membership?",
    description:
      "Head to the Membership page from the profile menu (Upgrade to Pro) — billing and plan changes are managed there. For anything that page doesn't cover, email support.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────── */

export function HelpPageClient() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copyValue, setCopyValue]     = useState("copy");

  const handleCopy = useCallback((nextId: string) => {
    if (nextId === "copied") {
      navigator.clipboard.writeText(EMAIL).catch(() => {});
      setCopyValue("copied");
      setTimeout(() => setCopyValue("copy"), 2200);
    } else {
      setCopyValue("copy");
    }
  }, []);

  return (
    <>
      <ContactDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Support
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Help &amp; support
        </h1>
        <p className="mt-3 text-muted-foreground">
          Stuck on something, found a bug, or just have a question? Here's the
          fastest way to get an answer.
        </p>

        {/* Channels grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">

          {/* Read the docs */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <BookOpen className="h-4 w-4 text-foreground" />
            </div>
            <p className="mt-3 font-medium text-foreground">Read the docs</p>
            <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
              Most questions are answered in Installation, Theme Setup, or the
              component pages themselves.
            </p>
            <Link
              href="/docs/installation"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Browse docs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Contact us — opens dialog */}
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-foreground/20 hover:bg-foreground/[0.02]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <MessageSquarePlus className="h-4 w-4 text-foreground" />
            </div>
            <p className="mt-3 font-medium text-foreground">Contact us</p>
            <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
              Send feedback, report a bug, or ask for help — we read
              everything and reply within a day or two.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              Open form
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          {/* Email support */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <Mail className="h-4 w-4 text-foreground" />
            </div>
            <p className="mt-3 font-medium text-foreground">Email support</p>
            <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
              For account, billing, or Pro membership questions, email us
              directly and we'll get back within a day or two.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Email us
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* GitHub */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <GithubIcon className="h-4 w-4 text-foreground" />
            </div>
            <p className="mt-3 font-medium text-foreground">GitHub</p>
            <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
              Browse the source code, open an issue, or follow the project for
              updates.
            </p>
            <Link
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              View on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <h2
          id="faq"
          className="mt-12 flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground"
        >
          <MessageCircleQuestion className="h-[18px] w-[18px] shrink-0 text-muted-foreground" />
          Frequently asked questions
        </h2>
        <div className="mt-4">
          <BouncyAccordion items={FAQ_ITEMS} collapsible />
        </div>

        {/* Still stuck */}
        <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
          <div>
            <p className="font-medium text-foreground">Still stuck?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Drop us a line — copy our email and reach out directly.
            </p>
          </div>
          <ActionSwapCascadeButton
            items={COPY_ITEMS}
            value={copyValue}
            variant="secondary"
            onValueChange={handleCopy}
            className="shrink-0"
          />
        </div>
      </div>
    </>
  );
}
