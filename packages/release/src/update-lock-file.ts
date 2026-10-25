import type { PackageManager } from "@release-change/get-packages";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { setLogger } from "@release-change/logger";
import {
  deepInspectObject,
  formatDetailedError,
  runCommand,
  runCommandSync
} from "@release-change/shared";

import { getLockFilePath } from "./get-lock-file-path.js";

import { ARGS } from "./constants.js";

/**
 * Updates the lock file.
 * @param packageNextRelease - The next release data to use.
 * @param context - The context where the CLI is running.
 * @param packageManager - The package manager used by the project.
 */
export const updateLockFile = async (
  packageNextRelease: PackageNextRelease,
  context: Context,
  packageManager: PackageManager
): Promise<void> => {
  const { cwd, config } = context;
  const { debug } = config;
  const { pathname } = packageNextRelease;
  const logger = setLogger(debug);
  if (debug) logger.setDebugScope("release:update-lock-file");
  if (packageManager && Object.hasOwn(ARGS, packageManager)) {
    const lockFile = getLockFilePath(cwd, pathname, packageManager);
    const args = ARGS[packageManager];
    if (fs.existsSync(lockFile)) {
      const commandResult = await runCommand(packageManager, args, { cwd });
      if (debug) {
        logger.logDebug(`Command run: ${packageManager} ${args.join(" ")}`);
        logger.logDebug(deepInspectObject(commandResult));
      }
    }
  } else {
    const args = ["restore", path.join(cwd, pathname, "package.json")];
    runCommandSync("git", args);
    if (debug) logger.logDebug(`Command run: git ${args.join(" ")}`);
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to update the lock file",
      message:
        "The package manager is not found or is not one of those supported (npm, pnpm or yarn).",
      details: {
        output: `packageManager: ${packageManager}`
      }
    });
  }
};
