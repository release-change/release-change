import type { Commit, Reference } from "@release-change/shared";

import { inspect } from "node:util";

import { ISSUE_ID } from "@release-change/commit-analyser";
import { setLogger } from "@release-change/logger";
import { removeDuplicateObjects } from "@release-change/shared";

/**
 * Gets the issues mentioned by a commit or a pull request body.
 * @param contents - The contents to parse.
 * @param gitTags - The git tags associated with the commit or pull request.
 * @param [debug] - Whether the CLI is running in debug mode or not.
 * @return An array of unique objects with the issue number and the `isPullRequest` property set to `false`.
 */
export const getIssues = (
  contents: Partial<Commit>,
  gitTags: string[],
  debug = false
): Reference[] => {
  const logger = setLogger(debug);
  logger.setScope("github");
  const issues: Reference[] = [];
  const { message, body, footer } = contents;
  const content = [message ?? "", ...(body ?? ""), ...(footer ?? "")].join(" ");
  const matches = content.matchAll(ISSUE_ID);
  for (const match of matches) {
    const issue = {
      number: Number(match.groups?.issueId ?? ""),
      isPullRequest: false,
      gitTags
    };
    issues.push(issue);
    if (debug) {
      logger.setDebugScope("github:get-issues");
      logger.logDebug(`Associated issue: ${inspect(issue, { depth: Number.POSITIVE_INFINITY })}`);
    }
  }
  return removeDuplicateObjects(issues);
};
