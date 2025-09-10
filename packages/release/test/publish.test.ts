import type { PackageManager } from "@release-change/get-packages";

import fs from "node:fs";

import { getPackageManager } from "@release-change/get-packages";
import { createTag, getCurrentCommitId } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { commitUpdatedFiles } from "../src/commit-updated-files.js";
import { publish } from "../src/index.js";
import { updateLockFile } from "../src/update-lock-file.js";
import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const packageManagers: PackageManager[] = ["pnpm", "npm"];
const mockedContextWithNextRelease = {
  ...mockedContext,
  nextRelease: [{ name: "", gitTag: "v1.0.0", version: "1.0.0" }]
};
const mockedContextInMonorepoWithNextRelease = {
  ...mockedContextInMonorepo,
  nextRelease: [
    { name: "", gitTag: "v1.3.0", version: "1.3.0" },
    { name: "@monorepo/a", gitTag: "@monorepo/a@v1.2.3", version: "1.2.3" },
    { name: "@monorepo/b", gitTag: "@monorepo/b@v1.0.0", version: "1.0.0" }
  ]
};

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn(), checkErrorType: vi.fn() }));
  vi.mock("@release-change/get-packages", () => ({ getPackageManager: vi.fn() }));
  vi.mock("@release-change/git", () => ({ getCurrentCommitId: vi.fn(), createTag: vi.fn() }));
  vi.mock("../src/update-package-version.js", () => ({ updatePackageVersion: vi.fn() }));
  vi.mock("../src/update-lock-file.js", () => ({ updateLockFile: vi.fn() }));
  vi.mock("../src/commit-updated-files.js", () => ({ commitUpdatedFiles: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should not call any functions allowing to publish any packages if `context.nextRelease` is undefined", async () => {
  await publish(mockedContext);
  expect(getPackageManager).not.toHaveBeenCalled();
  expect(updatePackageVersion).not.toHaveBeenCalled();
  expect(updateLockFile).not.toHaveBeenCalled();
  expect(commitUpdatedFiles).not.toHaveBeenCalled();
  expect(getCurrentCommitId).not.toHaveBeenCalled();
  expect(createTag).not.toHaveBeenCalled();
});

it("should not call any functions allowing to publish any packages if `context.nextRelease` is an empty array", async () => {
  await publish({ ...mockedContext, nextRelease: [] });
  expect(getPackageManager).toHaveBeenCalled();
  expect(updatePackageVersion).not.toHaveBeenCalled();
  expect(updateLockFile).not.toHaveBeenCalled();
  expect(commitUpdatedFiles).not.toHaveBeenCalled();
  expect(getCurrentCommitId).not.toHaveBeenCalled();
  expect(createTag).not.toHaveBeenCalled();
});
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
      it("should throw an error if the package to update is unknown", async () => {
        await publish({
          ...context,
          nextRelease: [{ name: "unknown", gitTag: "v1.0.0", version: "1.0.0" }]
        });
        expect(mockedLogger.logError).toHaveBeenCalledWith(
          "Pathname not found for unknown package."
        );
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
        vi.mocked(updatePackageVersion).mockImplementation(() => {
          return undefined;
        });
        vi.mocked(updateLockFile).mockResolvedValue();
        vi.mocked(commitUpdatedFiles).mockResolvedValue();
        vi.mocked(getCurrentCommitId).mockReturnValue("");
        vi.mocked(createTag).mockImplementation(() => {
          throw new Error("The commit reference must not be empty.");
        });
        await expect(publish(context)).rejects.toThrowError(
          "The commit reference must not be empty."
        );
        expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
      });
    }
  );
});
