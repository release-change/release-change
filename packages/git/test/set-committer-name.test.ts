import { expect, it } from "vitest";

import { setCommitterName } from "../src/index.js";

it("should return the name of GitHub Actions if no known app environment is enabled", () => {
  expect(setCommitterName(false)).toBe("github-actions[bot]");
});
it("should return the name of the app if an app environment is enabled", () => {
  expect(setCommitterName(true)).toBe("release-change[bot]");
});
