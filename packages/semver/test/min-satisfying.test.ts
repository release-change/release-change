import { expect, it } from "vitest";

import { minSatisfying } from "../src/index.js";
import { minSatisfyingVersions } from "./fixtures/min-satisfying-versions.js";
import { minSatisfyingVersionsInLooseMode } from "./fixtures/min-satisfying-versions-in-loose-mode.js";

it("should return `null` if there are bad ranges", () => {
  expect(minSatisfying([], "some frogs-v2.5.6")).toBe(null);
});
it.each(minSatisfyingVersionsInLooseMode)(
  "should return $expected when $versions are checked against $range in loose mode",
  ({ versions, range, expected }) => {
    expect(minSatisfying(versions, range, { loose: true })).toBe(expected);
  }
);
it.each(minSatisfyingVersions)(
  "should return $expected when $versions are checked against $range",
  ({ versions, range, expected }) => {
    expect(minSatisfying(versions, range)).toBe(expected);
  }
);
