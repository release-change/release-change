import fs from "node:fs";

import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases-update.js";

const mockedContextWithNextRelease = {
  ...mockedContext,
  nextRelease: mockedNextReleases.map(mockedNextRelease => mockedNextRelease.nextRelease)
};
const mockedPackageManifest = {
  name: "foo",
  version: "0.0.0",
  repository: {
    type: "git",
    url: "git+https://github.com/release-change/release-change.git"
  }
};
const mockedPrivatePackageManifest = {
  ...mockedPackageManifest,
  private: true
};

beforeEach(() => {
  vi.mock("node:fs");
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
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

describe.each(mockedNextReleases)("for $packageName", ({
  packageName,
  packageManifestPath,
  nextRelease
}) => {
  it("should throw an error if the package manifest is not found", () => {
    const expectedError = new Error(
      `Failed to update the package version: Package ${packageManifestPath} not found for ${packageName}.`,
      {
        cause: {
          title: "Failed to update the package version",
          message: `Package ${packageManifestPath} not found for ${packageName}.`,
          details: {
            output: `fs.existsSync(${packageManifestPath}): false`
          }
        }
      }
    );
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    expect(() => updatePackageVersion(nextRelease, mockedContextWithNextRelease)).toThrowError(
      expectedError
    );
  });
  it.each([
    mockedPackageManifest,
    mockedPrivatePackageManifest
  ])("should update the package version", packageManifest => {
    const expectedVersion = nextRelease.version;
    const expectedContent = `${JSON.stringify(
      { ...packageManifest, version: expectedVersion },
      null,
      2
    )}\n`;
    const readFileSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(expectedContent);
    updatePackageVersion(nextRelease, mockedContextWithNextRelease);
    expect(readFileSpy).toHaveBeenCalledWith(packageManifestPath, "utf-8");
    expect(JSON.parse(expectedContent).version).toBe(expectedVersion);
    expect(fs.writeFileSync).toHaveBeenCalledWith(packageManifestPath, expectedContent);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Package version updated to ${expectedVersion} for ${packageName}.`
    );
  });
});
