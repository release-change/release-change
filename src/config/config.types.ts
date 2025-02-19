export type Package = {
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
  repositoryUrl: string;
  releaseType: Record<
    string,
    {
      channel?: string;
      prerelease?: true;
    }
  >;
  debug: boolean;
  dryRun: boolean;
};
