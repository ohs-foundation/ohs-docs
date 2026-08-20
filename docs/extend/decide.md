---
title: Decide when code is necessary
description: Choose between changing declarative configuration, adding a renderer, and modifying the reference application.
slug: /extend/decide/
sidebar_position: 10
guide_type: Concept
guide_status: ready
guide_focus: Choosing an adaptation route
repository: player-client
---

## Three routes

Player is a starting point for adaptation, and most adaptations have an obvious home. These are the three, in increasing order of cost to maintain.

Work down the list and stop at the first one that fits. Reaching for the third when the first would do is the most common way a programme ends up maintaining a fork it did not need.

## Change declarative configuration

Change a `ViewDefinition`, `ViewJoinMap`, or `ViewConfig` when the existing application structure and renderer are suitable but the screen needs different FHIR fields, view-state composition, or renderer options.

This is the cheapest route and the one to exhaust first. Follow [configure a screen from FHIR data](/configure/screen-from-fhir-data/).

**Examples that stay here.** Adding a phone number to a patient card. Showing a household's member count. Sorting a register by most recent visit. Displaying a different identifier. Adding a whole new register over a resource type the app already reads.

## Add a renderer

Add and register a renderer when the application needs a new way to present an existing typed view state. The renderer is application code, but its options can remain declarative through `ViewConfig`, so the screens that use it stay configurable.

**Examples that land here.** Presenting a register as a map rather than a list. A timeline view of encounters. A custom card layout no existing renderer produces.

## Modify the reference application

Modify the reference application when its navigation, workflow, data source, or feature composition must change. Use configuration and renderers inside that change wherever they remain the right boundary. Modifying the application does not mean abandoning the configuration model.

**Examples that land here.** A different navigation structure. A screen that talks to something other than the FHIR store. Behaviour on a schedule.

## The cases that look like configuration but are not

This is where the boundary is genuinely hard to see, and where planning most often goes wrong.

**A field the FHIR data does not contain.** Configuration projects what exists. If nothing captures the value, the change starts at the questionnaire that captures it, and possibly at the extraction that turns the answer into a resource, before any screen can show it.

**A value derived from several resources.** A `ViewDefinition` projects from a pivot resource and the resources joined to it. A calculation spanning resources outside that join is not a projection, and belongs in a renderer or the application.

**Conditional presentation.** Showing a field only when another has a particular value is a rendering decision, not a projection one. If no renderer already offers it as an option, this is code.

**Anything ordered or scheduled.** Due, overdue, and expired states are workflow rather than presentation. Configuration can show a date, but deciding what that date means about the work is a different concern.

**A new kind of widget.** Adding a view type to the CodeSystem is configuration, but the renderer that draws it is code. Both are needed, and it is easy to plan only the first.

The useful question is not "how big is this change?" but **"does a renderer already exist for the shape of state I need?"** If it does, the work is configuration no matter how much of the screen changes. If it does not, it is code no matter how small it looks.

## Where to go next

For backend rather than client behaviour, see [extend the backend](/extend/backend-extensions/).

Renderer API detail is in the [Player Client repository](https://github.com/ohs-foundation/player-client), and the configuration vocabulary is in the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).

If what you build is useful beyond your own programme, [resources and contributing](/resources/) covers where each repository takes contributions.
