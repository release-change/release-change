export type CommandResult = {
  status: number | null;
  stdout: string;
  stderr: string;
};
export type ParsedCliOptions = {
  branches?: string[];
  repositoryUrl?: string;
  remoteName?: string;
  debug?: true;
  dryRun?: true;
  version?: true;
  help?: true;
};
export type CliOptions = Omit<ParsedCliOptions, "help" | "version">;
export type BranchConfig = {
  channel?: string;
  prerelease?: true;
  prereleaseIdentifier?: string;
};
export type DependencyUpdateMethod = "pin" | "workspace" | "caret-range" | "tilde-range" | null;
export type Config = {
  branches: string[];
  releaseType: Record<string, BranchConfig>;
  isMonorepo: boolean;
  dependencyUpdateMethod?: DependencyUpdateMethod;
  debug: boolean;
  dryRun: boolean;
  repositoryUrl: string;
  remoteName: string;
  npmPublish?: false;
};
export type CiConfig = {
  isCi: boolean;
  isPullRequest: boolean;
};
export type Package = {
  name: string;
  pathname: string;
};
export type PackageLastRelease = {
  name: string;
  pathname: string;
  gitTag: string | null;
  version: string;
};
export type PackageNextRelease = {
  name: string;
  pathname: string;
  gitTag: string;
  version: string;
  npmTag?: string;
};
export type LastRelease = {
  ref: string | null;
  packages: PackageLastRelease[];
};
export type NextRelease = PackageNextRelease[];
export type ReleaseType = "major" | "minor" | "patch" | null;
export type Commit = {
  isMergeCommit: boolean;
  sha: string | null;
  message: string;
  body: string[];
  footer: string[];
  releaseType: ReleaseType;
  modifiedFiles?: string[];
};
export type Reference = {
  number: number;
  isPullRequest: boolean;
  gitTags: string[];
};
export type ReleaseInfoGithub = {
  type: "github";
  name: "GitHub release";
  url: string;
};
export type ReleaseInfoNpm = {
  type: "npm";
  name: `NPM ${string} distribution tag)`;
  url: string;
};
export type ReleaseInfo = ReleaseInfoGithub | ReleaseInfoNpm;
type FileExists = {
  fileExists: true;
  authTokenExists: boolean;
};
type FileNotExists = {
  fileExists: false;
  authTokenExists: false;
};
export type AuthToken = FileExists | FileNotExists;
export interface ContextBase {
  cwd: string;
  env: NodeJS.ProcessEnv;
  config: {
    debug: boolean;
  };
  errors: unknown[];
}
export interface Context extends ContextBase {
  config: Config;
  branch: string | undefined;
  ci: CiConfig;
  packages: Package[];
  releaseInfos: ReleaseInfo[];
  lastRelease?: LastRelease;
  nextRelease?: NextRelease;
  commits?: Commit[];
  references?: Reference[];
  authToken?: AuthToken;
}
export type PathnameGroups = {
  owner: string;
  repository: string;
};
