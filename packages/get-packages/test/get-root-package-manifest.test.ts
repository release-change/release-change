import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getRootPackageManifest } from "../src/index.js";
import { mockedPackageManifestPath } from "./fixtures/mocked-paths.js";

const mockedPackage = {
  repository: {
    type: "git",
    url: "git+https://github.com/release-change/release-change.git"
  }
};

it("should throw an error when no root package manifest is found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(() => getRootPackageManifest(mockedPackageManifestPath)).toThrowError(
    expect.objectContaining({
      message: "Failed to get the root package manifest (`package.json`): File not found.",
      cause: {
        title: "Failed to get the root package manifest (`package.json`)",
        message: "File not found.",
        details: {
          output: `fs.existsSync(${mockedPackageManifestPath}): false`
        }
      }
    })
  );
});
it("should return the content of the package when found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockedPackage));
  expect(getRootPackageManifest(mockedPackageManifestPath)).toEqual(mockedPackage);
});
