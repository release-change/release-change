export type CommandResult = {
  status: number | null;
  stdout: string;
  stderr: string;
};
export type ParsedCliOptions = {
  branches?: string[];
  repositoryUrl?: string;
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
export type Config = {
  branches: string[];
  releaseType: Record<string, BranchConfig>;
  debug: boolean;
  dryRun: boolean;
  repositoryUrl: string;
  remoteName: string;
};
export type CiConfig = {
  isCi: boolean;
  isPullRequest: boolean;
};
export type LastRelease = {
  gitTag: string | null;
  version: string;
};
export type NextRelease = {
  gitTag: string;
  version: string;
};
export interface ContextBase {
  cwd: string;
  env: NodeJS.ProcessEnv;
}
export interface Context extends ContextBase {
  config: Config;
  branch: string | undefined;
  ci: CiConfig;
  lastRelease?: LastRelease;
  nextRelease?: NextRelease;
}
