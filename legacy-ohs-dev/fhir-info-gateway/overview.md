---
title: "FHIR Info Gateway  |  Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/fhir-info-gateway"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# FHIR Info Gateway  |  Open Health Stack  |  Google for Developers

# FHIR Info Gateway

[View source on Github
![](../images/GitHub-Mark-32px.png)](https://github.com/ohs-foundation/fhir-gateway)

When deploying digital health solutions, preserving patient data privacy is key.

The *FHIR Info Gateway* makes it easier for developers to enforce organizational
role based access control (RBAC) policies when working with FHIR data.

FHIR Info Gateway is a reverse proxy which controls client access to FHIR
resources on a server by checking requests for authorization to a FHIR URL or
search query. FHIR Info Gateway enables authorization and access-control between
a client application and a FHIR server when used along with any [OpenID
Connect](https://openid.net/connect/) compliant Identity Provider
(IdP) and Authorization server (AuthZ). It currently supports Keycloak as the
IDP+AuthZ provider and has been tested with [HAPI
FHIR](https://hapifhir.io/) or [Cloud Healthcare API FHIR
store](https://cloud.google.com/healthcare-api/docs/concepts/fhir)
as the FHIR server.

FHIR Info Gateway features include:

- A stand-alone service that can work with FHIR compliant servers
- A pluggable architecture for defining an access-checkers to allow for
  implementation configurability
- Query filtering to block/allow specific queries such as for disabling joins

Go to [developer documentation on
GitHub](https://github.com/ohs-foundation/fhir-gateway/wiki)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-05-15 UTC."],[],["The FHIR Info Gateway is a reverse proxy that enforces role-based access control (RBAC) for FHIR data, ensuring patient data privacy in digital health solutions. It controls client access to FHIR resources by verifying authorization against requests to a FHIR URL or search query. It is compatible with OpenID Connect Identity Providers and Authorization servers. The Gateway features a pluggable architecture for access-checkers and supports query filtering, allowing control over client interactions with FHIR-compliant servers like HAPI FHIR or Cloud Healthcare API FHIR store.\n"]]
