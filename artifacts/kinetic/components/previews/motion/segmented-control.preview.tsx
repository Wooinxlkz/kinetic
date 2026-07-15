"use client";

import { useState } from "react";
import { LayoutGrid, List, Table } from "lucide-react";
import { SegmentedControl } from "@/components/motion/segmented-control";

export function SegmentedControlPreview() {
  const [view, setView] = useState("grid");
  const [size, setSize] = useState("md");

  return (
    <div className="flex flex-col gap-6 p-6 items-center">
      <SegmentedControl
        options={[
          { value: "grid", label: "Grid", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
          { value: "list", label: "List", icon: <List className="h-3.5 w-3.5" /> },
          { value: "table", label: "Table", icon: <Table className="h-3.5 w-3.5" /> },
        ]}
        value={view}
        onChange={setView}
      />
      <SegmentedControl
        size="sm"
        options={[
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]}
        value={size}
        onChange={setSize}
      />
      <SegmentedControl
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
          { value: "enterprise", label: "Enterprise", disabled: true },
        ]}
        defaultValue="pro"
      />
    </div>
  );
}
