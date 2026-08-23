---
title: Extend the Web Portal
description: Add screens, gateway endpoints, resource types, and permissions to the reference portal or to your own.
slug: /extend/web-portal-extensions/
sidebar_position: 30
guide_type: Extension guide
guide_status: ready
guide_focus: Adapting the Portal in code
repository: web-portal
---

## Two things you can build on

The repository holds a library and an application, and choosing between them is the first decision.

`ohs-player-web-core` is published separately and carries everything that is not a screen. Sign-in over OpenID Connect, roles and permissions, the FHIR client and its data hooks, feature flags, the theme engine, translation, and the helpers for transaction bundles and audit events. It ships behaviour, not appearance.

The application holds the screens and the visual components they are made of. Buttons, cards, tables, drawers, and the seven feature areas.

The rule between them is one way. The library never imports from the application. If you are writing something reusable and reach for an application component, that is the signal it belongs on the application side.

**Building an administration interface of your own** means depending on the library and writing your own screens. You keep sign-in, permissions, the FHIR client, and theming, and you write nothing that the reference application's screens would have constrained.

**Adapting the reference application** means the rest of this page.

## Add a screen behind a flag

Four steps, in the order the checks run.

1. Add the variable to `.env`, following the existing naming, for example `VITE_FLAG_MY_FEATURE=true`.
2. Expose it in `apps/ohs-player-web/src/config/env.ts` alongside the other flags.
3. Add the key to `flags.flags` in `apps/ohs-player-web/src/config/platform.ts`.
4. Register the route in `AppRoutes.tsx` inside the shared `ProtectedRoute`, giving it the flag and a permission, then add the sidebar entry in `AppLayout.tsx`.

`ProtectedRoute` runs the flag check, the session check, and the permission check in that order, so a screen behind it behaves like every other screen without you repeating the logic. The sidebar entry needs the same flag and permission, because navigation is filtered separately from routing.

## Call a gateway endpoint that is not FHIR

The FHIR client already knows how to reach the gateway. Register a name for the path and use it.

1. Add an alias to `customEndpoints` in `platform.ts`, for example `myAction` mapping to `/api/my-action`.
2. In a component, take the mutations you need from the alias.

```ts
const { get, post, put } = useCustomEndpoint('myAction');
await post.mutateAsync(body);
```

The client resolves the alias against the gateway root, which it derives by removing a trailing `/fhir` from the FHIR base URL. It sends and expects ordinary JSON on these calls rather than FHIR JSON, attaches the bearer token, and retries once when the token has just expired.

Error shapes differ between the two backends and the client already absorbs the difference. A FHIR error arrives as an `OperationOutcome`, while a gateway error arrives as a plain JSON object carrying a message. Both surface as the same error type with a status and a readable message, so a caller does not need to know which backend answered.

## Add a resource type to the FHIR Viewer

The viewer is registry-driven, so a new type is one row and one label. No screens, routes, or components change.

1. Add an entry to `ENTRIES` in `apps/ohs-player-web/src/features/fhir-viewer/registry.ts`, in the form of the resource type, the search parameter to filter by, and optionally a status facet. Use `name` as the search parameter only when the type declares one, and `_id` otherwise. Add the status facet only where the type has a plain `active` or `status` search parameter.
2. Add its label to `appMessages.ts` under a key named for the type, with the FHIR spelling humanised.

A test asserts every registry entry against the backend's advertised capabilities, so a type the server does not serve fails the build rather than shipping a screen that cannot load. That is what keeps a label from a design mockup out of the viewer when no such FHIR resource type exists.

## Change who can do what

The permission table lives in `permissionMap` in `platform.ts`, mapping each permission to the roles allowed to hold it. Editing it is a code change and needs a rebuild. Granting an existing role to a person is not, and is covered in [who can reach what](/configure/web-portal-access/).

Give a new screen its own permission rather than reusing a neighbouring one. Permissions are what every guard, button, and menu item checks, so a shared key quietly grants more than it looks like it does.

Two permissions in the shipped table name a role after the endpoint it protects rather than after a portal capability. Those exist because the gateway enforces its own roles on the location hierarchy and bulk import endpoints, so the Portal checks the same role the backend will check and avoids offering a button that is certain to fail.

## Restyle it

Pass a different theme to the core provider. The theme engine writes design tokens as CSS custom properties prefixed `--ohs-`, applying them to the application root and to the document element so that dialogs and menus rendered outside the tree inherit them too.

Colour, typography, and radius are supplied through configuration. The rest of the token set, including the neutral scale and the dark palette, lives in the application's stylesheet. No component needs forking to reskin the Portal.

## Conventions worth keeping

Three habits run through the codebase, and an extension that breaks them will feel foreign.

- **Deactivate rather than delete.** Setting a resource inactive is the default across every screen. The FHIR Viewer is the deliberate exception, because it is a raw administrative tool where deactivation does not generalise across arbitrary resource types.
- **Audit every mutation.** Writes record a FHIR `AuditEvent` through the shared helper, which supplies the signed-in user and the affected resource. Reads are not audited.
- **Write across resources in one transaction.** Where a change touches several resources, the screens send a single transaction bundle rather than a sequence of requests, so a partial save is not possible.

## When to build your own instead

Adapting the reference application is right while your administration model resembles the one it demonstrates, meaning organisations, locations, care teams, and practitioners held in FHIR with an identity account beside each person.

Once your screens, workflow, or data model diverge enough that you are rewriting each feature area, depend on the library and write the interface you actually need. The library is the supported surface, and the application is a demonstration of one way to use it.

## Where to go next

[What each screen does](/components/web-portal/screens/) shows the patterns above as the existing screens use them, which is the fastest way to see the conventions in practice.

The [ohs-player-reference-web-portal repository](https://github.com/ohs-foundation/ohs-player-reference-web-portal) carries the library's full API reference and its architecture notes.
