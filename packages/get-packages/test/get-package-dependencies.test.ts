import fs from "node:fs";

import { assert, expect, it, vi } from "vitest";

import { getPackageDependencies } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedPath = `${mockedCwd}/packages/a/package.json`;
const mockedPackageManifestFileWithoutDependencies = {};
const mockedPackageManifestFileWithDependencies = {
  dependencies: { "@monorepo/b": "workspace:*" }
};
const mockedPackageManifestFileWithDevDependencies = {
  devDependencies: { "@monorepo/c": "workspace:*" }
};
const mockedPackageManifestFileWithDependenciesAndDevDependencies = {
  dependencies: { "@monorepo/b": "workspace:*" },
  devDependencies: { "@monorepo/c": "workspace:*" }
};
const mockedPackageManifests = [
  { content: mockedPackageManifestFileWithDependencies, expected: ["@monorepo/b"] },
  { content: mockedPackageManifestFileWithDevDependencies, expected: ["@monorepo/c"] },
  {
    content: mockedPackageManifestFileWithDependenciesAndDevDependencies,
    expected: ["@monorepo/b", "@monorepo/c"]
  }
];

it("should return `null` if the package manifest file is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getPackageDependencies(mockedPath)).toBe(null);
});
it("should return an empty array if the package manifest file does not have the `dependencies` and `devDependencies` properties", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(
    JSON.stringify(mockedPackageManifestFileWithoutDependencies)
  );
  assert.deepEqual(getPackageDependencies(mockedPath), []);
});
it.each(
  mockedPackageManifests
)("should return an array of the dependencies found in the `dependencies` and `devDependencies` properties", ({
  content,
  expected
}) => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(content));
  assert.deepEqual(getPackageDependencies(mockedPath), expected);
});
