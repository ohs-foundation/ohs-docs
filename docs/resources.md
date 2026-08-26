---
title: Resources and contributing
description: Source repositories, community discussions, and contribution guidelines across the Open Health Stack ecosystem.
slug: /resources/
sidebar_position: 10
guide_type: Reference
guide_status: ready
guide_focus: Source repositories, community channels, and contribution guidelines
repository: ohs-player
---

## Repositories across the stack

Each Open Health Stack component is maintained in its own dedicated repository. The repositories own their build commands, test suites, API details, releases, and issue trackers.

### FHIR Foundations repositories

The core libraries and client SDKs provide the multiplatform foundation for working with FHIR data.

| Repository | Role |
| --- | --- |
| [kotlin-fhir](https://github.com/ohs-foundation/kotlin-fhir) | Kotlin Multiplatform FHIR data model and serialization |
| [kotlin-fhirpath](https://github.com/ohs-foundation/kotlin-fhirpath) | FHIRPath expression engine for Kotlin |
| [kotlin-fhir-engine](https://github.com/ohs-foundation/kotlin-fhir-engine) | On-device persistence, search, and server synchronization |
| [kotlin-fhir-data-capture](https://github.com/ohs-foundation/kotlin-fhir-data-capture) | Questionnaire rendering and data capture |

### OHS Player reference toolkit

The reference implementation demonstrates how to assemble the building blocks into working digital health applications.

| Repository | Role |
| --- | --- |
| [ohs-player](https://github.com/ohs-foundation/ohs-player) | The toolkit definition and entry point |
| [player-reference](https://github.com/ohs-foundation/player-reference) | Frontline health worker multiplatform client app |
| [ohs-player-reference-web-portal](https://github.com/ohs-foundation/ohs-player-reference-web-portal) | Administration portal for workforce and configuration |
| [ohs-player-reference-backend](https://github.com/ohs-foundation/ohs-player-reference-backend) | Gateway endpoints and access checkers |
| [ohs-player-reference-infrastructure](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) | Shared environment deployment scripts |
| [player-client](https://github.com/ohs-foundation/player-client) | Configurable multiplatform UI library |
| [player-reference-ig](https://github.com/ohs-foundation/player-reference-ig) | Declarative UI configuration implementation guide |

### Documentation and templates

| Repository | Role |
| --- | --- |
| [ohs-docs](https://github.com/ohs-foundation/ohs-docs) | Documentation site source, guides, and templates |

## Getting help and community

The Open Health Stack community collaborates across public channels and issue trackers.

- [OHS Foundation discussions](https://github.com/orgs/ohs-foundation/discussions) for architecture discussions, questions about the ecosystem, and community support
- The issue tracker of the owning repository for bugs or feature requests specific to that component

Opening an issue directly in the owning repository connects you with the maintainers of that component and keeps the resolution close to the code.

## Contributing code

Code contributions follow the workflow of the repository that owns the material.

1. Review the contribution guidelines in the target repository before starting work.
2. Open an issue or join a discussion thread to discuss proposed changes with the maintainers.
3. Submit changes via pull request with tests verifying the new behavior.

## Contributing documentation

Clear documentation is essential for developers evaluating and implementing Open Health Stack.

Documentation for individual components lives alongside the code in the respective repository, while cross-stack guides and foundational materials are published here.

The [submission pack](https://github.com/ohs-foundation/ohs-docs/tree/main/contributing/submission-pack) contains templates for each kind of document.

- Component overviews explaining capabilities and architecture
- Setup guides walking through local execution
- Core concepts explaining system design
- Technical references documenting APIs and parameters
- Configuration recipes showing practical patterns

## The wider ecosystem

Open Health Stack components exist independently of any single reference application.

The [OHS Foundation projects page](https://ohs.foundation/projects) is the official catalogue for all projects and the source for their maturity ratings. See [How Player uses OHS components](/ohs-player/how-player-uses-ohs-components/) for an explanation of how the reference stack connects them.
