import { ISSUE_ID } from "@release-change/commit-analyser";
import { type Commit, type Reference, removeDuplicateObjects } from "@release-change/shared";

/**
 * Gets the issues mentioned by a commit or a pull request body.
 * @param contents - The contents to parse.
 * @param gitTags - The git tags associated with the commit or pull request.
 * @return An array of unique objects with the issue number and the `isPullRequest` property set to `false`.
 */
export const getIssues = (contents: Partial<Commit>, gitTags: string[]): Reference[] => {
  const issues: Reference[] = [];
  const { message, body, footer } = contents;
  const content = [message, ...(body ?? ""), ...(footer ?? "")].join(" ");
  const matches = content.match(ISSUE_ID);
  if (matches) {
    for (const match of matches) {
      issues.push({ number: Number.parseInt(match, 10), isPullRequest: false, gitTags });
    }
  }
  return removeDuplicateObjects(issues);
};
