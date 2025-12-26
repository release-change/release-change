import type { SemverOptionsIncludePrerelease } from "../../src/semver.types.js";

export const comparatorIntersectionsInLooseMode: [
  string,
  string,
  boolean,
  SemverOptionsIncludePrerelease?
][] = [
  [">=v1.3.0", "<=1.3.0", true],
  ["<=1.3.0", "<=v1.3.0", true]
];
