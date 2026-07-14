"use client";

import { useState } from "react";
import { Textarea } from "@/components/motion/textarea";
import { Button } from "@/components/motion/button";

export function TextareaPreview() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "error" | "success">("idle");

  const validate = () => {
    if (value.trim().length < 10) {
      setState("error");
    } else {
      setState("success");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {/* Auto-resize with validation */}
      <div className="space-y-2">
        <Textarea
          label="Feedback"
          placeholder="Share your thoughts… (min 10 characters)"
          value={value}
          state={state}
          hint={
            state === "error"
              ? "Please write at least 10 characters."
              : state === "success"
              ? "Looks good!"
              : `${value.length} characters`
          }
          onChange={(e) => {
            setValue(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          minRows={3}
          maxRows={8}
        />
        <Button variant="primary" size="sm" onClick={validate}>
          Submit
        </Button>
      </div>

      {/* States */}
      <div className="space-y-3">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">States</span>
        <Textarea
          label="Description"
          placeholder="Describe what you're building…"
          minRows={2}
          state="idle"
        />
        <Textarea
          label="Error state"
          defaultValue="Too short"
          state="error"
          hint="This field is required."
          minRows={2}
        />
        <Textarea
          label="Success state"
          defaultValue="Great description that passes validation."
          state="success"
          hint="Perfect!"
          minRows={2}
        />
      </div>

      {/* No resize */}
      <Textarea
        label="Fixed height"
        placeholder="This textarea doesn't auto-resize…"
        autoResize={false}
        rows={4}
      />
    </div>
  );
}
