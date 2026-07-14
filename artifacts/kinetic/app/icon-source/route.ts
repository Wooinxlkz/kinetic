import { NextResponse } from "next/server";
import { findIcon } from "@/lib/icons-registry";
import { extractComponentSource, readIconFileSource } from "@/lib/icon-source";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const entry = findIcon(slug);
  if (!entry) {
    return NextResponse.json({ error: "Icon not found" }, { status: 404 });
  }

  const isAnimated = entry.file.includes("/animated/");

  try {
    const fileContent = await readIconFileSource(entry.file);
    const code = extractComponentSource(fileContent, entry.componentName) ?? fileContent;
    const importPath = isAnimated ? "@/components/icons/animated" : "@/components/icons/static";

    return NextResponse.json({
      code,
      componentName: entry.componentName,
      importStatement: `import { ${entry.componentName} } from "${importPath}";`,
      isAnimated,
      installCommand: isAnimated ? "npm install motion" : null,
    });
  } catch {
    return NextResponse.json({ error: "Source unavailable" }, { status: 500 });
  }
}
