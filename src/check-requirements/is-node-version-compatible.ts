import semver from "semver";

/**
 * Checks whether the version of Node installed matches the versions required by `engines.node` in root `package.json`.
 * @param nodeVersion - The Node version installed.
 * @param nodeVersionsRequired - The versions required by `engines.node` in root `package.json`.
 * @return `true` if the version installed matches the versions required, `false` otherwise.
 */
const isNodeVersionCompatible = (nodeVersion: string, nodeVersionsRequired: string): boolean => {
  return semver.satisfies(nodeVersion, nodeVersionsRequired);
};

export default isNodeVersionCompatible;
