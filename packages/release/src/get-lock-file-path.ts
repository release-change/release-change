import type { PackageManager } from "@release-change/get-packages";

import path from "node:path";

import { LOCK_FILE_NAME } from "./constants.js";

/**
 * Gets the lock file name for the given package manager.
 * @param cwd - The current working directory.
 * @param pathname - The current pathname.
 * @param packageManager - The package manager.
 * @return The complete path to the lock file if the package manager is found, the complete path to `package-lock.json` otherwise.
 */
export const getLockFilePath = (
  cwd: string,
  pathname: string,
  packageManager: NonNullable<PackageManager>
): string => path.join(cwd, pathname, LOCK_FILE_NAME[packageManager] ?? "package-lock.json");
