/** Community "publish your work" types — kept fully separate from
 * `@/lib/registry` (the site's own curated component library). */
export type CommunityCategory = "component" | "block" | "pattern";

/** Pre-defined tag taxonomy — publishers pick from this list (max 6). */
export const COMMUNITY_TAG_GROUPS: { label: string; tags: string[] }[] = [
  {
    label: "Motion",
    tags: [
      "animation", "hover", "scroll", "parallax", "spring",
      "gesture", "magnetic", "physics", "transition", "cursor", "drag",
    ],
  },
  {
    label: "Inputs",
    tags: [
      "button", "input", "textarea", "checkbox", "radio",
      "toggle", "switch", "slider", "select", "combobox",
      "file-upload", "otp", "color-picker",
    ],
  },
  {
    label: "Overlays",
    tags: [
      "modal", "dialog", "drawer", "sheet",
      "popover", "tooltip", "dropdown", "context-menu", "command",
    ],
  },
  {
    label: "Layout",
    tags: [
      "card", "sidebar", "navbar", "header", "footer",
      "grid", "tabs", "accordion", "collapsible",
      "divider", "breadcrumb", "resizable",
    ],
  },
  {
    label: "Feedback",
    tags: [
      "toast", "alert", "badge", "banner",
      "progress", "skeleton", "spinner", "notification",
    ],
  },
  {
    label: "Data Display",
    tags: [
      "table", "list", "avatar", "chart",
      "calendar", "timeline", "code-block", "gallery", "stat", "pagination",
    ],
  },
  {
    label: "Effects",
    tags: [
      "gradient", "glassmorphism", "blur", "glow",
      "noise", "spotlight", "particle", "3d", "text-effect",
    ],
  },
  {
    label: "AI",
    tags: ["ai", "streaming", "chat", "typewriter", "markdown"],
  },
  {
    label: "Navigation",
    tags: ["menu", "steps", "dock", "navigation", "search"],
  },
  {
    label: "Forms",
    tags: ["form", "validation", "login", "signup", "filter", "multi-step"],
  },
  {
    label: "Commerce",
    tags: ["pricing", "checkout", "product", "cart"],
  },
];

/** Flat deduplicated list of every valid tag. */
export const COMMUNITY_TAGS_ALL: string[] = [
  ...new Set(COMMUNITY_TAG_GROUPS.flatMap((g) => g.tags)),
];

export const COMMUNITY_CATEGORY_LABELS: Record<CommunityCategory, string> = {
  component: "Component",
  block: "Block",
  pattern: "Pattern",
};

export interface CommunityAuthor {
  id: number;
  name: string;
  username: string;
  avatarColor: string;
  avatarUrl: string | null;
  isDev: boolean;
}

export interface CommunityComponentDTO {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: CommunityCategory;
  tags: string[];
  /** The component source — what users copy/install. May have named exports
   * and project-local imports. */
  code: string;
  /** Optional standalone demo that renders the component. When present, the
   * preview sandbox merges both files so the demo can reference the
   * component's exports without a bundler. When absent, `code` is rendered
   * directly (legacy / simple self-contained components). */
  demoCode: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: CommunityAuthor;
}

export interface CommunityQuota {
  plan: string;
  /** Null means unlimited (lifetime plan). */
  limit: number | null;
  used: number;
  /** Null means unlimited. */
  remaining: number | null;
}
