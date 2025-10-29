import type { BranchConfig, ReleaseType } from "@release-change/shared";

import { getPrerelease, increase } from "@release-change/semver";
import { formatDetailedError } from "@release-change/shared";

/**
 * Increments the version.
 * The version increment follows the following rules:
 * - if the current version is not a pre-release, the rules as per semantic versioning apply (with addition of the pre-release identifier if the target branch is configured for pre-releases);
 * - otherwise:
 *   - major releases do not increment the major version,
 *   - minor releases do not increment the minor version,
 *   - patch releases do not increment the patch version,
 *   - the pre-release components are removed if the target branch is not configured for pre-releases,
 *   - the pre-release components are incremented if the target branch is configured for pre-releases.
 * @example
 * Major releases from non-pre-release version:
 * ```
 * 1.0.0 -> 2.0.0
 * 1.0.0 -> 2.0.0-alpha.1
 * 1.0.0 -> 2.0.0-beta.1
 * 1.0.0 -> 2.0.0-rc.1
 * ```
 * Minor releases from non-pre-release version:
 * ```
 * 1.0.0 -> 1.1.0
 * 1.0.0 -> 1.1.0-alpha.1
 * 1.0.0 -> 1.1.0-beta.1
 * 1.0.0 -> 1.1.0-rc.1
 * ```
 * Patch releases from non-pre-release version:
 * ```
 * 1.0.0 -> 1.0.1
 * 1.0.0 -> 1.0.1-alpha.1
 * 1.0.0 -> 1.0.1-beta.1
 * 1.0.0 -> 1.0.1-rc.1
 * ```
 * Releases from pre-release version, whichever the release type:
 * ```
 * 2.0.0-alpha.1 -> 2.0.0-alpha.2
 * 2.0.0-alpha.1 -> 2.0.0-beta.1
 * 2.0.0-alpha.1 -> 2.0.0-rc.1
 * 2.0.0-alpha.1 -> 2.0.0
 * 2.0.0-beta.1 -> 2.0.0-alpha.1
 * 2.0.0-beta.1 -> 2.0.0-beta.2
 * 2.0.0-beta.1 -> 2.0.0-rc.1
 * 2.0.0-beta.1 -> 2.0.0
 * 2.0.0-rc.1 -> 2.0.0-alpha.1
 * 2.0.0-rc.1 -> 2.0.0-beta.1
 * 2.0.0-rc.1 -> 2.0.0-rc.2
 * 2.0.0-rc.1 -> 2.0.0
 * ```
 * @param currentVersion - The current version.
 * @param releaseType - The release type.
 * @param branchConfig - The target branch configuration in terms of releases.
 * @return The next version if there is a release and the increment is valid.
 */
export const incrementVersion = (
  currentVersion: string,
  releaseType: ReleaseType,
  branchConfig: BranchConfig
): string => {
  if (releaseType) {
    const { prerelease, prereleaseIdentifier } = branchConfig;
    const currentVersionPrereleaseComponents = getPrerelease(currentVersion);
    const isCurrentVersionPrerelease = Boolean(currentVersionPrereleaseComponents?.length);
    const prereleaseType = isCurrentVersionPrerelease
      ? "prerelease"
      : releaseType === "major"
        ? "premajor"
        : releaseType === "minor"
          ? "preminor"
          : "prerelease";
    const nextVersion =
      prerelease && prereleaseIdentifier
        ? increase(currentVersion, prereleaseType, {
            prefix: prereleaseIdentifier,
            identifierBase: 1
          })
        : isCurrentVersionPrerelease
          ? increase(currentVersion, "patch")
          : increase(currentVersion, releaseType);
    if (nextVersion) return nextVersion;
    throw formatDetailedError({
      title: `Failed to increment version from ${currentVersion}`,
      message: "No next version given.",
      details: {
        output: "nextVersion: null"
      }
    });
  }
  throw formatDetailedError({
    title: `Failed to increment version from ${currentVersion}`,
    message: "No release type retrieved.",
    details: {
      output: "releaseType: null"
    }
  });
};
