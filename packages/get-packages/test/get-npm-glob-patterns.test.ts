import { assert, it } from "vitest";

import { getNpmGlobPatterns } from "../src/index.js";
import { packageManifestFiles } from "./fixtures/package-manifest-files.js";

it.each(packageManifestFiles)("should get the including patterns from `package.json`", ({
  content,
  patterns
}) => {
  assert.deepEqual(getNpmGlobPatterns(content), patterns);
});
