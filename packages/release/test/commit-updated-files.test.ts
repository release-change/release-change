import type { PackageManager } from "@release-change/get-packages";

import fs from "node:fs";

import { add, commit } from "@release-change/git";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { commitUpdatedFiles } from "../src/commit-updated-files.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases-update.js";

const expectedVersion = "v1.0.0";
const expectedFooter =
  "Co-authored-by: mocked-committer-name [bot] <0+mocked-committer-name-bot@users.noreply.github.com>";
const mockedPackageManagers: [PackageManager, string[]][] = [
  ["pnpm", ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"]],
  ["npm", ["package.json", "package-lock.json", "CHANGELOG.md"]]
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mock("@release-change/git", () => ({
    add: vi.fn(),
    commit: vi.fn(),
    COMMITTER_NAME: "mocked-committer-name [bot]",
    COMMITTER_EMAIL: "0+mocked-committer-name-bot@users.noreply.github.com"
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleases)("for $packageName", async ({ packagePath, nextRelease }) => {
  it("should throw an error if the package manager is not found or supported", async () => {
    const expectedError = new Error(
      "Failed to commit the updated files: The package manager is not found or is not one of those supported (npm or pnpm).",
      {
        cause: {
          title: "Failed to commit the updated files",
          message:
            "The package manager is not found or is not one of those supported (npm or pnpm).",
          details: {
            output: "packageManager: null"
          }
        }
      }
    );
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(commitUpdatedFiles(nextRelease, null, mockedContext)).rejects.toThrowError(
      "The package manager is not found or is not one of those supported (npm or pnpm)."
    );
  });
  describe.each(mockedPackageManagers)("for %s with %o", async (packageManager, files) => {
    const mockedFiles = files.map(file =>
      packagePath === "."
        ? `${mockedContext.cwd}/${file}`
        : `${mockedContext.cwd}/${packagePath}/${file}`
    );
    it("should throw an error if the `git add` command fails", async () => {
      const expectedError = new Error(
        "Failed to run the `git add` command: The command failed with status 128.",
        {
          cause: {
            title: "Failed to run the `git add` command",
            message: "The command failed with status 128.",
            details: {
              output: "fatal: path spec '/fake/path' did not match any files",
              command: "git add /fake/path"
            }
          }
        }
      );
      vi.mocked(add).mockResolvedValue({
        status: 128,
        stdout: "",
        stderr: "fatal: path spec '/fake/path' did not match any files"
      });
      vi.mocked(formatDetailedError).mockReturnValue(expectedError);
      await expect(
        commitUpdatedFiles(nextRelease, packageManager, mockedContext)
      ).rejects.toThrowError(expectedError);
    });
    it("should throw an error if the `git commit` command fails", async () => {
      const expectedError = new Error(
        "Failed to run the `git commit` command: The command failed with status 1.",
        {
          cause: {
            title: "Failed to run the `git commit` command",
            message: "The command failed with status 1.",
            details: {
              output: 'no changes added to commit (use "git add" and/or "git commit -a")',
              command: `git commit -m chore: ${nextRelease.gitTag} [skip ci]\\n\\n${expectedFooter}`
            }
          }
        }
      );
      vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.mocked(commit).mockResolvedValue({
        status: 1,
        stdout: 'no changes added to commit (use "git add" and/or "git commit -a")',
        stderr: ""
      });
      vi.mocked(formatDetailedError).mockReturnValue(expectedError);
      await expect(
        commitUpdatedFiles(nextRelease, packageManager, mockedContext)
      ).rejects.toThrowError(expectedError);
    });
    it("should run the `git add` command with no lock files", async () => {
      const mockedFilesWithoutLockFile = mockedFiles.filter(file => !file.includes("lock"));
      const mockedCommand = vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      vi.mocked(commit).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      expect(mockedCommand).toHaveBeenCalledWith(mockedFilesWithoutLockFile, mockedContext.cwd);
    });
    it("should run the `git add` command with lock file", async () => {
      const mockedCommand = vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(commit).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      expect(mockedCommand).toHaveBeenCalledWith(mockedFiles, mockedContext.cwd);
    });
    it(`should run the \`git commit\` command with ${expectedVersion}`, async () => {
      const mockedCommand = vi
        .mocked(commit)
        .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      expect(mockedCommand).toHaveBeenCalledWith(
        `chore: ${nextRelease.gitTag} [skip ci]\n\n${expectedFooter}`,
        mockedContext.cwd
      );
    });
  });
});
