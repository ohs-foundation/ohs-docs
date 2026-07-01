# Docusaurus Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working Docusaurus (TypeScript, classic template) documentation site in this repo, with a unified sidebar covering every product/repo in the Open Health Stack ecosystem, deployed automatically to GitHub Pages.

**Architecture:** Scaffold the official Docusaurus classic+TypeScript template, reconcile its default `docs/` folder with this repo's existing `docs/superpowers/` (spec/plan) folder by moving Docusaurus's doc content into `docs-content/`, then layer in OHS-specific navigation, stub content pages per product, local search, and a GitHub Actions deploy workflow.

**Tech Stack:** Docusaurus 3.x (classic template, TypeScript), npm, `@easyops-cn/docusaurus-search-local`, GitHub Actions (`actions/upload-pages-artifact` + `actions/deploy-pages`).

## Global Constraints

- Node.js >= 18.0 (Docusaurus 3.x requirement).
- npm is the package manager (`package.json` + `package-lock.json`), not yarn/pnpm.
- Single evergreen version — no Docusaurus versioning.
- Blog plugin disabled — docs-only site.
- Local search via `@easyops-cn/docusaurus-search-local` — no Algolia in this iteration.
- GitHub Pages deployment via GitHub Actions — `organizationName: ohs-foundation`, `projectName: ohs-docs`.
- Existing `docs/superpowers/` folder (specs/plans) must NOT collide with the Docusaurus docs content plugin — the plugin's source path must point elsewhere (`docs-content/`).

---

### Task 1: Scaffold Docusaurus and reconcile directory layout

**Files:**
- Create (via scaffold, then moved into repo root): `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`, `docusaurus.config.ts`, `sidebars.ts`, `src/css/custom.css`, `src/pages/index.tsx`, `src/pages/index.module.css`, `src/components/HomepageFeatures/index.tsx`, `src/components/HomepageFeatures/styles.module.css`, `static/img/*` (default scaffold assets)
- Create: `docs-content/` (renamed from scaffold's default `docs/`, contains scaffold's default placeholder content for now — replaced in Task 3)
- Modify: `docusaurus.config.ts`, `sidebars.ts`, `package.json` (name field)

**Interfaces:**
- Produces: a `docs-content/` directory as the Docusaurus docs plugin source (`routeBasePath: 'docs'`), a `docsSidebar` sidebar id used by later tasks' navbar/sidebar edits, a buildable site via `npm run build`.

- [ ] **Step 1: Scaffold the classic TypeScript template into a temp directory**

```bash
TMP_DIR=$(mktemp -d)
npx create-docusaurus@latest "$TMP_DIR/site" classic --typescript --skip-install
ls "$TMP_DIR/site"
```

Expected: directory listing showing `blog/ docs/ src/ static/ docusaurus.config.ts sidebars.ts package.json package-lock.json tsconfig.json README.md .gitignore`.

- [ ] **Step 2: Move the generated files into the repo root, renaming `docs` to `docs-content`**

Run from the repo root (`/Users/claudius/github/ohs-docs`):

```bash
mv "$TMP_DIR/site/docs" ./docs-content
mv "$TMP_DIR/site/src" ./src
mv "$TMP_DIR/site/static" ./static
mv "$TMP_DIR/site/docusaurus.config.ts" ./docusaurus.config.ts
mv "$TMP_DIR/site/sidebars.ts" ./sidebars.ts
mv "$TMP_DIR/site/package.json" ./package.json
mv "$TMP_DIR/site/package-lock.json" ./package-lock.json
mv "$TMP_DIR/site/tsconfig.json" ./tsconfig.json
mv "$TMP_DIR/site/.gitignore" ./.gitignore
rm -rf "$TMP_DIR"
ls
```

Expected: repo root now contains `docs-content/ src/ static/ docusaurus.config.ts sidebars.ts package.json package-lock.json tsconfig.json .gitignore` alongside the pre-existing `docs/` (superpowers specs/plans) and `.claude/` directories. The scaffold's `blog/` and `README.md` are intentionally not copied (blog is disabled; README is replaced in Task 5).

- [ ] **Step 3: Fix the package name**

Edit `package.json`, change the `"name"` field from the scaffold's temp name to:

```json
  "name": "ohs-docs",
```

- [ ] **Step 4: Rewrite `docusaurus.config.ts` for OHS, pointing the docs plugin at `docs-content/`, and disabling the blog**

Replace the full contents of `docusaurus.config.ts` with:

```ts
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Open Health Stack Docs',
  tagline: 'Documentation for the Open Health Stack ecosystem',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ohs-foundation.github.io',
  baseUrl: '/ohs-docs/',

  organizationName: 'ohs-foundation',
  projectName: 'ohs-docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs-content',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ohs-foundation/ohs-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'OHS Docs',
      logo: {
        alt: 'Open Health Stack Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/ohs-foundation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'OHS Foundation',
              href: 'https://ohs.foundation/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ohs-foundation',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Open Health Stack Foundation.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

- [ ] **Step 5: Rename the sidebar id in `sidebars.ts`**

Replace the full contents of `sidebars.ts` with:

```ts
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [{type: 'autogenerated', dirName: '.'}],
};

export default sidebars;
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: installs successfully, creates/updates `node_modules/` and `package-lock.json` with no errors.

- [ ] **Step 7: Build and verify**

```bash
npm run build
```

Expected: `[SUCCESS] Generated static files in "build".` with no errors (warnings about the scaffold's default placeholder doc content are fine — that content is replaced in Task 3).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json .gitignore docusaurus.config.ts sidebars.ts src static docs-content
git commit -m "Scaffold Docusaurus classic TypeScript site"
```

---

### Task 2: Add local search

**Files:**
- Modify: `package.json`, `package-lock.json` (new dependency), `docusaurus.config.ts`

**Interfaces:**
- Consumes: `docusaurus.config.ts` from Task 1 (the `themeConfig`/`presets` object shape).
- Produces: a working local search box in the built site; no new interfaces consumed by later tasks.

- [ ] **Step 1: Install the plugin**

```bash
npm install --save @easyops-cn/docusaurus-search-local
```

- [ ] **Step 2: Register the theme in `docusaurus.config.ts`**

Add a top-level `themes` array to the `config` object in `docusaurus.config.ts`, immediately after the `presets` array closes (i.e. as a new sibling key before `themeConfig`):

```ts
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: `[SUCCESS] Generated static files in "build".`, and `build/` now contains a generated search index (check with `ls build/search-index.json* 2>/dev/null || find build -iname '*search*'`).

- [ ] **Step 4: Manually confirm the search box renders**

```bash
npm run serve
```

Open `http://localhost:3000/ohs-docs/` in a browser, confirm a search icon/box appears in the navbar. Stop the server (Ctrl+C) when done.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json docusaurus.config.ts
git commit -m "Add local search plugin"
```

---

### Task 3: Build the OHS sidebar structure, stub content pages, and homepage copy

**Files:**
- Delete: `docs-content/intro.md`, `docs-content/tutorial-basics/`, `docs-content/tutorial-extras/` (scaffold's default placeholder content)
- Create: `docs-content/intro.md`
- Create: `docs-content/android-fhir-sdk/_category_.json`, `docs-content/android-fhir-sdk/index.md`
- Create: `docs-content/kotlin-fhir/_category_.json`, `docs-content/kotlin-fhir/index.md`
- Create: `docs-content/fhir-gateway/_category_.json`, `docs-content/fhir-gateway/index.md`
- Create: `docs-content/fhir-data-pipes/_category_.json`, `docs-content/fhir-data-pipes/index.md`
- Create: `docs-content/ohs-player/_category_.json`, `docs-content/ohs-player/index.md`
- Create: `docs-content/fhir-app-examples/_category_.json`, `docs-content/fhir-app-examples/index.md`
- Create: `docs-content/contributing/_category_.json`, `docs-content/contributing/index.md`
- Modify: `src/pages/index.tsx`, `src/components/HomepageFeatures/index.tsx`

**Interfaces:**
- Consumes: `docsSidebar` autogenerated sidebar and `docs-content/` path from Task 1.
- Produces: final doc URLs under `/docs/<category-slug>` used by Task 5's manual verification.

- [ ] **Step 1: Remove the scaffold's placeholder doc content**

```bash
rm -f docs-content/intro.md
rm -rf docs-content/tutorial-basics docs-content/tutorial-extras
ls docs-content
```

Expected: `docs-content/` is empty.

- [ ] **Step 2: Create `docs-content/intro.md`**

```md
---
sidebar_position: 1
slug: /
---

# Introduction

Open Health Stack (OHS) is an open-source project providing a set of interoperable,
FHIR-native components for building offline-capable, mobile-first digital health
applications. Learn more at [ohs.foundation](https://ohs.foundation/) and browse the
source at [github.com/ohs-foundation](https://github.com/ohs-foundation).

This site collects documentation across the OHS ecosystem of repositories:

- **[Android FHIR SDK](/docs/android-fhir-sdk)** — Kotlin libraries for offline-capable,
  mobile-first healthcare apps on Android.
- **[Kotlin FHIR](/docs/kotlin-fhir)** — Kotlin Multiplatform implementations of the FHIR
  data model, FHIRPath, and structured data capture.
- **[FHIR Gateway](/docs/fhir-gateway)** — a generic proxy server for applying
  access-control policies for a FHIR store.
- **[FHIR Data Pipes](/docs/fhir-data-pipes)** — tools for extracting FHIR resources and
  running analytics on top of that data.
- **[OHS Player](/docs/ohs-player)** — a reference implementation showing how OHS
  components fit together end-to-end.
- **[FHIR App Examples](/docs/fhir-app-examples)** — example apps built from OHS
  components.
- **[Contributing](/docs/contributing)** — how to get involved with the OHS community.
```

- [ ] **Step 3: Create the Android FHIR SDK category**

`docs-content/android-fhir-sdk/_category_.json`:

```json
{
  "label": "Android FHIR SDK",
  "position": 2
}
```

`docs-content/android-fhir-sdk/index.md`:

```md
---
sidebar_position: 1
---

# Android FHIR SDK

The Android FHIR SDK is a set of Kotlin libraries for building offline-capable,
mobile-first healthcare applications using the HL7® FHIR® standard on Android.

Source: [github.com/ohs-foundation/android-fhir](https://github.com/ohs-foundation/android-fhir)
```

- [ ] **Step 4: Create the Kotlin FHIR category**

`docs-content/kotlin-fhir/_category_.json`:

```json
{
  "label": "Kotlin FHIR",
  "position": 3
}
```

`docs-content/kotlin-fhir/index.md`:

```md
---
sidebar_position: 1
---

# Kotlin FHIR

Kotlin FHIR is a lean and fast implementation of the HL7® FHIR® data model on Kotlin
Multiplatform. Related libraries in this family:

- **[kotlin-fhir](https://github.com/ohs-foundation/kotlin-fhir)** — the core FHIR data
  model implementation.
- **[kotlin-fhirpath](https://github.com/ohs-foundation/kotlin-fhirpath)** — an
  implementation of FHIRPath on Kotlin Multiplatform.
- **[kotlin-fhir-engine](https://github.com/ohs-foundation/kotlin-fhir-engine)** — a FHIR
  storage/engine layer for Kotlin Multiplatform.
- **[kotlin-fhir-data-capture](https://github.com/ohs-foundation/kotlin-fhir-data-capture)**
  — a Kotlin Multiplatform structured data capture library based on FHIR Questionnaires.
- **[kotlin-fhirpath-server](https://github.com/ohs-foundation/kotlin-fhirpath-server)** —
  a server exposing FHIRPath evaluation.
```

- [ ] **Step 5: Create the FHIR Gateway category**

`docs-content/fhir-gateway/_category_.json`:

```json
{
  "label": "FHIR Gateway",
  "position": 4
}
```

`docs-content/fhir-gateway/index.md`:

```md
---
sidebar_position: 1
---

# FHIR Gateway

A generic proxy server for applying access-control policies for a FHIR store.

Source: [github.com/ohs-foundation/fhir-gateway](https://github.com/ohs-foundation/fhir-gateway)
```

- [ ] **Step 6: Create the FHIR Data Pipes category**

`docs-content/fhir-data-pipes/_category_.json`:

```json
{
  "label": "FHIR Data Pipes",
  "position": 5
}
```

`docs-content/fhir-data-pipes/index.md`:

```md
---
sidebar_position: 1
---

# FHIR Data Pipes

A collection of tools for extracting FHIR resources and analytics services on top of
that data.

Source: [github.com/ohs-foundation/fhir-data-pipes](https://github.com/ohs-foundation/fhir-data-pipes)
```

- [ ] **Step 7: Create the OHS Player category**

`docs-content/ohs-player/_category_.json`:

```json
{
  "label": "OHS Player",
  "position": 6
}
```

`docs-content/ohs-player/index.md`:

```md
---
sidebar_position: 1
---

# OHS Player

OHS Player is a reference implementation showing how Open Health Stack components fit
together end-to-end, made up of several repositories:

- **[ohs-player-reference-backend](https://github.com/ohs-foundation/ohs-player-reference-backend)**
  — backend for the KMP and web portal clients, including custom endpoints and access
  checker plugins.
- **[ohs-player-reference-web-portal](https://github.com/ohs-foundation/ohs-player-reference-web-portal)**
  — a web-based management tool for healthcare organizations to manage workforce
  hierarchies.
- **[ohs-player-reference-client-app](https://github.com/ohs-foundation/ohs-player-reference-client-app)**
  — a KMP-based configurable reference client application built with OHS components.
- **[ohs-player-reference-infrastructure](https://github.com/ohs-foundation/ohs-player-reference-infrastructure)**
  — deployment scripts and images for packaging and deploying an OHS-based project.
- **[ohs-player-reference-analytics](https://github.com/ohs-foundation/ohs-player-reference-analytics)**
  — analytics pipeline, ViewDefinitions, and reference dashboards.
- **[ohs-player-config-ig](https://github.com/ohs-foundation/ohs-player-config-ig)** —
  configuration implementation guide for OHS Player.
```

- [ ] **Step 8: Create the FHIR App Examples category**

`docs-content/fhir-app-examples/_category_.json`:

```json
{
  "label": "FHIR App Examples",
  "position": 7
}
```

`docs-content/fhir-app-examples/index.md`:

```md
---
sidebar_position: 1
---

# FHIR App Examples

Contains examples of how Open Health Stack components can be used together as the
foundation for FHIR-based digital health solutions.

Source: [github.com/ohs-foundation/fhir-app-examples](https://github.com/ohs-foundation/fhir-app-examples)
```

- [ ] **Step 9: Create the Contributing category**

`docs-content/contributing/_category_.json`:

```json
{
  "label": "Contributing",
  "position": 8
}
```

`docs-content/contributing/index.md`:

```md
---
sidebar_position: 1
---

# Contributing

The OHS community develops proposals and experiments in the open:

- **[ohs-labs](https://github.com/ohs-foundation/ohs-labs)** — quick AI experiments that
  could be rolled into future OHS features or capabilities.
- **[technical-docs](https://github.com/ohs-foundation/technical-docs)** — community
  developed proposals for product management and technical documents.

To propose a change to this documentation site, open a pull request against
[ohs-foundation/ohs-docs](https://github.com/ohs-foundation/ohs-docs).
```

- [ ] **Step 10: Update the homepage hero copy in `src/pages/index.tsx`**

Open `src/pages/index.tsx`. In the `HomepageHeader` component, replace the `<Heading>` and `<p>` tagline text and the button, so the relevant JSX block reads:

```tsx
        <Heading as="h1" className="hero__title">
          Open Health Stack
        </Heading>
        <p className="hero__subtitle">
          Documentation for the Open Health Stack ecosystem
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/">
            Read the docs
          </Link>
        </div>
```

- [ ] **Step 11: Update the feature cards in `src/components/HomepageFeatures/index.tsx`**

Replace the `FeatureList` array in `src/components/HomepageFeatures/index.tsx` with:

```tsx
const FeatureList: FeatureItem[] = [
  {
    title: 'FHIR-Native',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every OHS component speaks HL7® FHIR® natively, from the Android SDK to the
        server-side gateway and data pipeline tools.
      </>
    ),
  },
  {
    title: 'Multiplatform',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Kotlin Multiplatform libraries like kotlin-fhir and kotlin-fhirpath let you
        share FHIR logic across Android, iOS, and server targets.
      </>
    ),
  },
  {
    title: 'Reference Implementation Included',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        OHS Player shows every layer — backend, web portal, client app, and
        analytics — wired together end-to-end.
      </>
    ),
  },
];
```

- [ ] **Step 12: Build and verify**

```bash
npm run build
```

Expected: `[SUCCESS] Generated static files in "build".`

- [ ] **Step 13: Manually confirm the sidebar**

```bash
npm run serve
```

Open `http://localhost:3000/ohs-docs/docs/`, confirm the left sidebar shows, in order: Introduction, Android FHIR SDK, Kotlin FHIR, FHIR Gateway, FHIR Data Pipes, OHS Player, FHIR App Examples, Contributing. Click into two or three categories to confirm their stub pages render. Stop the server (Ctrl+C) when done.

- [ ] **Step 14: Commit**

```bash
git add docs-content src/pages/index.tsx src/components/HomepageFeatures/index.tsx
git commit -m "Add OHS sidebar structure, stub content pages, and homepage copy"
```

---

### Task 4: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `npm run build` (Task 1) producing a `build/` directory.
- Produces: nothing consumed by later tasks in this repo; the deployed site is validated by GitHub after the first push to `main` (outside this plan's local control).

- [ ] **Step 1: Create the workflow file**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate the workflow YAML syntax**

```bash
python3 -c "import yaml, sys; yaml.safe_load(open('.github/workflows/deploy.yml'))" && echo "valid yaml"
```

Expected: `valid yaml` printed with no errors.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow to deploy docs to GitHub Pages"
```

---

### Task 5: Project README and final verification

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: all prior tasks' `npm run build`/`npm start` behavior.
- Produces: nothing consumed elsewhere — this is the final task.

- [ ] **Step 1: Write the root README**

`README.md`:

```md
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
```

- [ ] **Step 2: Full local verification**

```bash
npm run build && npm run serve
```

Open `http://localhost:3000/ohs-docs/` and confirm:
- The homepage loads with the "Open Health Stack" hero and three feature cards.
- The navbar shows Docs, GitHub, and a search icon.
- Clicking "Read the docs" lands on the Introduction page with links to all seven
  category pages.
- The footer shows links to ohs.foundation and GitHub.

Stop the server (Ctrl+C) when done.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Add project README"
```

---

## Post-plan manual step (not part of this repo's code)

After merging this work to `main`, enable GitHub Pages once in the repo's settings:
**Settings → Pages → Build and deployment → Source → GitHub Actions**. The next push to
`main` (or a manual `workflow_dispatch` run) will then publish the site to
`https://ohs-foundation.github.io/ohs-docs/`.
