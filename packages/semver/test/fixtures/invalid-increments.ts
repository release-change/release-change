import type { SemverIdentifierBase, SemverReleaseType } from "../../src/semver.types.js";

export const invalidIncrements: {
  version: string;
  releaseType: SemverReleaseType;
  prefix?: string;
  identifierBase?: SemverIdentifierBase;
  errorMessage: string;
}[] = [
  { version: "fake", releaseType: "major", errorMessage: "Invalid version `fake`." },
  {
    version: "fake",
    releaseType: "major",
    prefix: "dev",
    errorMessage: "Invalid version `fake`"
  },
  {
    version: "1.2.3",
    releaseType: "release",
    errorMessage: "There are no prerelease components to remove."
  },
  {
    version: "1.2.3-dev",
    releaseType: "prerelease",
    prefix: "dev",
    identifierBase: false,
    errorMessage: "Invalid increment argument: the prefix `dev` already exists."
  },
  {
    version: "1.2.0",
    releaseType: "prerelease",
    prefix: "",
    identifierBase: false,
    errorMessage: "Invalid increment argument: the prefix is empty."
  },
  {
    version: "1.2.0",
    releaseType: "prerelease",
    prefix: "invalid/prerelease-id",
    errorMessage: "Invalid increment argument: the prefix `invalid/prerelease-id` is invalid."
  },
  {
    version: "1.2.0",
    releaseType: "prerelease",
    prefix: "invalid+build",
    errorMessage: "Invalid increment argument: the prefix `invalid+build` is invalid."
  },
  {
    version: "1.2.0beta",
    releaseType: "prerelease",
    prefix: "invalid/prerelease-id",
    errorMessage: "Invalid version `1.2.0beta`."
  }
];
