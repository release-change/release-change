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
export type PullRequestReference = {
  pullRequestNumber: number;
  pullRequestId: string;
  commits: string[];
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
export type MergeMethod = "MERGE" | "REBASE" | "SQUASH";
export type EnableAutoMergeQuery = {
  data?: {
    enablePullRequestAutoMerge: {
      pullRequest: {
        number: number;
        autoMergeRequest: {
          mergeMethod: MergeMethod;
        };
      };
    };
  };
  errors?: GraphQLErrors;
};
