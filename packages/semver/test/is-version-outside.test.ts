import { expect, it } from "vitest";

import { isVersionOutside } from "../src/index.js";
import { versionsGtRange } from "./fixtures/versions-gt-range.js";
import { versionsLtRange } from "./fixtures/versions-lt-range.js";
import { versionsNotGtRange } from "./fixtures/versions-not-gt-range.js";
import { versionsNotLtRange } from "./fixtures/versions-not-lt-range.js";

it.each(
  versionsGtRange
)("should return `true` with operator '>', version $1 and range $0", (range, version, options) => {
  expect(isVersionOutside(version, range, ">", options)).toBe(true);
});
it.each(
  versionsLtRange
)("should return `true` with operator '<', version $1 and range $0", (range, version, options) => {
  expect(isVersionOutside(version, range, "<", options)).toBe(true);
});
it.each(
  versionsNotGtRange
)("should return `false` with operator '>', version $1 and range $0", (range, version, options) => {
  expect(isVersionOutside(version, range, ">", options)).toBe(false);
});
it.each(
  versionsNotLtRange
)("should return `false` with operator '<', version $1 and range $0", (range, version, options) => {
  expect(isVersionOutside(version, range, "<", options)).toBe(false);
});
