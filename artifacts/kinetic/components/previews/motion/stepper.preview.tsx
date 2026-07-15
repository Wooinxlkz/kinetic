"use client";

import { useState } from "react";
import { Stepper } from "@/components/motion/stepper";

const STEPS = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Plan", description: "Choose a plan" },
  { label: "Done", description: "All set!" },
];

export function StepperPreview() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col gap-8 p-6 w-full max-w-lg">
      <Stepper steps={STEPS} activeStep={step} orientation="horizontal" />
      <div className="flex justify-center gap-2">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          disabled={step === STEPS.length}
          onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
          className="rounded-lg bg-foreground px-4 py-2 text-sm text-background disabled:opacity-40"
        >
          {step === STEPS.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
