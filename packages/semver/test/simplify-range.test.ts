import { expect, it } from "vitest";

import { simplifyRange } from "../src/index.js";
import { simplifiedRanges } from "./fixtures/simplified-ranges.js";
import { versions } from "./fixtures/versions-simplify-range.js";

it.each(simplifiedRanges)("should simplify range $0 into $1", (initial, expected) => {
  expect(simplifyRange(versions, initial)).toBe(expected);
});
