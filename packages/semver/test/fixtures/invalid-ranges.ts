export const invalidRanges = [
  { raw: ">01.02.03", error: "Invalid comparator `>01.02.03`." },
  { raw: "~1.2.3beta", error: "Invalid range `~1.2.3beta`." },
  { raw: ">=09090-0", error: "Invalid comparator `>=09090-0`." },
  {
    raw: ">=09090-0",
    error: "Invalid comparator `>=09090-0`.",
    options: { includePrerelease: true }
  },
  {
    raw: ">=09090-0",
    error: "Invalid comparator `>=09090-0`.",
    options: { loose: true, includePrerelease: true }
  },
  {
    raw: `^${Number.MAX_SAFE_INTEGER}.0.0`,
    error: "Invalid major version."
  }
];
