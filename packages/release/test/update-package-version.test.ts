import fs from "node:fs";

import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases-update.js";

const mockedContextWithoutNextReleaseForPackage = { ...mockedContext, nextRelease: [] };
const mockedContextWithNextRelease = {
  ...mockedContext,
  nextRelease: mockedNextReleases.map(mockedNextRelease => mockedNextRelease.nextRelease)
};
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

describe.each(mockedNextReleases)(
  "for $packageName",
  ({ packageName, packagePath, packageManifestPath, nextRelease }) => {
    it("should throw an error if the package manifest is not found", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      assert.throws(
        () => updatePackageVersion(nextRelease, packagePath, mockedContextWithNextRelease),
        `Package ${packageManifestPath} not found for ${packageName}.`
      );
    });
    it("should throw an error if `nextRelease` is undefined", () => {
      assert.throws(
        () => updatePackageVersion(nextRelease, packagePath, mockedContext),
        "No next release found."
      );
    });
    it("should throw an error if no next release is found for the package", () => {
      assert.throws(
        () =>
          updatePackageVersion(nextRelease, packagePath, mockedContextWithoutNextReleaseForPackage),
        `No next release found for ${packageName}.`
      );
    });
    it("should update the package version", () => {
      const expectedVersion = nextRelease.version;
      const expectedContent = JSON.stringify(
        { ...mockedPackageManifest, version: expectedVersion },
        null,
        2
      );
      const readFileSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(expectedContent);
      updatePackageVersion(nextRelease, packagePath, mockedContextWithNextRelease);
      expect(readFileSpy).toHaveBeenCalledWith(packageManifestPath, "utf-8");
      expect(JSON.parse(expectedContent).version).toBe(expectedVersion);
      // TODO: uncomment when updated package manifest content is written to file
      //expect(fs.writeFileSync).toHaveBeenCalledWith(packageManifestPath, expectedContent);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(
        `Package version updated to ${expectedVersion} for ${packageName}.`
      );
    });
  }
);
