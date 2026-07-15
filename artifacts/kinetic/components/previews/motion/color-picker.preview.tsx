"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/motion/color-picker";

export function ColorPickerPreview() {
  const [color, setColor] = useState("#6366f1");
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 p-6">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-10 w-32 rounded-xl border border-border shadow-inner" style={{ backgroundColor: color }} />
        <p className="font-mono text-sm text-muted-foreground">{color}</p>
      </div>
    </div>
  );
}
