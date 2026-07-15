"use client";

import { useState } from "react";
import { DatePicker } from "@/components/motion/date-picker";

export function DatePickerPreview() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-foreground">Pick a date</p>
        <DatePicker value={date} onChange={(d) => setDate(d)} />
      </div>
      {date && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </p>
      )}
    </div>
  );
}
