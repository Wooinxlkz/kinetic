import { Inbox, Plus } from "lucide-react";
import { EmptyState } from "@/components/static/empty-state";

export function EmptyStatePreview() {
  return (
    <div className="p-6 w-full max-w-md">
      <EmptyState
        icon={<Inbox className="h-5 w-5" />}
        title="No messages yet"
        description="When someone sends you a message it will appear here."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            New message
          </button>
        }
      />
    </div>
  );
}
