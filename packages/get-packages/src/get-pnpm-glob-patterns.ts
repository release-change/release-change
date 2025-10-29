import type { GlobPatterns } from "./get-packages.types.js";

import { formatDetailedError } from "@release-change/shared";

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
  const matches = content
    .replace(/^\s*#.+$/gm, "")
    .matchAll(/^\s*-\s*(?<quote>['"])(?<pattern>[^']+)\k<quote>/gm);
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
  throw formatDetailedError({
    title: "Failed to get the glob patterns",
    message: "The root `pnpm-workspace.yaml` file must have a `packages` field.",
    details: {
      output: "patterns.include.length: 0"
    }
  });
};
