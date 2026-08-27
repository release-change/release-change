/**
 * Sets the committer e-mail address based on whether a known app environment is enabled or not.
 *
 * @param isAppTool - Whether a known app environment is enabled or not.
 * @returns The e-mail address of the app if an app environment is enabled, the e-mail address of the GitHub Actions bot otherwise.
 */
export const setCommitterEmail = (isAppTool: boolean): string => {
  return isAppTool
    ? "293970894+release-change[bot]@users.noreply.github.com"
    : "41898282+github-actions[bot]@users.noreply.github.com";
};
