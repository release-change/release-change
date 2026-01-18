# @release-change/release

## 0.1.4

### Dependencies updates

- @release-change/commit-analyser@0.1.3
- @release-change/git@0.1.4
- @release-change/github@0.1.3
- @release-change/release-notes-generator@0.1.3

---

**Full changelog:** [`@release-change/release@v0.1.3...@release-change/release@v0.1.4`](https://github.com/release-change/release-change/compare/@release-change/release@v0.1.3...@release-change/release@v0.1.4)

## 0.1.3

### Dependencies updates

- @release-change/config@0.1.2
- @release-change/commit-analyser@0.1.2
- @release-change/get-packages@0.1.2
- @release-change/git@0.1.3
- @release-change/github@0.1.2
- @release-change/logger@0.1.2
- @release-change/npm@0.1.2
- @release-change/release-notes-generator@0.1.2
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/release@v0.1.2...@release-change/release@v0.1.3`](https://github.com/release-change/release-change/compare/@release-change/release@v0.1.2...@release-change/release@v0.1.3)

## 0.1.2

### Dependencies updates

- @release-change/git@0.1.2

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.1...@release-change/release@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.1...@release-change/release@v0.1.2)

## 0.1.1

### Dependencies updates

- @release-change/config@0.1.1
- @release-change/commit-analyser@0.1.1
- @release-change/get-packages@0.1.1
- @release-change/git@0.1.1
- @release-change/github@0.1.1
- @release-change/logger@0.1.1
- @release-change/npm@0.1.1
- @release-change/release-notes-generator@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/release-notes-generator@v0.1.0...@release-change/release@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/release-notes-generator@v0.1.0...@release-change/release@v0.1.1)

## 0.1.0

### Minor changes

- **release:** enable running commands to release next release ([`74c0a6b`](https://github.com/release-change/release-change/commit/74c0a6baaa98ea7989a2f6111a28c3a76cb20f88))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **git:** remove Git tags remotely when the release fails ([`25523bd`](https://github.com/release-change/release-change/commit/25523bdfa95ddcae8fe7fea8fa901a9acb5440e9))
- **github:** log response headers for debugging purposes ([`5fc788e`](https://github.com/release-change/release-change/commit/5fc788e6dc76262180999249ed630b491d5ed3a2))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **git:** prepare Git tag removal ([`0b69ecc`](https://github.com/release-change/release-change/commit/0b69ecc8d4c18a22a21cde095824fcd202e04161))
- **git:** prepare commit cancellation since ref ([`f8a8139`](https://github.com/release-change/release-change/commit/f8a8139419fa6e05aeec699cb563fc85900e2c04))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **release:** add changelog file to committed updated files ([`8ff9c75`](https://github.com/release-change/release-change/commit/8ff9c75ae2bccd540ed63a706851a0819132affb))
- **release-notes-generator:** prepare changelog file creation and update ([`521d199`](https://github.com/release-change/release-change/commit/521d199de35957f86730af939ddc0be7917fa89a))
- **release-notes-generator:** add formatting for changelog file ([`f5b8fa5`](https://github.com/release-change/release-change/commit/f5b8fa59eb68bd21e435fd81788ae27d366a329c))
- **release-notes-generator:** add functions to format release notes in Markdown from object ([`eae1509`](https://github.com/release-change/release-change/commit/eae1509ee7714268adfcc7308e7722e1336e8b79))
- **release-notes-generator:** include internal dependencies updates in prepared release notes ([`0e09a7f`](https://github.com/release-change/release-change/commit/0e09a7f9a5d3423fa048d704a662405c66aa013c))
- **release:** update package internal dependencies versions in package manifest ([`cffdc0d`](https://github.com/release-change/release-change/commit/cffdc0deed2781030f6c1d22a6b11373c1b40e8b))
- **git:** pass `cwd` option when running `git` commands ([`efb6069`](https://github.com/release-change/release-change/commit/efb6069fcc9ffb8310d5b40e5dce82be0c24b736))
- **npm:** prepare package publishing and publish only after push step ([`2884d45`](https://github.com/release-change/release-change/commit/2884d45c3a7444d6f9f527c89c446bea4ffc5c55))
- **npm:** prepare publication to NPM registry ([`9b36f14`](https://github.com/release-change/release-change/commit/9b36f142a08c88dc329e9c625e19793dc69d1fad))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **git:** export `push` ([`d0eb39d`](https://github.com/release-change/release-change/commit/d0eb39daaaaa94cbc34b46f83358912e0e4b3246))
- **release-notes-generator:** prepare release notes for each package ([`dd75434`](https://github.com/release-change/release-change/commit/dd7543472266c7f6db311ae067b8d179f1fb622b))
- **release:** include package path in last and next releases ([`e1efad2`](https://github.com/release-change/release-change/commit/e1efad28960ff38b81c765e7e14f5aefd690ad83))
- **git:** prepare Git tag creation ([`268dbf3`](https://github.com/release-change/release-change/commit/268dbf34d46b9f603f57e661dd3408b4569c7d06))
- **release:** prepare file update commits ([`49a2761`](https://github.com/release-change/release-change/commit/49a2761071aedb342b3c2d28f84ff595eea7eec0))
- **release:** prepare lock file update ([`72482b8`](https://github.com/release-change/release-change/commit/72482b80a0bafec10cc0c0ff7ea497f7757c7a62))

### Patch changes

- **release:** add blank line at the end of the updated file ([`20981e8`](https://github.com/release-change/release-change/commit/20981e897f71dae8f4b9a1cd05c5e82eed0008ed))
- **release:** use Git tag pattern to validate version from Git tag ([`bc72efb`](https://github.com/release-change/release-change/commit/bc72efb76a77f208aa7ca8d30dea909fa9016d73))
- **release:** put root package in last position in next release set ([`8e207ad`](https://github.com/release-change/release-change/commit/8e207ad615741f375013c4b01f2cecd2852ed149))
- **release-notes-generator:** set `make_latest` value as a string ([`38cc26f`](https://github.com/release-change/release-change/commit/38cc26f9c70f3a1060176d5839a51c991049b240))
- **github:** fix response header display in logs ([`4c8ec6b`](https://github.com/release-change/release-change/commit/4c8ec6b15c2f0f48eeedea5aa8520baf0aa6f0e1))
- **github:** fix the way JSON is consumed ([`bea7e6a`](https://github.com/release-change/release-change/commit/bea7e6ab5bccd57c88b3fba8a28349ae794cde53))
- **github:** add MIME type to requests using `POST` and `PATCH` methods ([`406f71d`](https://github.com/release-change/release-change/commit/406f71da8af21c85af926f4c1291566298653a20))
- **github:** enhance GitHub API response log debug ([`0ce542f`](https://github.com/release-change/release-change/commit/0ce542f501c967978692bedaf01eb717e057867a))
- **release:** check if lock file exists before running `(p)npm install` ([`b63229a`](https://github.com/release-change/release-change/commit/b63229a30a8d605073e4b21ca8a30557edae5050))
- **release:** consider package path when setting path to file to restore ([`c459bb2`](https://github.com/release-change/release-change/commit/c459bb2cd707c1cff0625ad798277c4ba30f636c))
- **release:** check if lock file exists before adding it to `git add` command ([`ad67a76`](https://github.com/release-change/release-change/commit/ad67a7688d4203e7e629e796b4f33ef5391bb08e))
- **release:** cancel commits and remove Git tags when `git add` or `git commit` fail ([`02993c8`](https://github.com/release-change/release-change/commit/02993c89e048068de88c6b85e0184be762eebe4e))
- **release:** add error throwing on error with `git add` and/or `git commit` ([`f3e7e04`](https://github.com/release-change/release-change/commit/f3e7e043f94aaa3e084ca3f60b4161c0ec7750c0))
- **release-notes-generator:** prepare root package release notes with all internal packages commits ([`59e1339`](https://github.com/release-change/release-change/commit/59e1339974fedc8802cfe8c5215ee942d0a76668))
- enhance error catching from commands run ([`3a67df5`](https://github.com/release-change/release-change/commit/3a67df58562108cc18baca87fe03b1b6ffac095e))
- **release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/release-change/release-change/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
- **release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/release-change/release-change/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))

### Dependencies updates

- @release-change/config@0.1.0
- @release-change/commit-analyser@0.1.0
- @release-change/get-packages@0.1.0
- @release-change/git@0.1.0
- @release-change/github@0.1.0
- @release-change/logger@0.1.0
- @release-change/npm@0.1.0
- @release-change/release-notes-generator@0.1.0
- @release-change/semver@0.1.0
- @release-change/shared@0.1.0
