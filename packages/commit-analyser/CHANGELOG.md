# @release-change/commit-analyser

## 0.1.1

### Dependencies updates

- @release-change/config@0.1.1
- @release-change/get-packages@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/commit-analyser@v0.1.0...@release-change/commit-analyser@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/commit-analyser@v0.1.0...@release-change/commit-analyser@v0.1.1)

## 0.1.0

### Minor changes

- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **commit-analyser:** get Git tags associated to a commit ([`689bd7a`](https://github.com/release-change/release-change/commit/689bd7acf1359ab542619e7ebacd62646cd8ff5f))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **commit-analyser:** tell whether the parsed commit is a merge commit ([`40ad044`](https://github.com/release-change/release-change/commit/40ad044bc0b4919c87d244ac7089ca1bee3f46cf))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))
- **commit-analyser:** include commit sha and commit body when parsing ([`c7f35db`](https://github.com/release-change/release-change/commit/c7f35db5213ff520801c9e626006670b7c1ae8f0))
- **logger:** enable message logging without any formatting ([`cef13b2`](https://github.com/release-change/release-change/commit/cef13b2d2f6d102252e2ccad4788bb342c21fdc8))
- **cli:** set next release considering each package to release in a monorepo context ([`3f88b05`](https://github.com/release-change/release-change/commit/3f88b05fc623051c11f6b4128842697fe938d607))
- **commit-analyser:** get release type for each package, considering internal dependencies ([`c67054c`](https://github.com/release-change/release-change/commit/c67054cbfa33c752d18181383bed7f1d34bc1e46))
- **commit-analyser:** parse commits taking monorepo contexts into account ([`041d0bf`](https://github.com/release-change/release-change/commit/041d0bf253a1586c21e570db384ca0c9bd01f2a6))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))

### Patch changes

- **commit-analyser:** keep existing release types for each package ([`6a05aa6`](https://github.com/release-change/release-change/commit/6a05aa63725457f3842aa9a0cf4fb56319154f39))
- **github:** fix regular expression looking for issue IDs ([`0fe0781`](https://github.com/release-change/release-change/commit/0fe0781522a7708ff3bcb423fa0f0b85c5ccc484))

### Dependencies updates

- @release-change/config@0.1.0
- @release-change/get-packages@0.1.0
- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
