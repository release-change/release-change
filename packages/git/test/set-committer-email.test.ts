import { expect, it } from "vitest";

import { setCommitterEmail } from "../src/index.js";

it("should return the e-mail address of GitHub Actions if no known app environment is enabled", () => {
  expect(setCommitterEmail(false)).toBe("41898282+github-actions[bot]@users.noreply.github.com");
});
it("should return the e-mail address of the app if an app environment is enabled", () => {
  expect(setCommitterEmail(true)).toBe("293970894+release-change[bot]@users.noreply.github.com");
});
