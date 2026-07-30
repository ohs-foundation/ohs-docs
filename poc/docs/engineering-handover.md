# OHS Documentation Engine PoC: Engineering Handover

## Assignment

Build a bounded comparison in [`ohs-foundation/ohs-docs`](https://github.com/ohs-foundation/ohs-docs) between Docusaurus and Astro Starlight for OHS Player Reference documentation.

This is an **engine-selection PoC only**. It is not a production migration, production-hosting rollout, or broad OHS Developer Hub. The output is decision evidence.

[[OHS Documentation Engine PoC Engineering Controls]] is mandatory. It defines base paths, offline validation, Linux link checks, evidence retention, measurements, review, and conditional preview deployment.

## Product direction

The Foundation projects page handles ecosystem and component discovery. This work focuses on building an OHS Player reference application:

- A concise Player landing page introduces the toolkit and links to component-owned repositories.
- An instruction-first guide leads a developer through one technical outcome.
- Component-local setup, configuration, contribution, releases, and APIs remain in owning repositories or generated references.
- Player documentation owns concise cross-component journeys, validated commands, and troubleshooting.
- Do not duplicate READMEs or create repository-directory documentation.

Prototype source inputs currently available locally:

- `/Users/allay/Documents/ohs-documentation/output/ohs-documentation-offline/index.html`
- `/Users/allay/Documents/ohs-documentation/output/ohs-documentation-offline/initial/index.html`

Before implementation, copy the approved prototype and its local assets to `poc/baseline/prototype/`. The baseline capture script must render that snapshot in the pinned Playwright Chromium environment. Treat technical commands in the prototype as design placeholders until a Player maintainer validates them.

## Existing repository

`ohs-docs` is a July 1 Docusaurus 3.10.1 TypeScript/React scaffold with local search and a successful GitHub Pages deployment at `https://ohs-foundation.github.io/ohs-docs/`.

Its current homepage, navigation, styles, and component pages are near-default scaffold content. The existing Player page is a repository list, not an instruction-first guide. Keep the root application unchanged during this PoC.

Keep the PoC on its implementation branch and use CI artifacts for review. Do not merge to `main` until a maintainer approves a guard in the existing Pages workflow that prevents PoC-only changes from rebuilding the current public site.

The PoC deliberately uses Node.js 24, whereas the root application and `deploy.yml` use Node.js 20 with an `>=20` engine range. That is acceptable for an isolated, like-for-like engine comparison, but does not prove the selected build will run in the production environment. Resolve that runtime choice and rerun the selected implementation as a production follow-on.

## Scope

Build in each engine:

1. **OHS Player landing page**
   - Player purpose.
   - Curated component map with repository links.
   - Confirmed target/maturity wording.
   - One call to action into the guide.

2. **Desktop reference-client guide**
   - Prerequisites.
   - Clone, build, and run steps.
   - Expected-result checkpoints.
   - Troubleshooting, next step, source/Edit link, and provenance metadata.
   - Do not add other platform tabs unless independently confirmed.

3. **Instruction-first shell**
   - Top bar, manual task-oriented left navigation, article column, right table-of-contents/provenance rail, and mobile drawer.
   - Local keyboard-accessible search.
   - Copy controls, tabs, and disclosures where needed.

Do not build federation, runtime external fetching, docs versioning, API generation, AI, interactive labs, CMS, analytics, broad discovery pages, or additional guides.

## Repository layout

Use one implementation branch, for example `chore/<issue-number>-docs-engine-poc`, replacing `<issue-number>` with the GitHub issue number.

```text
ohs-docs/
  poc/
    package.json
    package-lock.json
    .nvmrc
    brief/
      routes.yaml
      player-facts.yaml
      page-contract.yaml
    baseline/
      README.md
      prototype/
      prototype-manifest.json
      capture-manifest.json
      viewports.json
      screenshots/
      tokens/
    docusaurus/
      package.json
      package-lock.json
      docs/
      src/
    starlight/
      package.json
      package-lock.json
      src/
    scripts/
      bootstrap-poc.mjs
      capture-baseline.mjs
      validate-poc.mjs
      build-poc.mjs
      smoke-paths.mjs
    results/
      scorecard.md
      measurements.json
      visual-review.md
      evidence-manifest.json
  .github/workflows/
    poc.yml
```

Each engine has its own content and components. That is acceptable and useful: it tests real authoring ergonomics. Both must, however, satisfy the same route, information, metadata, and behaviour contract in `poc/brief/`.

`poc/` is not a root workspace and must not be added to a present or future root workspace. Each engine installs in its own directory with `npm ci`, using its own lockfile and disabled workspace mode. Use Node.js `24.18.0` LTS and bundled npm `11.16.0`: set the exact Node release in `poc/.nvmrc`, use compatible Node and npm ranges in every PoC package's `engines` field, and make bootstrap fail before any installation unless `node --version` is `v24.18.0` and `npm --version` is `11.16.0`. Use Docusaurus exactly at `3.10.1`, matching the existing root application, and `@playwright/test` exactly at `1.62.0`. Scaffold Starlight and any other test libraries from current stable releases in one session on one day, record the date, exact direct versions, and lockfile hashes in `capture-manifest.json`, then use only `npm ci`. If Docusaurus 3.10.1 cannot cleanly build on the isolated Node 24 runtime, stop and record the blocker rather than silently upgrading it.

Do not manually duplicate or sync repository-owned component documentation. Engine-specific PoC pages are disposable comparison artifacts, not a new source of truth for component content.

## Comparison contract

The two sites must provide the same:

- Route set: Player landing page and one quickstart.
- Information and technical facts.
- Required metadata.
- Interaction inventory.
- Visual baseline and responsive breakpoints.
- Canonical trailing-slash behaviour: every internal route ends with `/`.
- Accessibility and static-build requirements.
- Self-hosted fonts, images, and asset variants from the approved baseline.

No CDN or other runtime asset fetches are allowed during comparison. Copy and component markup may differ by engine. Do not require shared MDX. Prevent bias by keeping the facts, acceptance requirements, and route inventory in the checked-in brief.

Create the first artifact as the instruction-first shell in both engines: three-column desktop layout, manual task-oriented navigation, provenance rail, responsive mobile drawer, and baseline viewports. Screenshot-diff it against the approved baseline and resolve reviewer-approved deviations before writing guide content. Only then create the small content fixture: prerequisite, two numbered steps, expected result, tabs, troubleshooting, and provenance.

## Metadata contract

Both quickstart pages must validate and render:

- `title`
- `description`
- `owner`
- `sourceUrl`
- `applicablePlayerRef`
- `maturity`
- `lastValidated`
- `validationCommand`

The brief defines valid maturity values and required route IDs. The validator reads each engine’s content, normalizes its frontmatter, and checks the same contract.

## Content-source states

Use two explicit states:

- **UX-PoC complete:** both engines render the comparable guide. If technical details are unavailable, omit commands and identify the missing prerequisite or source boundary.
- **Source-backed guide:** the owning source identifies the repository, reference, prerequisites, commands, expected outcome, and troubleshooting where it exists.

The PoC can select a preferred engine in the first state. Content remains within the documented source boundary; production hosting or implementation decisions are outside this PoC.

## Baseline

Before implementation, create `poc/baseline/` containing:

- A short design interpretation document.
- `prototype-manifest.json`, staged by a maintainer, containing the source prototype path and immutable hash/version, licence or ownership where relevant, design approval, viewport/device scale factor, and self-hosted font, logo, image, asset-variant, and token hashes.
- `capture-manifest.json`, populated by engineering and CI after scaffold. It records Node.js `24.18.0`, npm `11.16.0`, the CI runner `ubuntu-24.04`, exact Docusaurus, Starlight, Playwright, and browser versions, Chromium revision, runner `ImageOS`/`ImageVersion`, scaffold date, lockfile hashes, capture artifact provenance, and approved screenshot references.
- Captured reference screenshots at agreed desktop and mobile sizes, generated by `capture-baseline.mjs` on the same pinned Linux CI runner image and Playwright Chromium environment used for candidate capture.
- `viewports.json` with exact widths/heights and device scale factor.
- Approved fonts, logo, images, design tokens, and their source locations. Screenshot tests must assert that approved self-hosted faces load and are the computed first face for baseline text; generic fallback faces must not be selected during capture.
- A keyboard and accessibility checklist.

If Chromium/browser revision, runner image, self-hosted font file, or device scale factor changes, regenerate and recommit the baseline screenshots before accepting visual comparisons.

Design reviewers approve this baseline before either PoC is scored.

## Required commands

The `poc/` package provides these commands:

```bash
npm --prefix poc run bootstrap
npm --prefix poc run validate
npm --prefix poc run build
npm --prefix poc run smoke:paths
```

They mean:

- **`bootstrap`**: before any install, fails unless Node.js is `v24.18.0` and npm is `11.16.0`. It then runs `npm ci --workspaces=false` for the PoC runner and both engine directories, checks any resolved `sharp` dependency has the required Linux x64 glibc prebuilt binary, and installs the lockfile-resolved Playwright Chromium browser. In Linux CI, it installs Chromium dependencies as well. It records the resolved browser revision and runner image values for the manifest.

- **`validate`**: validates `poc/brief/`, then normalizes and validates metadata and route coverage in both engine content trees. It must reject missing fields, invalid dates, unsupported maturity values, malformed source URLs, invalid Player refs, and missing required routes.
- **`build`**: runs `npm ci` with workspace mode disabled in each engine directory, builds each site into separate temporary directories, and assembles final static output under `poc/.output/docusaurus/` and `poc/.output/starlight/`.
- **`smoke:paths`**: serves the assembled output at each configured base path, using strict static resolution with no extension, directory, SPA, or trailing-slash fallback. It verifies final-path HTML, JavaScript, CSS, images, internal links, exact URL casing, and the required trailing-slash link shape for both applications.

Keep these scripts cross-platform Node scripts. Do not depend on shell-specific copying or path handling.

## Engine work

### Docusaurus

Work in `poc/docusaurus/`.

- Configure a manual sidebar; do not mirror folders.
- Build the custom landing page, document shell, provenance rail, and responsive navigation.
- Implement task components in React/MDX.
- Apply the approved token set rather than incrementally restyling the classic template.
- Configure local search and keyboard behaviour.
- Record all theme overrides/swizzles, plugins, and custom layout files in `poc/results/scorecard.md`.

### Starlight

Work in `poc/starlight/`.

- Build the same routes, shell, task components, and metadata rendering using Astro/MDX.
- Use content collections/schema validation where useful, while still passing the shared validator.
- Keep client-side JavaScript limited to necessary interactions.
- Configure local search and keyboard behaviour.
- Record layouts, integrations, and custom components in `poc/results/scorecard.md`.

## Preview and hosting

Hosting is **not required** to complete the engineering PoC. Start with CI artifacts, screenshots, and local review:

- Pull-request CI runs the three commands, captures screenshots/reports, and uploads the assembled static output as an Actions artifact.
- This avoids changing or overwriting the existing public GitHub Pages deployment. The PoC remains unmerged until a maintainer approves the existing workflow guard described above.

If reviewers need live URLs, obtain maintainer approval for one of these non-production options:

1. **One isolated preview site, two paths:** deploy the assembled artifact at `poc.ohs.foundation/docusaurus/` and `poc.ohs.foundation/starlight/`. This is the simplest live comparison.
2. **Two separate preview sites:** use two static-hosting projects for `docusaurus-poc.ohs.foundation` and `starlight-poc.ohs.foundation` if separate subdomains are specifically needed.

Do not use the existing `ohs-docs` GitHub Pages site for a PoC preview: a Pages deployment from that repository replaces its published site. A subdomain requires an OHS DNS owner to create the relevant record and approve the hosting provider. Do not assume DNS or hosting authority.

## Hard gates

A candidate cannot be scored as a winner unless:

- The shared brief passes `npm --prefix poc run validate`.
- Its metadata and route coverage pass validation.
- It builds to static output without runtime external fetching.
- `npm --prefix poc run smoke:paths` passes and rejects every outbound browser request other than its local server.
- Navigation, search, tabs, copy controls, and mobile drawer are keyboard usable.
- Desktop and mobile screenshots are captured at all baseline viewports.
- There are no serious or critical automated accessibility violations at every baseline viewport and required interactive state without a written, reviewer-approved exception, and the manual keyboard checklist passes.
- The required technical state is accurately labelled as fixture or verified.

## Evidence and scorecard

For both candidates:

1. Build from a clean checkout.
2. Run validation, build, and final-path smoke test.
3. Run automated accessibility checks and manual keyboard/mobile review.
4. Capture baseline-viewport screenshots.
5. If in production-guide-eligible state, run the confirmed quickstart from a clean environment and retain the result.
6. Measure according to [[OHS Documentation Engine PoC Engineering Controls]]: per-route raw and gzip HTML, CSS, first-load JavaScript, fonts, images, build time, and a separate search-index measurement. Treat total output size as diagnostic only.
7. Run an authoring trial: add one troubleshooting entry and one step.
8. Record design deviations, plugin/dependency surface, overrides, and maintenance concerns.

Score from evidence:

| Criterion | Weight |
|---|---:|
| Visual fidelity and responsive behaviour | 25% |
| Instruction-page authoring experience | 20% |
| Accessibility and keyboard behaviour | 15% |
| Static performance and asset footprint | 15% |
| Customization/upgrade maintenance | 15% |
| Build and review-artifact simplicity | 10% |

Commit the brief, baseline manifest, scorecard, and lightweight measurements. Store large screenshots and reports as Actions artifacts during development. Before the engine decision, preserve the final full evidence in approved durable storage and add durable links to `poc/results/evidence-manifest.json`. Do not commit generated sites or dependency caches.

## Completion

The PoC ends with:

- A completed evidence-backed scorecard.
- A short ADR update selecting an engine or recording why selection is blocked.
- Retained artifacts/screenshots/measurements.
- A list of follow-on questions for a future production implementation.

Do **not** promote, migrate, remove the alternative, configure production hosting, or expand content as part of this PoC.

## Internal context

- [[OHS Documentation Engine PoC Implementation Plan]]
- [[OHS Documentation Engine PoC Handover Tightening Review]]
- [[OHS Documentation Engine Implementation Feasibility]]
- [[OHS Docs Repository Audit — OHS Player Reference Scope]]
- [[ADR-0001 Review — Narrowed OHS Player Scope]]
