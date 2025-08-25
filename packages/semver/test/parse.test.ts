import { assert, expect, it } from "vitest";

import { Semver } from "../src/classes/semver.js";
import { parse } from "../src/index.js";
import { invalidVersions } from "./fixtures/invalid-versions.js";
import { validVersions } from "./fixtures/valid-versions.js";
import { validVersionsInLooseMode } from "./fixtures/valid-versions-in-loose-mode.js";

it.each(invalidVersions)("should return `null` if $raw is parsed", ({ raw, options }) => {
  expect(parse(raw, options)).toBe(null);
});
it.each(validVersionsInLooseMode)(
  "should return `null` if $raw is parsed in strict mode",
  ({ raw }) => {
    expect(parse(raw)).toBe(null);
  }
);
it.each(validVersionsInLooseMode)(
  "should return the object if $raw is parsed in loose mode",
  ({ raw, version, expected }) => {
    assert.deepEqual(parse(raw, { loose: true }), { raw, version, ...expected });
  }
);
it.each(validVersions)("should return the object if $raw is parsed", ({ raw, expected }) => {
  assert.deepEqual(parse(raw), { raw, version: raw, ...expected });
});
it.each(validVersions)(
  "should return the object as is if $raw is already in an object",
  ({ raw }) => {
    parse(new Semver(raw));
    expect(Semver).not.toBeCalled;
  }
);
it.each(validVersionsInLooseMode)(
  "should return the object as is if $raw is already in an object (loose mode)",
  ({ raw }) => {
    parse(new Semver(raw, { loose: true }));
    expect(Semver).not.toBeCalled;
  }
);
