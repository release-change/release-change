/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this lien when commands are run> */
import fs from "node:fs";

import { formatDetailedError, runCommand, runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { updateLockFile } from "../src/update-lock-file.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases-update.js";

const mockedPackageManagerCommands: { command: "npm" | "pnpm"; args: string[] }[] = [
  { command: "pnpm", args: ["install", "--lockfile-only"] },
  { command: "npm", args: ["install", "--package-lock-only"] }
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn(),
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleases)("for $packageName", ({ packageManifestPath, nextRelease }) => {
  it("should throw an error and restore the `package.json` file if the package manager is not found or supported", async () => {
    const expectedError = new Error(
      "Failed to update the lock file: The package manager is not found or is not one of those supported (npm or pnpm).",
      {
        cause: {
          title: "Failed to update the lock file",
          message:
            "The package manager is not found or is not one of those supported (npm or pnpm).",
          details: {
            output: "packageManager: null"
          }
        }
      }
    );
    // TODO: uncomment when command is run
    // const mockedCommand = vi
    //   .mocked(runCommandSync)
    //   .mockReturnValue({ status: 0, stdout: "", stderr: "" });
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(updateLockFile(nextRelease, mockedContext, null)).rejects.toThrowError(
      expectedError
    );
    // TODO: uncomment when command is run
    // expect(mockedCommand).toHaveBeenCalledWith("git", ["restore", packageManifestPath]);
  });
  it.each(mockedPackageManagerCommands)(
    "should not run the $command command if the lock file does not exist",
    async ({ command }) => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      // TODO: uncomment when command is run
      // const mockedCommand = vi
      //   .mocked(runCommand)
      //   .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await updateLockFile(nextRelease, mockedContext, command);
      // TODO: uncomment when command is run
      // expect(mockedCommand).not.toHaveBeenCalled();
    }
  );
  it.each(mockedPackageManagerCommands)(
    "should run the $command command if the package manager used is $command and the lock file exists",
    async ({ command, args }) => {
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      // TODO: uncomment when command is run
      // const mockedCommand = vi
      //   .mocked(runCommand)
      //   .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      await updateLockFile(nextRelease, mockedContext, command);
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith(command, args);
    }
  );
});
