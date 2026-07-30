# OHS Documentation Engine PoC: Implementation Plan

## Goal

Choose between Docusaurus and Astro Starlight using a bounded OHS Player Reference documentation comparison. Validate design fidelity, task-oriented IA, authoring, static output, accessibility, and maintenance from evidence, not preference.

This PoC does not migrate production documentation, publish a verified guide without maintainer validation, or commit OHS to a hosting platform.

The PoC remains on its implementation branch and is reviewed through CI artifacts. Do not merge it to `main` until a maintainer has approved a guard in the existing Pages workflow that prevents PoC-only changes from rebuilding the current public site.

[[OHS Documentation Engine PoC Engineering Controls]] defines the mandatory base-path, validation, evidence, measurement, review, and preview controls for this plan.

## Comparison model

Both candidates live in `ohs-foundation/ohs-docs`:

- `poc/docusaurus/`
- `poc/starlight/`

They may use engine-specific Markdown/MDX, components, and authoring conventions. This is sufficient and desirable for evaluating each engine honestly.

They must meet the same checked-in comparison brief:

- Identical route inventory.
- Equivalent information and technical facts.
- Same required metadata fields.
- Same interaction inventory.
- Same visual baseline and breakpoints.
- Same accessibility and static-build gates.

Do not require a shared MDX source or create a manual content-sync process. The PoC content is disposable; only the facts and requirements are shared.

Both candidates must use the same self-hosted fonts, images, and asset variants from the approved baseline. No CDN or other runtime asset fetches are allowed during comparison.

## Scope

### Both candidates implement

- An OHS Player landing page with a concise toolkit explanation, curated repository links, and one action into the guide.
- One desktop reference-client guide with prerequisites, ordered steps, expected results, troubleshooting, next step, source/Edit link, and provenance rail.
- The instruction-first shell: top bar, manual task-oriented navigation, article, right TOC/provenance rail, responsive mobile drawer, and keyboard-accessible local search.
- Reusable components for task metadata, prerequisite checks, steps, expected results, tabs, troubleshooting, and component/source links.

### Both candidates exclude

- Runtime external fetching, multi-repo ingestion, versioning, release bots, generated reference, AI, labs, analytics, CMS, general Foundation discovery, and more than one guide.

## PoC states

- **UX-PoC complete:** both engines render equivalent guides. If source detail is unavailable, the page omits commands and identifies the missing prerequisite or source boundary.
- **Production-guide eligible:** a Player maintainer has validated the exact repository, ref, prerequisites, commands, expected outcome, and troubleshooting; clean-environment evidence is stored.

Platform comparison can select a preferred engine at UX-PoC complete. Production-guide publication, production hosting, and any production implementation work remain blocked until production-guide-eligible evidence exists.

## Baseline and brief

Before development:

- [ ] Create `poc/brief/routes.yaml`, `player-facts.yaml`, and `page-contract.yaml`. The page contract pins `trailingSlash: always`, `applicationReadySelector: '[data-poc-ready="true"]'`, and the marker’s shared meaning.
- [ ] Copy an offline, renderable approved prototype snapshot to `poc/baseline/prototype/` and create `poc/scripts/capture-baseline.mjs`.
- [ ] A maintainer stages `poc/baseline/prototype-manifest.json`, `viewports.json`, self-hosted design tokens and assets, plus the keyboard/accessibility checklist. The design manifest records only prototype path/hash, ownership or licence, design approval, viewport/device scale factor, and font/image/asset hashes.
- [ ] Create `poc/baseline/capture-manifest.json` for engineering and CI. It records scaffold date, lockfile hashes, resolved engine/Playwright and browser versions, Chromium revision, runner `ImageOS`/`ImageVersion`, Node/npm, capture artifact provenance, and approved screenshot references. Regenerate the committed baseline if the browser revision, runner image, font files, or device scale factor changes.
- [ ] Use Node.js `24.18.0` LTS with npm `11.16.0` and `ubuntu-24.04`. Bootstrap must fail before installing unless `node --version` and `npm --version` match that exact pair.
- [ ] Use Docusaurus `3.10.1` to match the current OHS site and `@playwright/test` exactly at `1.62.0`. Scaffold Starlight from its current stable release in the same session, record all exact direct versions and lockfiles, then use only `npm ci`. Set the shared device scale factor in `viewports.json`.
- [ ] Name a Player maintainer and a design/docs reviewer.
- [ ] Confirm or explicitly mark unavailable the technical facts for the quickstart.
- [ ] Build and screenshot-diff the instruction-first shell in both engines before writing guide content: three-column desktop layout, manual task-oriented navigation, provenance rail, responsive mobile drawer, and baseline viewports. Resolve reviewer-approved shell deviations before building the content fixture.

**Exit criterion:** reviewers approve one baseline and comparison brief before UI work is scored.

## Build and validation scripts

Create a cross-platform Node script suite under `poc/scripts/`. Bootstrap local work or CI with:

```bash
npm --prefix poc run bootstrap
```

Then invoke:

```bash
npm --prefix poc run validate
npm --prefix poc run build
npm --prefix poc run smoke:paths
```

- `validate` validates the brief and normalizes/validates both engines’ route and metadata coverage.
- `build` installs locked dependencies, builds each engine to separate temporary outputs, and assembles `poc/.output/docusaurus/` and `poc/.output/starlight/`.
- `smoke:paths` serves assembled output at the configured base paths and tests final-path HTML, scripts, styles, images, and internal links. It uses strict static resolution with no extension, directory, SPA, or trailing-slash fallback, and asserts the configured trailing-slash link shape.

`poc/` is a self-contained non-workspace area. It must not be included in a present or future root workspace. Each engine owns an independent `package.json` and lockfile; the build script runs `npm ci` from each engine directory, with workspace mode disabled. Use Node.js `24.18.0` LTS and bundled npm `11.16.0`: pin the exact Node release in `poc/.nvmrc`, declare compatible Node and npm ranges in every PoC package's `engines` field, and make bootstrap fail unless both exact versions are active. Use Docusaurus `3.10.1` and `@playwright/test` `1.62.0`; resolve Starlight and any other test libraries once in the same scaffold session and commit their exact direct versions and lockfiles. Run CI on `ubuntu-24.04`. If Starlight resolves `sharp`, verify its Linux x64 glibc prebuilt binary rather than permitting a source build. Do not use shell-specific filesystem operations.

## Docusaurus implementation

- [ ] Configure manual Player navigation.
- [ ] Implement custom landing page, document layout, provenance rail, task components, and responsive design system.
- [ ] Configure local search and keyboard interactions.
- [ ] Document theme overrides/swizzles, plugins, and custom layout files.
- [ ] Pass brief, metadata, static build, final-path, and accessibility gates.

## Starlight implementation

- [ ] Configure manual Player navigation.
- [ ] Implement equivalent landing page, document layout, provenance rail, task components, and responsive design system.
- [ ] Configure local search and keyboard interactions.
- [ ] Document layouts, integrations, and custom components.
- [ ] Pass brief, metadata, static build, final-path, and accessibility gates.

## Review delivery and hosting

Default delivery is private/reviewer-accessible CI output while the PoC remains unmerged:

- Pull-request CI runs the three PoC commands.
- It uploads assembled static sites, screenshots, accessibility reports, and measurements as Actions artifacts.
- It does not change the existing public GitHub Pages workflow or deployment.

Live previews are optional. If approved by an OHS DNS/hosting owner, deploy the assembled artifact at:

- `poc.ohs.foundation/docusaurus/`
- `poc.ohs.foundation/starlight/`

One preview subdomain is sufficient. GitHub Pages custom domains attach to the whole Pages site, not arbitrary subdirectories. Separate engine subdomains require separate static-hosting deployments/projects. No production domain or hosting configuration is in scope.

## Hard gates

- [ ] `npm --prefix poc run validate` passes.
- [ ] `npm --prefix poc run build` passes from a clean checkout.
- [ ] `npm --prefix poc run smoke:paths` passes.
- [ ] Both routes and all required metadata render in both engines.
- [ ] The built sites make no runtime external requests, and the browser smoke suite rejects every outbound request other than its local server.
- [ ] Keyboard navigation, search, tabs, copy controls, and mobile drawer pass the manual checklist.
- [ ] No serious or critical automated accessibility violations remain without a written, reviewer-approved exception.
- [ ] Screenshots exist for every baseline viewport.
- [ ] Technical content is accurately labelled fixture or verified.

## Evidence and decision

For each candidate:

- [ ] Capture baseline viewport screenshots.
- [ ] Record measurements according to [[OHS Documentation Engine PoC Engineering Controls]]: per-route raw and gzip HTML, CSS, first-load JavaScript, fonts, images, build time, and a separate search-index measurement. Treat total output size as diagnostic only.
- [ ] Conduct an authoring trial: add one step and one troubleshooting entry.
- [ ] Record customizations, dependencies, design deviations, and upgrade concerns.
- [ ] If real commands are available, attach clean-environment quickstart validation evidence.

Use this weighted scorecard only after all hard gates pass:

| Criterion | Weight |
|---|---:|
| Visual fidelity and responsive behaviour | 25% |
| Instruction-page authoring experience | 20% |
| Accessibility and keyboard behaviour | 15% |
| Static performance and asset footprint | 15% |
| Customization/upgrade maintenance | 15% |
| Build and review-artifact simplicity | 10% |

Commit the brief, baseline manifest, scorecard, and small measurements. Keep large screenshots and reports in workflow artifacts during development. Before the engine decision, preserve the final full evidence in approved durable storage and add durable links to `poc/results/evidence-manifest.json`. Do not commit generated sites or dependency caches.

## Completion

- [ ] Produce a completed scorecard and evidence links.
- [ ] Add an ADR update selecting an engine or recording the specific blocker.
- [ ] Preserve the comparison artifacts.
- [ ] Hand off open questions for a future production implementation.

Do not promote an engine, remove the alternative, change production hosting, or expand content during this PoC.

### Follow-on runtime question

The isolated PoC runs Node.js `24.18.0`; the current root application and deployment workflow use Node.js 20 with an `>=20` engine range. This is acceptable for an isolated, like-for-like comparison, but it is not production-build evidence. A production follow-on must decide whether to retain Node 20 or upgrade the root build/runtime, and rerun the selected implementation in that environment.

## Related

[[OHS Documentation Engine PoC Engineering Handover]]
[[OHS Documentation Engine PoC Handover Tightening Review]]
[[OHS Documentation Engine Implementation Feasibility]]
