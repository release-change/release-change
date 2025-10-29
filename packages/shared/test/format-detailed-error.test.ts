import { assert, it } from "vitest";

import { formatDetailedError } from "../src/index.js";

it("should return an `Error` object with a `cause` property filled without command", () => {
  assert.deepEqual(
    formatDetailedError({
      title: "Error title",
      message: "Error message",
      details: { output: "Output error" }
    }),
    new Error("Error title: Error message", {
      cause: {
        title: "Error title",
        message: "Error message",
        details: {
          output: "Output error"
        }
      }
    })
  );
});
it("should return an `Error` object with a `cause` property filled with command", () => {
  assert.deepEqual(
    formatDetailedError({
      title: "Error title",
      message: "Error message",
      details: { output: "Output error", command: "git --version" }
    }),
    new Error("Error title: Error message", {
      cause: {
        title: "Error title",
        message: "Error message",
        details: {
          output: "Output error",
          command: "git --version"
        }
      }
    })
  );
});
