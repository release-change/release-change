/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */
import type { Context, Reference } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";
import { linkifyReleaseInfo } from "./linkify-release-info.js";

/**
 * Posts a success comment on the issue or the pull request to notify the release success.
 * @param reference - The reference of the issue or pull request.
 * @param context - The context where the CLI is running.
 */
export const postSuccessComment = async (reference: Reference, context: Context): Promise<void> => {
  const {
    env,
    config: { debug, isMonorepo, repositoryUrl },
    nextRelease,
    releaseInfos
  } = context;
  const logger = setLogger(debug);
  logger.setScope("github");
  if (nextRelease) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    const { number, isPullRequest, gitTags } = reference;
    const uri = `${repositoryEntryPoint}/issues/${number}/comments`;
    const versions: string[] = [];
    const releaseInfosAvailabilities: string[] = [];
    for (const gitTag of gitTags) {
      const packageName = nextRelease.find(release => release.gitTag === gitTag)?.name;
      const version = nextRelease.find(release => release.gitTag === gitTag)?.version;
      if (typeof packageName === "undefined" || typeof version === "undefined") continue;
      const npmVersion = `/v/${version}`;
      const versionReleaseInfos = releaseInfos.filter(
        releaseInfo =>
          releaseInfo.url.endsWith(`/tag/${gitTag}`) ||
          releaseInfo.url.endsWith(isMonorepo ? `/${packageName}${npmVersion}` : npmVersion)
      );
      const totalReleaseInfos = versionReleaseInfos.length;
      const [firstReleaseInfo] = versionReleaseInfos;
      const releaseInfosAvailability = `\n\nThe release is available on${
        totalReleaseInfos === 1
          ? firstReleaseInfo
            ? ` ${linkifyReleaseInfo(firstReleaseInfo)}`
            : ""
          : `:\n${new Intl.ListFormat("en-GB", { type: "unit" })
              .format(
                versionReleaseInfos.map(
                  versionReleaseInfo => `- ${linkifyReleaseInfo(versionReleaseInfo)}`
                )
              )
              .replaceAll(" - ", "\n- ")}`
      }.`;
      if (isMonorepo) {
        versions.push(`${version} of ${packageName || "root"} package`);
        if (totalReleaseInfos)
          releaseInfosAvailabilities.push(
            `\n\n##### ${packageName ? `${packageName}@` : ""}${version}${releaseInfosAvailability}`
          );
      } else {
        versions.push(version);
        if (totalReleaseInfos) releaseInfosAvailabilities.push(releaseInfosAvailability);
      }
    }
    const totalVersions = versions.length;
    const [firstVersion] = versions;
    const versionEnumeration =
      totalVersions > 1
        ? `in versions ${new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" }).format(versions)}`
        : `in version ${firstVersion}`;
    const commentSummary = totalVersions
      ? `This ${isPullRequest ? "pull request is included" : "issue has been resolved"} ${versionEnumeration}.`
      : "";
    const commentBody = `#### The release succeeded\n\n${commentSummary}${releaseInfosAvailabilities.join("")}`;
    const requestBody = {
      body: commentBody
    };
    // TODO: uncomment to use GiHub API
    // const successCommentResponse = await fetch(uri, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${issuePullRequestToken}`,
    //     "Content-Type": "application/json",
    //     "X-GitHub-Api-Version": "2022-11-28"
    //   },
    //   body: JSON.stringify(requestBody)
    // });
    // const { headers, status, statusText } = successCommentResponse;
    // const issueType = isPullRequest ? "pull request" : "issue";
    // const successCommentResponseData = successCommentResponse.json();
    if (debug) {
      logger.setDebugScope("github:post-success-comment");
      logger.logDebug(`API entry point: ${uri}`);
      logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(`Response status: ${status}`);
      // logger.logDebug(`Response status text: ${statusText}`);
      // logger.logDebug(`Response headers: ${inspect(headers, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(
      //   `Response JSON: ${inspect(await successCommentResponseData, { depth: Number.POSITIVE_INFINITY })}`
      // );
    }
    // TODO: uncomment when the API is used
    // if (status === 201) logger.logSuccess(`Added success comment on ${issueType} #${number}.`);
    // else if (status === 404)
    //   logger.logWarn(
    //     `The resource requested for ${issueType} #${number} has not been found; therefore, the success comment has not been added.`
    //   );
    // else {
    //   const responseError: GitHubResponseError = await successCommentResponseData;
    //   const { message, documentation_url: documentationUrl } = responseError;
    //   const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    //   logger.logError(`Failed to post the success comment on ${issueType} #${number}.`);
    //   process.exitCode = status;
    //   throw formatDetailedError({
    //     title: "Failed to post the success comment",
    //     message: `${message}${documentationReference}`,
    //     details: {
    //       output: `status: ${status}`
    //     }
    //   });
    // }
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to post the success comment",
      message: "The next release is not defined.",
      details: {
        output: "nextRelease: undefined"
      }
    });
  }
};
