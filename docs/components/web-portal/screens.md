---
title: What each screen does
description: The Portal screens and the FHIR resources and gateway endpoints each one reads and writes.
slug: /components/web-portal/screens/
sidebar_position: 30
guide_type: Technical reference
guide_status: ready
guide_focus: Tracing a Portal screen to the data it touches
repository: web-portal
---

## The screens

Seven screens, each behind a feature flag and a permission. A screen whose flag is off or whose permission the account lacks disappears from the sidebar rather than appearing greyed out.

| Screen | Path | Writes to |
| --- | --- | --- |
| Dashboard | `/` | Nothing |
| Users | `/users` | Gateway and FHIR |
| Locations | `/locations` | FHIR |
| Organisations | `/organizations` | FHIR |
| Care Teams | `/care-teams` | FHIR |
| Setup Wizard | `/setup` | Gateway and FHIR |
| FHIR Viewer | `/resources` | FHIR |

Two habits run through all of them. Removing something almost always means marking it inactive rather than deleting it, and every write records a FHIR `AuditEvent` afterwards.

## Dashboard

Read only. It issues twelve searches on load. For each of `Practitioner`, `Location`, `Organization`, and `CareTeam` it asks for a total count, an active count, and the five most recently updated records.

The inactive figure in each chart is the difference between those two counts rather than a query of its own. The recent tables come from the resources themselves, sorted by last update, so they are not an activity log. The activity log lives in the bell in the top bar.

## Users

The screen a reader most often misreads, because one user is two things. An identity account the person signs in with, and a `Practitioner` record with roles and team memberships hanging off it.

**Creating a user** posts to `/api/users` on the gateway, which owns the identity account and the `Practitioner` record together. The Portal then sends one FHIR transaction for the parts it owns, meaning a `PractitionerRole` for each selected organisation and an added participant on each selected care team.

**Editing a user** puts to `/api/users/{id}`, then replaces that practitioner's `PractitionerRole` records and adjusts care team membership in a single transaction. Changing an email address does not rename the identity account, because the original username is preserved deliberately.

**Deactivating a user** is FHIR only. It sets `Practitioner.active` to false, end-dates the roles, and removes the person from their care teams. It does not disable the identity account, even though the confirmation dialog says the user will no longer be able to sign in. Disable the account in the identity provider as well when that matters.

Two smaller things worth knowing. The Identifier column shows the FHIR resource id rather than a business identifier. The Role field writes a clinical role onto `PractitionerRole`, such as nurse or pharmacist, and has nothing to do with the realm roles that decide what the Portal itself allows.

## Locations

Reading and writing use different routes, which explains the screen's behaviour under load and after an edit.

Reading the tree calls `/api/location-hierarchy/{rootId}` on the gateway. That endpoint returns a prebuilt tree rather than a page of FHIR resources, and the Portal caches it for the session. The list of available roots is a separate FHIR search for locations that have no parent.

Writing goes straight to FHIR. Creating and editing a location posts or puts a `Location`, and the hierarchy endpoint is never written to. After an edit the Portal patches its cached tree immediately and refreshes it again a minute later, because the FHIR server caches search results for sixty seconds and an immediate rebuild can still return the old shape.

Editing a location also writes a `QuestionnaireResponse`. The location form is the one form in the Portal driven by a bundled FHIR `Questionnaire`, so the answers are recorded as well as applied.

**Bulk import** uploads a CSV to `/api/bulk-import/locations` and streams progress back as rows are processed. The template it offers carries these columns, and only `name` is required.

```
name,id,physical_type,level,latitude,longitude,source_id,parent_id,source_parent_id,org_id,source_org_id
```

The level badge on each row comes from an administrative-level coding on the location itself, not from how deep the row sits in the tree. Locations imported without that coding show no level.

## Organisations

One atomic transaction does the whole save. It creates or updates the `Organization` and patches the `managingOrganization` of every location you linked or unlinked in the same request, so a half-applied link is not possible.

Deactivating sets `active` to false. As with users, nothing is deleted. The organisation type comes from the HL7 organization-type code system, and the resource id doubles as the identifier, so there is no separate identifier field to fill in.

## Care Teams

Creating and editing writes a `CareTeam`. The description is stored as a note on the resource, and each member becomes a participant carrying a clinical role coding.

The control labelled Delete does not delete. It sets the team's status to inactive, which is why the confirmation offers to retire it and mentions that it can be reactivated later.

## Setup Wizard

For a new environment. The Portal offers it automatically the first time an administrator opens a store that holds no locations and no organisations, and only once per browser tab.

The draft lives in the browser tab while you work, so closing the tab loses it. Committing runs in two phases, and the difference matters when something fails.

- **Phase one** sends every location, organisation, affiliation, and care team as one atomic transaction. It either all lands or none of it does.
- **Phase two** creates the users one at a time through the gateway. A failure stops that user only, and the review step lets you retry the ones that failed without repeating phase one.

## FHIR Viewer

An administrator's window onto the store, covering thirty-four resource types. Each type gets a searchable, filterable, paged list, and each record opens as raw JSON.

This is the one screen that deletes for real. A delete here is a FHIR `DELETE`, gated to administrators and behind a confirmation, and it can fail if other resources still reference the record. Editing is raw JSON with `resourceType` and `id` held immutable, and the Portal detects a record that changed underneath you and asks you to reload rather than overwriting the newer version.

A type the backend does not serve shows a not-available state instead of an error. When a type is served but empty, the Portal shows one bundled example record, labelled as an example, so you can see the shape before creating anything.

## The audit trail

Every mutation across the Portal writes a FHIR `AuditEvent` naming the action, the signed-in user, and the affected resource. Reads are never audited, so the trail is a record of change rather than of access.

The bell in the top bar reads the twelve most recent of those events back. It is a view of the audit trail rather than a notification system, so there is no unread count and nothing arrives while you watch it.

## Global search

The search box in the top bar queries four resource types by name, returning at most five matches each. Choosing a result opens that type's list screen with the search term applied rather than jumping to the individual record.

## Limits worth knowing before a demonstration

- **The lists fetch a capped page.** Between two hundred and five hundred records depending on the screen, then filter and paginate in the browser. Past the cap, records are missing from both the table and its search box.
- **Export does not export.** The control shows a notice.
- **Deactivating a user leaves the identity account enabled**, as described above.
- **The Locations screen has its own permission.** It needs the `location-hierarchy.view` realm role, while the sidebar link only checks a general locations permission, so the link can be visible to an account the screen then refuses. [Who can reach what](/configure/web-portal-access/) has the detail.
