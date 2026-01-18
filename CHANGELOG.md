# release-change

## 0.1.5

### Patch changes

- **git:** add `@v` delimiter to get latest valid tag for package ([`9ad4de8`](https://github.com/release-change/release-change/commit/9ad4de8ab6ebc326807a86feb25ba26c02854dd9))
- **commit-analyser:** add `/` to package path string to match against modified file ([`b39d822`](https://github.com/release-change/release-change/commit/b39d822d21d0e11a4169783e0f8288cc00e8ebc3))
- **github:** remove end assertion ([`e134614`](https://github.com/release-change/release-change/commit/e1346143514bb0a21b4d240ebe5af47739717a85))

---

**Full changelog:** [`v0.1.4...v0.1.5`](https://github.com/release-change/release-change/compare/v0.1.4...v0.1.5)

## 0.1.4

### Patch changes

- **shared:** force patch to benefit all packages from refactoring ([`7dcaf69`](https://github.com/release-change/release-change/commit/7dcaf696d5afed1f2e76da9615de6de01ee1afbc))

---

**Full changelog:** [`v0.1.3...v0.1.4`](https://github.com/release-change/release-change/compare/v0.1.3...v0.1.4)

## 0.1.3


## 0.1.2

### Patch changes

- **git:** remove `--merged` and remote branch when getting all tags ([`5a16cea`](https://github.com/release-change/release-change/commit/5a16cea83f7acce7226efa646851d54b83b5a669))

---

**Full changelog:** [`v0.1.1...v0.1.2`](https://github.com/release-change/release-change/compare/v0.1.1...v0.1.2)

## 0.1.1

### Patch changes

- **cli:** use `cli` package manifest for workspace version and required Node versions ([`09ee7a5`](https://github.com/release-change/release-change/commit/09ee7a51b66ee3497be5c614a63ef79122ac1bea))
- **shared:** fix value of workspace name ([`cb757e8`](https://github.com/release-change/release-change/commit/cb757e88474f68d19167de7bcb6a7027c5f72020))

---

**Full changelog:** [`v0.1.0...v0.1.1`](https://github.com/release-change/release-change/compare/v0.1.0...v0.1.1)

## 0.1.0

### Minor changes

- **npm:** enable publishing package to NPM ([`d48ff11`](https://github.com/release-change/release-change/commit/d48ff11a708df6a7050593106235e35fd472f21b))
- **release:** enable running commands to release next release ([`74c0a6b`](https://github.com/release-change/release-change/commit/74c0a6baaa98ea7989a2f6111a28c3a76cb20f88))
- **semver:** add function to check range comparator intersection ([`68f20df`](https://github.com/release-change/release-change/commit/68f20dfc5f767c6044d4c4ed5230811780ef8a16))
- **semver:** add functions to simplify a range ([`891dc91`](https://github.com/release-change/release-change/commit/891dc91429669d1b9934946f55b0b5bdeda9d5d9))
- **semver:** add functions to check if a subrange is a subset of a range ([`6886d1b`](https://github.com/release-change/release-change/commit/6886d1b1faf950e4ca55e75f452f3af762763e73))
- **semver:** add functions to check if a version is outside the bounds of the range ([`910d8d9`](https://github.com/release-change/release-change/commit/910d8d94bd65d5d43140ee4df3874cf150bf4c2f))
- **semver:** add function to get the lowest version which can match a range ([`8788d71`](https://github.com/release-change/release-change/commit/8788d719dbb1ddadb42289bddf523f10e72ff68e))
- **semver:** add functions to get min and max versions satisfying range ([`061eba3`](https://github.com/release-change/release-change/commit/061eba342a657368d6ced81428b01a0f27140bbc))
- **semver:** add functions to validate a range ([`9f14663`](https://github.com/release-change/release-change/commit/9f14663d9cfe29cb348813bfbbd8fdf5935ed360))
- **semver:** accept `null` and `undefined` in `Range` constructor and throw an error ([`8c79617`](https://github.com/release-change/release-change/commit/8c79617346c61634d7a4e68c32ef8c4b52b4733b))
- **semver:** add functions to show the difference between two versions ([`a8d41fc`](https://github.com/release-change/release-change/commit/a8d41fc280af4aa9ea4fecd76ac85768194604d4))
- **semver:** add functions to sort versions lists ([`62485d9`](https://github.com/release-change/release-change/commit/62485d99031b94433cb6af28148c72b2b5c37765))
- **semver:** add functions to compare two versions including builds ([`19e9511`](https://github.com/release-change/release-change/commit/19e9511466f77d9b51e7f12e5de4c191ead330b8))
- **semver:** add function to clean a version string ([`b513444`](https://github.com/release-change/release-change/commit/b51344436d7756d9d032f3bc115a183d31908b50))
- **semver:** remove build from `version` property of `Semver` object ([`5524917`](https://github.com/release-change/release-change/commit/5524917e793ac5db8f04ed7e54dedde370b81614))
- **semver:** add functions to compare two versions in loose mode ([`b089db6`](https://github.com/release-change/release-change/commit/b089db6b7c78bbbc3d796b67ee0efcdb957dd37b))
- **semver:** add functions to reverse compare two versions ([`204b240`](https://github.com/release-change/release-change/commit/204b240b42aacb21db1ee8d4ee3713e646acca2e))
- **semver:** add functions to get patch from version ([`bf825d4`](https://github.com/release-change/release-change/commit/bf825d439fe1434e877c9a79891cb2345c5e1d3d))
- **semver:** add functions to get minor from version ([`ffb9a31`](https://github.com/release-change/release-change/commit/ffb9a313a1ba9382e0bce178445634548c06f8e6))
- **semver:** add functions to get major from version ([`f25b537`](https://github.com/release-change/release-change/commit/f25b537db44b70181679ebaad125a48e32c2f6c9))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **git:** remove Git tags remotely when the release fails ([`25523bd`](https://github.com/release-change/release-change/commit/25523bdfa95ddcae8fe7fea8fa901a9acb5440e9))
- **github:** log response headers for debugging purposes ([`5fc788e`](https://github.com/release-change/release-change/commit/5fc788e6dc76262180999249ed630b491d5ed3a2))
- **shared:** fill `cause` property in `Error` object when an error is thrown ([`32e6352`](https://github.com/release-change/release-change/commit/32e63520bcf2524e4b76599930337c83b0ce6013))
- **github:** prepare tagging pull requests and issues with labels telling the release ([`4dc2d26`](https://github.com/release-change/release-change/commit/4dc2d267181d1eeaedb14575c8e6ca185b2b9e15))
- **github:** close issues related to commit ([`bf22cfd`](https://github.com/release-change/release-change/commit/bf22cfda8ce494b2ebb7b80f7ae7844486cccd9a))
- **github:** prepare fail comment posting ([`3357c50`](https://github.com/release-change/release-change/commit/3357c50a1901f57eafe70bc46b52b6beb2bf691c))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **github:** populate `context.references` with Git tags associated to found PRs and issues ([`7cf1cdd`](https://github.com/release-change/release-change/commit/7cf1cdded6985c96f1f403a4048bbcfd847249ed))
- **commit-analyser:** get Git tags associated to a commit ([`689bd7a`](https://github.com/release-change/release-change/commit/689bd7acf1359ab542619e7ebacd62646cd8ff5f))
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
- **shared:** make `runCommand()` able to pass options ([`525482c`](https://github.com/release-change/release-change/commit/525482c46d65e16b5a227e69a4539527f2327917))
- **npm:** prepare package publishing and publish only after push step ([`2884d45`](https://github.com/release-change/release-change/commit/2884d45c3a7444d6f9f527c89c446bea4ffc5c55))
- **npm:** prepare publication to NPM registry ([`9b36f14`](https://github.com/release-change/release-change/commit/9b36f142a08c88dc329e9c625e19793dc69d1fad))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **git:** export `push` ([`d0eb39d`](https://github.com/release-change/release-change/commit/d0eb39daaaaa94cbc34b46f83358912e0e4b3246))
- **git:** prepare push ([`dae72e2`](https://github.com/release-change/release-change/commit/dae72e2cebf74c4988b76a3d90ecea4bb8fd4652))
- **shared:** add the run command as the error cause ([`d3c3f33`](https://github.com/release-change/release-change/commit/d3c3f33244d26f7d18a91efd93e0d5a935a71cf5))
- **release-notes-generator:** prepare release notes for each package ([`dd75434`](https://github.com/release-change/release-change/commit/dd7543472266c7f6db311ae067b8d179f1fb622b))
- **release:** include package path in last and next releases ([`e1efad2`](https://github.com/release-change/release-change/commit/e1efad28960ff38b81c765e7e14f5aefd690ad83))
- **commit-analyser:** tell whether the parsed commit is a merge commit ([`40ad044`](https://github.com/release-change/release-change/commit/40ad044bc0b4919c87d244ac7089ca1bee3f46cf))
- **git:** prepare Git tag creation ([`268dbf3`](https://github.com/release-change/release-change/commit/268dbf34d46b9f603f57e661dd3408b4569c7d06))
- **release:** prepare file update commits ([`49a2761`](https://github.com/release-change/release-change/commit/49a2761071aedb342b3c2d28f84ff595eea7eec0))
- **release:** prepare lock file update ([`72482b8`](https://github.com/release-change/release-change/commit/72482b80a0bafec10cc0c0ff7ea497f7757c7a62))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))
- **commit-analyser:** include commit sha and commit body when parsing ([`c7f35db`](https://github.com/release-change/release-change/commit/c7f35db5213ff520801c9e626006670b7c1ae8f0))
- **config:** do not check remote repository URL any longer ([`33b096b`](https://github.com/release-change/release-change/commit/33b096b79b6613987206833870101dcf70e34ce9))
- **cli:** manage remote Git repo name with CLI flag or config file ([`9e7f21f`](https://github.com/release-change/release-change/commit/9e7f21fbd400bcf80358748b28a115f08d530221))
- **logger:** enable message logging without any formatting ([`cef13b2`](https://github.com/release-change/release-change/commit/cef13b2d2f6d102252e2ccad4788bb342c21fdc8))
- **cli:** set next release considering each package to release in a monorepo context ([`3f88b05`](https://github.com/release-change/release-change/commit/3f88b05fc623051c11f6b4128842697fe938d607))
- **commit-analyser:** get release type for each package, considering internal dependencies ([`c67054c`](https://github.com/release-change/release-change/commit/c67054cbfa33c752d18181383bed7f1d34bc1e46))
- **commit-analyser:** parse commits taking monorepo contexts into account ([`041d0bf`](https://github.com/release-change/release-change/commit/041d0bf253a1586c21e570db384ca0c9bd01f2a6))
- **cli:** set last release for each package ([`c275869`](https://github.com/release-change/release-change/commit/c275869598ce3637d538823924d07b0d2e8dce63))
- **git:** take monorepos into account in regex ([`ee4486a`](https://github.com/release-change/release-change/commit/ee4486abbbe8aa18f29e3995a54b9490745c0e2d))
- **git:** sort all tags based on creation date ([`7b9e51d`](https://github.com/release-change/release-change/commit/7b9e51da08fd17e4482d05d4b9736a7a91f37aed))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **git:** include the list of changed files in a monorepo context ([`b59f717`](https://github.com/release-change/release-change/commit/b59f7171050757a1e5c80c93eb93f309820e55c8))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))
- **semver:** add `semver` package ([`ec8d180`](https://github.com/release-change/release-change/commit/ec8d1802451de45d884d65d4fcad992c9e5caafb))
- **ci:** check CI environment ([`16082b0`](https://github.com/release-change/release-change/commit/16082b08c29d4aedd7caa666d397de30a61ba1c7))
- **release:** set next release ([`96c4b27`](https://github.com/release-change/release-change/commit/96c4b274a1e4dd2d32226236d3670d728e8762dc))
- **commit-analyser:** get release type from commits ([`88b11c0`](https://github.com/release-change/release-change/commit/88b11c09d9e2ed263eb9908aedcf5f391f31b5b9))
- **commit-analyser:** parse commit and set release type ([`620b39c`](https://github.com/release-change/release-change/commit/620b39c91928fe3199375e273a88003bf9600863))
- **git:** get commits since last release or the beginning ([`1cdef4e`](https://github.com/release-change/release-change/commit/1cdef4edf727e6c682f782bc46d6f7f4b204bfce))
- **git:** get commits since last release or the beginning ([`5ff1d0c`](https://github.com/release-change/release-change/commit/5ff1d0c3f972270a001939746a54de42fc8225ce))
- **release:** set last release ([`08a2eba`](https://github.com/release-change/release-change/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))
- **git:** get all tags ([`2735962`](https://github.com/release-change/release-change/commit/27359628c0860299999d97b61079b1b42f08b94f))
- **config:** add remote repo name ([`9d9d9de`](https://github.com/release-change/release-change/commit/9d9d9de475287781c9119be8b6435ed74a26c1d3))
- **config:** add remote repo name ([`a4ce04b`](https://github.com/release-change/release-change/commit/a4ce04b7b0433b3032ed0574b93dbf2d06c0917e))
- **git:** always fill `context.branch` ([`5ff1a8b`](https://github.com/release-change/release-change/commit/5ff1a8bfcdb8cdf70c988cc2d91eb8ff89c0e049))
- **config:** log environment variables in debug mode ([`6611094`](https://github.com/release-change/release-change/commit/6611094a148b0cf0968a255d1e04e7f3494d7988))
- **cli:** add step checking push permissions ([`a29dc30`](https://github.com/release-change/release-change/commit/a29dc308296c31f36563ba2631d0a3a4ee4aa346))
- **git:** check push permissions ([`63cecaf`](https://github.com/release-change/release-change/commit/63cecafcc0b598139e54f455d2e2624383fad1f0))
- **git:** check if the branch is up to date ([`d58e8b4`](https://github.com/release-change/release-change/commit/d58e8b4737ea8d1a99d254664deb95546a0f8b33))
- **git:** get remote name defined for remote repository ([`f819de2`](https://github.com/release-change/release-change/commit/f819de22f8824e6a5b88a7dcdcebd260a8db715f))
- **git:** check authorisation to push commits ([`6b34ae3`](https://github.com/release-change/release-change/commit/6b34ae36cb04802da4660da97d36846fd63f2e8e))
- **config:** use SSH or HTTPS protocol for repository URL ([`0d7c625`](https://github.com/release-change/release-change/commit/0d7c62553a8685671169dc0c81e506d17a2e762a))
- **config:** get the repository URL from the project root package or the remote repo ([`80cd705`](https://github.com/release-change/release-change/commit/80cd7051704146a9581e8964884f81e665f36417))
- **git:** check current branch ([`15614e0`](https://github.com/release-change/release-change/commit/15614e00748c6bd2fd151acf26f44e3079291e2d))
- **git:** check whether it is a git repository or not ([`326e098`](https://github.com/release-change/release-change/commit/326e098686c4cc3adfe7f1a5932e3516c901df05))
- **logger:** add logging for debug mode ([`7a70d20`](https://github.com/release-change/release-change/commit/7a70d20911aeca6d43726183662e5b8356161e15))
- **cli:** set initial steps for CLI running ([`6e10af2`](https://github.com/release-change/release-change/commit/6e10af27049150b4782c6ac77c720cfdb36d0fab))
- **config:** get config ([`8da65ae`](https://github.com/release-change/release-change/commit/8da65ae4bfb83512a221b3f0fea443488d41744a))
- **logger:** implement custom logs to the console ([`de9de53`](https://github.com/release-change/release-change/commit/de9de53c0081d7cf7dc846345e951c97ad65ca09))

### Patch changes

- **github:** exclude version release commits from filtered commits ([`6e4d821`](https://github.com/release-change/release-change/commit/6e4d821d6c2410ae2e5da2f140d6145489e68baf))
- **github:** remove URI component encoding ([`4d2441e`](https://github.com/release-change/release-change/commit/4d2441ebb27de87f3499f08513d9a0d7f78ef254))
- **commit-analyser:** keep existing release types for each package ([`6a05aa6`](https://github.com/release-change/release-change/commit/6a05aa63725457f3842aa9a0cf4fb56319154f39))
- **release:** add blank line at the end of the updated file ([`20981e8`](https://github.com/release-change/release-change/commit/20981e897f71dae8f4b9a1cd05c5e82eed0008ed))
- **release:** use Git tag pattern to validate version from Git tag ([`bc72efb`](https://github.com/release-change/release-change/commit/bc72efb76a77f208aa7ca8d30dea909fa9016d73))
- **release:** put root package in last position in next release set ([`8e207ad`](https://github.com/release-change/release-change/commit/8e207ad615741f375013c4b01f2cecd2852ed149))
- **release-notes-generator:** set `make_latest` value as a string ([`38cc26f`](https://github.com/release-change/release-change/commit/38cc26f9c70f3a1060176d5839a51c991049b240))
- **semver:** use an empty string if the operator is undefined in loose mode ([`4b6a81f`](https://github.com/release-change/release-change/commit/4b6a81f9a279e5491903b3277d49afe8be05b2f3))
- **semver:** fix range parsing with build and X-ranges ([`f99b995`](https://github.com/release-change/release-change/commit/f99b9954f8669c5caf985b0663bf218324375a48))
- **semver:** add exports for version and reverse comparison functions ([`1497e6d`](https://github.com/release-change/release-change/commit/1497e6dc0534de8be850fe7ff8f8fb408d4335bb))
- **semver:** fix regex to consider the `v=` pattern in loose mode ([`9809a90`](https://github.com/release-change/release-change/commit/9809a9065d513fafe586cdb6f69a2e5a085dcac0))
- **github:** display the same error on a fail comment once ([`7ab1db9`](https://github.com/release-change/release-change/commit/7ab1db9772f51ded75b50c95923619be5f36ec6f))
- **github:** fix response header display in logs ([`4c8ec6b`](https://github.com/release-change/release-change/commit/4c8ec6b15c2f0f48eeedea5aa8520baf0aa6f0e1))
- **github:** fix the way JSON is consumed ([`bea7e6a`](https://github.com/release-change/release-change/commit/bea7e6ab5bccd57c88b3fba8a28349ae794cde53))
- **git:** fix returned exit code ([`3058a5d`](https://github.com/release-change/release-change/commit/3058a5d9306eeef7dc34144ed7ad12a10fcd29c3))
- **github:** add MIME type to requests using `POST` and `PATCH` methods ([`406f71d`](https://github.com/release-change/release-change/commit/406f71da8af21c85af926f4c1291566298653a20))
- **github:** enhance GitHub API response log debug ([`0ce542f`](https://github.com/release-change/release-change/commit/0ce542f501c967978692bedaf01eb717e057867a))
- **git:** fill `cause` property in `Error` object when an error is thrown ([`4a22bee`](https://github.com/release-change/release-change/commit/4a22bee12ca50f191946b7905f3aa46a503e283f))
- **release:** check if lock file exists before running `(p)npm install` ([`b63229a`](https://github.com/release-change/release-change/commit/b63229a30a8d605073e4b21ca8a30557edae5050))
- **git:** throw error when the `git push` command fails ([`91ddf7c`](https://github.com/release-change/release-change/commit/91ddf7cef91589cad7408cf02e635f367df02fd3))
- **release:** consider package path when setting path to file to restore ([`c459bb2`](https://github.com/release-change/release-change/commit/c459bb2cd707c1cff0625ad798277c4ba30f636c))
- **release:** check if lock file exists before adding it to `git add` command ([`ad67a76`](https://github.com/release-change/release-change/commit/ad67a7688d4203e7e629e796b4f33ef5391bb08e))
- **release:** cancel commits and remove Git tags when `git add` or `git commit` fail ([`02993c8`](https://github.com/release-change/release-change/commit/02993c89e048068de88c6b85e0184be762eebe4e))
- **release:** add error throwing on error with `git add` and/or `git commit` ([`f3e7e04`](https://github.com/release-change/release-change/commit/f3e7e043f94aaa3e084ca3f60b4161c0ec7750c0))
- **github:** isolate log messages displaying no pull requests and issues found ([`6f73fb6`](https://github.com/release-change/release-change/commit/6f73fb6fce143ef95cb4ba4257361a5b37da29fd))
- **github:** merge pull request and issue references sharing the same number together ([`0ce0b85`](https://github.com/release-change/release-change/commit/0ce0b8553e247d8d14a3cdea75953fd38fcfddfc))
- **github:** fix regular expression looking for issue IDs ([`0fe0781`](https://github.com/release-change/release-change/commit/0fe0781522a7708ff3bcb423fa0f0b85c5ccc484))
- **github:** access `sha` property ([`c400be5`](https://github.com/release-change/release-change/commit/c400be580b396c81372b554e740be08e666f404a))
- **logger:** separate normal scope from debug scope ([`01a6b81`](https://github.com/release-change/release-change/commit/01a6b81ce1b53ba4f054786214802bc8c4037820))
- **release-notes-generator:** prepare root package release notes with all internal packages commits ([`59e1339`](https://github.com/release-change/release-change/commit/59e1339974fedc8802cfe8c5215ee942d0a76668))
- **cli:** display Git incompatible version found using `version` property or `null` ([`f932593`](https://github.com/release-change/release-change/commit/f932593409606190edf1945d4e7331d7dc2033a0))
- **npm:** pass the path of the current package as current working directory ([`7663622`](https://github.com/release-change/release-change/commit/7663622a43f0aa25997354c8dbd15ecdb1ec8104))
- **npm:** add `--no-git-checks` when pnpm is used ([`7418f98`](https://github.com/release-change/release-change/commit/7418f985dedc5244ac2efdedb91b11d4c317acb9))
- enhance error catching from commands run ([`3a67df5`](https://github.com/release-change/release-change/commit/3a67df58562108cc18baca87fe03b1b6ffac095e))
- **release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/release-change/release-change/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
- **release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/release-change/release-change/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))
- **github:** iterate on commit shas seuqentially ([`16c4eb0`](https://github.com/release-change/release-change/commit/16c4eb05430d7006852651691544f4e121fc8f24))
- **github:** add exit codes when errors are thrown ([`5d7bc7a`](https://github.com/release-change/release-change/commit/5d7bc7ad4ef74da37a6ed6b6b38708e9eaa0d67c))
- **github:** do not throw any errors when `stderr` is filled in a zero-status context ([`46a0c44`](https://github.com/release-change/release-change/commit/46a0c4436399ca32a13b586fe5ae36c763a4f57a))
- **cli:** fix separator for Git tag packages other than root ([`c64e130`](https://github.com/release-change/release-change/commit/c64e130711f9d3308897c051663c9fe6b12fdf53))
- **cli:** fix path to `package.json` file ([`27f2e11`](https://github.com/release-change/release-change/commit/27f2e117721bcf71b50a1c232bb5c1d886e6b667))
- **git:** fix the `--sort` option ([`0d856de`](https://github.com/release-change/release-change/commit/0d856de6a0a3336635186e3f7f2abcacc81b9744))
- **get-packages:** make regular expression accept patterns in double quotes ([`5a50c1f`](https://github.com/release-change/release-change/commit/5a50c1fb61b2e54f4b53d1b8a8ad257e8542a99a))
- **get-packages:** add more ways of checking the package manager used ([`fd2513e`](https://github.com/release-change/release-change/commit/fd2513ec2bd63a8230f31bcfd0efd253833a3a7e))
- **deps:** update dependency semver to v7.7.2 (#172) ([`acc261c`](https://github.com/release-change/release-change/commit/acc261c96616dc0a78a7a8456844139bdceba530))
- **git:** throw error if `git push --dry-run --no-verify` command returns a non-zero status ([`45f95a2`](https://github.com/release-change/release-change/commit/45f95a24e0e1dd2361638591bff3a63ff2d6a424))
- **ci:** replace immediate exit by a return `false` ([`d231305`](https://github.com/release-change/release-change/commit/d23130596b996019065d367a4064d82a46407b1c))
- **ci:** exit process immediately when the run is triggered by a pull request ([`e80ca40`](https://github.com/release-change/release-change/commit/e80ca405aa12d733977765b7bc2c3df2ed478f1e))
- **git:** exit process immediately when Git returns an error or a non-zero status ([`544d371`](https://github.com/release-change/release-change/commit/544d3714833a1997fbe0b205ddd0d8cf610dbc06))
- fix logger mocked variable ([`951db32`](https://github.com/release-change/release-change/commit/951db3284ea558789e56376c6474b44d39c383d3))
- **git:** wrap `runCommand` with a `Promise` object ([`8d6c661`](https://github.com/release-change/release-change/commit/8d6c661293e5db713c3897fa2ecc944a56e40882))
- **git:** fix regex separator ([`2ded19f`](https://github.com/release-change/release-change/commit/2ded19f94ecb932a0d990c9bbb4aae68fa26e4a0))
- **deps:** update dependency semver to v7.7.1 (#14) ([`4859e06`](https://github.com/release-change/release-change/commit/4859e068e9397528d54905990f9a5e6b9ab2ae11))
