import type { PackageManifest } from "@release-change/config";

export const packageManifestFiles: {
  content: PackageManifest;
  patterns: { include: string[]; exclude: string[] } | null;
}[] = [
  {
    content: { name: "my-package", version: "1.0.0" },
    patterns: null
  },
  {
    content: { name: "my-monorepo", version: "1.0.0", workspaces: ["packages/*"] },
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] }
  },
  {
    content: {
      name: "my-monorepo",
      version: "1.0.0",
      workspaces: ["my-app", "packages/*", "components/**"]
    },
    patterns: {
      include: ["my-app", "packages/*", "components/**"],
      exclude: ["**/node_modules/**"]
    }
  }
];
