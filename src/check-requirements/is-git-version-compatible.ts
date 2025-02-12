import type { SemVer } from "semver";

import semver from "semver";

import { GIT_MIN_VERSION } from "./constants.js";

/**
 * Checks whether the version of git installed matches the minimal version required.
 * @param gitVersion - The git version installed.
 * @return `true` if the version installed matches the minimal version required, `false` otherwise.
 */
const isGitVersionCompatible = (gitVersion: NonNullable<SemVer>) => {
  return gitVersion && semver.gte(gitVersion, GIT_MIN_VERSION);
};

export default isGitVersionCompatible;
