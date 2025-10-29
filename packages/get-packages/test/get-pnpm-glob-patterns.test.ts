import { assert, expect, it } from "vitest";

import { getPnpmGlobPatterns } from "../src/index.js";
import { pnpmWorkspaceManifestFiles } from "./fixtures/pnpm-workspace-manifest-files.js";

it("should throw an error when no `packages` field is found in `pnpm-workspace.yaml`", () => {
  const mockedContent = `catalog:
  chalk: ^4.1.2`;
  expect(() => getPnpmGlobPatterns(mockedContent)).toThrowError(
    expect.objectContaining({
      message:
        "Failed to get the glob patterns: The root `pnpm-workspace.yaml` file must have a `packages` field.",
      cause: {
        title: "Failed to get the glob patterns",
        message: "The root `pnpm-workspace.yaml` file must have a `packages` field.",
        details: {
          output: "patterns.include.length: 0"
        }
      }
    })
  );
});
it.each(pnpmWorkspaceManifestFiles)(
  "should get the including and excluding patterns from `pnpm-workspace.yaml`",
  ({ content, patterns }) => {
    assert.deepEqual(getPnpmGlobPatterns(content), patterns);
  }
);
