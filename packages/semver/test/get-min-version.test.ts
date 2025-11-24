import { expect, it } from "vitest";

import { getMinVersion } from "../src/index.js";
import { minVersions } from "./fixtures/min-versions.js";

it.each(minVersions)("should return $1 for the range $0", (range, expected) => {
  expect(getMinVersion(range)).toBe(expected);
});
