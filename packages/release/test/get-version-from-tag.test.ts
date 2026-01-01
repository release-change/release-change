import { expect, it } from "vitest";

import { getVersionFromTag } from "../src/get-version-from-tag.js";
import { mockedVersionsFromGitTag } from "./fixtures/mocked-versions-from-git-tag.js";

it("should throw an error if the version is invalid", () => {
  expect(() => getVersionFromTag("v1")).toThrowError(
    new Error("Failed to get the version from tag: No version could be extracted from tag v1.", {
      cause: {
        title: "Failed to get the version from tag",
        message: "No version could be extracted from tag v1.",
        details: {
          output: "tag: v1"
        }
      }
    })
  );
});
it.each(
  mockedVersionsFromGitTag
)("should return the version $1 from $0 if it is valid", (gitTag, version) => {
  expect(getVersionFromTag(gitTag)).toBe(version);
});
