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
export type Config = {
  branches: string[];
  releaseType: Record<
    string,
    {
      channel?: string;
      prerelease?: true;
      prereleaseIdentifier?: string;
    }
  >;
  debug: boolean;
  dryRun: boolean;
  repositoryUrl: string;
  remoteName: string;
};
