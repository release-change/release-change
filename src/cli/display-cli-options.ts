import { AVAILABLE_CLI_OPTIONS, TAB } from "./constants.js";

/**
 * Displays the CLI options when running the CLI with the `--help` or `-h` options.
 * @return The CLI options, with their alias (if available), flag, description and type.
 */
export const displayCliOptions = (): string => {
  const availableCliOptionsValues = Object.values(AVAILABLE_CLI_OPTIONS);
  const aliasMaxLength = Math.max(
    ...availableCliOptionsValues.map(cliOption =>
      "alias" in cliOption && cliOption.alias ? cliOption.alias.length : 0
    )
  );
  const flagMaxLength = Math.max(...availableCliOptionsValues.map(option => option.flag.length));
  const descriptionMaxLength = Math.max(
    ...availableCliOptionsValues.map(cliOption => cliOption.description.length)
  );
  const typeMaxLength =
    Math.max(...availableCliOptionsValues.map(option => option.type.length)) + 2;
  const header = "Options";
  const cliOptions: string[] = [];
  for (const cliOption of availableCliOptionsValues) {
    const alias = "alias" in cliOption ? `${cliOption.alias}, ` : " ".repeat(aliasMaxLength + 2);
    const cliOptionName = `${TAB}${alias}${cliOption.flag.padEnd(flagMaxLength, " ")}`;
    const description = `${cliOption.description.padEnd(descriptionMaxLength, " ")}`;
    const type = `[${cliOption.type}]`.padStart(typeMaxLength, " ");
    const cliOptionElements = [cliOptionName, description, type];
    cliOptions.push(cliOptionElements.join(TAB));
  }
  return `${header}\n${cliOptions.join("\n")}`;
};
