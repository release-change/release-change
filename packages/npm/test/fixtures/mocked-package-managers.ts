import type { PackageManager } from "@release-change/get-packages";

// TODO: remove `--dry-run` flag when releases are truly published to the NPM registry
export const packageManagers: {
  packageManager: NonNullable<PackageManager>;
  args: string[];
  noGitChecks?: string;
}[] = [
  { packageManager: "npm", args: ["publish", "--dry-run", "--access", "public"] },
  {
    packageManager: "pnpm",
    args: ["publish", "--dry-run", "--access", "public"],
    noGitChecks: "--no-git-checks"
  }
];
