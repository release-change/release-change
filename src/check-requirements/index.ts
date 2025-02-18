import childProcess from "node:child_process";
import process from "node:process";

import semver from "semver";

import { cli } from "../cli/index.js";
import { isGitVersionCompatible } from "./is-git-version-compatible.js";
import { isNodeVersionCompatible } from "./is-node-version-compatible.js";

import { GIT_MIN_VERSION } from "./constants.js";

import packageManager from "../../package.json" with { type: "json" };

/**
 * Checks whether Node and Git versions match the versions required.
 */
export const checkRequirements = async (): Promise<void> => {
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
  process.exitCode = await cli();
};
