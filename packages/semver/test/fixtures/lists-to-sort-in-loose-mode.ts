export const listsToSortInLooseMode = [
  {
    list: ["v1.2.3+1", "v=1.2.3+0", "v1.2.3", "=5.9.6", "v0.1.2"],
    expectedAscending: ["v0.1.2", "v1.2.3", "v=1.2.3+0", "v1.2.3+1", "=5.9.6"],
    expectedDescending: ["=5.9.6", "v1.2.3+1", "v=1.2.3+0", "v1.2.3", "v0.1.2"]
  }
];
