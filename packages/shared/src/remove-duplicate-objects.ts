/**
 * Removes duplicate objects from an array.
 * @param array - The array of objects to analyse.
 * @return An array of objects with duplicate ones removed.
 */
export const removeDuplicateObjects = <TObject>(array: TObject[]): TObject[] => {
  return [...new Set(array.map(object => JSON.stringify(object)))].map(string =>
    JSON.parse(string)
  );
};
