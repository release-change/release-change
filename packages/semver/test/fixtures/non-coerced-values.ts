export const nonCoercedValues = [
  "",
  ".",
  "version one",
  "9".repeat(16),
  "1".repeat(17),
  `a${"9".repeat(16)}`,
  `a${"1".repeat(17)}`,
  `${"9".repeat(16)}a`,
  `${"1".repeat(17)}a`
];
