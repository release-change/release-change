export type Package = {
  version?: string;
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
};
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
