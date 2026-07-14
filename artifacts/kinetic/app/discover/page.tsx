import type { Metadata } from "next";
import { listPublishedComponents } from "@/lib/community/db-community";
import { DiscoverGrid } from "@/components/app/community/discover-grid";
import { CommunitySidebar } from "@/components/app/community/community-sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Community-published components, blocks, and patterns built with Kinetic UI — shared by the community, separate from the core library.",
  alternates: { canonical: "/discover" },
};

export default async function DiscoverPage() {
  const items = await listPublishedComponents();

  return (
    <div className="mx-auto flex max-w-7xl px-4">
      <CommunitySidebar items={items} />

      <main className="min-w-0 flex-1 py-10 md:pl-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Community
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Community
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Components, blocks, and patterns published by the community — not part of Kinetic UI&apos;s own
          curated library. Publish your own from your profile.
        </p>

        <div className="mt-8">
          <DiscoverGrid items={items} />
        </div>
      </main>
    </div>
  );
}
