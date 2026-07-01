# OHS Docs

Documentation site for the [Open Health Stack](https://ohs.foundation/) (OHS) project,
built with [Docusaurus](https://docusaurus.io/). It documents the OHS ecosystem across
its repositories under the [ohs-foundation](https://github.com/ohs-foundation) GitHub
organization: the Android FHIR SDK, the Kotlin FHIR Multiplatform libraries, the FHIR
Gateway, FHIR Data Pipes, the OHS Player reference implementation, and app examples.

## Local development

```bash
npm install
npm start
```

This starts a local dev server and opens a browser window at
`http://localhost:3000/ohs-docs/`. Most changes are reflected live without restarting
the server.

## Build

```bash
npm run build
```

Generates static content into the `build` directory, which can be served by any static
hosting service.

## Deployment

Pushes to `main` automatically build and deploy this site to GitHub Pages via
`.github/workflows/deploy.yml`. The repo's Settings → Pages → Source must be set to
"GitHub Actions" (one-time, manual — not part of this repo's code) for the workflow to
publish successfully.
