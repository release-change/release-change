import type { PackageManager } from "./get-packages.types.js";

import { runCommandSync } from "@release-change/shared";

/**
 * Gets the package manager version
 * @param packageManager - The concerned package manager.
 * @param cwd - The current working directory.
 * @return The package manager version if the package manager is installed, the output of the run command otherwise.
 */
export const getPackageManagerVersion = (
  packageManager: NonNullable<PackageManager>,
  cwd: string
): string => {
  return runCommandSync(packageManager, ["--version"], { cwd }).stdout;
};
