# @release-change/git

## 0.1.4

### Patch changes

- **git:** add `@v` delimiter to get latest valid tag for package ([`9ad4de8`](https://github.com/release-change/release-change/commit/9ad4de8ab6ebc326807a86feb25ba26c02854dd9))
- **github:** remove end assertion ([`e134614`](https://github.com/release-change/release-change/commit/e1346143514bb0a21b4d240ebe5af47739717a85))

### Dependencies updates

- @release-change/commit-analyser@0.1.3

---

**Full changelog:** [`@release-change/git@v0.1.3...@release-change/git@v0.1.4`](https://github.com/release-change/release-change/compare/@release-change/git@v0.1.3...@release-change/git@v0.1.4)

## 0.1.3

### Dependencies updates

- @release-change/commit-analyser@0.1.2
- @release-change/logger@0.1.2
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/git@v0.1.2...@release-change/git@v0.1.3`](https://github.com/release-change/release-change/compare/@release-change/git@v0.1.2...@release-change/git@v0.1.3)

## 0.1.2

### Patch changes

- **git:** remove `--merged` and remote branch when getting all tags ([`5a16cea`](https://github.com/release-change/release-change/commit/5a16cea83f7acce7226efa646851d54b83b5a669))

---

**Full changelog:** [`@release-change/github@v0.1.1...@release-change/git@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/github@v0.1.1...@release-change/git@v0.1.2)

## 0.1.1

### Patch changes

- **cli:** use `cli` package manifest for workspace version and required Node versions ([`09ee7a5`](https://github.com/release-change/release-change/commit/09ee7a51b66ee3497be5c614a63ef79122ac1bea))

### Dependencies updates

- @release-change/commit-analyser@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/github@v0.1.0...@release-change/git@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/github@v0.1.0...@release-change/git@v0.1.1)

## 0.1.0

### Minor changes

- **release:** enable running commands to release next release ([`74c0a6b`](https://github.com/release-change/release-change/commit/74c0a6baaa98ea7989a2f6111a28c3a76cb20f88))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **git:** remove Git tags remotely when the release fails ([`25523bd`](https://github.com/release-change/release-change/commit/25523bdfa95ddcae8fe7fea8fa901a9acb5440e9))
- **github:** log response headers for debugging purposes ([`5fc788e`](https://github.com/release-change/release-change/commit/5fc788e6dc76262180999249ed630b491d5ed3a2))
- **github:** prepare tagging pull requests and issues with labels telling the release ([`4dc2d26`](https://github.com/release-change/release-change/commit/4dc2d267181d1eeaedb14575c8e6ca185b2b9e15))
- **github:** close issues related to commit ([`bf22cfd`](https://github.com/release-change/release-change/commit/bf22cfda8ce494b2ebb7b80f7ae7844486cccd9a))
- **github:** prepare fail comment posting ([`3357c50`](https://github.com/release-change/release-change/commit/3357c50a1901f57eafe70bc46b52b6beb2bf691c))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **github:** populate `context.references` with Git tags associated to found PRs and issues ([`7cf1cdd`](https://github.com/release-change/release-change/commit/7cf1cdded6985c96f1f403a4048bbcfd847249ed))
- **git:** prepare Git tag removal ([`0b69ecc`](https://github.com/release-change/release-change/commit/0b69ecc8d4c18a22a21cde095824fcd202e04161))
- **git:** prepare commit cancellation since ref ([`f8a8139`](https://github.com/release-change/release-change/commit/f8a8139419fa6e05aeec699cb563fc85900e2c04))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **git:** pass `cwd` option when running `git` commands ([`efb6069`](https://github.com/release-change/release-change/commit/efb6069fcc9ffb8310d5b40e5dce82be0c24b736))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **git:** export `push` ([`d0eb39d`](https://github.com/release-change/release-change/commit/d0eb39daaaaa94cbc34b46f83358912e0e4b3246))
- **git:** prepare push ([`dae72e2`](https://github.com/release-change/release-change/commit/dae72e2cebf74c4988b76a3d90ecea4bb8fd4652))
- **release:** include package path in last and next releases ([`e1efad2`](https://github.com/release-change/release-change/commit/e1efad28960ff38b81c765e7e14f5aefd690ad83))
- **commit-analyser:** tell whether the parsed commit is a merge commit ([`40ad044`](https://github.com/release-change/release-change/commit/40ad044bc0b4919c87d244ac7089ca1bee3f46cf))
- **git:** prepare Git tag creation ([`268dbf3`](https://github.com/release-change/release-change/commit/268dbf34d46b9f603f57e661dd3408b4569c7d06))
- **release:** prepare file update commits ([`49a2761`](https://github.com/release-change/release-change/commit/49a2761071aedb342b3c2d28f84ff595eea7eec0))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))
- **commit-analyser:** include commit sha and commit body when parsing ([`c7f35db`](https://github.com/release-change/release-change/commit/c7f35db5213ff520801c9e626006670b7c1ae8f0))
- **logger:** enable message logging without any formatting ([`cef13b2`](https://github.com/release-change/release-change/commit/cef13b2d2f6d102252e2ccad4788bb342c21fdc8))
- **cli:** set last release for each package ([`c275869`](https://github.com/release-change/release-change/commit/c275869598ce3637d538823924d07b0d2e8dce63))
- **git:** take monorepos into account in regex ([`ee4486a`](https://github.com/release-change/release-change/commit/ee4486abbbe8aa18f29e3995a54b9490745c0e2d))
- **git:** sort all tags based on creation date ([`7b9e51d`](https://github.com/release-change/release-change/commit/7b9e51da08fd17e4482d05d4b9736a7a91f37aed))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **git:** include the list of changed files in a monorepo context ([`b59f717`](https://github.com/release-change/release-change/commit/b59f7171050757a1e5c80c93eb93f309820e55c8))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))
- **semver:** add `semver` package ([`ec8d180`](https://github.com/release-change/release-change/commit/ec8d1802451de45d884d65d4fcad992c9e5caafb))

### Patch changes

- **github:** exclude version release commits from filtered commits ([`6e4d821`](https://github.com/release-change/release-change/commit/6e4d821d6c2410ae2e5da2f140d6145489e68baf))
- **github:** remove URI component encoding ([`4d2441e`](https://github.com/release-change/release-change/commit/4d2441ebb27de87f3499f08513d9a0d7f78ef254))
- **release:** use Git tag pattern to validate version from Git tag ([`bc72efb`](https://github.com/release-change/release-change/commit/bc72efb76a77f208aa7ca8d30dea909fa9016d73))
- **github:** display the same error on a fail comment once ([`7ab1db9`](https://github.com/release-change/release-change/commit/7ab1db9772f51ded75b50c95923619be5f36ec6f))
- **github:** fix response header display in logs ([`4c8ec6b`](https://github.com/release-change/release-change/commit/4c8ec6b15c2f0f48eeedea5aa8520baf0aa6f0e1))
- **github:** fix the way JSON is consumed ([`bea7e6a`](https://github.com/release-change/release-change/commit/bea7e6ab5bccd57c88b3fba8a28349ae794cde53))
- **git:** fix returned exit code ([`3058a5d`](https://github.com/release-change/release-change/commit/3058a5d9306eeef7dc34144ed7ad12a10fcd29c3))
- **github:** add MIME type to requests using `POST` and `PATCH` methods ([`406f71d`](https://github.com/release-change/release-change/commit/406f71da8af21c85af926f4c1291566298653a20))
- **github:** enhance GitHub API response log debug ([`0ce542f`](https://github.com/release-change/release-change/commit/0ce542f501c967978692bedaf01eb717e057867a))
- **git:** fill `cause` property in `Error` object when an error is thrown ([`4a22bee`](https://github.com/release-change/release-change/commit/4a22bee12ca50f191946b7905f3aa46a503e283f))
- **git:** throw error when the `git push` command fails ([`91ddf7c`](https://github.com/release-change/release-change/commit/91ddf7cef91589cad7408cf02e635f367df02fd3))
- **github:** isolate log messages displaying no pull requests and issues found ([`6f73fb6`](https://github.com/release-change/release-change/commit/6f73fb6fce143ef95cb4ba4257361a5b37da29fd))
- **github:** merge pull request and issue references sharing the same number together ([`0ce0b85`](https://github.com/release-change/release-change/commit/0ce0b8553e247d8d14a3cdea75953fd38fcfddfc))
- **github:** fix regular expression looking for issue IDs ([`0fe0781`](https://github.com/release-change/release-change/commit/0fe0781522a7708ff3bcb423fa0f0b85c5ccc484))
- **github:** access `sha` property ([`c400be5`](https://github.com/release-change/release-change/commit/c400be580b396c81372b554e740be08e666f404a))
- enhance error catching from commands run ([`3a67df5`](https://github.com/release-change/release-change/commit/3a67df58562108cc18baca87fe03b1b6ffac095e))
- **github:** iterate on commit shas seuqentially ([`16c4eb0`](https://github.com/release-change/release-change/commit/16c4eb05430d7006852651691544f4e121fc8f24))
- **github:** add exit codes when errors are thrown ([`5d7bc7a`](https://github.com/release-change/release-change/commit/5d7bc7ad4ef74da37a6ed6b6b38708e9eaa0d67c))
- **github:** do not throw any errors when `stderr` is filled in a zero-status context ([`46a0c44`](https://github.com/release-change/release-change/commit/46a0c4436399ca32a13b586fe5ae36c763a4f57a))
- **git:** fix the `--sort` option ([`0d856de`](https://github.com/release-change/release-change/commit/0d856de6a0a3336635186e3f7f2abcacc81b9744))

### Dependencies updates

- @release-change/commit-analyser@0.1.0
- @release-change/logger@0.1.0
- @release-change/semver@0.1.0
- @release-change/shared@0.1.0
