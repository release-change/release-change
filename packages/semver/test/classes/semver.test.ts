import { assert, it } from "vitest";

import { Semver } from "../../src/classes/semver.js";
import { invalidIncrements } from "../fixtures/invalid-increments.js";
import { invalidVersions } from "../fixtures/invalid-versions.js";
import { validIncrements } from "../fixtures/valid-increments.js";
import { validIncrementsInLooseMode } from "../fixtures/valid-increments-in-loose-mode.js";
import { validVersions } from "../fixtures/valid-versions.js";
import { validVersionsInLooseMode } from "../fixtures/valid-versions-in-loose-mode.js";

it.each(invalidVersions)(
  "should throw an error if the version $raw is invalid",
  ({ raw, error, options }) => {
    assert.throws(() => new Semver(raw, options), error);
  }
);
it.each(validVersionsInLooseMode)(
  "should throw an error if the version $raw is parsed in strict mode",
  ({ raw }) => {
    assert.throws(() => new Semver(raw));
  }
);
it.each(validVersionsInLooseMode)(
  "should create a `Semver` object from the version $raw in loose mode",
  ({ raw, version, expected }) => {
    const { major, minor, patch, prerelease, build } = expected;
    const result = new Semver(raw, { loose: true });
    assert.strictEqual(result.raw, raw);
    assert.strictEqual(result.version, version);
    assert.strictEqual(result.major, major);
    assert.strictEqual(result.minor, minor);
    assert.strictEqual(result.patch, patch);
    assert.deepEqual(result.prerelease, prerelease);
    assert.deepEqual(result.build, build);
  }
);
it.each(validVersions)(
  "should create a `Semver` object from the valid version $raw",
  ({ raw, expected }) => {
    const { major, minor, patch, prerelease, build } = expected;
    const result = new Semver(raw);
    assert.strictEqual(result.raw, raw);
    assert.strictEqual(result.version, raw);
    assert.strictEqual(result.major, major);
    assert.strictEqual(result.minor, minor);
    assert.strictEqual(result.patch, patch);
    assert.deepEqual(result.prerelease, prerelease);
    assert.deepEqual(result.build, build);
  }
);
it("should not convert big number prerelease values as numbers", () => {
  const result = new Semver(`1.2.3-beta.${Number.MAX_SAFE_INTEGER}0`);
  assert.deepEqual(result.prerelease, ["beta", "90071992547409910"]);
});
it.each(invalidIncrements)(
  "should throw an error if the version $version is invalid to be increased",
  ({ version, releaseType, prefix, identifierBase, errorMessage }) => {
    assert.throws(
      () => new Semver(version).increase(releaseType, { prefix, identifierBase }),
      errorMessage
    );
  }
);
it.each(validIncrementsInLooseMode)(
  "should throw an error if the version $version is invalid to be increased in strict mode",
  ({ version, releaseType, prefix, identifierBase }) => {
    assert.throws(
      () => new Semver(version).increase(releaseType, { prefix, identifierBase }),
      `Invalid version \`${version}\`.`
    );
  }
);
it.each(validIncrements)(
  "should increase $version to $expected.version ($releaseType)",
  ({ version, releaseType, expected, prefix, identifierBase }) => {
    const result = new Semver(version).increase(releaseType, {
      prefix,
      identifierBase
    });
    assert.deepEqual(result, expected);
  }
);
it.each(validIncrementsInLooseMode)(
  "should increase $version to $expected.version in loose mode ($releaseType)",
  ({ version, releaseType, expected, prefix, identifierBase }) => {
    const result = new Semver(version, { loose: true }).increase(releaseType, {
      prefix,
      identifierBase
    });
    assert.deepEqual(result, expected);
  }
);
