import type { SemVer } from "semver";

import childProcess from "node:child_process";
import process from "node:process";

import semver from "semver";

import cli from "./cli.js";
import { GIT_MIN_VERSION } from "./utils/constants.js";

import packageManager from "../package.json" with { type: "json" };

/**
 * Checks whether the version of Node installed matches the versions required by `engines.node` in root `package.json`.
 * @param nodeVersion - The Node version installed.
 * @param nodeVersionsRequired - The versions required by `engines.node` in root `package.json`.
 * @return `true` if the version installed matches the versions required, `false` otherwise.
 */
export const isNodeVersionCompatible = (
  nodeVersion: string,
  nodeVersionsRequired: string
): boolean => semver.satisfies(nodeVersion, nodeVersionsRequired);

/**
 * Checks whether the version of git installed matches the minimal version required.
 * @param gitVersion - The git version installed.
 * @return `true` if the version installed matches the minimal version required, `false` otherwise.
 */
export const isGitVersionCompatible = (gitVersion: NonNullable<SemVer>) => {
  return gitVersion && semver.gte(gitVersion, GIT_MIN_VERSION);
};

/**
 * Checks whether Node and git versions match the versions required.
 */
const checkRequirements = (): void => {
  const { version } = process;
  const packageName = packageManager.name;
  const requiredNodeVersions = packageManager.engines.node;
  if (!isNodeVersionCompatible(version, requiredNodeVersions)) {
    const formattedRequiredNodeVersions = requiredNodeVersions
      .replaceAll(/\^([.0-9]+)/gi, "$1+")
      .replaceAll(" || ", " or ");
    const foundVersion = version.replace("v", "");
    console.error(
      `[${packageName}]: Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${foundVersion}.`
    );
    process.exit(1);
  }
  const gitVersion = semver.coerce(childProcess.execSync("git --version", { encoding: "utf8" }));
  if (!gitVersion || !isGitVersionCompatible(gitVersion)) {
    console.error(
      `[${packageName}]: Git version ${GIT_MIN_VERSION} required. Found ${gitVersion}.`
    );
    process.exit(1);
  }
  process.exitCode = cli();
};

export default checkRequirements;
