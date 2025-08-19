import type { SemverPrerelease } from "../../src/semver.types.js";

export const prereleaseEqualities: Record<"a" | "b", SemverPrerelease>[] = [
  { a: [], b: [] },
  { a: [0], b: [0] },
  { a: [1], b: [1] },
  { a: ["beta"], b: ["beta"] }
];
