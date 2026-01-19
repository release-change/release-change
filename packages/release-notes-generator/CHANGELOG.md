# @release-change/release-notes-generator

## 0.1.4

### Dependencies updates

- @release-change/github@0.1.4

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.3...@release-change/release-notes-generator@v0.1.4`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.3...@release-change/release-notes-generator@v0.1.4)

## 0.1.3

### Dependencies updates

- @release-change/commit-analyser@0.1.3
- @release-change/github@0.1.3

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.2...@release-change/release-notes-generator@v0.1.3`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.2...@release-change/release-notes-generator@v0.1.3)

## 0.1.2

### Dependencies updates

- @release-change/ci@0.1.2
- @release-change/commit-analyser@0.1.2
- @release-change/get-packages@0.1.2
- @release-change/github@0.1.2
- @release-change/logger@0.1.2
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.1...@release-change/release-notes-generator@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.1...@release-change/release-notes-generator@v0.1.2)

## 0.1.1

### Dependencies updates

- @release-change/ci@0.1.1
- @release-change/commit-analyser@0.1.1
- @release-change/get-packages@0.1.1
- @release-change/github@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.0...@release-change/release-notes-generator@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.0...@release-change/release-notes-generator@v0.1.1)

## 0.1.0

### Minor changes

- **release:** enable running commands to release next release ([`74c0a6b`](https://github.com/release-change/release-change/commit/74c0a6baaa98ea7989a2f6111a28c3a76cb20f88))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **github:** log response headers for debugging purposes ([`5fc788e`](https://github.com/release-change/release-change/commit/5fc788e6dc76262180999249ed630b491d5ed3a2))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **release-notes-generator:** prepare changelog file creation and update ([`521d199`](https://github.com/release-change/release-change/commit/521d199de35957f86730af939ddc0be7917fa89a))
- **release-notes-generator:** add formatting for changelog file ([`f5b8fa5`](https://github.com/release-change/release-change/commit/f5b8fa59eb68bd21e435fd81788ae27d366a329c))
- **release-notes-generator:** add functions to format release notes in Markdown from object ([`eae1509`](https://github.com/release-change/release-change/commit/eae1509ee7714268adfcc7308e7722e1336e8b79))
- **release-notes-generator:** include internal dependencies updates in prepared release notes ([`0e09a7f`](https://github.com/release-change/release-change/commit/0e09a7f9a5d3423fa048d704a662405c66aa013c))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **release-notes-generator:** prepare release notes for each package ([`dd75434`](https://github.com/release-change/release-change/commit/dd7543472266c7f6db311ae067b8d179f1fb622b))

### Patch changes

- **release-notes-generator:** set `make_latest` value as a string ([`38cc26f`](https://github.com/release-change/release-change/commit/38cc26f9c70f3a1060176d5839a51c991049b240))
- **github:** fix response header display in logs ([`4c8ec6b`](https://github.com/release-change/release-change/commit/4c8ec6b15c2f0f48eeedea5aa8520baf0aa6f0e1))
- **github:** fix the way JSON is consumed ([`bea7e6a`](https://github.com/release-change/release-change/commit/bea7e6ab5bccd57c88b3fba8a28349ae794cde53))
- **github:** add MIME type to requests using `POST` and `PATCH` methods ([`406f71d`](https://github.com/release-change/release-change/commit/406f71da8af21c85af926f4c1291566298653a20))
- **github:** enhance GitHub API response log debug ([`0ce542f`](https://github.com/release-change/release-change/commit/0ce542f501c967978692bedaf01eb717e057867a))
- **release-notes-generator:** prepare root package release notes with all internal packages commits ([`59e1339`](https://github.com/release-change/release-change/commit/59e1339974fedc8802cfe8c5215ee942d0a76668))

### Dependencies updates

- @release-change/ci@0.1.0
- @release-change/commit-analyser@0.1.0
- @release-change/get-packages@0.1.0
- @release-change/github@0.1.0
- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
