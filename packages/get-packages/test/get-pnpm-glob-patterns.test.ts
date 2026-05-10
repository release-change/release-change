import { assert, expect, it } from "vitest";

import { getPnpmGlobPatterns } from "../src/index.js";
import { pnpmWorkspaceManifestFiles } from "./fixtures/pnpm-workspace-manifest-files.js";

it("should return `null` when no `packages` field is found in `pnpm-workspace.yaml`", () => {
  const mockedContent = `catalog:
  chalk: ^4.1.2`;
  expect(getPnpmGlobPatterns(mockedContent)).toBe(null);
});
it.each(
  pnpmWorkspaceManifestFiles
)("should get the including and excluding patterns from `pnpm-workspace.yaml`", ({
  content,
  patterns
}) => {
  assert.deepEqual(getPnpmGlobPatterns(content), patterns);
});
