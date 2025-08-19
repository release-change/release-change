import type {
  SemverOptionsLoose,
  SemverPrereleaseIdentifiers,
  SemverReleaseType
} from "./semver.types.js";

import { Semver } from "./classes/semver.js";

/**
 * Increases the version according to the release type.
 * @param version - The version to increase.
 * @param releaseType - The release type to use.
 * @param [prereleaseIdentifiers] - When using pre-releases, an object containing the prefix and the identifier to use, the identifier being the increment base.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The version increased by the release type if it is valid, `null` otherwise.
 */
export const increase = (
  version: string | Semver,
  releaseType: SemverReleaseType,
  prereleaseIdentifiers?: SemverPrereleaseIdentifiers,
  options?: SemverOptionsLoose
): string | null => {
  try {
    return (
      new Semver(version instanceof Semver ? version.version : version, options).increase(
        releaseType,
        prereleaseIdentifiers
      )?.version ?? null
    );
  } catch {
    return null;
  }
};
