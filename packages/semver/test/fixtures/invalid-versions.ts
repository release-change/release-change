export const invalidVersions = [
  { raw: null, error: "Invalid version: the version must be a non-empty string." },
  { raw: undefined, error: "Invalid version: the version must be a non-empty string." },
  { raw: "", error: "Invalid version: the version must be a non-empty string." },
  { raw: "1.2", error: "Invalid version `1.2`." },
  { raw: "1.2", error: "Invalid version `1.2`.", options: { loose: true } },
  { raw: "1.2.3.4", error: "Invalid version `1.2.3.4`." },
  { raw: "1.2.3.4", error: "Invalid version `1.2.3.4`.", options: { loose: true } },
  { raw: "Infinity.NaN.Infinity", error: "Invalid version `Infinity.NaN.Infinity`." },
  {
    raw: "Infinity.NaN.Infinity",
    error: "Invalid version `Infinity.NaN.Infinity`.",
    options: { loose: true }
  },
  { raw: `${Number.MAX_SAFE_INTEGER}0.0.0`, error: "Invalid major version." },
  { raw: `0.${Number.MAX_SAFE_INTEGER}0.0`, error: "Invalid minor version." },
  { raw: `0.0.${Number.MAX_SAFE_INTEGER}0`, error: "Invalid patch version." },
  { raw: "hello, world", error: "Invalid version `hello, world`." },
  {
    raw: "hello, world",
    error: "Invalid version `hello, world`.",
    options: { loose: true }
  },
  { raw: "xyz", error: "Invalid version `xyz`." },
  { raw: "xyz", error: "Invalid version `xyz`.", options: { loose: true } }
];
