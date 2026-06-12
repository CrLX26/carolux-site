import { readFileSync } from "fs";
import { join } from "path";

// Brand display serif (Gloock), bundled in-repo at app/lib/fonts/. Read at
// BUILD time and baked into the prerendered OG PNGs — no network fetch, no
// runtime file dependency, and the card always renders on-brand (never the
// generic fallback). Cached at module load so the file is read once.
let cached;

export async function loadGloockFont() {
  if (cached !== undefined) return cached || undefined;
  try {
    cached = readFileSync(join(process.cwd(), "app/lib/fonts/Gloock-Regular.ttf"));
  } catch {
    cached = null; // distinguish "tried and failed" from "not yet attempted"
  }
  return cached || undefined;
}
