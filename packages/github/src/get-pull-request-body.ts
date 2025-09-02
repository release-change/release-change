import type { Context } from "@release-change/shared";
import type { PullRequestBody } from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Gets the pull request body.
 * @param pullRequestNumber - The number of the pull request to request.
 * @param context - The context where the CLI is running.
 * @return The pull request body as an array of blank-line-separated strings if the pull request is requested successfully, `null` otherwise.
 */
export const getPullRequestBody = async (
  pullRequestNumber: number,
  context: Context
): Promise<string[] | null> => {
  const { env, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  const releaseToken = getReleaseToken(env);
  const { repositoryUrl } = config;
  const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
  const uri = `${repositoryEntryPoint}/pulls/${pullRequestNumber}`;
  const { status, stdout, stderr } = await runCommand("curl", [
    "-L",
    "-H",
    "Accept: application/vnd.github+json",
    "-H",
    `Authorization: Bearer ${releaseToken}`,
    "-H",
    "X-GitHub-Api-Version: 2022-11-28",
    uri
  ]);
  if (debug) {
    logger.setDebugScope("github:get-pull-request-body");
    logger.logDebug(`Requested URI: ${uri}`);
  }
  if (status) {
    process.exitCode = status;
    logger.logError(`Failed to get pull request #${pullRequestNumber}.`);
    throw new Error(stderr);
  }
  const { body }: PullRequestBody = JSON.parse(stdout);
  return typeof body === "string" ? body.split("\n".repeat(2)) : null;
};
