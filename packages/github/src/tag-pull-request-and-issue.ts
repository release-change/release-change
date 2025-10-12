/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */

import type { Context, Reference } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { agreeInNumber } from "@release-change/shared";

import { findNpmTagFromGitTag } from "./find-npm-tag-from-git-tag.js";
import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

export const tagPullRequestAndIssue = async (
  reference: Reference,
  context: Context
): Promise<void> => {
  const { number, isPullRequest, gitTags } = reference;
  const {
    env,
    config: { debug, repositoryUrl },
    nextRelease
  } = context;
  const logger = setLogger(debug);
  logger.setScope("github");
  if (nextRelease) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    const uri = `${repositoryEntryPoint}/issues/${number}`;
    const requestBody = {
      labels: [
        ...new Set(
          gitTags
            .map(gitTag => findNpmTagFromGitTag(gitTag, nextRelease))
            .filter(npmTag => npmTag !== null)
            .map(npmTag => `released${npmTag ? ` on @${npmTag}` : ""}`)
        )
      ]
    };
    // TODO: uncomment to use GiHub API
    // const issueClosingResponse = await fetch(uri, {
    //   method: "PATCH",
    //   headers: {
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${issuePullRequestToken}`,
    //     "X-GitHub-Api-Version": "2022-11-28"
    //   },
    //   body: JSON.stringify(requestBody)
    // });
    // const { status, statusText } = issueClosingResponse;
    if (debug) {
      logger.setDebugScope("github:tag-pull-request-and-issue");
      logger.logDebug(`API entry point: ${uri}`);
      logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(`Response status: ${status}`);
      // logger.logDebug(`Response status text: ${statusText}`);
      // logger.logDebug(
      //   `Response JSON: ${inspect(await issueClosingResponse.json(), { depth: Number.POSITIVE_INFINITY })}`
      // );
    }
    const issueType = isPullRequest ? "pull request" : "issue";
    // TODO: uncomment when the API is used
    // if (status === 200) {
    //   const { labels } = requestBody;
    //   const totalLabels = labels.length;
    //   const labelEnumeration = new Intl.ListFormat("en-GB", {
    //     style: "long",
    //     type: "conjunction"
    //   }).format(labels.map(label => `\`${label}\``));
    //   const labelMessage = totalLabels
    //     ? ` with ${agreeInNumber(totalLabels, ["label", "labels"])} ${labelEnumeration}`
    //     : "";
    //   logger.logSuccess(`Tagged ${issueType} #${number} successfully${labelMessage}.`);
    // } else if (status === 404) {
    //   logger.logWarn(
    //     `The resource requested for ${issueType} #${number} has not been found; therefore, no labels have been added.`
    //   );
    // } else {
    //   const responseError: GitHubResponseError = await issueClosingResponse.json();
    //   const { message, documentation_url: documentationUrl } = responseError;
    //   const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    //   logger.logError(`Failed to tag ${issueType} #${number}.`);
    //   process.exitCode = status;
    //   throw new Error(`${message}${documentationReference}`);
    // }
  } else {
    process.exitCode = 1;
    throw new Error("The next release is not defined.");
  }
};
