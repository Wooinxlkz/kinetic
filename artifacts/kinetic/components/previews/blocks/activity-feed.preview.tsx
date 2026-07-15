import { GitCommit, Star, MessageSquare, UserPlus } from "lucide-react";
import { ActivityFeed } from "@/components/motion/activity-feed";

const ITEMS = [
  { id: "1", actor: "Jordan Rivera", action: "pushed 3 commits to", target: "main", time: "2 min ago", icon: <GitCommit className="h-3.5 w-3.5" /> },
  { id: "2", actor: "Alex Kim", action: "starred", target: "kinetic-ui", time: "8 min ago", icon: <Star className="h-3.5 w-3.5" /> },
  { id: "3", actor: "Sam Chen", action: "commented on", target: "PR #42", time: "25 min ago", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: "4", actor: "Riley Park", action: "followed", target: "Jordan Rivera", time: "1 hr ago", icon: <UserPlus className="h-3.5 w-3.5" /> },
  { id: "5", actor: "Morgan Lee", action: "opened issue", target: "#87 Dark mode flash", time: "3 hr ago" },
];

export function ActivityFeedPreview() {
  return (
    <div className="p-6 w-full max-w-sm">
      <ActivityFeed items={ITEMS} />
    </div>
  );
}
