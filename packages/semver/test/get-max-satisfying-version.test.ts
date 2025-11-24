import { expect, it } from "vitest";

import { getMaxSatisfyingVersion } from "../src/index.js";
import { maxSatisfyingVersions } from "./fixtures/max-satisfying-versions.js";
import { maxSatisfyingVersionsInLooseMode } from "./fixtures/max-satisfying-versions-in-loose-mode.js";

it("should return `null` if there are bad ranges", () => {
  expect(getMaxSatisfyingVersion([], "some frogs-v2.5.6")).toBe(null);
});
it.each(maxSatisfyingVersionsInLooseMode)(
  "should return $expected when $versions are checked against $range in loose mode",
  ({ versions, range, expected }) => {
    expect(getMaxSatisfyingVersion(versions, range, { loose: true })).toBe(expected);
  }
);
it.each(maxSatisfyingVersions)(
  "should return $expected when $versions are checked against $range",
  ({ versions, range, expected }) => {
    expect(getMaxSatisfyingVersion(versions, range)).toBe(expected);
  }
);
