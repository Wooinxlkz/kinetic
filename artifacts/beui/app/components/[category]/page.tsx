import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCategory, registry } from "@/lib/registry";
import { ComponentFilter } from "@/components/app/docs/component-filter";
import { JsonLd } from "@/components/app/analytics/json-ld";
import { breadcrumbJsonLd, categoryJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return registry.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return {};

  const title = `${cat.name} · React motion components`;
  const ogTitle = `${title} · Kinetic UI`;
  const pageUrl = `/components/${cat.slug}`;
  const imageUrl = `/api/og?category=${cat.slug}`;
  const componentNames = cat.components.map((comp) => comp.name);

  return {
    title,
    description: cat.description,
    keywords: [
      `${cat.name} components`,
      "React motion components",
      "best motion components",
      "free motion components",
      "open source motion components",
      "framer motion components",
      "best framer motion components",
      "framer motion templates",
      "Tailwind CSS components",
      "shadcn-compatible components",
      "shadcn registry",
      "Kinetic UI",
      ...componentNames,
    ],
    openGraph: {
      title: ogTitle,
      description: cat.description,
      url: pageUrl,
      type: "website",
      siteName: "Kinetic UI",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${cat.name} components by Kinetic UI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: cat.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
      types: {
        "application/json": "/registry.json",
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Kinetic UI", path: "/" },
            { name: cat.name, path: `/components/${cat.slug}` },
          ]),
          categoryJsonLd(cat),
        ]}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm"
      >
        <span className="font-medium text-foreground">{cat.name}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        {cat.name}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {cat.description}
      </p>

      {/* Client component handles filtering + grid rendering */}
      <ComponentFilter
        categorySlug={cat.slug}
        categoryName={cat.name}
        components={cat.components}
      />
    </div>
  );
}
