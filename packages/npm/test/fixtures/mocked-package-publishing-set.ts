import type { PackagePublishing } from "../../src/index.js";

const npmArgs = ["publish", "--dry-run", "--access", "public"];
const npmArgsWithTag = ["publish", "--dry-run", "--access", "public", "--tag", "alpha"];
const pnpmArgs = ["publish", "--dry-run", "--access", "public", "--no-git-checks"];
const pnpmArgsWithTag = [
  "publish",
  "--dry-run",
  "--access",
  "public",
  "--tag",
  "alpha",
  "--no-git-checks"
];
export const mockedPackagePublishingSet: PackagePublishing[] = [
  {
    name: "",
    packageManifestName: "foo",
    version: "1.0.0",
    packageManager: "npm",
    args: npmArgs
  },
  {
    name: "",
    packageManifestName: "foo",
    version: "1.0.0",
    packageManager: "pnpm",
    args: pnpmArgs
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    version: "1.0.0",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    version: "1.0.0",
    packageManager: "pnpm",
    args: pnpmArgs
  },
  {
    name: "",
    packageManifestName: "foo",
    version: "1.0.0-alpha.1",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "",
    packageManifestName: "foo",
    version: "1.0.0-alpha.1",
    packageManager: "pnpm",
    args: pnpmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    version: "1.0.0-alpha.1",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    version: "1.0.0-alpha.1",
    packageManager: "pnpm",
    args: pnpmArgsWithTag
  }
];
