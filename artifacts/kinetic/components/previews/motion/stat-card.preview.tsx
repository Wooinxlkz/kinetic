import { DollarSign } from "lucide-react";
import { StatCard } from "@/components/static/stat-card";

export function StatCardPreview() {
  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-4 p-6">
      <StatCard
        label="Monthly revenue"
        value="$48,290"
        delta={12.4}
        icon={<DollarSign className="h-4 w-4" />}
      />
    </div>
  );
}
