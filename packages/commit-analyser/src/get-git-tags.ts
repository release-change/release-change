import type { Commit, Context } from "@release-change/shared";

/**
 * Gets the Git tags associated with the commit.
 * @param commit - The commit to analyse.
 * @param context - The context where the CLI is running.
 * @return An array of the Git tags.
 */
export const getGitTags = (commit: Commit, context: Context): string[] => {
  const {
    config: { isMonorepo },
    nextRelease
  } = context;
  if (nextRelease) {
    const { modifiedFiles } = commit;
    return isMonorepo && modifiedFiles
      ? nextRelease
          .filter(
            packageNextRelease =>
              packageNextRelease.pathname === "." ||
              modifiedFiles.some(file => file.startsWith(packageNextRelease.pathname))
          )
          .map(packageNextRelease => packageNextRelease.gitTag)
      : nextRelease.map(packageNextRelease => packageNextRelease.gitTag);
  }
  throw new Error("No next release found.");
};
