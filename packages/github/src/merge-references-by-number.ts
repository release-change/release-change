import type { Reference } from "@release-change/shared";

/**
 * Merges references sharing the same number together.
 *
 * For each merged reference, the `gitTags` property is transformed into an array of unique Git tag values.
 * @param references - The references to merge.
 * @return An array of merged references.
 */
export const mergeReferencesByNumber = (references: Reference[]): Reference[] => {
  const map = new Map();
  for (const reference of references) {
    const { number, isPullRequest, gitTags } = reference;
    const existing = map.get(number);
    if (existing) {
      for (const gitTag of gitTags) {
        existing.gitTagsSet.add(gitTag);
      }
    } else {
      map.set(number, {
        number,
        isPullRequest,
        gitTagsSet: new Set(reference.gitTags)
      });
    }
  }
  return Array.from(map.values(), obj => ({
    number: obj.number,
    isPullRequest: obj.isPullRequest,
    gitTags: Array.from(obj.gitTagsSet)
  }));
};
