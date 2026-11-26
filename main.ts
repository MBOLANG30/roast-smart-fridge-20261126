import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one roast line, at most 160 characters, a single line.
const ENTRY =
  "My smart speaker heard me say I'm broke and ordered a budgeting book, a candle, and, somehow, a second smart speaker.";

// Validate the line before writing anything: the gate only accepts
// 1-160 characters, a single line, and no surrounding whitespace.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${ENTRY.length}`);
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line with no leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and refuse to finish unless it matches byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
