import { notFound } from "next/navigation";
import Link from "next/link";
import { iconsRegistry, findIconCategory } from "@/lib/icons-registry";
import { IconGrid } from "@/components/app/icons-page/icon-grid";
import { SiteFooter } from "@/components/app/chrome/site-footer";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return iconsRegistry.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = findIconCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Kinetic UI`,
    description: cat.description,
  };
}

export default async function IconCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = findIconCategory(category);
  if (!cat) notFound();

  return (
    <>
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Category tabs */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-pixel text-2xl font-medium tracking-tight text-foreground">
            Icons
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{cat.description}</p>
        </div>

        <nav className="flex items-center gap-1 rounded-xl bg-card p-1">
          {iconsRegistry.map((c) => (
            <Link
              key={c.slug}
              href={`/icons/${c.slug}`}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                category === c.slug
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Stats bar */}
      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">{cat.icons.length}</span> icons
        </span>
        {cat.slug === "static" && (
          <span>SVG · stroke-based · no runtime deps</span>
        )}
        {cat.slug === "animated" && (
          <span>Motion/React · hover to preview</span>
        )}
      </div>

      <IconGrid
        icons={cat.icons}
        categoryName={cat.name}
      />
      </div>
      <div className="-mb-32">
        <SiteFooter />
      </div>
    </>
  );
}
