import { assert, describe, it } from "vitest";

import { getGitTags } from "../src/index.js";
import { mockedCommits } from "./fixtures/mocked-commits.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const mockedNextRelease = [
  {
    name: "",
    pathname: ".",
    gitTag: "v1.2.3",
    version: "1.2.3"
  }
];
const mockedNextReleaseInMonorepo = [
  {
    name: "",
    pathname: ".",
    gitTag: "v1.2.3",
    version: "1.2.3"
  },
  {
    name: "@monorepo/a",
    pathname: "packages/a",
    gitTag: "@monorepo/a@v1.2.3",
    version: "1.2.3"
  }
];
const expectedGitTags = ["v1.2.3"];
const expectedGitTagsInMonorepo = ["v1.2.3", "@monorepo/a@v1.2.3"];

describe.each(mockedCommits)("for $type", ({ expected }) => {
  it("should throw an error if there is no next release", () => {
    assert.throws(() => getGitTags(expected, mockedContext), "No next release found.");
  });
  it("should return the Git tags related to the commit", () => {
    if (expected.modifiedFiles)
      assert.deepEqual(
        getGitTags(expected, {
          ...mockedContextInMonorepo,
          nextRelease: mockedNextReleaseInMonorepo
        }),
        expectedGitTagsInMonorepo
      );
    else
      assert.deepEqual(
        getGitTags(expected, { ...mockedContext, nextRelease: mockedNextRelease }),
        expectedGitTags
      );
  });
});
