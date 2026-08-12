# OHS Player documentation authoring

The public documentation content lives in `docs/`. Authors write normal Markdown and YAML frontmatter; do not edit the site shell, React components, or CSS to update a page.

## The information architecture

The sidebar is defined explicitly in `sidebars.js`, so a new file does not appear until it is listed there. That is deliberate: the order is the information architecture, not an accident of the directory tree.

The spine is the reader's journey rather than a taxonomy of document kinds:

```
Understand  ->  Run it  ->  Configure  ->  Extend  ->  Project and community
```

Each audience enters at the same place and travels a different distance. An evaluator stops after Understand. An implementor continues through Configure and Extend. A contributor arrives at Project and community.

**Section order and directory paths are independent.** Published slugs are permanent, so a page keeps its URL when it moves between sidebar sections. Decide where a page belongs for the reader in `sidebars.js`; decide where the file lives by the table below.

## Where a page goes

| Kind of page | Directory |
| --- | --- |
| A model a reader needs before acting | `docs/concepts/` |
| Component overview and its run-and-operate procedures | `docs/components/<component>/` |
| Changing behaviour without code | `docs/configure/` |
| Changing behaviour with code | `docs/extend/` |
| A recipe spanning several components | `docs/guides/` — create it when the first one exists |
| Diagrams and other page images | `docs/images/` |

Single-component procedures nest under their component. Adaptation does not: configuration goes to `configure/` and code changes to `extend/`, whichever component they touch.

Images live in `docs/images/` and are referenced with a relative path, so the build resolves them, applies the base URL, and adds a content hash. Do not put page images in `static/` — a file there is copied verbatim as well as bundled, which publishes it twice.

## Frontmatter

```md
---
title: Run the example component
description: One-sentence description shown in the page header.
slug: /components/example/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: ready
guide_focus: What this page helps an implementer do
repository: client-app
---

## Goal and scope

Write normal Markdown here.
```

Number `sidebar_position` in tens, so a page can be inserted later without renumbering its neighbours.

`repository` must be an identifier in `src/data/playerRepositories.js`; that map owns the canonical repository name, URL, role, and dependency metadata.

The shared shell renders the title, description, source link, focus, sidebar, and on-page table of contents. Every `##` heading becomes an on-page navigation entry.

### `guide_type`

The page's purpose, shown as the eyebrow above the title. Use one of `Get started`, `Component overview`, `Setup guide`, `Configuration guide`, `Extension guide`, `Concept`, `Technical reference`.

It names a kind of page, never a state. `Setup pending` is not a page type.

### `guide_status`

Internal triage state for the documentation team, one of `ready`, `partial`, `pending`. **It is not rendered**, and `npm run validate` rejects any other value.

- `ready` — source-backed and verifiable; a reader reaches a checked result
- `partial` — source-backed but incomplete upstream
- `pending` — no procedure exists yet

## Do not write about the documentation

No page tells a reader that documentation is missing. No "coming soon", "to be documented", "will be added", or "return to this page when". `npm run validate` fails the build on these phrases.

A page without a procedure describes what the component is for and links to its repository. That is useful to a reader; an apology is not.

State what the software does not do — that is a fact worth having. Do not state what the documentation does not yet cover.

## Use normal Markdown

Headings, lists, tables, links, fenced code blocks, and Docusaurus admonitions. No JSX import or HTML is required.

Start body headings at `##` — the frontmatter title is the page's `h1` — and do not skip a level. Give every image alt text describing what it shows. `npm run validate` enforces both, ignoring anything inside code fences.

Keep tables narrow. The shell makes a wide table horizontally scrollable, and a scrollable region that is not keyboard-focusable is inaccessible to keyboard users. Two or three short columns are safe on a 390px screen; a column of long prose is not. Nothing checks this automatically, so it is on the author.

## Page shape

Where source material permits it:

1. Context or scope
2. Prerequisites
3. Steps
4. Expected result or checkpoint
5. Troubleshooting, only when source-backed guidance exists
6. Next step

Do not add empty sections or invent checks to make every guide look identical.

## Landing content

`docs/landing.md` owns all landing-page text and section order. Its frontmatter supplies the hero eyebrow and actions; the rest is ordinary Markdown. Update `LandingPage.jsx` only when changing the shared landing template, not its content.

## Moving or renaming a page

Published slugs are permanent. If a page moves, add a redirect to the `@docusaurus/plugin-client-redirects` entry in `docusaurus.config.js` and update `tools/routes.json` in the same change.

## Verify an edit

On Node 24.18.0 with npm 11.16.0:

```sh
npm run validate      # frontmatter, route contract, status language, alt text, heading order
npm run check:build   # build, with broken links failing the run
npm run smoke:paths   # every route renders its expected content
```

The smoke test checks that each page renders its own frontmatter title and a reasonable amount of body text, guarding against a shared shell that drops document content. It takes those expectations from the page itself, so you never restate copy in the route contract.

## Contributions from component maintainers

Material owned by a component repository should be written there, not here. `contributing/submission-pack/` has a template for each kind of page and the details worth including.
