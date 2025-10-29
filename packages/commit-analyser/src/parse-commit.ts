import type { Commit, Context } from "@release-change/shared";

import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

import { setReleaseType } from "./set-release-type.js";

import {
  BLANK_LINE_SEPARATOR,
  BREAKING_CHANGE,
  COMMIT_FOOTER_KEY,
  INDENTED_BLANK_LINE_SEPARATOR
} from "./constants.js";

/**
 * Parses a commit.
 * @param commit - The commit to parse.
 * @param context - The context where the CLI is running.
 * @return The commit as an object, with the message, the footer and the modified files (if in a monorepo context).
 */
export const parseCommit = (commit: string, context: Context): Commit => {
  const { config } = context;
  const { debug, isMonorepo } = config;
  const logger = setLogger(debug);
  const parsedCommit: Commit = {
    isMergeCommit: false,
    sha: null,
    message: "",
    body: [],
    footer: [],
    releaseType: null
  };
  const commitSections = commit
    .replaceAll(INDENTED_BLANK_LINE_SEPARATOR, BLANK_LINE_SEPARATOR)
    .split(BLANK_LINE_SEPARATOR);
  const [commitHeader, ...commitRest] = commitSections;
  if (commitHeader) {
    parsedCommit.isMergeCommit = commitHeader.split("\n").some(line => line.startsWith("Merge"));
    const [commitSha] = commitHeader.split("\n");
    if (commitSha) parsedCommit.sha = commitSha.replace(/^commit\s([0-9a-f]+).*$/, "$1");
    const [commitMessage, ...commitOptionalSections] = commitRest
      .map(line => line.trim())
      .filter(Boolean);
    if (commitMessage) {
      parsedCommit.message = commitMessage;
      const commitOptionalSectionsWithoutFileNames = isMonorepo
        ? commitOptionalSections.slice(0, -1)
        : commitOptionalSections;
      const commitBody = commitOptionalSectionsWithoutFileNames.filter(
        line => !line.match(COMMIT_FOOTER_KEY) && !line.match(BREAKING_CHANGE)
      );
      const commitFooter = commitOptionalSectionsWithoutFileNames.filter(line =>
        Boolean(line.match(COMMIT_FOOTER_KEY) || line.match(BREAKING_CHANGE))
      );
      parsedCommit.body = commitBody.map(line => line.trim());
      parsedCommit.footer = commitFooter.flatMap(line => line.split("\n").map(line => line.trim()));
      parsedCommit.releaseType = setReleaseType(parsedCommit.message, parsedCommit.footer, context);
      if (isMonorepo) {
        const commitModifiedFiles = commitOptionalSections
          .slice(-1)
          .filter(line => !line.match(COMMIT_FOOTER_KEY) && !line.match(BREAKING_CHANGE))
          .flatMap(line =>
            line
              .split("\n")
              .map(line => line.trim())
              .filter(file => file.match(/^[0-9a-zA-Z-_./]+$/))
          );
        if (commitModifiedFiles.length) parsedCommit.modifiedFiles = commitModifiedFiles;
        else if (!commitHeader?.match(/^merge:/im)) {
          throw formatDetailedError({
            title: "Failed to parse commit",
            message: "No modified files found while this repository is a monorepo.",
            details: {
              output: "commitModifiedFiles.length: 0"
            }
          });
        }
      }
      if (debug) {
        logger.setDebugScope("commit-analyser:parse-commit");
        logger.logDebug(inspect(parsedCommit, { depth: Number.POSITIVE_INFINITY }));
      }
      return parsedCommit;
    }
    throw formatDetailedError({
      title: "Failed to parse commit",
      message: "No message found.",
      details: {
        output: "commitMessage: undefined"
      }
    });
  }
  throw formatDetailedError({
    title: "Failed to parse commit",
    message: "No header found.",
    details: {
      output: "commitHeader: undefined"
    }
  });
};
