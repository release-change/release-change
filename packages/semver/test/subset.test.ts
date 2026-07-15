import { expect, it } from "vitest";

import { subset } from "../src/index.js";
import { rangeSubsets } from "./fixtures/range-subsets.js";

it("should return `true` if the subrange is a subset of itself", () => {
  const mockedRange = "^1";
  expect(subset(mockedRange, mockedRange)).toBe(true);
});
it.each(rangeSubsets)(
  "should return $2 when subset $0 is compared to range $1",
  (subRange, superRange, expected, options) => {
    expect(subset(subRange, superRange, options)).toBe(expected);
  }
);
