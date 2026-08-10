# Documentation submission pack

Templates for contributing source-backed documentation to the OHS Player documentation site.

Write your page in your **own repository**, close to the code or deployment assets it describes, so it stays next to the thing it documents and is reviewed by the people who change that thing.

**How this reaches the site today.** Open the pull request against your repository and tell the docs maintainers it is ready; they bring the material across by hand. A build that pulls Markdown directly from component repositories is the intended model but is not implemented — so nothing appears on the site automatically yet, and that is expected rather than a fault in your submission.

## Pick a template

| You are describing | Template |
| --- | --- |
| What a component is, what it demonstrates, and its boundary | [`component-overview.md`](component-overview.md) |
| How to get one component running locally | [`setup-guide.md`](setup-guide.md) |
| A task that crosses components, or has more than one supported route | [`recipe.md`](recipe.md) |
| A model a reader must understand before acting | [`core-concept.md`](core-concept.md) |
| Changing behaviour **without** touching application code | [`configuration-guide.md`](configuration-guide.md) |
| Changing behaviour **with** code | [`extension-guide.md`](extension-guide.md) |
| Lookup material — variables, APIs, versions, definitions | [`technical-reference.md`](technical-reference.md) |

If two apply, split them only when both parts are substantial and independently useful — a model people will read on its own, and a procedure people will follow on its own. Otherwise pick the primary template and link to the supporting material. Two thin pages are worse than one complete one.

## Section requirements

Different components need different shapes, so the templates are deliberately not uniform. Each template ships with every heading it might need. The table below says which to keep.

- **Required** — the page is not publishable without it.
- **Delete when not applicable** — keep the heading only when the condition described in the template holds. Delete it otherwise; never leave it empty or write "N/A".

The templates are plain Markdown skeletons. Replace the placeholder text in angle brackets, keep the required headings, and delete the conditional headings you do not need. This README is the instruction layer — no comments or hidden notes belong in a submission.

Add your own sections where the subject needs them. The table is a floor, not a ceiling.

### Required and conditional sections

Headings are listed exactly as they appear in the templates.

| Template | Required sections | Delete when not applicable |
| --- | --- | --- |
| Component overview | What it is; What it demonstrates; When to use it; What it needs; Where to start; Source and releases | What it does not connect to |
| Setup guide | Goal and scope; Prerequisites; Get the source; Install or build; Run; Verify; Next steps | Platform targets; Services this starts, and services it expects; First run and sign-in; Troubleshooting; Teardown |
| Recipe | Goal; Supported path; Requirements; Steps; Verify; Outcome and next step | Choose an approach; Checkpoints; Variations; Troubleshooting |
| Core concept | Purpose and boundary; Key terms; The main pieces and how they relate; How it works; When to use it, and when not to; Where to go next | Decision guide; Worked example |
| Configuration guide | What you can change; Where the configuration lives; The choices; A complete example; Confirm the change; Related | How configuration is resolved; Common mistakes |
| Extension guide | Why this needs code; The extension point; Before you begin; Minimal implementation; Register and load it; Verify; Related | Conventions and constraints; Compatibility — delete only if there is no public interface; Troubleshooting; Contributing it back |
| Technical reference | Scope; the reference tables; Where this is used; Source of truth | Examples; Not covered here |

One exception to "keep the required headings": in the technical reference template, `## <the reference tables>` is a placeholder for the heading itself. Replace it with one heading per group you are documenting — "Environment variables", "Endpoints", "Version compatibility" — and delete the example tables you do not need.

## Frontmatter

Three fields, plus whatever else you have. The docs team fills the rest, and the site adds its own routing fields (`slug`, `sidebar_position`).

```yaml
---
title: Run the Web Portal
description: One sentence, under 160 characters, describing what the reader gets.
repository: ohs-player-reference-web-portal
# Optional
source:
  - https://github.com/ohs-foundation/ohs-player-reference-web-portal/blob/main/docs/QUICKSTART.md
owner: Brian Otieno, Steve Kamau
applies_to: v0.3 – v0.4.x
---
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Sentence case. Starts with a verb for procedures — "Run the Web Portal", not "Web Portal setup". |
| `description` | Yes | One sentence. Used in search results and link previews. |
| `repository` | Yes | The repo that owns the material. |
| `source` | No | Permalink to the file, commit, or deployment asset the page derives from. List several if the material comes from more than one place. |
| `owner` | No | Whoever will notice when this goes stale. More than one name is fine, and so is a team where no individual owns it. |
| `applies_to` | No | A version, or a supported range. Leave it out rather than guessing. |

There is no `status` field and no `last_verified`. Status is triage state the docs team assigns on intake, not something you self-assess. And we ask for material that is **source-backed** — traceable to a script, compose file, CI job, or config default — not material you have re-run to a schedule. Asking you to certify a date would be asking for validation work the site does not need.

### What the docs team assigns

For transparency, intake adds one internal field: `status`, one of `ready`, `partial`, or `pending`. It drives the maintainer register and the capability table, is never rendered, and is not your problem.

It does have one consequence for your page: **do not tell readers that documentation is missing.** No "coming soon", no "to be documented", no progress notices. A page without a procedure describes what the component is for and links to your repository. That is useful; an apology is not.

## The evidence rule

Every command, version, port, and endpoint must be traceable to something in your repository — a script, a compose file, a CI job, a README, a config default.

If you know something works but it is not written down anywhere, that is fine — **say so in the pull request description**, not in the page:

> The gateway also accepts `AUTH_MODE=offline`, but that is not in the compose
> defaults and I have only tested it locally. Left out of the page — flagging
> in case you want to chase it.

Keep it in the pull request rather than the file. A caveat aimed at the docs team is project chatter to a reader, it makes an otherwise correct page look unreliable, and a note left in a file eventually ships.

Never present an inferred command as a verified one. A documented command that does not work costs more than a missing page.

### Why this rule exists

A real case from this project, found on 10 August 2026.

`ohs-player-reference-analytics` has a 150-line README describing a pipeline in convincing detail: twelve SQL-on-FHIR ViewDefinition files named individually — `flat_patient.json`, `flat_encounter.json`, `flat_observation.json` and nine more — plus indicator SQL and a reference Superset dashboard.

The repository contains none of them. Every directory is an empty `.gitkeep` placeholder.

Nothing about the README signals this. It is well written, specific, and describes an intended state as though it were the current one. Anyone drafting the Analytics section from it in good faith would have published a complete, confident, entirely fictional page — and the error would have surfaced only when a reader tried to follow it.

This is what the evidence rule guards against, and it is why we ask for material traceable to a script, a compose file, or a CI job rather than to a description. A README is a claim; the tree is the fact. When you write about your own component, check that the files you are describing are the files that are there.

## Before you open the pull request

Every submission:

- [ ] `title`, `description` and `repository` filled in
- [ ] Every required section from the table above present; every conditional heading either filled or deleted
- [ ] All placeholder text replaced or removed
- [ ] Every version traceable to a release source, or given as a supported range
- [ ] No "coming soon", "to be documented", or other project-status wording
- [ ] What is *not* supported or *not* connected stated explicitly, as a fact about the software rather than about the documentation
- [ ] Links point to repositories and releases, not to copies of their content
- [ ] Anything you are unsure of raised in the pull request description

Procedural pages only — setup guide, recipe, configuration guide, extension guide:

- [ ] Commands copied from an authoritative repository source or reviewed by the component maintainer
- [ ] At least one observable success check — a URL, screen, health endpoint, log line, or query result
- [ ] Known failure modes listed, with recovery steps

A component overview, core concept, or technical reference has no procedure to check and no failure to recover from. Do not invent either to satisfy a checklist.

## What not to send

- **Site pages.** Source material in your repository is enough. Cross-component narrative, reader journeys, and navigation are the documentation site's job.
- **Upstream component documentation.** FHIR Gateway, android-fhir, and other OHS components own their own docs; the site links to them.
- **Polished prose.** Reviewed commands, source-backed versions, and honest statements of what does not work are worth more than good writing.
- **Duplicated instructions.** If a procedure already exists somewhere, link to it.

## Which template each open request needs

Mapped from the v1 content request register.

| Request | Template |
| --- | --- |
| Reference Infrastructure provisioning procedure | `setup-guide` — or `recipe` if more than one supported route exists |
| Connected component contract | `technical-reference` |
| Reference data and fixture | `recipe` |
| Client App environment connection | `setup-guide` (a connected section) or `configuration-guide` |
| Portal administration integration | `component-overview` boundary statement; `setup-guide` only if the integration is supported |
| Client App local setup | `setup-guide` |
| Web Portal local setup | `setup-guide` |
| Reference Backend | `component-overview` plus `setup-guide` |
| Reference Analytics | `component-overview` plus `setup-guide` |
| Component versions and compatibility | `technical-reference` |
| Configuration model | `core-concept` plus `configuration-guide` |
| Portal and Analytics configuration | `configuration-guide` |
| Configuration versus extension boundary | `core-concept` |
| Client App extension points | `extension-guide` |
| Backend extension interfaces | `extension-guide` plus `technical-reference` |
| API and deployment reference | `technical-reference` |
| Glossary and vocabulary | `technical-reference` |
| Support and contribution path | No template — a short prose page is fine |
| Documentation ownership | No template — a process decision, not a page |
