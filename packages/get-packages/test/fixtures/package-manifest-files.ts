import type { Package } from "@release-change/config";

export const packageManifestFiles: {
  content: Package;
  patterns: { include: string[]; exclude: string[] } | null;
}[] = [
  {
    content: {},
    patterns: null
  },
  {
    content: { workspaces: ["packages/*"] },
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] }
  },
  {
    content: { workspaces: ["my-app", "packages/*", "components/**"] },
    patterns: {
      include: ["my-app", "packages/*", "components/**"],
      exclude: ["**/node_modules/**"]
    }
  }
];
