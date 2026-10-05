import type { PackagePublishing } from "../../src/index.js";

const npmArgs = ["publish", "--access", "public"];
const npmArgsWithTag = ["publish", "--access", "public", "--tag", "alpha"];
const pnpmArgs = ["publish", "--access", "public", "--no-git-checks"];
const pnpmArgsWithTag = ["publish", "--access", "public", "--tag", "alpha", "--no-git-checks"];
const yarnArgs = ["npm", "publish", "--access", "public"];
const yarnArgsWithTag = ["npm", "publish", "--access", "public", "--tag", "alpha"];
export const mockedPackagePublishingSet: PackagePublishing[] = [
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0",
    packageManager: "npm",
    args: npmArgs
  },
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0",
    packageManager: "pnpm",
    args: pnpmArgs
  },
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0",
    packageManager: "yarn",
    args: yarnArgs
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0",
    packageManager: "pnpm",
    args: pnpmArgs
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0",
    packageManager: "yarn",
    args: yarnArgs
  },
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0-alpha.1",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0-alpha.1",
    packageManager: "pnpm",
    args: pnpmArgsWithTag
  },
  {
    name: "",
    packageManifestName: "foo",
    pathname: ".",
    version: "1.0.0-alpha.1",
    packageManager: "yarn",
    args: yarnArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0-alpha.1",
    packageManager: "npm",
    args: npmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0-alpha.1",
    packageManager: "pnpm",
    args: pnpmArgsWithTag
  },
  {
    name: "@monorepo/a",
    packageManifestName: "@monorepo/a",
    pathname: "packages/a",
    version: "1.0.0-alpha.1",
    packageManager: "yarn",
    args: yarnArgsWithTag
  }
];
