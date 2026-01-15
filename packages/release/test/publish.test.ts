import type { DetailedError } from "@release-change/shared";

import fs from "node:fs";

import { getPackageDependencies, getPackageManager } from "@release-change/get-packages";
import {
  cancelCommitsSinceRef,
  createTag,
  getCurrentCommitId,
  push,
  removeTag,
  removeTagOnRemoteRepository,
  setBranchName,
  switchToNewBranch
} from "@release-change/git";
import { createPullRequest } from "@release-change/github";
import { addErrorToContext, isDetailedError, setLogger } from "@release-change/logger";
import { preparePublishing, publishToRegistry } from "@release-change/npm";
import {
  createReleaseNotes,
  prepareReleaseNotes,
  updateChangelogFile
} from "@release-change/release-notes-generator";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { commitUpdatedFiles } from "../src/commit-updated-files.js";
import { publish } from "../src/index.js";
import { updateLockFile } from "../src/update-lock-file.js";
import { updatePackageDependenciesVersions } from "../src/update-package-dependencies-versions.js";
import { updatePackageVersion } from "../src/update-package-version.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedReleaseNotes } from "./fixtures/mocked-release-notes.js";

const packageManagers = ["pnpm", "npm"] as const;
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
  vi.mock("@release-change/logger", () => ({
    addErrorToContext: vi.fn(),
    checkErrorType: vi.fn(),
    isDetailedError: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/get-packages", () => ({
    getPackageDependencies: vi.fn(),
    getPackageManager: vi.fn()
  }));
  vi.mock("@release-change/git", () => ({
    setBranchName: vi.fn(),
    switchToNewBranch: vi.fn(),
    getCurrentCommitId: vi.fn(),
    createTag: vi.fn(),
    push: vi.fn(),
    cancelCommitsSinceRef: vi.fn(),
    removeTag: vi.fn(),
    removeTagOnRemoteRepository: vi.fn()
  }));
  vi.mock("@release-change/github", () => ({ createPullRequest: vi.fn() }));
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
  vi.mocked(addErrorToContext).mockImplementation((error, context) => {
    if (error instanceof Error) {
      const { cause } = error;
      if (
        cause &&
        typeof cause === "object" &&
        "title" in cause &&
        "message" in cause &&
        "details" in cause
      ) {
        context.errors.push(cause as DetailedError);
      }
    }
  });
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
it("should not call `createPullRequest()` if `context.nextRelease` is undefined", async () => {
  await publish(mockedContext);
  expect(createPullRequest).not.toHaveBeenCalled();
});
it("should not call any functions allowing to switch to a new branch if `context.nextRelease` is undefined", async () => {
  await publish(mockedContext);
  expect(setBranchName).not.toHaveBeenCalled();
  expect(switchToNewBranch).not.toHaveBeenCalled();
});
it.each([
  mockedContext,
  { ...mockedContext, nextRelease: [] }
])("should not call any functions allowing to publish any packages if `context.nextRelease` is undefined or an empty array", async context => {
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
});
it("should throw an error if the package manager is not found or unsupported", async () => {
  const expectedErrorMessage =
    "Failed to find the package manager: The package manager is not found or is not one of those supported (npm or pnpm).";
  const expectedError = new Error(expectedErrorMessage, {
    cause: {
      title: "Failed to find the package manager.",
      message: "The package manager is not found or is not one of those supported (npm or pnpm).",
      details: {
        output: "packageManager: null"
      }
    }
  });
  vi.mocked(getPackageManager).mockReturnValue(null);
  vi.mocked(updateLockFile).mockRejectedValue(expectedError);
  vi.mocked(isDetailedError).mockReturnValue(true);
  await expect(publish(mockedContextWithNextRelease)).rejects.toThrowError(expectedErrorMessage);
  expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
  assert.deepNestedInclude(mockedContextWithNextRelease.errors, expectedError.cause);
});
describe.each(packageManagers)("for %s", packageManager => {
  beforeEach(() => {
    vi.mocked(getPackageManager).mockReturnValue(packageManager);
    vi.mocked(push).mockResolvedValue();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe.each([
    mockedContextWithNextRelease,
    mockedContextInMonorepoWithNextRelease
  ])("for isMonorepo: $config.isMonorepo", context => {
    beforeEach(() => {
      vi.mocked(getPackageDependencies).mockReturnValue([]);
      vi.mocked(prepareReleaseNotes).mockReturnValue(mockedReleaseNotes);
      vi.mocked(updatePackageVersion).mockImplementation(() => undefined);
      vi.mocked(updateLockFile).mockResolvedValue();
      vi.mocked(updateChangelogFile).mockImplementation(() => undefined);
      vi.mocked(commitUpdatedFiles).mockResolvedValue();
      vi.mocked(getCurrentCommitId).mockReturnValue("0123456");
      vi.mocked(createTag).mockImplementation(() => undefined);
      vi.mocked(createReleaseNotes).mockResolvedValue();
      vi.mocked(preparePublishing).mockResolvedValue(null);
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should throw an error if the package manifest file is not found", async () => {
      const expectedErrorMessage =
        "Failed to find the package manifest file: Package /fake/path/package.json not found for root package.";
      const expectedError = new Error(expectedErrorMessage, {
        cause: {
          title: "Failed to find the package manifest file.",
          message: "Package /fake/path/package.json not found for root package.",
          details: {
            output: "fs.existsSync(/fake/path/package.json): false"
          }
        }
      });
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      vi.mocked(updatePackageVersion).mockImplementation(() => {
        throw expectedError;
      });
      await expect(publish(context)).rejects.toThrowError(expectedErrorMessage);
      expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
      assert.deepNestedInclude(context.errors, expectedError.cause);
    });
    it("should throw an error if the commit reference ID is empty", async () => {
      const expectedErrorMessage =
        "Failed to create a Git tag: The commit reference must not be empty.";
      const expectedError = new Error(expectedErrorMessage, {
        cause: {
          title: "Failed to create a Git tag.",
          message: "The commit reference must not be empty.",
          details: {
            output: "commitRef: "
          }
        }
      });
      vi.mocked(getCurrentCommitId).mockReturnValue("");
      vi.mocked(createTag).mockImplementation(() => {
        throw expectedError;
      });
      await expect(publish(context)).rejects.toThrowError(expectedErrorMessage);
      expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
      assert.deepNestedInclude(context.errors, expectedError.cause);
    });
    describe.each([
      {
        case: "if the branch is not defined",
        errorMessage: "Failed to prepare the release notes: The branch is not defined.",
        errorCause: {
          title: "Failed to prepare the release notes",
          message: "The branch is not defined.",
          details: {
            output: "branch: undefined"
          }
        }
      },
      {
        case: "if the branch is not defined in the configuration",
        errorMessage:
          "Failed to prepare the release notes: The branch unknown is not defined in the configuration.",
        errorCause: {
          title: "Failed to prepare the release notes",
          message: "The branch unknown is not defined in the configuration.",
          details: {
            output: "branch: unknown"
          }
        }
      },
      {
        case: "if the last release is not defined",
        errorMessage: "Failed to prepare the relase notes: The last release is not defined.",
        errorCause: {
          title: "Failed to prepare the release notes",
          message: "The last release is not defined.",
          details: {
            output: "lastRelease: undefined"
          }
        }
      },
      {
        case: "if the last release is not found for the package",
        errorMessage:
          "Failed to prepare the release notes: No last release found for root package.",
        errorCause: {
          title: "Failed to prepare the release notes",
          message: "No last release found for root package.",
          details: {
            output: "packageLastRelease: undefined"
          }
        }
      },
      {
        case: "if no commits have been retrieved",
        errorMessage: "Failed to prepare the release notes: No commits have been retrieved.",
        errorCause: {
          title: "Failed to prepare the release notes",
          message: "No commits have been retrieved.",
          details: {
            output: "commits: undefined"
          }
        }
      }
    ])("$case", ({ errorMessage, errorCause }) => {
      it("should throw an error", async () => {
        const expectedError = new Error(errorMessage, { cause: errorCause });
        vi.mocked(prepareReleaseNotes).mockImplementation(() => {
          throw expectedError;
        });
        await expect(publish(context)).rejects.toThrowError(expectedError);
        expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to publish the release.");
        assert.deepNestedInclude(context.errors, expectedError.cause);
      });
    });
    if (context.config.isMonorepo) {
      it("should update package dependencies when in monorepo with dependencies", async () => {
        vi.mocked(getPackageDependencies).mockReturnValue(["@monorepo/c"]);
        await publish(context);
        expect(updatePackageDependenciesVersions).toHaveBeenCalled();
      });
      it("should not update package dependencies when dependencies are `null`", async () => {
        vi.mocked(getPackageDependencies).mockReturnValue(null);
        await publish(context);
        expect(updatePackageDependenciesVersions).not.toHaveBeenCalled();
      });
    } else {
      it("should not update package dependencies when not in monorepo", async () => {
        vi.mocked(getPackageDependencies).mockReturnValue(["some-package"]);
        await publish(context);
        expect(updatePackageDependenciesVersions).not.toHaveBeenCalled();
      });
    }
    it("should execute the full publishing workflow successfully", async () => {
      const args =
        packageManager === "pnpm"
          ? ["publish", "--access", "public", "--not-git-checks"]
          : ["publish", "--access", "public"];
      vi.mocked(getPackageDependencies).mockReturnValue([]);
      vi.mocked(prepareReleaseNotes).mockReturnValue(mockedReleaseNotes);
      vi.mocked(getCurrentCommitId).mockReturnValue("abc123");
      vi.mocked(preparePublishing).mockResolvedValue({
        name: "",
        packageManifestName: "foo",
        pathname: ".",
        version: "1.0.0",
        packageManager,
        args
      });
      await publish(context);
      expect(push).toHaveBeenCalledWith(context, { includeTags: true });
      expect(createPullRequest).toHaveBeenCalled();
      expect(createReleaseNotes).toHaveBeenCalled();
      expect(publishToRegistry).toHaveBeenCalled();
    });
    it("should rollback commits and remove tags when `git add` fails", async () => {
      const mockedError = new Error(
        "Failed to run the `git` command: The command failed with status 128.",
        {
          cause: {
            title: "Failed to run the `git` command",
            message: "The command failed with status 128.",
            details: {
              output: "Git error",
              command:
                "git add /fake/path/package.json /fake/path/package-lock.json /fake/path/CHANGELOG.md"
            }
          }
        }
      );
      vi.mocked(getCurrentCommitId).mockReturnValue("original-commit");
      vi.mocked(commitUpdatedFiles).mockRejectedValue(mockedError);
      vi.mocked(isDetailedError).mockReturnValue(true);
      await expect(publish(context)).rejects.toThrowError(mockedError);
      expect(cancelCommitsSinceRef).toHaveBeenCalledWith(
        "original-commit",
        expect.any(String),
        expect.any(Boolean)
      );
      expect(removeTag).not.toHaveBeenCalled();
      expect(removeTagOnRemoteRepository).not.toHaveBeenCalled();
    });
    it("should rollback commits and remove tags when `git commit` fails", async () => {
      const mockedError = new Error(
        "Failed to run the `git` command: The command failed with status 128.",
        {
          cause: {
            title: "Failed to run the `git` command",
            message: "The command failed with status 128.",
            details: {
              output: "Git error",
              command: "git commit -m 'chore: v1.0.0'"
            }
          }
        }
      );
      vi.mocked(getCurrentCommitId).mockReturnValue("original-commit");
      vi.mocked(commitUpdatedFiles).mockRejectedValue(mockedError);
      await expect(publish(context)).rejects.toThrowError(mockedError);
      expect(cancelCommitsSinceRef).toHaveBeenCalledWith(
        "original-commit",
        expect.any(String),
        expect.any(Boolean)
      );
      expect(removeTag).not.toHaveBeenCalled();
      expect(removeTagOnRemoteRepository).not.toHaveBeenCalled();
    });
    it("should rollback commits and remove tags when push fails", async () => {
      const mockedError = new Error(
        "Failed to run the `git` command: The command failed with status 128.",
        {
          cause: {
            title: "Failed to run the `git` command",
            message: "The command failed with status 128.",
            details: {
              output: "Git error",
              command: "git push --follow-tags origin main"
            }
          }
        }
      );
      vi.mocked(getCurrentCommitId).mockReturnValue("original-commit");
      vi.mocked(push).mockRejectedValue(mockedError);
      await expect(publish(context)).rejects.toThrowError(mockedError);
      expect(cancelCommitsSinceRef).toHaveBeenCalledWith(
        "original-commit",
        expect.any(String),
        expect.any(Boolean)
      );
      expect(removeTag).toHaveBeenCalled();
      expect(removeTagOnRemoteRepository).toHaveBeenCalled();
    });
    it("should rollback commits and remove tags when pull request creation fails", async () => {
      const mockedError = new Error(
        "Failed to create the pull request: The command failed with status 128.",
        {
          cause: {
            title: "Failed to create the pull request",
            message: "The command failed with status 128.",
            details: {
              output: "GitHub API error",
              command: "POST /repos/:owner/:repo/pulls"
            }
          }
        }
      );
      vi.mocked(createPullRequest).mockRejectedValue(mockedError);
      await expect(publish(context)).rejects.toThrowError(mockedError);
      expect(cancelCommitsSinceRef).toHaveBeenCalledWith(
        "0123456",
        expect.any(String),
        expect.any(Boolean)
      );
      expect(removeTag).toHaveBeenCalled();
      expect(removeTagOnRemoteRepository).toHaveBeenCalled();
    });
    it("should not rollback when error is not from `git add`, `git commit`, `git push` or pull request creation", async () => {
      vi.mocked(updateLockFile).mockRejectedValue(new Error("Lock file update failed"));
      await expect(publish(context)).rejects.toThrow();
      expect(cancelCommitsSinceRef).not.toHaveBeenCalled();
      expect(removeTag).not.toHaveBeenCalled();
      expect(removeTagOnRemoteRepository).not.toHaveBeenCalled();
    });
    it("should set `process.exitCode` to 1 on error", async () => {
      vi.mocked(push).mockRejectedValue(new Error("Some error"));
      await expect(publish(context)).rejects.toThrow();
      expect(process.exitCode).toBe(1);
    });
    it("should create all tags before pushing", async () => {
      const operations: string[] = [];
      vi.mocked(createTag).mockImplementation(() => {
        operations.push("tag");
      });
      vi.mocked(push).mockImplementation(async () => {
        operations.push("push");
      });
      vi.mocked(createPullRequest).mockImplementation(async () => {
        operations.push("pullRequest");
      });
      await publish(context);
      expect(operations.lastIndexOf("tag")).toBeLessThan(operations.indexOf("push"));
    });
    it("should not add to `packagePublishingSet` when `preparePublishing` returns `null`", async () => {
      await publish(context);
      expect(publishToRegistry).not.toHaveBeenCalled();
    });
    it("should collect all Git tags during package processing", async () => {
      await publish(context);
      const gitTags = context.nextRelease.map(packageItem => packageItem.gitTag);
      for (const gitTag of gitTags) {
        expect(createTag).toHaveBeenCalledWith(
          expect.objectContaining({ gitTag }),
          expect.any(String),
          expect.any(Boolean)
        );
      }
    });
    it("should remove all created tags on rollback", async () => {
      const mockedError = new Error(
        "Failed to run the `git` command: The command failed with status 128.",
        {
          cause: {
            title: "Failed to run the `git` command",
            message: "The command failed with status 128.",
            details: {
              output: "Git error",
              command: "git push --follow-tags origin main"
            }
          }
        }
      );
      vi.mocked(push).mockRejectedValue(mockedError);
      await expect(publish(context)).rejects.toThrowError(mockedError);
      expect(removeTag).toHaveBeenCalledTimes(context.nextRelease.length);
      expect(removeTagOnRemoteRepository).toHaveBeenCalledTimes(context.nextRelease.length);
      for (const packageNextRelease of context.nextRelease) {
        expect(removeTag).toHaveBeenCalledWith(
          packageNextRelease.gitTag,
          expect.any(String),
          expect.any(Boolean)
        );
        expect(removeTagOnRemoteRepository).toHaveBeenCalledWith(
          packageNextRelease.gitTag,
          context
        );
      }
    });
    it("should create release notes for all packages", async () => {
      await publish(context);
      expect(createReleaseNotes).toHaveBeenCalledTimes(context.nextRelease.length);
    });
    it("should create release notes after successful push", async () => {
      const operations: string[] = [];
      vi.mocked(push).mockImplementation(async () => {
        operations.push("push");
      });
      vi.mocked(createPullRequest).mockImplementation(async () => {
        operations.push("pullRequest");
      });
      vi.mocked(createReleaseNotes).mockImplementation(async () => {
        operations.push("releaseNotes");
      });
      await publish(context);
      expect(operations.lastIndexOf("push")).toBeLessThan(operations.indexOf("releaseNotes"));
    });
    it("should handle non-Error exceptions", async () => {
      vi.mocked(push).mockRejectedValue("String error");
      await expect(publish(context)).rejects.toThrowError("String error");
    });
    it("should preserve error cause when rethrowing", async () => {
      vi.mocked(push).mockRejectedValue(new Error("Original", { cause: "custom-cause" }));
      try {
        await publish(context);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect.objectContaining({ cause: "custom-cause" });
      }
    });
  });
  it("should publish all packages that return valid publishing info", async () => {
    vi.mocked(prepareReleaseNotes).mockReturnValue(mockedReleaseNotes);
    vi.mocked(preparePublishing)
      .mockResolvedValueOnce({
        name: "@monorepo/a",
        packageManifestName: "@monorepo/a",
        pathname: "packages/a",
        version: "1.0.0",
        packageManager,
        args: []
      })
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        name: "@monorepo/c",
        packageManifestName: "@monorepo/c",
        pathname: "packages/c",
        version: "1.0.0",
        packageManager,
        args: []
      });
    await publish(mockedContextInMonorepoWithNextRelease);
    expect(publishToRegistry).toHaveBeenCalledTimes(2);
  });
});
