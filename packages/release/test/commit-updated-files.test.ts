/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when commands are run> */
import type { PackageManager } from "@release-change/get-packages";

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
    it("should run the `git add` command", async () => {
      const mockedFiles = files.map(file =>
        packagePath === "."
          ? `${mockedContext.cwd}/${file}`
          : `${mockedContext.cwd}/${packagePath}/${file}`
      );
      const mockedCommand = vi.mocked(add).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(mockedFiles, mockedContext.cwd);
    });
    it(`should run the \`git commit\` command with ${expectedVersion}`, async () => {
      const mockedCommand = vi
        .mocked(commit)
        .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await commitUpdatedFiles(nextRelease, packageManager, mockedContext);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(
      //   `chore: ${nextRelease.gitTag}\n\n${expectedFooter}`
      // );
    });
  });
});
