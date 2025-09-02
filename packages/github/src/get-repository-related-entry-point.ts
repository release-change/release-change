import { parsePathname } from "@release-change/shared";

/**
 * Gets the repository-related entry point for REST API calls.
 * @param repositoryUrl - The repository URL.
 * @return The entry point to use to call the REST API.
 */
export const getRepositoryRelatedEntryPoint = (repositoryUrl: string): string => {
  const { pathname } = new URL(repositoryUrl);
  const pathnameGroups = parsePathname(pathname);
  if (!pathnameGroups) {
    process.exitCode = 1;
    throw new Error("Malformed repository URL: no owner or repository found.");
  }
  const { owner, repository } = pathnameGroups;
  return `https://api.github.com/repos/${owner}/${repository}`;
};
