import { expect, it } from "vitest";

import { minVersion } from "../src/index.js";
import { minVersions } from "./fixtures/min-versions.js";

it.each(minVersions)("should return $1 for the range $0", (range, expected) => {
  expect(minVersion(range)).toBe(expected);
});
