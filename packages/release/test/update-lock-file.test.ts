/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this lien when commands are run> */

import { getPackageManager } from "@release-change/get-packages";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateLockFile } from "../src/update-lock-file.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases-update.js";

const mockedPackageManagerCommands: { command: "npm" | "pnpm"; args: string[] }[] = [
  { command: "pnpm", args: ["install", "--lockfile-only"] },
  { command: "npm", args: ["install", "--package-lock-only"] }
];

beforeEach(() => {
  vi.mock("@release-change/get-packages", () => ({
    getPackageManager: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn(),
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
});

describe.each(mockedNextReleases)(
  "for $packageName",
  ({ packageName, packagePath, nextRelease }) => {
    it("should throw an error and restore the `package.json` file if the package manager is not found or supported", async () => {
      vi.mocked(getPackageManager).mockReturnValue(null);
      // TODO: uncomment when command is run
      // const mockedCommand = vi
      //   .mocked(runCommandSync)
      //   .mockReturnValue({ status: 0, stdout: "", stderr: "" });
      await expect(updateLockFile(mockedContext)).rejects.toThrowError(
        "The package manager is not found or is not one of those supported (npm or pnpm)."
      );
      // TODO: uncomment when command is run
      // expect(mockedCommand).toHaveBeenCalledWith("git", ["restore", packagePath]);
    });
    it.each(mockedPackageManagerCommands)(
      "should run the $command command if the package manager used is $command",
      async ({ command, args }) => {
        vi.mocked(getPackageManager).mockReturnValue(command);
        // TODO: uncomment when command is run
        // const mockedCommand = vi
        //   .mocked(runCommand)
        //   .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
        await updateLockFile(mockedContext);
        // TODO: uncomment when command is run
        // expect(mockedCommand).toHaveBeenCalledWith(command, args);
      }
    );
  }
);
