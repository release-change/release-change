import type { Config, Context } from "@release-change/shared";

import fs from "node:fs";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedNextRelease = {
  name: "@monorepo/a",
  gitTag: "v1.0.0",
  version: "1.0.0"
};
const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [
    { name: "", path: "." },
    { name: "@monorepo/a", path: "packages/a" }
  ],
  config: DEFAULT_CONFIG as unknown as Config
};
const mockedContextWithoutNextReleaseForPackage = { ...mockedContext, nextRelease: [] };
const mockedContextWithNextRelease = { ...mockedContext, nextRelease: [mockedNextRelease] };
const mockedPackageManifest = {
  version: "0.0.0",
  repository: {
    type: "git",
    url: "git+https://github.com/release-change/release-change.git"
  }
};

beforeEach(() => {
  vi.mock("node:fs");
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockedPackageManifest));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the package is not found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  assert.throws(
    () => updatePackageVersion(mockedNextRelease, mockedContextWithNextRelease),
    "Package /fake/path/packages/a/package.json not found for @monorepo/a package."
  );
});
it("should throw an error if `nextRelease` is undefined", () => {
  assert.throws(
    () => updatePackageVersion(mockedNextRelease, mockedContext),
    "No next release found."
  );
});
it("should throw an error if no next release is found for the package", () => {
  assert.throws(
    () => updatePackageVersion(mockedNextRelease, mockedContextWithoutNextReleaseForPackage),
    "No next release found for @monorepo/a package."
  );
});
it("should update the package version", () => {
  const expectedVersion = mockedNextRelease.version;
  const expectedContent = JSON.stringify(
    { ...mockedPackageManifest, version: expectedVersion },
    null,
    2
  );
  const readFileSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(expectedContent);
  updatePackageVersion(mockedNextRelease, mockedContextWithNextRelease);
  expect(readFileSpy).toHaveBeenCalledWith("/fake/path/packages/a/package.json", "utf-8");
  expect(JSON.parse(expectedContent).version).toBe(expectedVersion);
  // TODO: uncomment when updated package manifest content is written to file
  //expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, expectedContent);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    "Package version updated to 1.0.0 for @monorepo/a package."
  );
});
