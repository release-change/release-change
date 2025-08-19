export const validRangesInLooseMode = [
  { raw: ">01.02.03", expected: { range: ">1.2.3" }, includePrerelease: false },
  { raw: "~1.2.3beta", expected: { range: ">=1.2.3-beta <1.3.0-0" }, includePrerelease: false },
  { raw: "~1.2.3beta", expected: { range: ">=1.2.3-beta <1.3.0-0" }, includePrerelease: true },
  { raw: ">=09090", expected: { range: ">=9090.0.0" }, includePrerelease: false }
];
