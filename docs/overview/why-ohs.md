---
id: why-ohs
title: Why Open Health Stack
description: Strategic value, total cost of ownership reduction, open standards, and AI readiness for digital health.
slug: /why-ohs/
sidebar_label: Why Open Health Stack
sidebar_position: 5
guide_type: conceptual
guide_status: ready
---

## The digital health landscape challenge

Healthcare organisations worldwide face difficult choices when deploying software for frontline health workers, clinic operations, and national health reporting. 

Many systems rely on proprietary vertical applications. These create high ongoing licensing fees, proprietary database lock-in, and costly dependencies on single vendors for simple form or workflow changes. Other programmes attempt custom bespoke builds from scratch. These builds require separate engineering teams for Android, iOS, and Web, resulting in high maintenance budgets and systems that struggle to scale.

Open Health Stack provides an open source foundation of standards-native building blocks. It gives ministries of health, digital health entrepreneurs, and non-profit organisations the technical agility to build, adapt, and scale healthcare software without proprietary lock-in.

## Five strategic advantages of Open Health Stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       OPEN HEALTH STACK VALUE                           │
├───────────────────┬───────────────────┬─────────────────────────────────┤
│ 1. Zero Lock-In   │ 2. Multiplatform  │ 3. Declarative Agility          │
│ Un-forked FHIR    │ Android, iOS, Web │ Update forms via FHIR resources │
│ R4, R5, R6 ready  │ Single codebase   │ No app recompilation            │
├───────────────────┴───────────────────┼─────────────────────────────────┤
│ 4. Offline Resilience                 │ 5. AI Ready Data Modeling       │
│ Full local storage and sync           │ Precise structured FHIR schema  │
│ Built for low-connectivity clinics    │ Standardized clinical evals     │
└───────────────────────────────────────┴─────────────────────────────────┘
```

### 1. Open standards and sovereign data ownership

Open Health Stack is built strictly on the HL7 FHIR standard across FHIR R4, R4B, and R5, with an architecture designed for future releases including FHIR R6.

All data models, questionnaires, and exchange formats use official, un-forked FHIR specifications. Health systems retain complete ownership and control over their data, data schemas, and access policies. Organisations can switch storage backends, cloud providers, or analytics platforms without migrating data formats.

### 2. Lower total cost of ownership through multiplatform engineering

Maintaining separate codebases for native Android, native iOS, and browser portals quickly exhausts public health budgets. 

Open Health Stack utilizes Kotlin Multiplatform to deliver shared clinical data models, FHIRPath evaluation, local storage, and questionnaire rendering across Android, iOS, Desktop, and Web from one unified codebase. Engineering teams write core business logic and clinical validation rules once, cutting long-term maintenance and upgrade costs substantially.

### 3. Rapid adaptation without recompiling applications

Clinical guidelines and national health indicators evolve constantly. In traditional applications, changing an intake form or adding a clinical question requires updating source code, recompiling native apps, and distributing new binaries through app stores.

With Open Health Stack, forms and user interface screens are driven declaratively by standard FHIR Questionnaire resources and SQL-on-FHIR view definitions. Health programme informaticians update clinical forms and dashboards centrally, and frontline devices update their workflows automatically upon synchronization.

### 4. Resilient offline operation for frontline health workers

Healthcare delivery often occurs in remote clinics, rural outposts, and areas with intermittent electrical and network connectivity.

Open Health Stack libraries provide on-device transactional storage with SQLite and Room Multiplatform. Frontline workers can register patients, record encounters, calculate clinical metrics, and validate complex questionnaires completely offline. When network connectivity becomes available, background synchronization reconciles records securely through the FHIR Gateway.

### 5. AI ready data foundation and clinical evaluation tooling

Healthcare artificial intelligence requires clean, structured, and standards-compliant clinical data to deliver reliable insights.

Open Health Stack provides structured data modeling that enables modern artificial intelligence tools to parse, translate, and query clinical datasets accurately. Through AI Commons, the ecosystem provides benchmarking and evaluation tooling that allows builders and health authorities to measure artificial intelligence performance, safety, and clinical conformance before deploying decision support into the field.

## Modular adoption vs complete reference platform

Open Health Stack is not an all-or-nothing proposition. Organisations choose the adoption depth that fits their existing technical infrastructure.

| Adoption model | What you deploy | Ideal use case |
| --- | --- | --- |
| Standalone client SDKs | Kotlin FHIR Engine and Data Capture | Existing native apps needing offline storage or standardized forms |
| Security and gateway middleware | Info Gateway access proxy | Connecting modern mobile apps securely to existing enterprise EHRs |
| Analytics and reporting hub | FHIR Data Pipes and Superset | Health systems needing fast SQL-on-FHIR analytical dashboards |
| Full reference platform | OHS Player reference composition | Greenfield programmes and startups needing a full multiplatform baseline |

## Coexistence with existing health systems

National digital health architectures rarely start from zero. Open Health Stack is designed to complement and integrate with existing national health software.

- **DHIS2 integration** is supported through SQL-on-FHIR pipelines that aggregate patient-level clinical records into standard aggregate indicator datasets for national health information management reporting.
- **OpenMRS and legacy EHRs** connect through standard FHIR REST endpoints and Info Gateway access rules without altering core hospital databases.
- **National Master Patient Indexes** integrate directly with gateway identity routing to ensure patient identifier continuity across facilities.
