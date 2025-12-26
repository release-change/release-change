import { assert, expect, it } from "vitest";

import { validate } from "../src/index.js";
import { invalidVersions } from "./fixtures/invalid-versions.js";
import { validVersions } from "./fixtures/valid-versions.js";
import { validVersionsInLooseMode } from "./fixtures/valid-versions-in-loose-mode.js";

it.each(invalidVersions)("should return `null` if $raw is to be validated", ({ raw, options }) => {
  expect(validate(raw, options)).toBe(null);
});
it.each(
  validVersionsInLooseMode
)("should return `null` if $raw is to be validated in strict mode", ({ raw }) => {
  expect(validate(raw)).toBe(null);
});
it.each(
  validVersionsInLooseMode
)("should return $version if $raw is to be validated in loose mode", ({ raw, version }) => {
  assert.strictEqual(validate(raw, { loose: true }), version);
});
it.each(validVersions)("should return $raw if $raw is to be validated", ({ raw, version }) => {
  assert.strictEqual(validate(raw), version);
});
