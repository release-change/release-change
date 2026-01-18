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
  const args: string[] = [];
  if (debug) logger.setDebugScope("release:update-lock-file");
  if (packageManager === "pnpm") {
    if (fs.existsSync(path.join(cwd, pathname, "pnpm-lock.yaml"))) {
      args.push("install", "--lockfile-only");
      const pnpmCommandResult = await runCommand("pnpm", args);
      if (debug) {
        logger.logDebug(`Command run: pnpm ${args.join(" ")}`);
        logger.logDebug(deepInspectObject(pnpmCommandResult));
      }
    }
  } else if (packageManager === "npm") {
    if (fs.existsSync(path.join(cwd, pathname, "package-lock.json"))) {
      args.push("install", "--package-lock-only");
      const npmCommandResult = await runCommand("npm", args);
      if (debug) {
        logger.logDebug(`Command run: npm ${args.join(" ")}`);
        logger.logDebug(deepInspectObject(npmCommandResult));
      }
    }
  } else {
    const { pathname } = packageNextRelease;
    args.push("restore", path.join(cwd, pathname, "package.json"));
    runCommandSync("git", args);
    if (debug) logger.logDebug(`Command run: git ${args.join(" ")}`);
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to update the lock file",
      message: "The package manager is not found or is not one of those supported (npm or pnpm).",
      details: {
        output: `packageManager: ${packageManager}`
      }
    });
  }
};
