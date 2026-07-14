"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// ── Delivery options ──────────────────────────────────────────────────────────

type Delivery = "push" | "email" | "push_email" | "off";

const DELIVERY_OPTIONS: { id: Delivery; label: string }[] = [
  { id: "push",       label: "Push"        },
  { id: "email",      label: "Email"       },
  { id: "push_email", label: "Push, Email" },
  { id: "off",        label: "Off"         },
];

function deliveryLabel(d: Delivery) {
  return DELIVERY_OPTIONS.find((o) => o.id === d)?.label ?? "Off";
}

// ── Delivery dropdown ─────────────────────────────────────────────────────────

function DeliveryDropdown({ value, onChange }: { value: Delivery; onChange: (v: Delivery) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        {deliveryLabel(value)}
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-150", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-1 min-w-[140px] rounded-xl border border-border bg-popover/95 p-1 shadow-xl backdrop-blur-xl"
          >
            {DELIVERY_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => { onChange(o.id); setOpen(false); }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  value === o.id
                    ? "bg-foreground/8 text-foreground"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {o.label}
                {value === o.id && <Check className="h-3.5 w-3.5 shrink-0 text-foreground/60" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Notification row ──────────────────────────────────────────────────────────

function NotifRow({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: Delivery;
  onChange: (v: Delivery) => void;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4 py-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="max-w-[300px] text-[12px] leading-relaxed text-muted-foreground">
            {description}
          </span>
        </div>
        <DeliveryDropdown value={value} onChange={onChange} />
      </div>
      <div className="h-px bg-border" />
    </>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export function NotificationsTab() {
  const [newComponents,   setNewComponents]   = useState<Delivery>("push");
  const [feedbackReplies, setFeedbackReplies] = useState<Delivery>("push_email");
  const [marketing,       setMarketing]       = useState<Delivery>("email");
  const [membership,      setMembership]      = useState<Delivery>("email");

  return (
    <div className="flex flex-col px-7 py-3">
      <NotifRow
        title="New components"
        description="Get notified when new components are released to the library."
        value={newComponents}
        onChange={setNewComponents}
      />
      <NotifRow
        title="Feedback replies"
        description="Get notified when a response is posted to your submitted feedback."
        value={feedbackReplies}
        onChange={setFeedbackReplies}
      />
      <NotifRow
        title="Marketing & updates"
        description="Stay in the loop on Kinetic news, feature releases, and announcements."
        value={marketing}
        onChange={setMarketing}
      />
      <NotifRow
        title="Membership"
        description="Get notified about changes to your subscription or billing."
        value={membership}
        onChange={setMembership}
      />
    </div>
  );
}
