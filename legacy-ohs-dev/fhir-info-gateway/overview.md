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
