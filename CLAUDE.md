# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Docusaurus 3 documentation site for OHS Player, published at `https://ohs-foundation.github.io/ohs-docs/`. Docs-only mode: `routeBasePath` is `/`, blog disabled, `baseUrl` is `/ohs-docs/`. It documents how to evaluate, run, configure, and extend the Player reference components; it does not duplicate the wider OHS component catalogue or per-repository build/API detail.

## Commands

Requires exactly Node 24.18.0 and npm 11.16.0 — `check:build` asserts the exact versions and fails otherwise.

```bash
npm install
npm start             # dev server at http://localhost:3000/ohs-docs/

npm run validate      # frontmatter, route contract, banned status language, alt text, heading order
npm run check:build   # production build into build/, broken links fail the run
npm run smoke:paths   # every route in tools/routes.json renders its title, body, links, search entry
npm run gates         # all three in order
```

`smoke:paths` reads `build/` output, so run `check:build` first (or use `gates`). All three gates are pure Node with no browser or network; CI (`.github/workflows/checks.yml`) runs `npm run gates` on every PR, and deploy re-runs validate + build.

## Architecture

- **`sidebars.js` is the information architecture**, defined explicitly — a new Markdown file does not appear until it is listed there. The site has multiple sidebars: `playerReference` is the reader's journey (Understand → Run it → Configure → Extend → Project and community), and each documentation *section* gets its own sidebar (`fhirFoundations` under `docs/fhir-foundations/` is the first; future sections like player-client-app follow the same pattern — directory, sidebar, routes.json entries, landing-page entry point, SectionNav entry in GuideShell). Displayed terminology must follow the Foundation's taxonomy at ohs.foundation/projects: "FHIR Foundations" (plural) is a *pillar*, its projects are "Core Library" and "SDK", and "group" is not an official term. Sidebar order and directory paths are deliberately independent: a component's overview sits in Understand while its run guide sits in Run it.
- **Custom shell over Docusaurus routing**: `src/theme/DocItem/Layout/index.js` swizzles the doc layout and routes every page into `src/components/ohs/GuideShell.jsx` (or `LandingPage.jsx` when frontmatter has `page_type: landing`). The shell renders title, description, `guide_type` eyebrow, source-repository link, and TOC from frontmatter — authors write plain Markdown and never touch React/CSS to update a page. It must wrap children in `MDXContent`, otherwise code highlighting and `:::note` admonitions silently break.
- **`src/data/playerRepositories.js`** is the canonical map of repository names, URLs, roles, and dependencies. A page's `repository:` frontmatter key must be an identifier from this map. Note: `analytics` intentionally points at the infrastructure repository — there is no separate analytics repo, and `validate` enforces that the analytics pages link the infrastructure and fhir-data-pipes repos.
- **`tools/routes.json` is the route contract**: the list of paths that must exist (all under `/ohs-docs/` with trailing slash). Add an entry when adding a page. It deliberately does not restate page copy — `smoke:paths` derives each page's expected title from the page's own frontmatter.
- **Published slugs are permanent.** When a page moves or is renamed, add a redirect to `@docusaurus/plugin-client-redirects` in `docusaurus.config.js` and update `tools/routes.json` in the same change.

## Authoring rules (enforced by `npm run validate`)

See AUTHORING.md for the full conventions. The ones the gates hard-fail on:

- Every page needs `title`, `description`, and `slug` frontmatter. `guide_status` must be `ready`, `partial`, or `pending` (internal triage state, never rendered).
- Never write that documentation is missing — phrases like "coming soon", "to be documented", "will be added" fail the build. A page without a procedure describes what the component is for and links to its repository.
- Body headings start at `##` (frontmatter title is the h1) and must not skip a level.
- Every image needs non-empty alt text.
- Displayed text must contain no em dashes, semicolons, or colons — anywhere: prose, headings, table cells, and rendered frontmatter values (title, description, sidebar_label, guide_focus, eyebrow, labels). Restructure sentences instead. Code syntax, URLs, and frontmatter keys are exempt, but human-readable code comments follow the rule.

Other conventions: number `sidebar_position` in tens; put page images in `docs/images/` (relative paths), never in `static/` (that publishes them twice); `docs/landing.md` owns all landing-page content — edit `LandingPage.jsx` only to change the template. Material owned by a component repository belongs in that repository; `contributing/submission-pack/` has the templates maintainers use.
