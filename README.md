# OHS Docs

Documentation site for [OHS Player](https://github.com/ohs-foundation/ohs-player), the cross-stack reference toolkit for [Open Health Stack](https://ohs.foundation/), built with [Docusaurus](https://docusaurus.io/).

The site covers how to evaluate, run, configure, and extend the Player reference components. It does not duplicate the wider OHS component catalogue — the [OHS Foundation projects page](https://ohs.foundation/projects) owns that, and each component repository owns its own build commands, API detail, and releases.

## Layout

```
docs/          Markdown content, one directory per section
src/           The site shell: components, theme, CSS
sidebars.js    The information architecture, defined explicitly
tools/         Quality gates and the route contract
contributing/  Templates for component maintainers submitting content
```

## Local development

Requires Node 24.18.0 and npm 11.16.0, which the quality gates check exactly.

```bash
npm install
npm start
```

This serves the site at `http://localhost:3000/ohs-docs/` with live reload.

## Quality gates

The same four checks run locally, on every pull request, and before any deployment.

```bash
npm run validate      # frontmatter, route contract, reader-facing status language
npm run check:build   # production build, with broken links failing the run
npm run smoke:paths   # every route renders its expected content and search index
npm run a11y          # Axe and keyboard checks at desktop and mobile viewports
```

`tools/routes.json` is the route contract: every published path, with the heading and content the smoke test asserts. Add an entry when you add a page.

## Authoring

See [AUTHORING.md](AUTHORING.md) for where a page goes, what its frontmatter means, and the conventions the gates enforce.

Component maintainers contributing material about their own component should use [`contributing/submission-pack/`](contributing/submission-pack/) and write the page in their own repository.

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml`, after the gates pass. The repository's Settings → Pages → Source must be set to "GitHub Actions" — a one-time manual step, not part of this repository.
