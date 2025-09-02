import type { PathnameGroups } from "./shared.types.js";

/**
 * Parses the path name.
 * @param pathname - The path name to parse.
 * @return An object with `owner` and `repository` properties if the repository owner and the repository name are parsed successfully, `null` otherwise.
 */
export const parsePathname = (pathname: string): PathnameGroups | null => {
  const groupsMatch = /^\/(?<owner>[^/]+)\/(?<repository>.+)\.git$/.exec(pathname);
  if (groupsMatch) {
    const { groups } = groupsMatch;
    if (groups) {
      const { owner, repository } = groups;
      if (owner && repository) {
        return {
          owner,
          repository
        };
      }
      return null;
    }
    return null;
  }
  return null;
};
