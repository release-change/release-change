import { describe, expect, it } from "vitest";

import { getVersionFromTag } from "../../src/release/get-version-from-tag.js";

describe("get version from tag", () => {
  it("should throw an error if the version is invalid", () => {
    expect(() => getVersionFromTag("v1")).toThrowError();
  });
  it("should return the version if it is valid", () => {
    expect(getVersionFromTag("v1.0.0")).toBe("1.0.0");
  });
});
