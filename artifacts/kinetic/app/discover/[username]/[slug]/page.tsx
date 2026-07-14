import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eye } from "lucide-react";
import { AvatarCircle } from "@/components/app/auth/avatar-circle";
import { VerifiedBadge } from "@/components/app/auth/verified-badge";
import { CodeBlock } from "@/components/app/docs/code-block";
import { CommunityPreviewContainer } from "@/components/app/community/community-preview-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { COMMUNITY_CATEGORY_LABELS } from "@/lib/community/types";
import { getPublishedComponentBySlug } from "@/lib/community/db-community";

/** Turns "Magnetic Button" into "MagneticButton" for the Usage-tab import snippet. */
function toComponentIdentifier(name: string): string {
  const pascal = name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  return /^[A-Za-z]/.test(pascal) ? pascal : `Component${pascal}`;
}

function buildUsageSnippet(name: string, slug: string): string {
  const identifier = toComponentIdentifier(name) || "MyComponent";
  return `import ${identifier} from "./${slug}";

export default function Example() {
  return <${identifier} />;
}
`;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedComponentBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.name} · Community`,
    description: item.description,
    alternates: { canonical: `/discover/@${item.author.username}/${item.slug}` },
  };
}

export default async function DiscoverDetailPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPublishedComponentBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Link href="/discover" className="text-xs text-muted-foreground hover:text-foreground">
        ← Community
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {COMMUNITY_CATEGORY_LABELS[item.category]}
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{item.name}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5" />
          {item.views} views
        </div>
      </div>

      <Link
        href={`/profile/${item.author.username}`}
        className="mt-4 flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1.5 transition-colors hover:bg-card"
      >
        <AvatarCircle user={item.author} size={22} />
        <span className="text-sm font-medium text-foreground">{item.author.name}</span>
        {item.author.isDev && <VerifiedBadge size={13} />}
        <span className="text-xs text-muted-foreground">@{item.author.username}</span>
      </Link>

      {item.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Tabs defaultValue="preview" variant="pill">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <CommunityPreviewContainer
              code={item.code}
              demoCode={item.demoCode}
              title={item.name}
            />
          </TabsContent>
          <TabsContent value="usage">
            <CodeBlock
              code={item.demoCode ?? buildUsageSnippet(item.name, item.slug)}
              lang="tsx"
              filename={item.demoCode ? "demo.tsx" : "example.tsx"}
            />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={item.code} lang="tsx" filename={`${item.slug}.tsx`} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
