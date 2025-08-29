import { assert, it } from "vitest";

import { getPnpmGlobPatterns } from "../src/index.js";
import { pnpmWorkspaceManifestFiles } from "./fixtures/pnpm-workspace-manifest-files.js";

it("should throw an error when no `packages` field is found in `pnpm-workspace.yaml`", () => {
  const mockedContent = `catalog:
  chalk: ^4.1.2`;
  assert.throws(
    () => getPnpmGlobPatterns(mockedContent),
    "Failed to get the glob patterns: the root `pnpm-workspace.yaml` file must have a `packages` field."
  );
});
it.each(pnpmWorkspaceManifestFiles)(
  "should get the including and excluding patterns from `pnpm-workspace.yaml`",
  ({ content, patterns }) => {
    assert.deepEqual(getPnpmGlobPatterns(content), patterns);
  }
);
