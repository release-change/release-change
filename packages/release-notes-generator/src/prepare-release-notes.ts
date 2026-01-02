import type { Context, PackageNextRelease } from "@release-change/shared";
import type { ReleaseNotes } from "./release-notes-generator.types.js";

import { inspect } from "node:util";

import { COMMIT_ABBREVIATED_SHA_LENGTH, COMMIT_MESSAGE } from "@release-change/commit-analyser";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

/**
 * Prepares the release notes for a package.
 *
 * In a monorepo context, the release notes for the root package are prepared considering all other internal packages.
 * @param packageNextRelease - The next release data to use.
 * @param packageDependencies - The package internal dependencies.
 * @param context - The context where the CLI is running.
 * @return The release notes for the package.
 */
export const prepareReleaseNotes = (
  packageNextRelease: PackageNextRelease,
  packageDependencies: string[] | null,
  context: Context
): ReleaseNotes => {
  const { pathname, name, gitTag } = packageNextRelease;
  const { config, branch, lastRelease, nextRelease, commits } = context;
  if (branch) {
    const { debug, repositoryUrl, releaseType, isMonorepo } = config;
    const logger = setLogger(debug);
    const branchConfig = releaseType[branch];
    if (branchConfig) {
      const { prerelease } = branchConfig;
      if (lastRelease) {
        const packageLastRelease = lastRelease.packages.find(
          packageItem => packageItem.name === name
        );
        if (packageLastRelease) {
          if (commits) {
            const majorChanges: string[] = [];
            const minorChanges: string[] = [];
            const patchChanges: string[] = [];
            const dependenciesUpdates: string[] = [];
            const { gitTag: lastGitTag } = packageLastRelease;
            for (const commit of commits) {
              const { isMergeCommit, sha, message, releaseType, modifiedFiles } = commit;
              if (
                isMergeCommit ||
                (isMonorepo &&
                  name &&
                  !modifiedFiles?.filter(file => file.startsWith(pathname)).length)
              ) {
                continue;
              }
              if (sha) {
                const abbreviatedSha = sha?.slice(0, COMMIT_ABBREVIATED_SHA_LENGTH);
                const [_, scope, description] = message.match(COMMIT_MESSAGE) ?? [];
                const sanitisedDescription = description ?? "";
                const changeItem = `${
                  scope ? `**${scope}:** ${sanitisedDescription}` : sanitisedDescription
                } ([\`${abbreviatedSha}\`](${repositoryUrl.replace(".git", "")}/commit/${sha}))`;
                switch (releaseType) {
                  case "major":
                    majorChanges.push(changeItem);
                    break;
                  case "minor": {
                    minorChanges.push(changeItem);
                    break;
                  }
                  case "patch":
                    patchChanges.push(changeItem);
                    break;
                  default:
                    break;
                }
              }
            }
            if (isMonorepo && name && packageDependencies && nextRelease) {
              for (const packageDependency of packageDependencies) {
                const packageNextRelease = nextRelease.find(
                  packageItem => packageItem.name === packageDependency
                );
                if (packageNextRelease) {
                  const updateItem = `${packageNextRelease.name}@${packageNextRelease.version}`;
                  dependenciesUpdates.push(updateItem);
                }
              }
            }
            const fullChangelog = lastGitTag
              ? `**Full changelog:** [\`${lastGitTag}...${gitTag}\`](${repositoryUrl.replace(".git", "")}/compare/${lastGitTag}...${gitTag})`
              : "";
            const releaseNotesBody: ReleaseNotes["body"] = {};
            if (majorChanges.length) releaseNotesBody.major = majorChanges;
            if (minorChanges.length) releaseNotesBody.minor = minorChanges;
            if (patchChanges.length) releaseNotesBody.patch = patchChanges;
            if (dependenciesUpdates.length) releaseNotesBody.dependencies = dependenciesUpdates;
            if (fullChangelog) releaseNotesBody.changelog = fullChangelog;
            if (debug) {
              logger.setDebugScope("release-notes-generator:prepare-release-notes");
              logger.logDebug(`Release notes for ${name || "root"} package:`);
              logger.logDebug(inspect(releaseNotesBody, { depth: Number.POSITIVE_INFINITY }));
            }
            return {
              tagName: gitTag,
              target: branch,
              isPrerelease: Boolean(prerelease),
              body: releaseNotesBody
            };
          }
          throw formatDetailedError({
            title: "Failed to prepare the release notes",
            message: "No commits have been retrieved.",
            details: {
              output: "commits: undefined"
            }
          });
        }
        throw formatDetailedError({
          title: "Failed to prepare the release notes",
          message: `No last release found for ${name || "root"} package.`,
          details: {
            output: "packageLastRelease: undefined"
          }
        });
      }
      throw formatDetailedError({
        title: "Failed to prepare the release notes",
        message: "The last release is not defined.",
        details: {
          output: "lastRelease: undefined"
        }
      });
    }
    throw formatDetailedError({
      title: "Failed to prepare the release notes",
      message: `The branch ${branch} is not defined in the configuration.`,
      details: {
        output: "branchConfig: undefined"
      }
    });
  }
  throw formatDetailedError({
    title: "Failed to prepare the release notes",
    message: "The branch is not defined",
    details: {
      output: "branch: undefined"
    }
  });
};
