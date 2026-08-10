---
title: Resources and contributing
description: Where the source lives, where to ask questions, and where each part of Player is maintained.
slug: /resources/
sidebar_position: 90
guide_type: Concept
guide_status: partial
guide_focus: Source repositories and community
repository: ohs-player
---

## Repositories

Each component is maintained in its own repository, which owns its build commands, API detail, releases, and issues. This site explains how the pieces relate; the repositories are authoritative for everything specific to one of them.

| Repository | Owns |
| --- | --- |
| [ohs-player](https://github.com/ohs-foundation/ohs-player) | The toolkit definition and entry point |
| [player-reference](https://github.com/ohs-foundation/player-reference) | The Kotlin Multiplatform Client App |
| [ohs-player-reference-web-portal](https://github.com/ohs-foundation/ohs-player-reference-web-portal) | The administration portal |
| [ohs-player-reference-backend](https://github.com/ohs-foundation/ohs-player-reference-backend) | Gateway endpoints and access checkers |
| [ohs-player-reference-infrastructure](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) | Shared environment deployment material |
| [ohs-player-reference-analytics](https://github.com/ohs-foundation/ohs-player-reference-analytics) | ViewDefinitions, indicators, and dashboards |
| [player-client](https://github.com/ohs-foundation/player-client) | The configurable UI library |
| [player-reference-ig](https://github.com/ohs-foundation/player-reference-ig) | The configuration implementation guide |

## Getting help

- [OHS Foundation discussions](https://github.com/orgs/ohs-foundation/discussions) for questions about Player as a whole
- The issue tracker of the owning repository for a problem with one component

Raising a component problem in its own repository reaches the people who can fix it, and keeps the answer next to the code.

## Contributing

Contributions go to the repository that owns the material, following that repository's own guidance.

For documentation, write the page in the repository the material belongs to and tell the documentation maintainers it is ready. The [submission pack](https://github.com/ohs-foundation/ohs-docs/tree/main/contributing/submission-pack) has a template for each kind of page and the details worth including.

## The wider ecosystem

Player assembles components that exist independently of it. The [OHS Foundation projects page](https://ohs.foundation/projects) is the catalogue for those components and the source for their maturity. This site covers only how Player uses them — see [How Player uses OHS components](/concepts/how-player-uses-ohs-components/).
