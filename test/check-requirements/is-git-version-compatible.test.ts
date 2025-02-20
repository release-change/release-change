import type { SemVer } from "semver";
import { describe, expect, it } from "vitest";
import { isGitVersionCompatible } from "../../src/check-requirements/is-git-version-compatible.js";

describe("git version", () => {
  it("tests an incompatible Git version", () => {
    expect(isGitVersionCompatible("2.7.1" as unknown as SemVer)).toBe(false);
  });
  it("tests a compatible Git version", () => {
    expect(isGitVersionCompatible("2.48.1" as unknown as SemVer)).toBe(true);
  });
});
