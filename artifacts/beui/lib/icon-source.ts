import { promises as fs } from "node:fs";
import path from "node:path";

export type IconSourceResult = {
  code: string;
  installCommand: string | null;
};

function findMatchingBraceEnd(text: string, openIndex: number): number {
  let depth = 0;
  for (let i = openIndex; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractBlockStartingAt(text: string, matchStart: number): string | null {
  const braceOpen = text.indexOf("{", matchStart);
  if (braceOpen === -1) return null;
  const braceClose = findMatchingBraceEnd(text, braceOpen);
  if (braceClose === -1) return null;
  return text.slice(matchStart, braceClose + 1);
}

/**
 * Extracts a single exported component (and the prop interface/type it uses)
 * from a source file that may contain multiple components, so a user can
 * copy just the icon they want rather than the whole file.
 */
function findParamListEnd(text: string, openParenIndex: number): number {
  let depth = 0;
  for (let i = openParenIndex; i < text.length; i++) {
    if (text[i] === "(") depth++;
    else if (text[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

export function extractComponentSource(fileContent: string, componentName: string): string | null {
  const fnRe = new RegExp(`export function ${componentName}\\s*\\(`);
  const fnMatch = fnRe.exec(fileContent);
  if (!fnMatch) return null;

  // Params are destructured objects (e.g. `({ size, className }: Props)`), which
  // contain their own braces — so we must skip past the full parameter list
  // before looking for the function body's opening brace.
  const openParenIndex = fileContent.indexOf("(", fnMatch.index);
  const closeParenIndex = findParamListEnd(fileContent, openParenIndex);
  if (closeParenIndex === -1) return null;
  const bodyOpenBrace = fileContent.indexOf("{", closeParenIndex);
  if (bodyOpenBrace === -1) return null;
  const bodyCloseBrace = findMatchingBraceEnd(fileContent, bodyOpenBrace);
  if (bodyCloseBrace === -1) return null;
  const fnBlock = fileContent.slice(fnMatch.index, bodyCloseBrace + 1);

  // Find the prop type this function destructures against, e.g. `}: FooProps)`.
  const propTypeMatch = /\}:\s*([A-Za-z0-9_]+)\)/.exec(fnBlock);
  const propTypeName = propTypeMatch?.[1];

  let propBlock: string | null = null;
  if (propTypeName) {
    const ifaceRe = new RegExp(`interface ${propTypeName}\\s*`);
    const ifaceMatch = ifaceRe.exec(fileContent);
    if (ifaceMatch) {
      propBlock = extractBlockStartingAt(fileContent, ifaceMatch.index);
      if (propBlock) propBlock = `interface ${propTypeName} ${propBlock.slice(propBlock.indexOf("{"))}`;
    }
  }

  // Preserve top-of-file directives/imports (e.g. "use client"; import { motion } ...)
  const importLines = fileContent
    .split("\n")
    .filter((line) => /^\s*("use client";|import .+;)\s*$/.test(line));

  // Some files factor shared SVG boilerplate into a top-level helper (e.g.
  // `const S = (...) => (...)`). If this icon's function calls one, inline it
  // so the copied snippet is self-contained and compiles on its own.
  const helperBlocks: string[] = [];
  const helperRe = /^const ([A-Za-z_][A-Za-z0-9_]*) = /gm;
  let helperMatch: RegExpExecArray | null;
  while ((helperMatch = helperRe.exec(fileContent))) {
    const helperName = helperMatch[1];
    const usedInFn = new RegExp(`\\b${helperName}\\(`).test(fnBlock);
    if (!usedInFn) continue;
    const semiIndex = fileContent.indexOf(";", helperMatch.index);
    const openParenAfterEquals = fileContent.indexOf("(", helperMatch.index + helperMatch[0].length - 1);
    // Helper bodies here are always `(...) => (...)`; take up to the matching
    // close-paren of the arrow body, then the trailing semicolon.
    const closeParen = findParamListEnd(fileContent, fileContent.indexOf("(", openParenAfterEquals + 1));
    const end = closeParen !== -1 && (semiIndex === -1 || closeParen < semiIndex) ? closeParen + 1 : semiIndex;
    helperBlocks.push(fileContent.slice(helperMatch.index, end + 1).trim());
  }

  const parts = [...importLines];
  if (parts.length > 0) parts.push("");
  if (propBlock) {
    parts.push(propBlock);
    parts.push("");
  }
  if (helperBlocks.length > 0) {
    parts.push(...helperBlocks, "");
  }
  parts.push(fnBlock);

  return parts.join("\n").trim() + "\n";
}

export async function readIconFileSource(relFile: string): Promise<string> {
  const absPath = path.join(process.cwd(), relFile);
  return fs.readFile(absPath, "utf8");
}
