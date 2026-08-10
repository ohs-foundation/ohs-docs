---
title: Contributing
description: How to propose changes to Open Health Stack components and to this documentation site.
sidebar_position: 1
guide_type: Community
guide_status: Guidance available
guide_focus: Proposals and documentation changes
repository: ohs-docs
---

## Where work happens

The OHS community develops proposals and experiments in the open:

- **[ohs-labs](https://github.com/ohs-foundation/ohs-labs)** — quick AI experiments that
  could be rolled into future OHS features or capabilities.
- **[technical-docs](https://github.com/ohs-foundation/technical-docs)** — community
  developed proposals for product management and technical documents.

Component APIs, releases, and bugs are handled in the repository that owns the component.
Use the source link on each component page to get there.

## Changing this site

Content lives in `docs-content/` as Markdown, one directory per component. To propose a
change, open a pull request against
[ohs-foundation/ohs-docs](https://github.com/ohs-foundation/ohs-docs).

Every page is rendered by a shared shell that reads its title, description, and metadata
from frontmatter, so a new page needs `title`, `description`, and the `guide_*` keys
documented in `AUTHORING.md` in the repository root. Run `npm run build` and
`npm run check` before opening the pull request: together they verify the route contract
and that every internal link resolves to a page the build produced.
