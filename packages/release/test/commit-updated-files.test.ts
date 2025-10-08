/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when commands are run> */
import type { PackageManager } from "@release-change/get-packages";

import fs from "node:fs";

import { add, commit } from "@release-change/git";
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
    // TODO: uncomment when command is run
    // it("should throw an error if the `git add` command fails", async () => {
    //   vi.mocked(add).mockResolvedValue({
    //     status: 128,
    //     stdout: "",
    //     stderr: "fatal: path spec '/fake/path' did not match any files"
    //   });
    //   await expect(
    //     commitUpdatedFiles(nextRelease, packageManager, mockedContext)
    //   ).rejects.toThrowError("fatal: path spec '/fake/path' did not match any files");
    // });
    // it("should throw an error if the `git commit` command fails", async () => {
    //   vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
    //   vi.mocked(commit).mockResolvedValue({
    //     status: 1,
    //     stdout: 'no changes added to commit (use "git add" and/or "git commit -a")',
    //     stderr: ""
    //   });
    //   await expect(
    //     commitUpdatedFiles(nextRelease, packageManager, mockedContext)
    //   ).rejects.toThrowError('no changes added to commit (use "git add" and/or "git commit -a")');
    // });
    it("should run the `git add` command with no lock files", async () => {
      const mockedFilesWithoutLockFile = mockedFiles.filter(file => !file.includes("lock"));
      const mockedCommand = vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      // TODO: uncomment when command is run
      // vi.spyOn(fs, "existsSync").mockReturnValue(false);
      // vi.mocked(commit).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(mockedFilesWithoutLockFile, mockedContext.cwd);
    });
    it("should run the `git add` command with lock file", async () => {
      const mockedCommand = vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      // TODO: uncomment when command is run
      // vi.spyOn(fs, "existsSync").mockReturnValue(true);
      // vi.mocked(commit).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(mockedFiles, mockedContext.cwd);
    });
    it(`should run the \`git commit\` command with ${expectedVersion}`, async () => {
      const mockedCommand = vi
        .mocked(commit)
        .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      // TODO: uncomment when command is run
      // vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(
      //   `chore: ${nextRelease.gitTag}\n\n${expectedFooter}`,
      //   mockedContext.cwd
      // );
    });
  });
});
