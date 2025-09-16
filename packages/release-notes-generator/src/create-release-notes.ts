/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */
import type { Context, ReleaseInfoGithub } from "@release-change/shared";
import type { ReleaseNotes } from "./release-notes-generator.types.js";

import { inspect } from "node:util";

import { getReleaseToken } from "@release-change/ci";
import { getRepositoryRelatedEntryPoint } from "@release-change/github";
import { setLogger } from "@release-change/logger";

/**
 * Creates release notes on GitHub from the prepared notes.
 * @param releaseNotes - The prepared release notes to use.
 * @param context - The context where the CLI is running.
 */
export const createReleaseNotes = async (
  releaseNotes: ReleaseNotes,
  context: Context
): Promise<void> => {
  const { tagName, target, isPrerelease, body } = releaseNotes;
  const { env, config } = context;
  const { debug, repositoryUrl } = config;
  const logger = setLogger(debug);
  const releaseToken = getReleaseToken(env);
  const uri = `${getRepositoryRelatedEntryPoint(repositoryUrl)}/releases`;
  const requestBody = {
    tag_name: tagName,
    target_commitish: target,
    name: tagName,
    body,
    prerelease: isPrerelease,
    make_latest: !isPrerelease
  };
  // TODO: uncomment to use GitHub API
  // const releaseNotesResponse = await fetch(uri, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/vnd.github+json",
  //     Authorization: `Bearer ${releaseToken}`,
  //     "X-GitHub-Api-Version": "2022-11-28"
  //   },
  //   body: JSON.stringify(requestBody)
  // });
  // const { status, statusText } = releaseNotesResponse;
  if (debug) {
    logger.setDebugScope("release-notes-generator:create-release-notes");
    logger.logDebug(`Release notes: ${inspect(releaseNotes, { depth: Number.POSITIVE_INFINITY })}`);
    logger.logDebug(`API entry point: ${uri}`);
    logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
  }
  // TODO: uncomment when the API is used
  // if (status === 201) {
  //   logger.logSuccess(`Created release notes for Git tag ${tagName}.`);
  //   const releaseInfo: ReleaseInfoGithub = {
  //     type: "github",
  //     name: "GitHub release",
  //     url: `${repositoryUrl.replace(".git", "")}/releases/tag/${tagName}`
  //   };
  //   if (!context.releaseInfos) context.releaseInfos = [];
  //   context.releaseInfos.push(releaseInfo);
  //   if (debug) {
  //     logger.logDebug("context.releaseInfos:");
  //     logger.logDebug(inspect(context.releaseInfos, { depth: Number.POSITIVE_INFINITY }));
  //   }
  // } else {
  //   logger.logError(`Failed to create release notes for Git tag ${tagName}.`);
  //   if (status === 404) {
  //     process.exitCode = 404;
  //     throw new Error(`Failed to fetch URI ${uri}.`);
  //   }
  //   process.exitCode = status;
  //   throw new Error(statusText);
  // }
};
