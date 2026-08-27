/**
 * Sets the committer name based on whether a known app environment is enabled or not.
 *
 * @param isAppTool - Whether a known app environment is enabled or not.
 * @returns The name of the app if an app environment is enabled, the name of the GitHub Actions bot otherwise.
 */
export const setCommitterName = (isAppTool: boolean): string => {
  return isAppTool ? "release-change[bot]" : "github-actions[bot]";
};
