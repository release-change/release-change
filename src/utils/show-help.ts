import { AVAILABLE_OPTIONS, TAB } from "./constants.js";

/**
 * Display the options when running the CLI with the `--help` or `-h` options.
 * @return The options, with their alias (if available), flag, description and type.
 */
const displayOptions = (): string => {
  const availableOptionsValues = Object.values(AVAILABLE_OPTIONS);
  const aliasMaxLength = Math.max(
    ...availableOptionsValues.map(option =>
      "alias" in option && option.alias ? option.alias.length : 0
    )
  );
  const flagMaxLength = Math.max(...availableOptionsValues.map(option => option.flag.length));
  const descriptionMaxLength = Math.max(
    ...availableOptionsValues.map(option => option.description.length)
  );
  const typeMaxLength = Math.max(...availableOptionsValues.map(option => option.type.length)) + 2;
  const header = "Options";
  const options: string[] = [];
  for (const option of availableOptionsValues) {
    const alias = "alias" in option ? `${option.alias}, ` : " ".repeat(aliasMaxLength + 2);
    const optionName = `${TAB}${alias}${option.flag.padEnd(flagMaxLength, " ")}`;
    const description = `${option.description.padEnd(descriptionMaxLength, " ")}`;
    const type = `[${option.type}]`.padStart(typeMaxLength, " ");
    const optionElements = [optionName, description, type];
    options.push(optionElements.join(TAB));
  }
  return `${header}\n${options.join("\n")}`;
};

/**
 * Shows the help for the `release-change` command.
 */
const showHelp = (): void => {
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}release-change [options]`;
  const options = displayOptions();
  const output = [intro, usage, options].join("\n".repeat(2));
  console.log(output);
};

export default showHelp;
