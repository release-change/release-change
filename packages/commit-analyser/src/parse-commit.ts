import type { Context } from "@release-change/shared";
import type { Commit } from "./commit-analyser.types.js";

import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";

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
 * @return The commit as an object, with the description and the footer.
 */
export const parseCommit = (commit: string, context: Context): Commit => {
  const { config } = context;
  const logger = setLogger(config.debug);
  const parsedCommit: Commit = {
    description: "",
    footer: []
  };
  const commitSections = commit
    .replaceAll(INDENTED_BLANK_LINE_SEPARATOR, BLANK_LINE_SEPARATOR)
    .split(BLANK_LINE_SEPARATOR);
  const [_, ...commitRest] = commitSections;
  const [commitDescription, ...commitOptionalSections] = commitRest
    .map(line => line.trim())
    .filter(Boolean);
  if (commitDescription) {
    parsedCommit.description = commitDescription;
    const commitFooter = commitOptionalSections.filter(line =>
      Boolean(line.match(COMMIT_FOOTER_KEY) || line.match(BREAKING_CHANGE))
    );
    parsedCommit.footer = commitFooter.flatMap(line => line.split("\n").map(line => line.trim()));
    if (config.debug) {
      logger.setDebugScope("commit-analyser:parse-commit");
      logger.logDebug(inspect(parsedCommit, { depth: Number.POSITIVE_INFINITY }));
    }
    return parsedCommit;
  }
  throw new Error("Failed to parse commit: no description found.");
};
