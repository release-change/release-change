import type { PackageManager } from "@release-change/get-packages";

export const packageManagers: {
  packageManager: NonNullable<PackageManager>;
  args: string[];
  noGitChecks?: string;
}[] = [
  { packageManager: "npm", args: ["publish", "--access", "public"] },
  {
    packageManager: "pnpm",
    args: ["publish", "--access", "public"],
    noGitChecks: "--no-git-checks"
  }
];
