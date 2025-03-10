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
    }
  >;
  debug: boolean;
  dryRun: boolean;
  repositoryUrl: string;
  remoteName: string;
};
