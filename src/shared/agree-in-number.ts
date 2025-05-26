/**
 * Returns the singular or plural form of a word depending on the number of occurrences.
 * @param occurrences - The number of occurrences.
 * @param wordForms - The singular and plural forms of the word.
 * @return The singular or plural form of the word.
 */
export const agreeInNumber = (occurrences: number, wordForms: [string, string]) => {
  const pluralRule = new Intl.PluralRules("en-GB", { type: "cardinal" });
  const [wordInSingular, wordInPlural] = wordForms;
  return pluralRule.select(occurrences) === "one" ? wordInSingular : wordInPlural;
};
