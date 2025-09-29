import type { PackageManager } from "@release-change/get-packages";

import fs from "node:fs";

import { getPackageDependencies, getPackageManager } from "@release-change/get-packages";
import { createTag, getCurrentCommitId, push } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { preparePublishing, publishToRegistry } from "@release-change/npm";
import {
  createReleaseNotes,
  prepareReleaseNotes,
  updateChangelogFile
} from "@release-change/release-notes-generator";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { commitUpdatedFiles } from "../src/commit-updated-files.js";
import { publish } from "../src/index.js";
import { updateLockFile } from "../src/update-lock-file.js";
import { updatePackageDependenciesVersions } from "../src/update-package-dependencies-versions.js";
import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const packageManagers: PackageManager[] = ["pnpm", "npm"];
const mockedContextWithNextRelease = {
  ...mockedContext,
  nextRelease: [{ name: "", pathname: ".", gitTag: "v1.0.0", version: "1.0.0" }]
};
const mockedContextInMonorepoWithNextRelease = {
  ...mockedContextInMonorepo,
  nextRelease: [
    { name: "", pathname: ".", gitTag: "v1.3.0", version: "1.3.0" },
    { name: "@monorepo/a", pathname: "packages/a", gitTag: "@monorepo/a@v1.2.3", version: "1.2.3" },
    { name: "@monorepo/b", pathname: "packages/b", gitTag: "@monorepo/b@v1.0.0", version: "1.0.0" }
  ]
};

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn(), checkErrorType: vi.fn() }));
  vi.mock("@release-change/get-packages", () => ({
    getPackageDependencies: vi.fn(),
    getPackageManager: vi.fn()
  }));
  vi.mock("@release-change/git", () => ({
    getCurrentCommitId: vi.fn(),
    createTag: vi.fn(),
    push: vi.fn()
  }));
  vi.mock("@release-change/release-notes-generator", () => ({
    prepareReleaseNotes: vi.fn(),
    updateChangelogFile: vi.fn(),
    createReleaseNotes: vi.fn()
  }));
  vi.mock("@release-change/npm", () => ({
    preparePublishing: vi.fn(),
    publishToRegistry: vi.fn()
  }));
  vi.mock("../src/update-package-version.js", () => ({ updatePackageVersion: vi.fn() }));
  vi.mock("../src/update-package-dependencies-versions.js", () => ({
    updatePackageDependenciesVersions: vi.fn()
  }));
  vi.mock("../src/update-lock-file.js", () => ({ updateLockFile: vi.fn() }));
  vi.mock("../src/commit-updated-files.js", () => ({ commitUpdatedFiles: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should not call `getPackageManager()` if `context.nextRelease` is undefined", async () => {
  await publish(mockedContext);
  expect(getPackageManager).not.toHaveBeenCalled();
});
it("should not call `push()` if `context.nextRelease` is undefined", async () => {
  await publish(mockedContext);
  expect(push).not.toHaveBeenCalled();
});
it.each([mockedContext, { ...mockedContext, nextRelease: [] }])(
  "should not call any functions allowing to publish any packages if `context.nextRelease` is undefined or an empty array",
  async context => {
    await publish(context);
    expect(getPackageDependencies).not.toHaveBeenCalled();
    expect(prepareReleaseNotes).not.toHaveBeenCalled();
    expect(updatePackageVersion).not.toHaveBeenCalled();
    expect(updatePackageDependenciesVersions).not.toHaveBeenCalled();
    expect(updateLockFile).not.toHaveBeenCalled();
    expect(updateChangelogFile).not.toHaveBeenCalled();
    expect(commitUpdatedFiles).not.toHaveBeenCalled();
    expect(createTag).not.toHaveBeenCalled();
    expect(preparePublishing).not.toHaveBeenCalled();
    expect(publishToRegistry).not.toHaveBeenCalled();
    expect(createReleaseNotes).not.toHaveBeenCalled();
  }
);
it("should throw an error if the package manager is not found or unsupported", async () => {
  vi.mocked(getPackageManager).mockReturnValue(null);
  vi.mocked(updateLockFile).mockRejectedValue(
    new Error("The package manager is not found or is not one of those supported (npm or pnpm).")
  );
  await expect(publish(mockedContextWithNextRelease)).rejects.toThrowError(
    "The package manager is not found or is not one of those supported (npm or pnpm)."
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
});
describe.each(packageManagers)("for %s", packageManager => {
  vi.mocked(getPackageManager).mockReturnValue(packageManager);
  describe.each([mockedContextWithNextRelease, mockedContextInMonorepoWithNextRelease])(
    "for isMonorepo: $config.isMonorepo",
    context => {
      const mockedReleaseNotes = {
        tagName: "v1.0.0",
        target: "main",
        isPrerelease: false,
        body: {}
      };

      beforeEach(() => {
        vi.mocked(getPackageDependencies).mockReturnValue([]);
        vi.mocked(prepareReleaseNotes).mockReturnValue(mockedReleaseNotes);
        vi.mocked(updatePackageVersion).mockImplementation(() => undefined);
        vi.mocked(updateLockFile).mockResolvedValue();
        vi.mocked(updateChangelogFile).mockImplementation(() => undefined);
        vi.mocked(commitUpdatedFiles).mockResolvedValue();
        vi.mocked(getCurrentCommitId).mockReturnValue("0123456");
        vi.mocked(createTag).mockImplementation(() => undefined);
      });
      afterEach(() => {
        vi.clearAllMocks();
      });

      it("should throw an error if the package manifest file is not found", async () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(false);
        vi.mocked(updatePackageVersion).mockImplementation(() => {
          throw new Error("Package /fake/path/package.json not found for root package.");
        });
        await expect(publish(context)).rejects.toThrowError(
          "Package /fake/path/package.json not found for root package."
        );
        expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
      });
      it("should throw an error if the commit reference ID is empty", async () => {
        vi.mocked(getCurrentCommitId).mockReturnValue("");
        vi.mocked(createTag).mockImplementation(() => {
          throw new Error("The commit reference must not be empty.");
        });
        await expect(publish(context)).rejects.toThrowError(
          "The commit reference must not be empty."
        );
        expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
      });
      describe.each([
        { case: "if the branch is not defined", errorMessage: "The branch is not defined." },
        {
          case: "if the branch is not defined in the configuration",
          errorMessage: "The branch unknown is not defined in the configuration."
        },
        {
          case: "if the last release is not defined",
          errorMessage: "The last release is not defined."
        },
        {
          case: "if the last release is not found for the package",
          errorMessage: "No last release found for root package."
        },
        {
          case: "if no commits have been retrieved",
          errorMessage: "No commits have been retrieved."
        }
      ])("$case", ({ errorMessage }) => {
        it("should throw an error", async () => {
          vi.mocked(prepareReleaseNotes).mockImplementation(() => {
            throw new Error(errorMessage);
          });
          await expect(publish(context)).rejects.toThrowError(errorMessage);
          expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
        });
      });
    }
  );
});
