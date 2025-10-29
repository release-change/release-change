/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */
import type { Context, Reference } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { checkErrorType, setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Posts a fail comment on the issue or the pull request to notify the release failure.
 * @param reference - The reference of the issue or pull request.
 * @param context - The context where the CLI is running.
 */
export const postFailComment = async (reference: Reference, context: Context): Promise<void> => {
  const {
    env,
    config: { debug, repositoryUrl },
    errors,
    branch
  } = context;
  const logger = setLogger(debug);
  if (branch) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    const { number, isPullRequest } = reference;
    const uri = `${repositoryEntryPoint}/issues/${number}/comments`;
    const errorsList: string[] = [];
    for (const error of errors) {
      const {
        title,
        message,
        details: { output, command }
      } = error;
      let errorBody = `##### ${title}\n\n${message || "This error does not have any additional information."}`;
      if (command) errorBody += `\n\nConcerned command: \`${command}\``;
      if (output) errorBody += `\n\n\`\`\`\n${output}\n\`\`\``;
      errorsList.push(errorBody);
    }
    const commentBody = `#### The release failed

The release from the \`${branch}\` branch failed.

Below are the errors thrown when running the CLI.

---

${errorsList.length ? errorsList.join("\n\n---\n\n") : "No errors reported."}

---`;
    const requestBody = {
      body: commentBody
    };
    // TODO: uncomment to use GiHub API
    // const failCommentResponse = await fetch(uri, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${issuePullRequestToken}`,
    //     "Content-Type": "application/json",
    //     "X-GitHub-Api-Version": "2022-11-28"
    //   },
    //   body: JSON.stringify(requestBody)
    // });
    // const { headers, status, statusText } = failCommentResponse;
    // const issueType = isPullRequest ? "pull request" : "issue";
    // const failCommentResponseData = failCommentResponse.json();
    if (debug) {
      logger.setDebugScope("github:post-fail-comment");
      logger.logDebug(`API entry point: ${uri}`);
      logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(`Response status: ${status}`);
      // logger.logDebug(`Response status text: ${statusText}`);
      // logger.logDebug(`Response headers: ${inspect(headers, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(
      //   `Response JSON: ${inspect(await failCommentResponseData, { depth: Number.POSITIVE_INFINITY })}`
      // );
    }
    // TODO: uncomment when the API is used
    // if (status === 201) logger.logInfo(`Added fail comment on ${issueType} #${number}.`);
    // else if (status === 404)
    //   logger.logWarn(
    //     `The resource requested for ${issueType} #${number} has not been found; therefore, the fail comment has not been added.`
    //   );
    // else {
    //   const responseError: GitHubResponseError = await failCommentResponseData;
    //   const { message, documentation_url: documentationUrl } = responseError;
    //   const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    //   logger.logError(`Failed to post the fail comment on ${issueType} #${number}.`);
    //   process.exitCode = status;
    //   throw formatDetailedError({
    //     title: "Failed to post the fail comment",
    //     message: `${message}${documentationReference}`,
    //     details: {
    //       output: `status: ${status}`
    //     }
    //   });
    // }
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to post the fail comment",
      message: "The target branch is not defined.",
      details: {
        output: "branch: undefined"
      }
    });
  }
};
