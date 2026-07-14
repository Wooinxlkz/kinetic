"use client";

import { BentoGrid, BentoCard, BentoMetric, BentoBarChart } from "@/components/motion/bento-grid";
import { Zap, Users, Globe, Star } from "lucide-react";

const BAR_DATA = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 68 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 73 },
];

export function BentoGridPreview() {
  return (
    <div className="w-full max-w-3xl px-4 py-10">
      <BentoGrid cols={3}>
        {/* Row 1 */}
        <BentoCard delay={0}>
          <BentoMetric label="Monthly revenue" value="$84,200" delta="12.4% vs last month" positive />
        </BentoCard>

        <BentoCard delay={0.06} className="col-span-2">
          <BentoBarChart data={BAR_DATA} label="Daily signups" />
        </BentoCard>

        {/* Row 2 */}
        <BentoCard delay={0.12} className="col-span-2 flex flex-col justify-between gap-4">
          <p className="text-xs font-medium text-muted-foreground">What's new</p>
          <div className="space-y-2">
            {[
              { icon: Zap, text: "Instant deploys — push to ship in under 3 seconds." },
              { icon: Users, text: "Multiplayer editing with live presence cursors." },
              { icon: Globe, text: "Global edge network across 35 regions." },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                  <Icon className="size-3 text-muted-foreground" />
                </span>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard delay={0.18} className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Rating</p>
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight">4.9</p>
            <p className="mt-1 text-xs text-muted-foreground">From 2,400 reviews</p>
          </div>
        </BentoCard>

        {/* Row 3 */}
        <BentoCard delay={0.24}>
          <BentoMetric label="Active users" value="12,840" delta="8.1%" positive />
        </BentoCard>

        <BentoCard delay={0.3}>
          <BentoMetric label="Churn rate" value="1.2%" delta="0.3%" positive={false} />
        </BentoCard>

        <BentoCard delay={0.36}>
          <BentoMetric label="Avg. session" value="8m 42s" delta="1m 10s" positive />
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
