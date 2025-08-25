import type { GlobPatterns } from "./get-packages.types.js";

/**
 * Gets glob patterns from the root `pnpm-workspace.yaml` file.
 * @param content - The content of root `pnpm-workspace.yaml`.
 * @return An object containing arrays of including and excluding glob patterns if there is a `packages` field.
 */
export const getPnpmGlobPatterns = (content: string): GlobPatterns => {
  const patterns: GlobPatterns = {
    include: [],
    exclude: ["**/node_modules/**"]
  };
  const contentWithoutComments = content.replace(/^\s*#.+$/gm, "");
  const matches = contentWithoutComments.matchAll(/^\s*-\s*'(?<pattern>[^']+)'/gm);
  for (const match of matches) {
    if (match?.groups) {
      const { pattern } = match.groups;
      if (pattern) {
        if (pattern.startsWith("!")) patterns.exclude.push(pattern.replace(/^!/, ""));
        else patterns.include.push(pattern);
      }
    }
  }
  if (patterns.include.length) return patterns;
  throw new Error(
    "Failed to get the glob patterns: the root `pnpm-workspace.yaml` file must have a `packages` field."
  );
};
