import type { SemverOptionsLoose } from "../../src/semver.types.js";

export const excludingInvalidRanges: [string, string, SemverOptionsLoose?][] = [
  ["blerg", "1.2.3"],
  ["git+https://user:password0123@github.com/foo", "123.0.0", { loose: true }],
  ["^1.2.3", "2.0.0-pre"],
  ["0.x", ""],
  ["*", ""]
];
