import type { Context } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError } from "@release-change/shared";

export const isAutoMergeAllowed = async (
  repositoryEntryPoint: string,
  context: Context
): Promise<boolean> => {
  if (repositoryEntryPoint) {
    const {
      env,
      config: { debug }
    } = context;
    const logger = setLogger(debug);
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryResponse = await fetch(repositoryEntryPoint, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${issuePullRequestToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    const { headers, status, statusText } = repositoryResponse;
    const repositoryResponseData = await repositoryResponse.json();
    if (debug) {
      logger.setDebugScope("github:create-pull-request");
      logger.logDebug(`API entry point: ${repositoryEntryPoint}`);
      logger.logDebug(`Response status: ${status}`);
      logger.logDebug(`Response status text: ${statusText}`);
      logger.logDebug(`Response headers: ${deepInspectObject(headers)}`);
      logger.logDebug(`Response JSON: ${deepInspectObject(repositoryResponseData)}`);
    }
    if (status === 200) return Boolean(repositoryResponseData.allow_auto_merge);
    const responseError: GitHubResponseError = repositoryResponseData;
    const { message, documentation_url: documentationUrl } = responseError;
    const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    process.exitCode = status;
    throw formatDetailedError({
      title: "Failed to check if auto-merge is allowed",
      message: `${message}${documentationReference}`,
      details: {
        output: `status: ${status}`,
        command: `POST ${repositoryEntryPoint}`
      }
    });
  }
  process.exitCode = 1;
  throw formatDetailedError({
    title: "Failed to check if auto-merge is allowed",
    message: "The entry point must not be empty.",
    details: {
      output: "repositoryEntryPoint: "
    }
  });
};
