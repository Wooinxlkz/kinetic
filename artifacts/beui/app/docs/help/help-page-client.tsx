"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  BookOpen,
  ArrowRight,
  MessageSquarePlus,
  X,
  Send,
  ChevronDown,
  MessageCircleQuestion,
  Sparkles,
  Check,
  Copy,
  MessageCircle,
  Bug,
  LifeBuoy,
  Ellipsis,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon } from "@/components/app/icons";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import {
  ActionSwapCascadeButton,
  type ActionSwapItem,
} from "@/components/motion/action-swap-cascade";

const EMAIL = "karimsc01t@gmail.com";
const GITHUB_REPO = "https://github.com/Wooinxlkz";

const CONTACT_TYPES = [
  { value: "feedback", label: "Feedback",       icon: MessageCircle  },
  { value: "bug",      label: "Report a bug",   icon: Bug            },
  { value: "help",     label: "Need help",      icon: LifeBuoy       },
  { value: "other",    label: "Something else", icon: Ellipsis       },
];

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

/* ─── Contact dialog ──────────────────────────────────────────────────── */

function TypeDropdown({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = CONTACT_TYPES.find((t) => t.value === value) ?? CONTACT_TYPES[0];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors hover:border-foreground/20"
      >
        <ActiveIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left">{active.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ type: "spring", duration: 0.28, bounce: 0.12 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/30"
          >
            {CONTACT_TYPES.map((t) => {
              const Icon = t.icon;
              const selected = t.value === value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => { onChange(t.value); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors hover:bg-foreground/5 ${
                    selected ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="flex-1 text-left">{t.label}</span>
                  {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [type, setType]       = useState("feedback");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSent(false);
        setEmail("");
        setMessage("");
        setType("feedback");
        setSending(false);
      }, 300);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const typeLabel = CONTACT_TYPES.find((t) => t.value === type)?.label ?? type;
    const subject = encodeURIComponent(`[Kinetic UI] ${typeLabel}`);
    const body = encodeURIComponent(
      `From: ${email}\nType: ${typeLabel}\n\n${message}`,
    );

    // Small delay so the sending state is visible, then open the mail client.
    await new Promise((r) => setTimeout(r, 500));
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`);

    setSending(false);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.18 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="rounded-3xl border border-border bg-background shadow-2xl shadow-black/40">
              {/* Header — overflow-hidden here keeps border-radius clipping on top corners */}
              <div className="flex items-center justify-between overflow-hidden rounded-t-3xl border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5">
                    <MessageSquarePlus className="h-4 w-4 text-foreground" />
                  </div>
                  <p className="font-semibold text-foreground">Contact us</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col items-center gap-3 py-8 text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        Message sent!
                      </p>
                      <p className="max-w-[280px] text-sm text-muted-foreground">
                        Your email client should have opened — just hit send
                        from there and we'll reply within a day or two.
                      </p>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      {/* Type */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-type"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          What's this about?
                        </label>
                        <TypeDropdown value={type} onChange={setType} id="contact-type" />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-email"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Your email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-message"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          placeholder="Describe your issue or share your feedback…"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full resize-none rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
                        />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-xs text-muted-foreground underline-offset-2 hover:underline hover:text-foreground transition-colors"
                        >
                          Or email us directly
                        </a>
                        <button
                          type="submit"
                          disabled={sending}
                          className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
                        >
                          {sending ? (
                            "Sending…"
                          ) : (
                            <>
                              Send
                              <Send className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

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
