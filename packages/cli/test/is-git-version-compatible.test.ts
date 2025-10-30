import { expect, it } from "vitest";

import { isGitVersionCompatible } from "../src/is-git-version-compatible.js";

it("tests an incompatible Git version", () => {
  expect(isGitVersionCompatible("2.7.1")).toBe(false);
});
it("tests a compatible Git version", () => {
  expect(isGitVersionCompatible("2.48.1")).toBe(true);
});
