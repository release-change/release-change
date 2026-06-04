import type { Reference } from "@release-change/shared";

export type GitHubResponseError = {
  message: string;
  documentation_url?: string;
};
export type PullRequestAssociatedWithCommit = {
  number: number;
  title: string;
  body: string | null;
};
export type AssociatedPullRequest = {
  title: string;
  body: string | null;
  reference: Reference;
};
type GraphQLErrors = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
}[];
export type RepositoryMergeOptions = {
  autoMergeAllowed: boolean;
  mergeCommitAllowed: boolean;
  rebaseMergeAllowed: boolean;
  squashMergeAllowed: boolean;
};
export type RepositoryMergeInfoQuery = {
  data?: {
    repository: RepositoryMergeOptions;
  };
  errors?: GraphQLErrors;
};
