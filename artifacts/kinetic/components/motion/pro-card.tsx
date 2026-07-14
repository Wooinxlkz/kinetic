"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { RainbowCta } from "@/components/motion/rainbow-cta";
import { cn } from "@/lib/utils";
import {
  PLANS,
  LIFETIME_PLAN,
  type Plan,
  type BillingCycle,
  yearlyMonthlyPrice,
  YEARLY_DISCOUNT,
} from "@/components/app/membership/plans-data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProCardProps {
  badge?: string;
  title?: ReactNode;
  description?: string;
  features?: string[];
  price?: string;
  priceNote?: string;
  priceOriginal?: string;
  ctaLabel?: string;
  href?: string;
  onCtaClick?: () => void;
  className?: string;
}

// ─── ProCard (original, unchanged) ───────────────────────────────────────────

export function ProCard({
  badge = "Pro",
  title = "Unlock everything",
  description = "Get access to every component, variant, and future release.",
  features = [],
  price,
  priceNote,
  priceOriginal,
  ctaLabel = "Get Pro",
  href = "#",
  onCtaClick,
  className,
}: ProCardProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-px",
        "animate-rainbow-border motion-reduce:animate-none",
        "bg-[linear-gradient(135deg,var(--success),var(--warning),var(--accent),var(--violet),var(--success),var(--warning),var(--accent),var(--violet),var(--success))]",
        "bg-[length:300%_100%]",
        className,
      )}
    >
      <div className="relative flex flex-col gap-4 rounded-[15px] bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-foreground/8 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-foreground">
            {badge}
          </span>
        </div>
        <div>
          <p className="text-base font-semibold leading-snug text-foreground">{title}</p>
          {description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {price ? (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tabular-nums text-foreground">{price}</span>
            {priceOriginal ? (
              <span className="text-sm tabular-nums text-muted-foreground line-through">{priceOriginal}</span>
            ) : null}
            {priceNote ? (
              <span className="text-xs text-muted-foreground">{priceNote}</span>
            ) : null}
          </div>
        ) : null}
        {features.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        <RainbowCta href={href} onClick={onCtaClick} shape="pill" className="mt-1 w-full justify-center" innerClassName="py-2">
          {ctaLabel}
        </RainbowCta>
      </div>
    </div>
  );
}

// ─── ProCardSlider ─────────────────────────────────────────────────────────────

const ALL_PLANS: Plan[] = [...PLANS, LIFETIME_PLAN];
const AUTO_ADVANCE_MS = 3500;

function formatPrice(plan: Plan, billing: BillingCycle) {
  if (plan.oneTime) return { display: `$${plan.monthlyPrice}`, note: "one-time" };
  if (plan.monthlyPrice === 0) return { display: "Free", note: "forever" };
  if (billing === "yearly") {
    const ymp = yearlyMonthlyPrice(plan);
    return { display: `$${ymp}/mo`, note: `billed yearly · save ${Math.round(YEARLY_DISCOUNT * 100)}%` };
  }
  return { display: `$${plan.monthlyPrice}/mo`, note: "billed monthly" };
}

function getPlanCtaHref(plan: Plan, billing: BillingCycle) {
  if (plan.ctaHrefByBilling) return plan.ctaHrefByBilling[billing];
  return plan.ctaHref;
}

export interface ProCardSliderProps {
  plans?: Plan[];
  className?: string;
  defaultIndex?: number;
  defaultBilling?: BillingCycle;
}

export function ProCardSlider({
  plans = ALL_PLANS,
  className,
  defaultIndex = 1,
  defaultBilling = "monthly",
}: ProCardSliderProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(defaultIndex);
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const advance = useCallback(() => {
    setIndex((prev) => {
      setDirection(1);
      return (prev + 1) % plans.length;
    });
  }, [plans.length]);

  const startProgress = useCallback(() => {
    if (reduce) return;
    animRef.current?.stop();
    progress.set(0);
    animRef.current = animate(progress, 1, { duration: AUTO_ADVANCE_MS / 1000, ease: "linear" });
  }, [progress, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    startProgress();
    timerRef.current = setTimeout(advance, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      animRef.current?.stop();
    };
  }, [index, paused, reduce, advance, startProgress]);

  const plan = plans[index];
  const price = formatPrice(plan, billing);
  const ctaHref = getPlanCtaHref(plan, billing);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "45%" : "-45%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-45%" : "45%", opacity: 0 }),
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-px select-none",
        "animate-rainbow-border motion-reduce:animate-none",
        "bg-[linear-gradient(135deg,var(--success),var(--warning),var(--accent),var(--violet),var(--success),var(--warning),var(--accent),var(--violet),var(--success))]",
        "bg-[length:300%_100%]",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex flex-col gap-3 rounded-[15px] bg-card p-4 overflow-hidden">

        {/* Top row: fixed offer badge + billing toggle */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-success">
            Limited Offer · 30% off
          </p>

          {/* Billing toggle — or "Pay once" pill for lifetime (same padding structure so height is identical) */}
          {plan.oneTime ? (
            <div className="flex items-center rounded-full border border-border bg-background/60 p-0.5">
              <span className="rounded-full px-2 py-px text-[10px] font-semibold text-muted-foreground">
                Pay once
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-px rounded-full border border-border bg-background/60 p-0.5">
              {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBilling(cycle)}
                  className={cn(
                    "relative rounded-full px-2 py-px text-[10px] font-semibold transition-colors",
                    billing === cycle ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {billing === cycle && (
                    <motion.span
                      layoutId="procard-billing-pill"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-card border border-border/60 shadow-sm"
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {cycle === "monthly" ? "Mo" : "Yr"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Promo code row — fixed height so all plans are identical */}
        <p className="h-4 text-[11px] text-muted-foreground flex items-center gap-1.5">
          {plan.name === "Free" ? (
            <>No credit card needed &mdash; always free</>
          ) : (
            <>
              Use code{" "}
              <span className="rounded border border-border bg-muted px-1.5 font-mono font-semibold text-foreground text-[10px] tracking-wide leading-none">
                {plan.name === "Pro" ? "KINPRO" : plan.name === "Sponsor" ? "KINSPON" : "KINLIFE"}
              </span>
              <span className="text-success font-semibold text-[10px]">
                {plan.name === "Pro" ? "−30%" : plan.name === "Sponsor" ? "−30%" : "−30%"}
              </span>
            </>
          )}
        </p>

        {/* Sliding content */}
        <div
          className="relative h-[86px] overflow-hidden"
          style={{ cursor: "grab" }}
          onPointerDown={(e) => setDragStart(e.clientX)}
          onPointerUp={(e) => {
            if (dragStart === null) return;
            const dx = e.clientX - dragStart;
            if (Math.abs(dx) > 40) {
              const dir = dx < 0 ? 1 : -1;
              goTo((index + dir + plans.length) % plans.length, dir);
            }
            setDragStart(null);
          }}
          onPointerLeave={() => setDragStart(null)}
        >
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={plan.id}
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 400, damping: 36, mass: 0.8 }}
              className="absolute inset-0 flex flex-col gap-1.5"
            >
              {/* Title */}
              <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-foreground">
                {plan.name === "Free" ? (
                  <>Ship free with{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Kinetic Free</span></>
                ) : plan.name === "Pro" ? (
                  <>Ship faster with{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Kinetic Pro</span></>
                ) : plan.name === "Sponsor" ? (
                  <>Power teams with{" "}<span className="bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">Kinetic Sponsor</span></>
                ) : (
                  <>Own it forever with{" "}<span className="bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">Kinetic Lifetime</span></>
                )}
              </h2>

              {/* Description */}
              <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                {plan.description}
              </p>

              {/* Extra line for Free to keep height consistent */}
              {plan.name === "Free" && (
                <p className="text-xs leading-snug text-muted-foreground">
                  shadcn/ui compatible · MIT license
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <RainbowCta
          href={ctaHref}
          shape="pill"
          className="w-full justify-center"
          innerClassName="py-2 gap-1"
        >
          {plan.cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </RainbowCta>

        {/* Dot indicators centered below CTA */}
        <div className="flex items-center justify-center gap-1.5">
          {plans.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.name} plan`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            >
              <motion.span
                animate={{
                  width: i === index ? 14 : 5,
                  opacity: i === index ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="block h-1 rounded-full bg-foreground"
                style={{ minWidth: 5 }}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/40">
          <motion.div className="h-full origin-left bg-foreground/30" style={{ scaleX }} />
        </div>
      </div>
    </div>
  );
}
