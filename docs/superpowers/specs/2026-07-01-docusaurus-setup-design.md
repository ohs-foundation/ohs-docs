# Docusaurus Setup for OHS Docs — Design

## Context

`ohs-docs` is the documentation repository for the Open Health Stack (OHS) project
(https://ohs.foundation/), an open-source ecosystem of ~20 repos spanning Android/Kotlin
FHIR SDKs (`android-fhir`, `kotlin-fhir`, `kotlin-fhirpath`, `kotlin-fhir-engine`,
`kotlin-fhir-data-capture`, `kotlin-fhirpath-server`), server-side tooling
(`fhir-gateway`, `fhir-data-pipes`), the OHS Player reference implementation
(`ohs-player-reference-backend`, `-web-portal`, `-client-app`, `-infrastructure`,
`-analytics`, `-config-ig`), examples (`fhir-app-examples`), and community/experimental
repos (`ohs-labs`, `technical-docs`).

The repo currently has no commits and no scaffolding. This spec covers setting up a
Docusaurus site as a **project-level documentation hub**: a single site, living in this
repo, that documents the OHS ecosystem across all of these repos. It is not meant to pull
content from those other repos automatically — content is authored directly here.

## Goals

- Stand up a working Docusaurus site in this repo that runs locally via `npm start`.
- Organize a single, unified docs sidebar with top-level categories per product/repo
  group, seeded with stub landing pages (deep content to be filled in later).
- Wire up automatic deployment to GitHub Pages on push to `main`.

## Non-goals

- Writing the actual in-depth product documentation content (follow-up work).
- Pulling/syncing docs content from the other OHS repos (e.g. via submodules or sync
  scripts) — out of scope for this iteration.
- Docusaurus versioning — this is a single evergreen-version site.
- Custom domain / DNS setup (e.g. `docs.ohs.foundation`) — can be added later via a
  `CNAME` file once DNS is ready.
- Algolia DocSearch integration — local search is sufficient to start.

## Tech stack

- **Docusaurus classic template, TypeScript** (`npx create-docusaurus@latest . classic --typescript`,
  adapted to scaffold into the existing repo root rather than a new directory).
- **npm** as the package manager (`package.json` + `package-lock.json`).
- Blog plugin **disabled** in `docusaurus.config.ts` — docs-only site.
- Local full-text search via `@easyops-cn/docusaurus-search-local` (no external account
  needed; can be swapped for Algolia DocSearch later once the site is public).

## Site structure

Navbar: **Home** / **Docs** / **GitHub** (link to the `ohs-foundation` GitHub org).
Footer: links to `ohs.foundation` and the GitHub org.

Unified docs sidebar, top-level categories (each seeded with one stub landing page):

1. **Introduction** — what OHS is, high-level project architecture overview
2. **Android FHIR SDK** *(android-fhir)*
3. **Kotlin FHIR** *(kotlin-fhir, kotlin-fhirpath, kotlin-fhir-engine,
   kotlin-fhir-data-capture, kotlin-fhirpath-server)*
4. **FHIR Gateway** *(fhir-gateway)*
5. **FHIR Data Pipes** *(fhir-data-pipes)*
6. **OHS Player** *(ohs-player-reference-backend, -web-portal, -client-app,
   -infrastructure, -analytics, -config-ig)*
7. **FHIR App Examples** *(fhir-app-examples)*
8. **Contributing** — links out to `ohs-labs` and `technical-docs` community proposals

Each stub page contains a short description (pulled from the repo's GitHub description)
and a link to the corresponding GitHub repo, as a placeholder for future detailed content.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Triggers on push to `main` (and can be run manually via `workflow_dispatch`).
- Installs dependencies, runs `npm run build`.
- Deploys the built `build/` directory to GitHub Pages using
  `actions/upload-pages-artifact` + `actions/deploy-pages`.

Requires enabling GitHub Pages in the repo settings with source "GitHub Actions" (a
manual one-time step outside this repo's code — will be called out after implementation).

Initial URL: `https://ohs-foundation.github.io/ohs-docs/`. `docusaurus.config.ts` will
set `url`/`baseUrl` accordingly.

## Testing / validation

- `npm start` runs locally without errors and all sidebar categories/pages render.
- `npm run build` completes successfully (this is also what CI runs, so a local build
  is the main validation gate here).
- Manually spot-check the GitHub Actions workflow syntax; full validation of the deploy
  happens on first push to `main` (out of this task's local-only control).

## Follow-up work (explicitly out of scope here)

- Filling in real documentation content per product.
- Custom domain setup.
- Algolia DocSearch application once the site is public.
- Deciding whether/how to sync content from individual product repos over time.
