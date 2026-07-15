"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease";

// ─── Animated counter (scroll-triggered) ─────────────────────────────────────

function AnimatedStat({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 16, mass: 0.8 });
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); mv.set(value); } },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mv, value, started]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
        {prefix}{display.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled && "border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-xl",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-primary" />
        <span className="text-sm font-semibold text-foreground">Nucleus</span>
      </div>
      <div className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
        {["Product", "Pricing", "Docs", "Blog"].map((item) => (
          <a key={item} href="#" className="transition-colors hover:text-foreground">{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">Sign in</a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_PRESS}
          className="rounded-lg bg-foreground px-4 py-1.5 text-sm font-medium text-background"
        >
          Get started
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── Feature card (whileInView safe) ─────────────────────────────────────────

function FeatureCard({ icon, title, description, delay = 0, className }: {
  icon: string; title: string; description: string; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-2xl ring-1 ring-primary/20">
          {icon}
        </div>
        <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { quote: "Nucleus cut our onboarding time in half. The team was up and running on day one.", name: "Sarah Chen", role: "Head of Engineering", avatar: "SC" },
  { quote: "The best dev toolchain we've ever used. Everything just works.", name: "Marcus Hill", role: "CTO, Finmark", avatar: "MH" },
  { quote: "We shipped our MVP in two weeks instead of two months. Incredible.", name: "Priya Nair", role: "Founder, Loopline", avatar: "PN" },
  { quote: "The DX is unmatched. I've recommended it to every team I know.", name: "Tom Bauer", role: "Staff Engineer", avatar: "TB" },
  { quote: "Simple pricing, no surprises. And the product is genuinely great.", name: "Leila Osei", role: "VP Product", avatar: "LO" },
  { quote: "We replaced three internal tools with Nucleus. Couldn't be happier.", name: "Jin Park", role: "Engineering Lead", avatar: "JP" },
];

function TestimonialCard({ quote, name, role, avatar }: (typeof TESTIMONIALS)[0]) {
  return (
    <div className="w-72 flex-shrink-0 rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex text-amber-400">
        {"★★★★★".split("").map((s, i) => <span key={i} className="text-sm">{s}</span>)}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{avatar}</div>
        <div>
          <p className="text-xs font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, headline, subheadline }: { eyebrow?: string; headline: string; subheadline?: string }) {
  return (
    <div className="mb-14 text-center">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {headline}
      </motion.h2>
      {subheadline && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.14 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          {subheadline}
        </motion.p>
      )}
    </div>
  );
}

// ─── CTA section ──────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-12 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary)/0.15),transparent)]" />
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
        className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        Ready to ship faster?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.18 }}
        className="mb-8 text-muted-foreground"
      >
        Join thousands of teams already building on Nucleus. Free to start, no credit card required.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.24 }}
        className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <motion.a
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_PRESS}
          className="rounded-xl bg-foreground px-7 py-3 text-sm font-semibold text-background"
        >
          Start for free
        </motion.a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Talk to sales →</a>
      </motion.div>
    </motion.div>
  );
}

// ─── Main template ────────────────────────────────────────────────────────────

/**
 * Full SaaS landing page template with animated hero, bento feature grid,
 * scroll-triggered stats counters, testimonials marquee, and CTA.
 * Self-contained — no required props. Copy and ship.
 */
export function SaasLanding() {
  const [emailVal, setEmailVal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-60 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            Now in public beta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build products
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
              10× faster
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="mb-10 text-lg text-muted-foreground sm:text-xl"
          >
            Nucleus gives your team the infrastructure, tooling, and components
            to go from idea to production in days — not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-500 ring-1 ring-emerald-500/20"
                >
                  <span>✓</span> You're on the list
                </motion.div>
              ) : (
                <motion.div key="form" className="flex gap-2">
                  <input
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    className="h-11 w-56 rounded-xl border border-border bg-muted/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING_PRESS}
                    onClick={() => emailVal && setSubmitted(true)}
                    type="button"
                    className="h-11 rounded-xl bg-foreground px-5 text-sm font-semibold text-background"
                  >
                    Get early access
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <a href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              See the demo →
            </a>
          </motion.div>
        </div>

        {/* App window mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }}
          className="relative mt-16 w-full max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
            <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/50 px-4">
              <div className="flex gap-1.5">
                {["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c, i) => (
                  <div key={i} className={`h-3 w-3 rounded-full ${c}`} />
                ))}
              </div>
              <div className="mx-auto h-5 w-48 rounded bg-border/60 text-center text-[10px] leading-5 text-muted-foreground">
                app.nucleus.dev/dashboard
              </div>
            </div>
            <div className="grid grid-cols-5 divide-x divide-border">
              <div className="col-span-1 p-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={cn("h-7 rounded-md", i === 0 ? "bg-primary/20 ring-1 ring-primary/30" : "bg-border/40")} />
                ))}
              </div>
              <div className="col-span-4 p-4">
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-muted/60 p-3">
                      <div className="mb-2 h-2.5 w-12 rounded bg-border" />
                      <div className="h-6 w-20 rounded bg-border/70" />
                    </div>
                  ))}
                </div>
                <div className="h-28 rounded-xl bg-muted/60" />
              </div>
            </div>
          </div>
          <div className="mx-auto h-8 w-3/4 rounded-b-full bg-primary/10 blur-xl" />
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          <AnimatedStat value={12000} suffix="+" label="developers" />
          <AnimatedStat value={98} suffix="%" label="uptime SLA" />
          <AnimatedStat value={4800} suffix="+" label="projects shipped" />
          <AnimatedStat value={3} suffix="×" label="faster deploys" />
        </div>
      </section>

      {/* ── Features bento ───────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Everything you need"
            headline="Built for teams that move fast"
            subheadline="Stop rebuilding the same infrastructure. Nucleus ships the boring parts so you can focus on what makes your product unique."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard delay={0} icon="⚡" title="Instant deploys" description="Push to main and your changes are live in under 30 seconds across all regions." className="lg:col-span-2" />
            <FeatureCard delay={0.06} icon="🔐" title="Auth included" description="Social logins, magic links, SAML SSO — all wired up in minutes." />
            <FeatureCard delay={0.1} icon="🗄️" title="Edge database" description="Postgres at the edge with zero-latency reads and automatic backups." />
            <FeatureCard delay={0.16} icon="📊" title="Built-in analytics" description="Real-time event tracking, funnel analysis, and retention charts — no extra SDK." className="lg:col-span-2" />
            <FeatureCard delay={0.2} icon="🔄" title="CI/CD pipeline" description="Preview environments for every PR, automatic rollbacks, and deployment gates." />
            <FeatureCard delay={0.26} icon="🧩" title="Component library" description="200+ production-ready UI components with motion, theming, and accessibility." />
          </div>
        </div>
      </section>

      {/* ── Testimonials marquee ──────────────────────────────────────────── */}
      <section className="overflow-hidden border-y border-border py-14">
        <div className="relative flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-4 pr-4"
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <CtaSection />
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-primary" />
            <span className="font-semibold text-foreground">Nucleus</span>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security", "Status"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">{item}</a>
            ))}
          </div>
          <span>© 2025 Nucleus, Inc.</span>
        </div>
      </footer>
    </div>
  );
}
