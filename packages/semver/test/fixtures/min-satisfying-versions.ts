export const minSatisfyingVersions = [
  {
    versions: ["1.2.3", "1.2.4"],
    range: "1.2",
    expected: "1.2.3"
  },
  {
    versions: ["1.2.4", "1.2.3"],
    range: "1.2",
    expected: "1.2.3"
  },
  {
    versions: ["1.2.3", "1.2.4", "1.2.5", "1.2.6"],
    range: "~1.2.3",
    expected: "1.2.3"
  }
];
