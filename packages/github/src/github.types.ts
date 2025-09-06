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
export type AssociatedPullRequest = { title: string; body: string | null; reference: Reference };
