import type { Package } from "@release-change/config";
import type { GlobPatterns } from "./get-packages.types.js";

/**
 * Gets glob patterns from the root `package.json` file.
 * @param content - The content of root `package.json` as JSON.
 * @return An object containing arrays of unique including and excluding glob patterns if there is a `workspaces` property, `null` otherwise.
 */
export const getNpmGlobPatterns = (content: Package): GlobPatterns | null => {
  const patterns: GlobPatterns = {
    include: [],
    exclude: ["**/node_modules/**"]
  };
  const { workspaces } = content;
  if (workspaces) {
    patterns.include.push(...new Set([...workspaces]));
    return patterns;
  }
  return null;
};
