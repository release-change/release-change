import fs from "node:fs";

import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getPackageName } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedPath = `${mockedCwd}/packages/a/package.json`;
const mockedPackageManifestFileWithoutName = {};
const mockedPackageManifestFileWithInvalidName = { name: true };
const mockedPackageManifestFileWithValidName = { name: "@monorepo/a" };

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return `null` if the package manifest file is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getPackageName(mockedPath)).toBe(null);
});
it("should throw an error if the package manifest file does not have the `name` property", () => {
  const expectedError = new Error(
    `Failed to get the package name for ${mockedPath}: \`name\` property not found.`,
    {
      cause: {
        title: "Failed to get the package name",
        message: "`name` property not found.",
        details: {
          output: `path: ${mockedPath}`
        }
      }
    }
  );
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithoutName)
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getPackageName(mockedPath)).toThrowError(expectedError);
});
it("should throw an error if the package manifest file has the `name` property, but with a value other than a string", () => {
  const expectedError = new Error(
    `Failed to get the package name for ${mockedPath}: \`name\` property must be a string.`,
    {
      cause: {
        title: "Failed to get the package name",
        message: "`name` property must be a string.",
        details: {
          output: `path: ${mockedPath}`
        }
      }
    }
  );
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithInvalidName)
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getPackageName(mockedPath)).toThrowError(expectedError);
});
it("should return the `name` property value if the package manifest file has the `name` property", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithValidName)
  );
  expect(getPackageName(mockedPath)).toBe("@monorepo/a");
});
