import { Layers, ShieldCheck, Zap } from "lucide-react";
import { FeatureGrid } from "@/components/static/feature-grid";

export function FeatureGridPreview() {
  return (
    <div className="w-full max-w-2xl p-6">
      <FeatureGrid
        columns={3}
        items={[
          {
            icon: <Zap className="h-5 w-5" />,
            title: "Fast setup",
            description: "Copy the source or install via CLI in seconds.",
          },
          {
            icon: <Layers className="h-5 w-5" />,
            title: "Composable",
            description: "Every block is built from plain, unstyled primitives.",
          },
          {
            icon: <ShieldCheck className="h-5 w-5" />,
            title: "Typed & tested",
            description: "Full TypeScript types and accessible markup.",
          },
        ]}
      />
    </div>
  );
}
