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
};
export type CiConfig = {
  isCi: boolean;
  isPullRequest: boolean;
};
export type Package = {
  name: string;
  path: string;
};
export type PackageLastRelease = {
  name: string;
  path: string;
  gitTag: string | null;
  version: string;
};
export type PackageNextRelease = {
  name: string;
  path: string;
  gitTag: string;
  version: string;
};
export type LastRelease = {
  ref: string | null;
  packages: PackageLastRelease[];
};
export type NextRelease = PackageNextRelease[];
export type Commit = {
  isMergeCommit: boolean;
  sha: string | null;
  message: string;
  body: string[];
  footer: string[];
  modifiedFiles?: string[];
};
export type Reference = {
  number: number;
  isPullRequest: boolean;
};
export type ReleaseInfoGithub = {
  type: "github";
  name: "GitHub release";
  url: string;
};
type ReleaseInfo = ReleaseInfoGithub;
export interface ContextBase {
  cwd: string;
  env: NodeJS.ProcessEnv;
  config: {
    debug: boolean;
  };
}
export interface Context extends ContextBase {
  config: Config;
  branch: string | undefined;
  ci: CiConfig;
  packages: Package[];
  lastRelease?: LastRelease;
  nextRelease?: NextRelease;
  commits?: Commit[];
  references?: Reference[];
  releaseInfos?: ReleaseInfo[];
}
export type PathnameGroups = {
  owner: string;
  repository: string;
};
