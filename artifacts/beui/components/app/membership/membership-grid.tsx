"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BillingToggle } from "./billing-toggle";
import { PlanCard } from "./plan-card";
import { PLANS } from "./plans-data";
import type { BillingCycle } from "./plans-data";

export function MembershipGrid() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Billing toggle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.1 }}
      >
        <BillingToggle value={billing} onChange={setBilling} />
      </motion.div>

      {/* Plans grid */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} index={i} />
        ))}
      </div>
    </div>
  );
}
