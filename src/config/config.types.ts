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
