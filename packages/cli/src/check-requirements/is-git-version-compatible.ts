import { gte } from "@release-change/semver";

import { GIT_MIN_VERSION } from "./constants.js";

/**
 * Checks whether the version of Git installed matches the minimal version required.
 * @param gitVersion - The Git version installed.
 * @return `true` if the version installed matches the minimal version required, `false` otherwise.
 */
export const isGitVersionCompatible = (gitVersion: string): boolean => {
  return gte(gitVersion, GIT_MIN_VERSION);
};
