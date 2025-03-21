export const agreeInNumber = (occurrences: number, wordForms: [string, string]) => {
  const pluralRule = new Intl.PluralRules("en-GB", { type: "cardinal" });
  const [wordInSingular, wordInPlural] = wordForms;
  return pluralRule.select(occurrences) === "one" ? wordInSingular : wordInPlural;
};
