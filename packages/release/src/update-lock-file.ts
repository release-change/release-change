/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */
import type { PackageManager } from "@release-change/get-packages";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";
import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";
import { runCommand, runCommandSync } from "@release-change/shared";

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
      // TODO: uncomment to run command
      // const pnpmCommandResult = await runCommand("pnpm", args);
      if (debug) {
        logger.logDebug(`Command run: pnpm ${args.join(" ")}`);
        // TODO: uncomment when command is run
        // logger.logDebug(inspect(pnpmCommandResult, { depth: Number.POSITIVE_INFINITY }));
      }
    }
  } else if (packageManager === "npm") {
    if (fs.existsSync(path.join(cwd, pathname, "package-lock.json"))) {
      args.push("install", "--package-lock-only");
      // TODO: uncomment to run command
      // const npmCommandResult = await runCommand("npm", args);
      if (debug) {
        logger.logDebug(`Command run: npm ${args.join(" ")}`);
        // TODO: uncomment when command is run
        // logger.logDebug(inspect(npmCommandResult, { depth: Number.POSITIVE_INFINITY }));
      }
    }
  } else {
    const { pathname } = packageNextRelease;
    args.push("restore", path.join(cwd, pathname, "package.json"));
    // TODO: uncomment to run command
    // runCommandSync("git", args);
    if (debug) logger.logDebug(`Command run: git ${args.join(" ")}`);
    process.exitCode = 1;
    throw new Error(
      "The package manager is not found or is not one of those supported (npm or pnpm)."
    );
  }
};
