import type { PackageManifest } from "@release-change/config";

/**
 * Checks whether provenance is allowed by the package manifest.
 * @param packageManifest - The package manifest to analyse.
 * @return `false` if `publishConfig.provenance` is provided and set to `false`, `true` otherwise.
 */
export const isProvenanceAllowed = (packageManifest: PackageManifest): boolean => {
  return packageManifest.publishConfig?.provenance !== false;
};
