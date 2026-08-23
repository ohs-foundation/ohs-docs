---
title: Who can reach what
description: The realm roles behind the Portal permissions, and how a screen decides whether to appear.
slug: /configure/web-portal-access/
sidebar_position: 30
guide_type: Configuration guide
guide_status: ready
guide_focus: Granting Portal access through identity roles
repository: web-portal
---

## Two layers, not one

Access to a Portal screen is decided in two places, and confusing them is the usual reason someone has the access they expected in one place and not another.

The identity provider owns the roles. A realm role is granted to a user in Keycloak, and it travels in the access token the Portal receives at sign-in.

The Portal owns the mapping from roles to permissions. It ships a table of permissions, each naming the roles allowed to hold it, and every screen and button checks a permission rather than a role. Granting access is therefore an identity task. Changing what a permission means is a code change.

## What each screen needs

| Screen | To open it | To change things |
| --- | --- | --- |
| Dashboard | `admin` or `care-team-manager` | Read only |
| Users | `admin` or `care-team-manager` | `admin` |
| Locations | `admin` or `location-hierarchy.view` | `admin`, and `bulk-import.manage` to import |
| Organisations | `admin` or `care-team-manager` | `admin` |
| Care Teams | `admin` or `care-team-manager` | `admin` or `care-team-manager` |
| Setup Wizard | `admin` | `admin` |
| FHIR Viewer | `admin` or `care-team-manager` | `admin` |

Care Teams is the one place a manager can change data as well as read it. Everywhere else, changing something is reserved for `admin`.

## The roles in the shipped realm

The imported `ohs` realm defines eight roles. Four of them appear in the table above. The rest are named for backend capabilities and are granted to the administrator account, but the Portal itself never checks them.

| Role | Used by |
| --- | --- |
| `admin` | The Portal, for everything |
| `care-team-manager` | The Portal, for reading and for care team changes |
| `location-hierarchy.view` | The Portal, for the Locations screen |
| `bulk-import.manage` | The Portal, for location import |
| `users.manage`, `groups.manage`, `roles.view`, `practitioner-details.view` | The backend endpoints the Portal calls |

That last row explains a failure mode worth anticipating. An account can pass the Portal's own check, see the screen, press the button, and still be refused by the gateway, because the gateway enforces its own roles on the endpoint underneath. A refusal that arrives only after you act usually means the identity account is missing one of those backend roles.

## The two demo accounts

| Account | Roles | Reaches |
| --- | --- | --- |
| `admin-user` | `admin` and every backend role | Everything |
| `manager-user` | `care-team-manager` and `location-hierarchy.view` | Every screen except the Setup Wizard |

`manager-user` is the more interesting one to sign in as, because it shows what the Portal looks like when most of the buttons are simply absent.

## How a screen decides to appear

Three checks run in order, and the first one to fail ends it.

1. **The feature flag.** A screen whose flag is off does not exist in this build. [Configure the Web Portal](/configure/web-portal-configuration/) lists the flags.
2. **The session.** Without a signed-in session the Portal sends you to sign in and returns you afterwards.
3. **The permission.** The Portal reads the roles from the access token and checks them against the permission the screen requires.

Roles are read from a `roles` claim on the token, falling back to Keycloak's standard `realm_access.roles` when that claim is absent. A realm without either produces an account that signs in successfully and can reach nothing, which looks like a broken Portal rather than a missing mapper.

**Unauthorised interface is hidden, not disabled.** A button an account may not press is not rendered at all, and neither is a sidebar link. This is a deliberate choice, and it means an account with too few roles sees a smaller Portal rather than a Portal full of greyed-out controls. When someone reports a missing feature, check their roles before checking the build.

## The Locations mismatch

One inconsistency is worth knowing before it costs anyone an afternoon.

The sidebar link for Locations checks a general locations permission held by `admin` and `care-team-manager`. The screen behind it checks `location-hierarchy.view`, because the hierarchy comes from a gateway endpoint gated by that exact role.

An account holding `care-team-manager` alone therefore sees the Locations link and lands on a no-access panel after clicking it. Both shipped demo users avoid this because both hold `location-hierarchy.view`. Accounts created outside the imported realm frequently do not. Grant `location-hierarchy.view` alongside `care-team-manager` and the screen behaves.

## Grant access to a new user

1. Create the user in the identity provider, or through the Portal's Users screen, which creates the identity account through the gateway.
2. Grant the realm roles the person needs. Start from `care-team-manager` for a read-mostly account and add `location-hierarchy.view` if they need the Locations screen.
3. Have them sign in again. Roles are read from the token issued at sign-in, so a role granted during an active session does not apply until the next one.

## Expected result

Signing in as the account shows exactly the screens its roles allow, and no others. Signing in as `manager-user` on a default build shows six screens with the Setup Wizard absent and most create and edit controls missing.

## Where to go next

Changing what a permission means, rather than who holds it, is a change to the permission table in the application. [Extend the Web Portal](/extend/web-portal-extensions/) covers that and the rest of the code-level surface.
