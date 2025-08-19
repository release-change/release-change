import { expect, test } from "vitest";

import { satisfies } from "../src/index.js";
import { excludingRanges } from "./fixtures/excluding-ranges.js";
import { excludingInvalidRanges } from "./fixtures/excludingInvalidRanges.js";
import { includingRanges } from "./fixtures/including-ranges.js";

test.each(includingRanges)("%s should include %s", (range, version, options) => {
  expect(satisfies(version, range, options)).toBe(true);
});
test.each(excludingRanges)("%s should not include %s", (range, version, options) => {
  expect(satisfies(version, range, options)).toBe(false);
});
test.each(excludingInvalidRanges)("%s should not satisfy %s", (range, version, options) => {
  expect(satisfies(version, range, options)).toBe(false);
});
