# OHS Documentation Engine PoC Engineering Controls

## Status

These controls are mandatory for the OHS Player documentation engine PoC. They resolve implementation gaps in the [[OHS Documentation Engine PoC Implementation Plan]], [[OHS Documentation Engine PoC Engineering Handover]], and [[OHS Documentation Hosting and Delivery Requirements]].

## Before implementation starts

The approved prototype baseline must be portable and available to every engineer and CI.

- A maintainer stages an offline, renderable snapshot of the approved prototype and its local assets at `poc/baseline/prototype/`.
- A maintainer stages `poc/baseline/prototype-manifest.json`, containing only the design-owned inputs: source location and immutable hash, license or ownership where relevant, design-review approval, viewport definition and device scale factor, plus self-hosted font, image, asset-variant, and token hashes.
- The engineering scripts create and update `poc/baseline/capture-manifest.json`. It records the scaffold date, Node/npm, resolved engine and Playwright versions, lockfile hashes, Chromium revision and browser version, runner `ImageOS` and `ImageVersion`, capture artifact provenance, and approved screenshot references.
- Provide `poc/scripts/capture-baseline.mjs`, which serves the snapshot and captures it in the same pinned Playwright Chromium environment used for candidate screenshots.
- Regenerate and recommit baseline screenshots when the Chromium revision, browser version, runner `ImageOS`/`ImageVersion`, self-hosted font files, or device scale factor changes. The capture-manifest comparison must make this need visible before visual results are accepted.
- Do not begin UI implementation until the design manifest and approved CI-generated baseline screenshots exist. A screenshot captured on another machine is a design reference, not a pixel-diff baseline.

## Branch and production isolation

- Keep the PoC on its implementation branch and review it through CI artifacts.
- Do not merge it to `main` until a maintainer approves a change to the existing Pages workflow that prevents PoC-only changes from rebuilding the current public site.
- The approved guard must ignore `poc/**` and the PoC-only workflow file. Confirm that skipping the workflow does not block required pull-request checks.
- If a commit changes both PoC and non-PoC files, the existing Pages workflow may run. Keep PoC-only commits separate.

## Dependency and runtime isolation

- `poc/` is not a root workspace and must not be included in any present or future root workspace.
- `poc/` owns the cross-engine runner and test dependencies, with its own `package.json` and committed `package-lock.json`. It includes the pinned Playwright Chromium, axe integration, and YAML parser used by the scripts.
- Each engine also owns an independent `package.json` and lockfile.
- Provide one cross-platform bootstrap command for local work and CI:

  ```bash
  npm --prefix poc run bootstrap
  ```

  The Node bootstrap script runs `npm ci --workspaces=false` for `poc/` and both engines, then installs the pinned Chromium browser. In Linux CI it installs Chromium dependencies as well. It does not run `npm install`.
### Default comparison toolchain

Use these defaults for the initial PoC implementation:

- Node.js `24.18.0` LTS. Set `poc/.nvmrc` to exactly `24.18.0`; use `"node": ">=24.18.0 <25"` in every PoC package's `engines` field.
- npm `11.16.0`, bundled with that Node release. Use `"npm": ">=11.16.0 <12"` in each PoC package's `engines` field.
- Do not enable npm's global `engine-strict` check: it applies to third-party transitive dependencies whose supported-range declarations are not the PoC runtime contract. Instead, bootstrap must run before any install and fail unless `node --version` is exactly `v24.18.0` and `npm --version` is exactly `11.16.0`; it must also verify the `engines` fields of the PoC packages themselves. CI records both actual values in the evidence manifest. Do not rely on a cache, image, or global npm installation to select the version.
- GitHub Actions runner `ubuntu-24.04`.
- Docusaurus is exactly `3.10.1`, matching the existing root application. This deliberately measures the continuity option, not a hypothetical upgrade. If it cannot cleanly build under the isolated Node 24 PoC runtime, stop and record that blocker rather than silently upgrading it.
- Use `@playwright/test` exactly at `1.62.0`. Scaffold Starlight and any other test libraries from their current stable releases in the same scaffold session as Docusaurus. Record the date, exact direct versions, and lockfile hashes in `capture-manifest.json`; then use only `npm ci`. Do not use version ranges for direct engine or Playwright dependencies.
- Install Chromium through the lockfile-resolved Playwright version. In Linux CI, use Playwright's supported `--with-deps chromium` installation; locally install Chromium without system dependencies.
- If the selected Starlight setup resolves `sharp`, bootstrap must verify the lockfile-resolved package has a Linux x64 glibc prebuilt binary for Node 24 on `ubuntu-24.04`. Fail rather than compiling it from source, and record the resolved `sharp` version and result.

- The PoC may be built and deployed from `poc/`. Static hosting uploads generated output from `poc/.output/`; it does not require the repository root to be a workspace.

## PoC CI workflow

Keep the workflow simple and safe.

- Trigger `poc.yml` on `pull_request` changes to `poc/**` and the workflow file, plus maintainer-initiated `workflow_dispatch`.
- Use `pull_request`, never `pull_request_target`.
- Set least privilege permissions, starting with `contents: read`. Do not grant repository write, Pages, deployment, or identity-token permissions.
- Do not expose repository, deployment, DNS, or other secrets to pull-request jobs.
- Pin third-party Actions to immutable commit SHAs and set an explicit temporary artifact retention period.
- Run every PoC job on `ubuntu-24.04` and use Node.js `24.18.0` with npm `11.16.0` before bootstrap. Fail early if the actual versions differ, and record them in the evidence manifest.
- Run `npm --prefix poc run bootstrap`, then the three required PoC commands. Upload only review artifacts. Do not deploy.

## Canonical base paths and smoke test

Use the following canonical PoC URL shape and trailing-slash policy:

| Candidate | Canonical URL | Build configuration |
| --- | --- | --- |
| Docusaurus | `https://poc.ohs.foundation/docusaurus/` | `url: "https://poc.ohs.foundation"`, `baseUrl: "/docusaurus/"`, `trailingSlash: true` |
| Starlight | `https://poc.ohs.foundation/starlight/` | `site: "https://poc.ohs.foundation"`, `base: "/starlight"`, `trailingSlash: "always"` |

The shared brief records `trailingSlash: always`. Canonical internal routes and emitted links must end with `/`; the Docusaurus and Starlight configuration values above are the engine-specific equivalent.

Until live preview is approved, the origin is build metadata only. It does not authorize publication or DNS configuration.

- `smoke:paths` must mount Docusaurus at `http://127.0.0.1:<port>/docusaurus/` and Starlight at `http://127.0.0.1:<port>/starlight/`.
- The server must mirror the target host’s strict static resolution: map a canonical directory URL only to its emitted `index.html`, and add no extension, directory, SPA, or trailing-slash fallback of its own.
- It must verify final-path HTML, styles, scripts, images, fonts, internal links, and clean URL behaviour from those mounted paths. It must assert that every generated internal route matches the configured trailing-slash shape.
- It must reject any internal URL whose casing does not exactly match the emitted file tree. This check runs on Linux CI.
- Do not use the existing `ohs-docs` GitHub Pages site for a PoC preview. A Pages deployment from that repository replaces the current published site. Use CI artifacts or an approved isolated preview site instead.

## Shell-first visual validation

Before writing guide content, implement the instruction-first shell in both engines and validate it against the approved baseline.

- Include the three-column desktop layout, manual task-oriented navigation, provenance rail, and responsive mobile drawer.
- Capture screenshots at every baseline viewport and generate visual diffs before adding the content fixture.
- The named design reviewer resolves or accepts each shell deviation in `poc/results/visual-review.md` before instructional content is built.

## Hermetic content and asset validation

- `validate` runs offline after dependencies are installed. It must not query GitHub, DNS, or another network service.
- Store permitted Player repositories and refs in a checked-in allowlist in `poc/brief/`. Validate `applicablePlayerRef` against that allowlist and a defined format.
- Validate source URLs syntactically and against the allowed repository set, without fetching them.
- The browser smoke suite must fail on every outbound request other than the local smoke server.
- Both candidates must use identical self-hosted fonts, images, and asset variants from the baseline. CDNs and other runtime asset fetches are prohibited.
- For every screenshot route, assert that the approved self-hosted faces are loaded and that the computed font declaration for baseline text starts with the approved face. A generic family may remain only as an emergency CSS fallback; it must not be selected during capture.

## Evidence retention

Use two evidence tiers.

- **Committed, durable evidence:** comparison brief, baseline manifest, measurements, scorecard, evidence manifest, visual-review record, and a small approved reference or thumbnail set.
- **Temporary CI evidence:** full-resolution screenshots, accessibility reports, trace files, and complete static output.

Do not use `poc/results/screenshots/` as a committed store for large generated screenshots. Replace it with `poc/results/evidence-manifest.json` containing artifact links, commit SHA, capture date, and expiry date.

Before the final engine decision, preserve the final full evidence in approved durable storage, such as release assets or an organisation-managed evidence store, and add durable links to the evidence manifest. GitHub Actions artifacts are temporary and are not the decision record.

## Measurement contract

Use the same Linux runner OS, pinned browser, device scale factor, viewport, cold-cache browser settings, and gzip method for both candidates.

For every required route, record:

- Raw and gzip HTML.
- Raw and gzip CSS.
- First-load JavaScript: create a new Playwright browser context with cache disabled for each route, capture only `script` requests in the network log before user interaction, deduplicate by final request URL, and sum the corresponding emitted asset bytes in raw and gzip form. Include shared chunks required by that route.
- Raw and gzip font and image bytes.
- Build time: run three cold builds under the same CI conditions, record all three values, and report the median. Measure the engine build after dependency installation, with build outputs and build caches cleared between runs.

Record the search index separately in raw and gzip bytes. Report total site output only as a diagnostic value. Build time informs the 10% build-and-review-artifact-simplicity criterion, not the 15% static-performance-and-asset-footprint criterion.

## Accessibility and visual review

Use these defaults:

- Run `@axe-core/playwright` against every required route in the pinned Playwright Chromium version at every baseline viewport.
- At every baseline viewport, drive and scan every interactive state: the route on load, the mobile drawer open, each tab panel after it is selected, and each disclosure both collapsed and expanded.
- No serious or critical automated accessibility violations may remain without a written, reviewer-approved exception.
- Run the approved manual keyboard checklist for navigation, search, tabs, copy controls, disclosures, and the mobile drawer.
- Test approved token contrast once at the baseline using WCAG AA criteria. Re-evaluate contrast per engine only when implementation deviates from the approved tokens.
- Capture baseline and candidate screenshots on the same pinned Linux CI runner image and pinned Playwright Chromium environment. `capture-baseline.mjs` runs in CI, and its committed outputs are the pixel-diff references. Disable animations and transitions, wait for `document.fonts.ready` and the shared application-ready marker rather than `networkidle`, and freeze any date or time rendering.
- Define `applicationReadySelector: '[data-poc-ready="true"]'` in `poc/brief/page-contract.yaml`. The marker is set only when the route’s approved shell, content, fonts, and initial interactive controls are present and stable. Both engines use this exact selector and meaning.
- Generate visual diffs with a fixed `pixelmatch` threshold of `0.1` and `includeAA: false`. Report changed-pixel ratios for the full page, manual navigation, article column, and provenance rail. These measurements inform design review; they are not pass/fail gates. Record accepted deviations in `poc/results/visual-review.md`.
- The named design reviewer approves visual fidelity. Pixel diffs inform review but do not replace it.

## Authoring trial

The authoring trial is part of the comparison, not incidental work.

- Use the same author and equivalent content changes in both candidates: add one ordered step and one troubleshooting entry.
- Record elapsed time, files changed, frontmatter changes, components or imports used, MDX expression syntax, validation or build errors, preview command, and author observations.
- Record the result in the scorecard. Do not normalize away engine-specific MDX differences.

## Live preview default

CI artifacts are the default review mechanism. A live preview is optional.

If approved, use one isolated non-production preview site, separate from the existing `ohs-docs` Pages deployment, at `poc.ohs.foundation` with the two canonical paths above.

Before deploying, record:

- DNS and hosting owner.
- Deployment approver and source commit SHA.
- Required validation, build, smoke, accessibility, and visual-review checks.
- Base-path configuration and artifact directory.
- Expiry or cleanup owner and rollback method.
- Post-deploy checks for the final URL, assets, links, and search.

Every public preview must:

- Include `<meta name="robots" content="noindex,nofollow,noarchive">`.
- Send equivalent `X-Robots-Tag` headers where the host supports them.
- Exclude preview routes from sitemaps and avoid production canonical URLs.
- Be treated as public despite `noindex`. Use CI artifacts or authenticated hosting when access must be restricted.

## Related

- [[OHS Documentation Engine PoC Implementation Plan]]
- [[OHS Documentation Engine PoC Engineering Handover]]
- [[OHS Documentation Hosting and Delivery Requirements]]
- [[OHS Documentation Engine Trade-offs]]