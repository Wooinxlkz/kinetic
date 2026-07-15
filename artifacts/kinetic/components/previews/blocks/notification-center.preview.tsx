"use client";

import { useState } from "react";
import { Bell, Star, UserPlus } from "lucide-react";
import { NotificationCenter } from "@/components/motion/notification-center";

const INITIAL = [
  { id: "1", title: "New follower", description: "Alex Kim started following you.", time: "2 min ago", read: false, icon: <UserPlus className="h-3.5 w-3.5" /> },
  { id: "2", title: "You got a star!", description: "Your repo kinetic-ui received a new star.", time: "10 min ago", read: false, icon: <Star className="h-3.5 w-3.5" /> },
  { id: "3", title: "Reminder", description: "Your weekly report is ready to review.", time: "1 hr ago", read: true, icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "4", title: "New comment", description: "Jordan left a comment on your post.", time: "3 hr ago", read: true },
];

export function NotificationCenterPreview() {
  const [notifications, setNotifications] = useState(INITIAL);

  return (
    <div className="p-6 w-full max-w-sm">
      <NotificationCenter
        notifications={notifications}
        onRead={(id) =>
          setNotifications((n) => n.map((item) => item.id === id ? { ...item, read: true } : item))
        }
        onDismiss={(id) =>
          setNotifications((n) => n.filter((item) => item.id !== id))
        }
        onMarkAllRead={() =>
          setNotifications((n) => n.map((item) => ({ ...item, read: true })))
        }
      />
    </div>
  );
}
