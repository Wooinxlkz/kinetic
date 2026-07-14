import { KB, type KbEntry } from "./knowledge-base";

/**
 * Tokenise a string into lowercase words, stripping punctuation.
 */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Score a knowledge-base entry against the query tokens.
 * Returns a number ≥ 0. Higher = better match.
 */
function scoreEntry(entry: KbEntry, queryTokens: string[], rawQuery: string): number {
  let score = 0;
  const rawLower = rawQuery.toLowerCase();

  for (const kw of entry.keywords) {
    // Exact substring match in the raw query — high reward
    if (rawLower.includes(kw)) {
      score += 10 + kw.split(" ").length * 3; // longer phrases score higher
    } else {
      // Token-level partial match
      const kwTokens = tokenise(kw);
      let hits = 0;
      for (const qt of queryTokens) {
        for (const kt of kwTokens) {
          if (kt === qt) hits++;
          else if (kt.startsWith(qt) || qt.startsWith(kt)) hits += 0.5;
        }
      }
      if (hits > 0) score += hits;
    }
  }

  return score;
}

/**
 * Find the best-matching KB entry for the user's query.
 * Returns the fallback entry when nothing scores above zero.
 */
export function findAnswer(query: string): KbEntry {
  if (!query.trim()) return KB.find((e) => e.id === "fallback")!;

  const tokens = tokenise(query);
  let best: KbEntry | null = null;
  let bestScore = 0;

  for (const entry of KB) {
    if (entry.id === "fallback") continue;
    const s = scoreEntry(entry, tokens, query);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }

  return best ?? KB.find((e) => e.id === "fallback")!;
}

/**
 * Suggested starter questions shown when the panel first opens.
 */
export const SUGGESTIONS = [
  "How do I install a component?",
  "What components are available?",
  "What animated icons are there?",
  "What's in the playground?",
  "What does Pro membership include?",
];

/**
 * Large pool of follow-up questions shown after each reply.
 * Pick 3 at random, excluding anything already asked.
 */
const FOLLOWUP_POOL = [
  "What's the Dock component?",
  "How do I use the Table?",
  "What text animation components are there?",
  "What's in the AI components category?",
  "How do scroll animations work?",
  "What background effects are available?",
  "What does the Wheel Picker do?",
  "How do I add a loader?",
  "What are the Patterns (blocks)?",
  "What's the Command Palette?",
  "How does the Dynamic Island work?",
  "What's the difference between Free and Pro?",
  "How do I use the Confetti component?",
  "What is the Animated Beam?",
  "What form controls are available?",
  "How do I install Kinetic in my project?",
  "What's the Shader Background?",
  "What's the Border Beam component?",
  "How do I use the Bottom Sheet?",
  "What motion patterns does Kinetic follow?",
  "What's on the resume page?",
  "What MCP support does Kinetic have?",
  "How does the Bloom Menu work?",
  "What's the Wallet Card component?",
  "How do I use Streaming Text?",
  "What's the Cylinder Carousel?",
  "Are there any 404 page components?",
  "What does the Feedback Widget do?",
  "What's the Orbiting Circles component?",
  "What does Sponsor membership include?",
];

/**
 * Returns 3 random follow-up questions, excluding any already used.
 */
export function getFollowUps(used: string[]): string[] {
  const usedSet = new Set(used.map(s => s.toLowerCase()));
  const pool = FOLLOWUP_POOL.filter(q => !usedSet.has(q.toLowerCase()));
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
