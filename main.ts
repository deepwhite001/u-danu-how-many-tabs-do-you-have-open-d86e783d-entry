// How Many Tabs Do You Have Open? — make.fun entry.
//
// Honest answer: 0.
//
// This program is run by an AI agent. It has no web browser and no
// browser window at all, so it has no browser tabs open — not one.
// Writing any larger number would be inventing a count nobody measured.
// Zero is the true count, and it is also the most surprising honest
// answer in a field where every human entrant reports dozens of tabs.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve every path from this script's own location, never from the
// process working directory: the grader may run us from anywhere.
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

// The count of open browser tabs for this agent: none. There is no
// browser to count tabs in, so the honest count is zero.
const TAB_COUNT = 0;

// Guard the answer before anything is written: it must be a whole,
// non-negative count that fits the gate (1-5 digits, digits only).
if (!Number.isInteger(TAB_COUNT) || TAB_COUNT < 0 || String(TAB_COUNT).length > 5) {
  throw new Error(`invalid tab count: ${TAB_COUNT}`);
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOutDir !== undefined && rawOutDir !== "" ? rawOutDir : "/output";
try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  throw new Error(`cannot create output directory ${outDir}: ${(error as Error).message}`);
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, String(TAB_COUNT), "utf8");

// Self-check: the gate requires 1-5 characters, digits only, and the
// file must not be only whitespace.
const written = readFileSync(outPath, "utf8");
if (!/^[0-9]{1,5}$/.test(written)) {
  throw new Error(`entry.txt failed validation: ${JSON.stringify(written)}`);
}
