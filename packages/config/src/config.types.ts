export type PackageManifest = {
  version?: string;
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
  workspaces?: string[];
};
