import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getPackageVersion } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedPath = `${mockedCwd}/packages/a/package.json`;
const mockedPackageManifestFileWithoutVersion = {};
const mockedPackageManifestFileWithVersion = { version: "@monorepo/a" };

it("should return `null` if the package manifest file is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getPackageVersion(mockedPath)).toBe(null);
});
it("should return `null` if the package manifest file does not have the `version` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithoutVersion)
  );
  expect(getPackageVersion(mockedPath)).toBe(null);
});
it("should return the `version` property value if the package manifest file has the `version` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithVersion)
  );
  expect(getPackageVersion(mockedPath)).toBe("@monorepo/a");
});
