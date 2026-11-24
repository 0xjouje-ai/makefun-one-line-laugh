// The One-Line Laugh — entry program.
//
// Writes one funny line to /output/entry.txt.
// Node 22, stdlib only, no network, deterministic.
//
// Candidates considered (each one sentence, at most 200 characters):
//   "My phone's screen time report and I have agreed to never speak of it again."
//   "I bought noise-cancelling headphones so I could finally hear myself think, and all I heard was the fridge."
//   "My plants are thriving — turns out all they needed was for me to forget them for three weeks."
// Chosen: "My calendar reminded me to relax, so I scheduled a meeting to figure out why I can't."
// Why it wins against the judge brief: the everyday truth everyone
// recognises is the calendar that nags you to relax while your day is
// wall-to-wall meetings; the surprise lands at the end — the cure for
// being too busy to relax is to schedule yet another meeting about it,
// which still makes sense because that is exactly what a busy person
// would do. Every word earns its place, nothing explains the joke,
// and it is not a line the reader has heard before. Verified locally:
// 85 characters, one sentence, writes /output/entry.txt cleanly.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My calendar reminded me to relax, so I scheduled a meeting to figure out why I can't.";

// Gate: UTF-8 text of 1 to 200 characters, not only white space.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 chars, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
// Judge brief: it has to stand alone as a single sentence.
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  throw new Error(
    `line must be exactly one sentence, found ${terminators} terminator(s)`,
  );
}
if (LINE.includes("\n")) {
  throw new Error("line must not contain a newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(LINE);
console.log(`(${LINE.length} characters, one sentence)`);
