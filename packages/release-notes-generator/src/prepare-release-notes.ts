import type { Context, PackageNextRelease } from "@release-change/shared";
import type { ReleaseNotes } from "./release-notes-generator.types.js";

import { inspect } from "node:util";

import {
  COMMIT_ABBREVIATED_SHA_LENGTH,
  COMMIT_MESSAGE,
  setReleaseType
} from "@release-change/commit-analyser";
import { setLogger } from "@release-change/logger";

/**
 * Prepares the release notes for a package.
 * @param packageNextRelease - The next release data to use.
 * @param context - The context where the CLI is running.
 * @return The release notes for the package.
 */
export const prepareReleaseNotes = (
  packageNextRelease: PackageNextRelease,
  context: Context
): ReleaseNotes => {
  const { pathname, name, gitTag } = packageNextRelease;
  const { config, branch, lastRelease, commits } = context;
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
            const { gitTag: lastGitTag } = packageLastRelease;
            for (const commit of commits) {
              const releaseType = setReleaseType(commit, context);
              const { isMergeCommit, sha, message, modifiedFiles } = commit;
              if (
                isMergeCommit ||
                (isMonorepo && !modifiedFiles?.filter(file => file.startsWith(pathname)).length)
              ) {
                continue;
              }
              if (sha) {
                const abbreviatedSha = sha?.slice(0, COMMIT_ABBREVIATED_SHA_LENGTH);
                const [_, scope, description] = message.match(COMMIT_MESSAGE) ?? [];
                const sanitisedDescription = description ?? "";
                const changeItem = `- ${
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
            const majorChangesSection = majorChanges.length
              ? `## Major changes\n\n${majorChanges.join("\n")}\n`
              : "";
            const minorChangesSection = minorChanges.length
              ? `## Minor changes\n\n${minorChanges.join("\n")}\n`
              : "";
            const patchChangesSection = patchChanges.length
              ? `## Patch changes\n\n${patchChanges.join("\n")}\n`
              : "";
            const fullChangelogSection = lastGitTag
              ? `---\n\n**Full changelog:** [\`${lastGitTag}...${gitTag}\`](${repositoryUrl.replace(".git", "")}/compare/${encodeURIComponent(lastGitTag)}...${encodeURIComponent(gitTag)})\n`
              : "";
            const releaseNotesBody = [
              majorChangesSection,
              minorChangesSection,
              patchChangesSection,
              fullChangelogSection
            ]
              .filter(Boolean)
              .join("\n");
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
          throw new Error("No commits have been retrieved.");
        }
        throw new Error(`No last release found for ${name || "root"} package.`);
      }
      throw new Error("The last release is not defined.");
    }
    throw new Error(`The branch ${branch} is not defined in the configuration.`);
  }
  throw new Error("The branch is not defined.");
};
