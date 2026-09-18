import type { PackageManager } from "./get-packages.types.js";

import { runCommandSync } from "@release-change/shared";

/**
 * Gets the package manager version
 * @param packageManager - The concerned package manager.
 * @return The package manager version if the package manager is installed, the output of the run command otherwise.
 */
export const getPackageManagerVersion = (packageManager: NonNullable<PackageManager>): string => {
  return runCommandSync(packageManager, ["--version"]).stdout;
};
