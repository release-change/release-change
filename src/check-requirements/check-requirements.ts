import process from "node:process";

import semver from "semver";

import { cli } from "../cli/cli.js";
import { runCommandSync } from "../git/run-command-sync.js";
import { setLogger } from "../logger/set-logger.js";
import { isGitVersionCompatible } from "./is-git-version-compatible.js";
import { isNodeVersionCompatible } from "./is-node-version-compatible.js";

import { GIT_MIN_VERSION, REQUIRED_NODE_VERSIONS } from "./constants.js";

/**
 * Checks whether Node and Git versions match the versions required.
 */
export const checkRequirements = async (): Promise<void> => {
  const logger = setLogger(false);
  const { version } = process;
  if (!isNodeVersionCompatible(version, REQUIRED_NODE_VERSIONS)) {
    const formattedRequiredNodeVersions = REQUIRED_NODE_VERSIONS.replaceAll(
      /\^([.0-9]+)/gi,
      "$1+"
    ).replaceAll(" || ", " or ");
    const foundVersion = version.replace("v", "");
    logger.logError(
      `Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${foundVersion}.`
    );
    process.exit(1);
  }
  const gitVersion = semver.coerce(runCommandSync(["--version"], { encoding: "utf8" }).stdout);
  if (!gitVersion || !isGitVersionCompatible(gitVersion)) {
    logger.logError(`Git version ${GIT_MIN_VERSION} required. Found ${gitVersion}.`);
    process.exit(1);
  }
  process.exitCode = await cli();
};
