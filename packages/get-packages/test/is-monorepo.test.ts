import { assert, expect, it } from "vitest";

import { isMonorepo } from "../src/index.js";

it("should throw an error if there are no packages", () => {
  assert.throws(() => isMonorepo([]), "There must be at least one package.");
});
it("should return `false` if there is one package only", () => {
  expect(isMonorepo([{ name: "", path: "." }])).toBe(false);
});
it("should return `true` if there are more than one package", () => {
  expect(
    isMonorepo([
      { name: "", path: "." },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" }
    ])
  ).toBe(true);
});
