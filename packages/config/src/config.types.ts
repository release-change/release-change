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
