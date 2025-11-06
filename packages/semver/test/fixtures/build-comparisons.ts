import type { SemverBuild } from "../../src/semver.types.js";

export const buildComparisons: Record<"a" | "b", SemverBuild>[] = [
  { a: ["0"], b: [] },
  { a: ["0", "0"], b: ["0"] },
  { a: ["1"], b: ["0"] },
  { a: ["1", "0"], b: ["1"] }
];
