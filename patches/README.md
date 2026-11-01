# serve-handler compatibility patch

`serve-handler@6.1.7.patch` changes only the minimatch import to its documented
named CommonJS export. The version-scoped workspace override selects the official
`minimatch@11.0.3` release only for this parent. The matcher implementation and
serve-handler's error handling remain upstream code.

This removes the legacy minimatch resolution affected by
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
The API follows the [minimatch 11 documentation](https://github.com/isaacs/minimatch/tree/v11.0.3#usage).
Generate and register the patch with [pnpm patch](https://pnpm.io/10.x/cli/patch)
and [patch-commit](https://pnpm.io/10.x/cli/patch-commit); dependency changes belong
in [parent-scoped overrides](https://pnpm.io/10.x/settings#overrides), rather than
the patched package manifest. Keep pnpm's default patch failure checks enabled.

`packages/doc/serve-handler-compatibility.test.mjs` exercises the actual parent
over HTTP: matching and nonmatching headers, braces/extglobs, rewrites, redirects,
selective clean URLs, trailing slashes, missing files and observable I/O errors.
The ordinary Docusaurus serve path is also checked against the built site during
upgrade validation. These checks establish the repository's supported consumer
paths, rather than universal equivalence between minimatch major versions.

Remove this exact-version patch and override when an upstream serve-handler or
Docusaurus release adopts a patched minimatch through its supported API. Before
removal or any parent/matcher upgrade, rerun the parent HTTP tests, Docusaurus
serve validation, and repository tests, type checks and builds.
