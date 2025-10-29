import { expect, it } from "vitest";

import { getVersionFromTag } from "../src/get-version-from-tag.js";

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
it("should return the version if it is valid", () => {
  expect(getVersionFromTag("v1.0.0")).toBe("1.0.0");
});
