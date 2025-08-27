import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getPackageName } from "../src/get-package-name.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedPath = `${mockedCwd}/packages/a/package.json`;
const mockedPackageManifestFileWithoutName = {};
const mockedPackageManifestFileWithName = { name: "@monorepo/a" };

it("should return `null` if the package manifest file is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getPackageName(mockedPath)).toBe(null);
});
it("should return `null` if the package manifest file does not have the `name` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithoutName)
  );
  expect(getPackageName(mockedPath)).toBe(null);
});
it("should return the `name` property value if the package manifest file has the `name` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockedPackageManifestFileWithName));
  expect(getPackageName(mockedPath)).toBe("@monorepo/a");
});
