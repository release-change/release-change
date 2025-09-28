import { expect, it } from "vitest";

import { formatListItem } from "../src/format-list-item.js";

const mockedItems = [
  {
    item: "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
    listItem:
      "- **node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
  },
  {
    item: "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
    listItem:
      "- **release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
  },
  {
    item: "**release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))",
    listItem:
      "- **release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))"
  },
  { item: "@monorepo/c@1.0.0", listItem: "- @monorepo/c@1.0.0" }
];

it.each(mockedItems)("should format as a list item in Markdown", ({ item, listItem }) => {
  expect(formatListItem(item)).toBe(listItem);
});
