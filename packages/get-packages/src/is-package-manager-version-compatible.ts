import type { PackageManager } from "./get-packages.types.js";

import { coerce, satisfies } from "@release-change/semver";

import { REQUIRED_NPM_VERSION, REQUIRED_PNPM_VERSION } from "./constants.js";

/**
 * Checks if the given package manager version is compatible with the required version.
 * @param packageManager - The concerned package manager.
 * @param packageManagerVersion - The package manager version to check.
 * @return `true` if the package manager version satisfies the range provided by the required version, `false` otherwise.
 */
export const isPackageManagerVersionCompatible = (
  packageManager: NonNullable<PackageManager>,
  packageManagerVersion: string
): boolean => {
  const semverOptions = { includePrerelease: true };
  const coercedVersion = coerce(packageManagerVersion, semverOptions);
  if (coercedVersion) {
    const { version } = coercedVersion;
    switch (packageManager) {
      case "pnpm":
        return satisfies(version, REQUIRED_PNPM_VERSION, semverOptions);
      case "npm":
        return satisfies(version, REQUIRED_NPM_VERSION, semverOptions);
      default:
        return false;
    }
  }
  return false;
};
