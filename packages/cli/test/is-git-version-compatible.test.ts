import { expect, it, vi } from "vitest";

import { isGitVersionCompatible } from "../src/is-git-version-compatible.js";

vi.mock("../src/constants.js", () => ({
  GIT_MIN_VERSION: "2.23.0"
}));

it("tests an incompatible Git version", () => {
  expect(isGitVersionCompatible("2.7.1")).toBe(false);
});
it("tests a compatible Git version", () => {
  expect(isGitVersionCompatible("2.23.0")).toBe(true);
});
