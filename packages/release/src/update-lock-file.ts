/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */

import type { PackageManager } from "@release-change/get-packages";
import type { Context } from "@release-change/shared";

import path from "node:path";

import { setLogger } from "@release-change/logger";
import { runCommand, runCommandSync } from "@release-change/shared";

/**
 * Updates the lock file.
 * @param context - The context where the CLI is running.
 * @param packageManager - The package manager used by the project.
 */
export const updateLockFile = async (
  context: Context,
  packageManager: PackageManager
): Promise<void> => {
  const { cwd, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  const args: string[] = [];
  if (debug) logger.setDebugScope("release:update-lock-file");
  if (packageManager === "pnpm") {
    args.push("install", "--lockfile-only");
    // TODO: uncomment to run command
    // await runCommand("pnpm", args);
    if (debug) logger.logDebug(`Command run: pnpm ${args.join(" ")}`);
  } else if (packageManager === "npm") {
    args.push("install", "--package-lock-only");
    // TODO: uncomment to run command
    // await runCommand("npm", args);
    if (debug) logger.logDebug(`Command run: npm ${args.join(" ")}`);
  } else {
    args.push("restore", path.join(cwd, "package.json"));
    // TODO: uncomment to run command
    // runCommandSync("git", args);
    if (debug) logger.logDebug(`Command run: git ${args.join(" ")}`);
    process.exitCode = 1;
    throw new Error(
      "The package manager is not found or is not one of those supported (npm or pnpm)."
    );
  }
};
