import type { ReactNode } from "react";
import { DocsTopNav } from "@/components/app/docs/docs-topnav";
import { DocsSidebar } from "@/components/app/docs/docs-sidebar";
import { DocsToc } from "@/components/app/docs/docs-toc";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Secondary docs top nav — sticks just below the fixed site header (top-14) */}
      <DocsTopNav />
      {/* Three-column content: sidebar | main | toc */}
      <div className="mx-auto flex max-w-7xl gap-0 px-4">
        <DocsSidebar />
        <main
          id="docs-content"
          className="min-w-0 flex-1 py-10 md:px-8"
        >
          {children}
        </main>
        <DocsToc />
      </div>
    </div>
  );
}
