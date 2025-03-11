import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { setLogger } from "../logger/index.js";
import { runCommand } from "./run-command.js";

export const getCommitsSinceRef = (context: Context): string[] => {
  const { config, lastRelease } = context;
  const logger = context.logger ?? setLogger();
  try {
    const gitTag = lastRelease?.gitTag ?? null;
    const args = lastRelease ? (gitTag ? ["log", `${gitTag}..HEAD`] : ["log"]) : ["log"];
    const infoMessage = `Retrieving ${args.length > 1 ? `commits since ${gitTag}` : "all commits"}.`;
    logger.logInfo(infoMessage);
    const gitCommandResult = runCommand(args, { encoding: "utf8" });
    const { status, stdout, stderr } = gitCommandResult;
    if (status || stderr) {
      throw new Error(stderr);
    }
    const commits = stdout ? stdout.split(/\n{2}(?=commit)/) : [];
    const totalCommits = commits.length;
    const pluralRule = new Intl.PluralRules("en-US", { type: "cardinal" });
    const commitWord = pluralRule.select(totalCommits) === "one" ? "commit" : "commits";
    if (config?.debug) {
      logger.logDebug(`Command run: git ${args.join(" ")}`, "git/get-commits-since-ref");
      logger.logDebug(
        inspect(commits, { depth: Number.POSITIVE_INFINITY }),
        "git/get-commits-since-ref"
      );
    }
    logger.logInfo(`Found ${totalCommits} ${commitWord}.`);
    return commits;
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exitCode = 1;
    throw error;
  }
};
