import { expect, it } from "vitest";

import { findNpmTagFromGitTag } from "../src/find-npm-tag-from-git-tag.js";

it("should return `null` if no Git tag is found", () => {
  expect(
    findNpmTagFromGitTag("v1.2.3", [
      { name: "", pathname: ".", gitTag: "v2.0.0", version: "2.0.0" },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ])
  ).toBe(null);
});
it("should return `undefined` if the Git tag is found, but no NPM tag is defined", () => {
  expect(
    findNpmTagFromGitTag("v1.2.3", [
      { name: "", pathname: ".", gitTag: "v1.2.3", version: "1.2.3" },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v2.0.0",
        version: "2.0.0"
      }
    ])
  ).toBe(undefined);
});
it("should return the NPm tag value if the Git tag is found and the NPM tag is defined", () => {
  expect(
    findNpmTagFromGitTag("v1.0.0-alpha.1", [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v2.0.0",
        version: "2.0.0"
      }
    ])
  ).toBe("alpha");
});
