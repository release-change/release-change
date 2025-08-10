import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getRootPackage } from "../src/index.js";

describe("get root package", () => {
  const mockedPath = "/fake/path";
  const mockedPackage = {
    repository: {
      type: "git",
      url: "git+https://github.com/release-change/release-change.git"
    }
  };

  it("should return `null` when no package found", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getRootPackage(mockedPath)).toBe(null);
  });
  it("should return the content of the package when found", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockedPackage));
    expect(getRootPackage(mockedPath)).toEqual(mockedPackage);
  });
});
