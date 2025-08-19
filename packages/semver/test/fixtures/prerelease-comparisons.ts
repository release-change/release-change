import type { SemverPrerelease } from "../../src/semver.types.js";

export const prereleaseComparisons: Record<"a" | "b", SemverPrerelease>[] = [
  { a: [], b: ["foo"] },
  { a: [], b: ["asdf"] },
  { a: [], b: [4] },
  { a: [], b: ["4-foo"] },
  { a: ["5-foo"], b: [5] },
  { a: [5], b: [4] },
  { a: ["5-Foo"], b: ["5-foo"] },
  { a: ["a", 10], b: ["a", 5] },
  { a: ["a", "b"], b: ["a", 5] },
  { a: ["a", "b"], b: ["a"] },
  { a: ["a", "b", "c", 10, "d", 5], b: ["a", "b", "c", 5, "d", 100] },
  { a: ["r100"], b: ["r2"] },
  { a: ["r100"], b: ["R2"] }
];
