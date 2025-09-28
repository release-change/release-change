import fs from "node:fs";

import { assert, expect, it, vi } from "vitest";

import { getPackageVersion } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedPath = `${mockedCwd}/packages/a/package.json`;
const mockedPackageManifestFileWithoutVersion = {};
const mockedPackageManifestFileWithVersion = { version: "1.2.3" };

it("should return `null` if the package manifest file is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getPackageVersion(mockedPath)).toBe(null);
});
it("should throw an error if the package manifest file does not have the `version` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithoutVersion)
  );
  assert.throws(
    () => getPackageVersion(mockedPath),
    `Failed to get the package version for ${mockedPath}: \`version\` property not found.`
  );
});
it("should return the `version` property value if the package manifest file has the `version` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithVersion)
  );
  expect(getPackageVersion(mockedPath)).toBe("1.2.3");
});
