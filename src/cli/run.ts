import type { CliOptions } from "./cli.types.js";

import packageManager from "../../package.json" with { type: "json" };

const run = (_cliOptions: CliOptions): void => {
  const { name: packageName, version: packageVersion } = packageManager;
  console.log(`Running ${packageName} version ${packageVersion}`);
};

export default run;
