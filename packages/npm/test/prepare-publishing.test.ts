import type { Context } from "@release-change/shared";
import type { PackagePublishing } from "../src/index.js";

import fs from "node:fs";

import { getPackageManager } from "@release-change/get-packages";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { preparePublishing } from "../src/index.js";
import { mockedContext, mockedContextWithNoNpmPublish } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases.js";
import { packageManagers } from "./fixtures/mocked-package-managers.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("@release-change/get-packages", () => ({ getPackageManager: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleases)("for package $name and version $version", nextRelease => {
  const packageManifestContent = {
    name: nextRelease.name || "foo",
    version: "0.0.0",
    repository: {
      type: "git",
      url: "git+https://github.com/owner/repo.git"
    }
  };
  it("should throw an error if the package cannot be found", async () => {
    const expectedError = new Error("Failed to prepare publishing: Could not find the package.", {
      cause: {
        title: "Failed to prepare publishing",
        message: "Could not find the package.",
        details: {
          output: `fs.existsSync(${mockedContext.cwd}/package.json): false`
        }
      }
    });
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(
      preparePublishing(nextRelease, {
        ...mockedContext,
        nextRelease: [nextRelease]
      })
    ).rejects.toThrowError(expectedError);
  });
  it("should throw an error if the package manager is not one of those supported", async () => {
    const expectedError = new Error(
      "Failed to prepare publishing: The package manager is not found or is not one of those supported (npm or pnpm).",
      {
        cause: {
          title: "Failed to prepare publishing",
          message:
            "The package manager is not found or is not one of those supported (npm or pnpm).",
          details: {
            output: "packageManager: null"
          }
        }
      }
    );
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
    vi.mocked(getPackageManager).mockReturnValue(null);
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(
      preparePublishing(nextRelease, {
        ...mockedContext,
        nextRelease: [nextRelease]
      })
    ).rejects.toThrowError(expectedError);
  });
  it("should log a warning if the package cannot be published to NPM because `npmPublish` is set to `false`", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
    await expect(preparePublishing(nextRelease, mockedContextWithNoNpmPublish)).resolves.toBe(null);
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      `The configuration does not allow to publish any packages to NPM; therefore, the release for ${nextRelease.name || "root"} package will not be published.`
    );
  });
  it("should log a warning if the package cannot be published to NPM because it has the `private` property set to `true`", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(
      JSON.stringify({ ...packageManifestContent, private: true })
    );
    await preparePublishing(nextRelease, {
      ...mockedContext,
      nextRelease: [nextRelease]
    });
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      `The ${nextRelease.name || "root"} package is private; therefore, the release will not be published.`
    );
  });
  describe.each(packageManagers)("for package manager $packageManager", ({
    packageManager,
    args,
    noGitChecks
  }) => {
    const { name, pathname, version, npmTag } = nextRelease;
    const expectedArgs = noGitChecks
      ? npmTag
        ? [...args, "--tag", npmTag, noGitChecks]
        : [...args, noGitChecks]
      : npmTag
        ? [...args, "--tag", npmTag]
        : args;
    it("should prepare the publishing with the expected values", async () => {
      const context: Context = {
        ...mockedContext,
        nextRelease: [nextRelease],
        authToken: {
          fileExists: true,
          authTokenExists: true
        }
      };
      const expectedPackagePublishing: PackagePublishing = {
        name: name,
        packageManifestName: packageManifestContent.name,
        pathname,
        version,
        packageManager,
        args: expectedArgs
      };
      if (npmTag) expectedPackagePublishing.npmTag = npmTag;
      vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
      vi.mocked(getPackageManager).mockReturnValue(packageManager);
      assert.deepEqual(await preparePublishing(nextRelease, context), expectedPackagePublishing);
    });
  });
});
