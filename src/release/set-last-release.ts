import type { Context } from "../cli/cli.types.js";
import type { LastRelease } from "./release.types.js";

import semver from "semver";

import { getAllTags } from "../git/get-all-tags.js";
import { setLogger } from "../logger/index.js";
import { getRootPackageVersion } from "./get-root-package-version.js";

export const setLastRelease = (context: Context): void => {
  const { cwd, branch, config } = context;
  const logger = context.logger ?? setLogger();
  if (!branch || !config?.branches.includes(branch)) return;
  const lastRelease: LastRelease = {
    gitTag: null,
    version: "0.0.0"
  };
  const gitTags = getAllTags(context);
  if (gitTags.length) {
    const branchReleaseType = config?.releaseType[branch];
    if (branchReleaseType) {
      const validGitTags = gitTags.filter(gitTag => {
        const validTag = semver.valid(gitTag);
        if (validTag) {
          if (branchReleaseType.prerelease) {
            const prereleaseIdentifiers = semver.prerelease(validTag);
            if (prereleaseIdentifiers) {
              const [prereleaseIdentifier] = prereleaseIdentifiers;
              return prereleaseIdentifier === branchReleaseType.prereleaseIdentifier;
            }
            return false;
          }
          return !semver.prerelease(validTag);
        }
        return false;
      });
      const [gitTag] = validGitTags;
      const version = semver.valid(gitTag);
      if (gitTag && version) {
        logger.logInfo(
          `Found Git tag ${gitTag} associated with version ${version} on branch ${branch}.`
        );
        lastRelease.gitTag = gitTag;
        lastRelease.version = version;
      } else {
        logger.logError("Failed to get the last Git tag.");
        process.exitCode = 1;
      }
    } else {
      const [gitTag] = gitTags;
      const version = semver.valid(gitTag);
      if (gitTag && version) {
        logger.logInfo(
          `Found Git tag ${gitTag} associated with version ${version} on branch ${branch}.`
        );
        lastRelease.gitTag = gitTag;
        lastRelease.version = version;
      } else {
        logger.logError("Failed to get the last Git tag.");
        process.exitCode = 1;
      }
    }
  } else {
    logger.logInfo(`Not Git tag version found on branch ${branch}.`);
    const rootPackageVersion = getRootPackageVersion(cwd);
    if (rootPackageVersion) {
      logger.logInfo(`Found package version ${rootPackageVersion} on branch ${branch}.`);
      lastRelease.version = rootPackageVersion;
    }
  }
  context.lastRelease = lastRelease;
};
