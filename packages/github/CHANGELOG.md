# @release-change/github

## 0.1.2

### Dependencies updates

- @release-change/ci@0.1.2
- @release-change/config@0.1.2
- @release-change/commit-analyser@0.1.2
- @release-change/logger@0.1.2
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/github@v0.1.1...@release-change/github@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/github@v0.1.1...@release-change/github@v0.1.2)

## 0.1.1

### Dependencies updates

- @release-change/ci@0.1.1
- @release-change/config@0.1.1
- @release-change/commit-analyser@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/github@v0.1.0...@release-change/github@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/github@v0.1.0...@release-change/github@v0.1.1)

## 0.1.0

### Minor changes

- **release:** enable running commands to release next release ([`74c0a6b`](https://github.com/release-change/release-change/commit/74c0a6baaa98ea7989a2f6111a28c3a76cb20f88))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **github:** log response headers for debugging purposes ([`5fc788e`](https://github.com/release-change/release-change/commit/5fc788e6dc76262180999249ed630b491d5ed3a2))
- **github:** prepare tagging pull requests and issues with labels telling the release ([`4dc2d26`](https://github.com/release-change/release-change/commit/4dc2d267181d1eeaedb14575c8e6ca185b2b9e15))
- **github:** close issues related to commit ([`bf22cfd`](https://github.com/release-change/release-change/commit/bf22cfda8ce494b2ebb7b80f7ae7844486cccd9a))
- **github:** prepare fail comment posting ([`3357c50`](https://github.com/release-change/release-change/commit/3357c50a1901f57eafe70bc46b52b6beb2bf691c))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **github:** populate `context.references` with Git tags associated to found PRs and issues ([`7cf1cdd`](https://github.com/release-change/release-change/commit/7cf1cdded6985c96f1f403a4048bbcfd847249ed))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **commit-analyser:** tell whether the parsed commit is a merge commit ([`40ad044`](https://github.com/release-change/release-change/commit/40ad044bc0b4919c87d244ac7089ca1bee3f46cf))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))

### Patch changes

- **github:** exclude version release commits from filtered commits ([`6e4d821`](https://github.com/release-change/release-change/commit/6e4d821d6c2410ae2e5da2f140d6145489e68baf))
- **github:** remove URI component encoding ([`4d2441e`](https://github.com/release-change/release-change/commit/4d2441ebb27de87f3499f08513d9a0d7f78ef254))
- **github:** display the same error on a fail comment once ([`7ab1db9`](https://github.com/release-change/release-change/commit/7ab1db9772f51ded75b50c95923619be5f36ec6f))
- **github:** fix response header display in logs ([`4c8ec6b`](https://github.com/release-change/release-change/commit/4c8ec6b15c2f0f48eeedea5aa8520baf0aa6f0e1))
- **github:** fix the way JSON is consumed ([`bea7e6a`](https://github.com/release-change/release-change/commit/bea7e6ab5bccd57c88b3fba8a28349ae794cde53))
- **github:** add MIME type to requests using `POST` and `PATCH` methods ([`406f71d`](https://github.com/release-change/release-change/commit/406f71da8af21c85af926f4c1291566298653a20))
- **github:** enhance GitHub API response log debug ([`0ce542f`](https://github.com/release-change/release-change/commit/0ce542f501c967978692bedaf01eb717e057867a))
- **github:** isolate log messages displaying no pull requests and issues found ([`6f73fb6`](https://github.com/release-change/release-change/commit/6f73fb6fce143ef95cb4ba4257361a5b37da29fd))
- **github:** merge pull request and issue references sharing the same number together ([`0ce0b85`](https://github.com/release-change/release-change/commit/0ce0b8553e247d8d14a3cdea75953fd38fcfddfc))
- **github:** fix regular expression looking for issue IDs ([`0fe0781`](https://github.com/release-change/release-change/commit/0fe0781522a7708ff3bcb423fa0f0b85c5ccc484))
- **github:** access `sha` property ([`c400be5`](https://github.com/release-change/release-change/commit/c400be580b396c81372b554e740be08e666f404a))
- **github:** iterate on commit shas seuqentially ([`16c4eb0`](https://github.com/release-change/release-change/commit/16c4eb05430d7006852651691544f4e121fc8f24))
- **github:** add exit codes when errors are thrown ([`5d7bc7a`](https://github.com/release-change/release-change/commit/5d7bc7ad4ef74da37a6ed6b6b38708e9eaa0d67c))
- **github:** do not throw any errors when `stderr` is filled in a zero-status context ([`46a0c44`](https://github.com/release-change/release-change/commit/46a0c4436399ca32a13b586fe5ae36c763a4f57a))

### Dependencies updates

- @release-change/ci@0.1.0
- @release-change/config@0.1.0
- @release-change/commit-analyser@0.1.0
- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
