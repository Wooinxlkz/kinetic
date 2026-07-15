import { Activity, DollarSign, Users, ShoppingCart } from "lucide-react";
import { StatsRow } from "@/components/motion/stats-row";

export function StatsRowPreview() {
  return (
    <div className="p-6 w-full max-w-2xl">
      <StatsRow
        stats={[
          { label: "Revenue", value: "$48.2k", delta: 12.4, icon: <DollarSign className="h-4 w-4" /> },
          { label: "Users", value: "3,891", delta: 8.1, icon: <Users className="h-4 w-4" /> },
          { label: "Orders", value: "1,204", delta: -2.3, icon: <ShoppingCart className="h-4 w-4" /> },
          { label: "Active", value: "892", delta: 5.7, icon: <Activity className="h-4 w-4" /> },
        ]}
      />
    </div>
  );
}
