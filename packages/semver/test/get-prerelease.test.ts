import { assert, expect, it } from "vitest";

import { getPrerelease } from "../src/index.js";
import { invalidVersionsForPrerelease } from "./fixtures/invalid-versions-for-prerelease.js";
import { versionsWithPrerelease } from "./fixtures/versions-with-prerelease.js";
import { versionsWithPrereleaseInLooseMode } from "./fixtures/versions-with-prerelease-in-loose-mode.js";
import { versionsWithoutPrerelease } from "./fixtures/versions-without-prerelease.js";

it.each(invalidVersionsForPrerelease)("should return `null` if %s is invalid", raw => {
  expect(getPrerelease(raw)).toBe(null);
});
it.each(versionsWithoutPrerelease)("should return `null` if %s is parsed", raw => {
  expect(getPrerelease(raw)).toBe(null);
});
it.each(
  versionsWithPrereleaseInLooseMode
)("should return `null` if $raw is parsed in strict mode", ({ raw }) => {
  expect(getPrerelease(raw)).toBe(null);
});
it.each(
  versionsWithPrereleaseInLooseMode
)("should return the prerelease components if $raw is parsed in loose mode", ({
  raw,
  prerelease
}) => {
  assert.deepEqual(getPrerelease(raw, { loose: true }), prerelease);
});
it.each(versionsWithPrerelease)("should return the prerelease components if $raw is parsed", ({
  raw,
  prerelease
}) => {
  assert.deepEqual(getPrerelease(raw), prerelease);
});
