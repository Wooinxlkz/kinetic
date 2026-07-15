"use client";

import { Timeline, type TimelineItem } from "@/components/motion/timeline";

const ITEMS: TimelineItem[] = [
  {
    id: "1",
    title: "Project kicked off",
    description: "Team assembled, goals defined, and timeline agreed.",
    date: "Jan 3",
    status: "done",
    badge: "milestone",
    detail: "Kick-off call with all stakeholders. Design and engineering agreed on a 10-week roadmap.",
  },
  {
    id: "2",
    title: "Design system complete",
    description: "Tokens, components, and dark-mode support shipped.",
    date: "Feb 11",
    status: "done",
  },
  {
    id: "3",
    title: "Beta launch",
    description: "Rolled out to 500 early access users.",
    date: "Mar 20",
    status: "current",
    badge: "in progress",
  },
  {
    id: "4",
    title: "Public launch",
    description: "Fully open to the public with pricing enabled.",
    date: "Apr 30",
    status: "upcoming",
  },
  {
    id: "5",
    title: "Post-launch review",
    description: "Retrospective and roadmap v2 planning.",
    date: "May 14",
    status: "upcoming",
  },
];

export function TimelinePreview() {
  return (
    <div className="mx-auto max-w-sm p-8">
      <Timeline items={ITEMS} />
    </div>
  );
}
