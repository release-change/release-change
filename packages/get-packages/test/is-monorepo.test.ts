import { expect, it } from "vitest";

import { isMonorepo } from "../src/index.js";

it("should throw an error if there are no packages", () => {
  expect(() => isMonorepo([])).toThrowError(
    new Error(
      "Failed to check whether the current directory is a monorepo: There must be at least one package.",
      {
        cause: {
          title: "Failed to check whether the current directory is a monorepo",
          message: "There must be at least one package.",
          details: {
            output: "packages.length: 0"
          }
        }
      }
    )
  );
});
it("should return `false` if there is one package only", () => {
  expect(isMonorepo([{ name: "", pathname: "." }])).toBe(false);
});
it("should return `true` if there are more than one package", () => {
  expect(
    isMonorepo([
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" }
    ])
  ).toBe(true);
});
