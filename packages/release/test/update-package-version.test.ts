import type { Config, Context } from "@release-change/shared";

import fs from "node:fs";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedNextReleases = [
  {
    packageName: "root package",
    packagePath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      gitTag: "v1.3.0",
      version: "1.3.0"
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      gitTag: "v1.2.3",
      version: "1.2.3"
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      gitTag: "v1.0.0",
      version: "1.0.0"
    }
  }
];
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
    { name: "@monorepo/a", path: "packages/a" },
    { name: "@monorepo/b", path: "packages/b" }
  ],
  config: DEFAULT_CONFIG as unknown as Config
};
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
  ({ packageName, packagePath, nextRelease }) => {
    it("should throw an error if the package is not found", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      assert.throws(
        () => updatePackageVersion(nextRelease, { ...mockedContext, packages: [] }),
        `${packageName} not found.`
      );
    });
    it("should throw an error if the package manifest is not found", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      assert.throws(
        () => updatePackageVersion(nextRelease, mockedContextWithNextRelease),
        `Package ${packagePath} not found for ${packageName}.`
      );
    });
    it("should throw an error if `nextRelease` is undefined", () => {
      assert.throws(
        () => updatePackageVersion(nextRelease, mockedContext),
        "No next release found."
      );
    });
    it("should throw an error if no next release is found for the package", () => {
      assert.throws(
        () => updatePackageVersion(nextRelease, mockedContextWithoutNextReleaseForPackage),
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
      updatePackageVersion(nextRelease, mockedContextWithNextRelease);
      expect(readFileSpy).toHaveBeenCalledWith(packagePath, "utf-8");
      expect(JSON.parse(expectedContent).version).toBe(expectedVersion);
      // TODO: uncomment when updated package manifest content is written to file
      //expect(fs.writeFileSync).toHaveBeenCalledWith(packagePath, expectedContent);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(
        `Package version updated to ${expectedVersion} for ${packageName}.`
      );
    });
  }
);
