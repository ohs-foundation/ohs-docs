---
title: "Android FHIR SDK  |  Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/android-fhir"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# Android FHIR SDK  |  Open Health Stack  |  Google for Developers

# Android FHIR SDK

![Spark icon](../images/spark.svg)

## Page Summary

- The Android FHIR SDK is a set of Kotlin libraries for building offline-capable, mobile-first healthcare applications on Android using the HL7 FHIR® standard.
- It enables developers to build interoperable health solutions using FHIR R4, leveraging shared content like WHO SMART Guidelines.
- The SDK provides APIs for data synchronization, offline capabilities, form creation with FHIR Questionnaires, and on-device clinical reasoning with FHIRPath and CQL.
- It comprises four libraries: Structured Data Capture, FHIR Engine, Workflow, and Knowledge Manager, each addressing specific functionalities.
- Developers can access learning resources and community support through the provided links to get started and engage with the project.

[View source on Github
![](../images/GitHub-Mark-32px.png)](https://github.com/ohs-foundation/android-fhir)

The *Android FHIR SDK* is a set of Kotlin libraries for building
offline-capable, mobile-first healthcare applications using the HL7 FHIR®
standard on Android.

The Android FHIR SDK has been developed as part of a close collaboration with
the World Health Organization to support the [WHO SMART Guidelines](https://www.who.int/teams/digital-health-and-innovation/smart-guidelines),
which are based on the [FHIR Clinical Guidelines Implementation Guide](http://build.fhir.org/ig/HL7/cqf-recommendations/index.html).

Using the SDK, developers can quickly build and deploy different types of
FHIR-native Android health applications for a range of common and advanced use
cases.

## Benefits to developers

**Use FHIR R4 specification to:**

- Build Android health solutions using a standards-based data model ([HAPI
  FHIR Structures](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-structures-r4/)).
- Promote interoperability and create future-proof solutions.
- Build on shared content being produced by the FHIR ecosystem such as WHO
  SMART Guidelines.

**Save time and effort:**

- APIs that help developers solve common data challenges like synchronization
  and working offline.
- Quickly turn FHIR Questionnaires into forms using built-in UI widgets.
- Build complex form user flows with advanced behaviors powered by FHIRPath
  Expressions.

**On-device clinical reasoning:**

- Support for FHIRPath and [HL7 Clinical Quality Language](https://cql.hl7.org/)
  (CQL) for on-device data processing and clinical decision support.
- Deploy and run applications based on [FHIR Clinical
  Guidelines](http://build.fhir.org/ig/HL7/cqf-recommendations/index.html), like the [WHO SMART Guidelines](https://www.who.int/teams/digital-health-and-innovation/smart-guidelines/fhir-based-smart-guidelines).

## Android FHIR SDK architecture

The Android FHIR SDK is made up of four libraries, designed with a separation of
concerns:

- [Structured Data Capture Library](/open-health-stack/android-fhir/data-capture): Collect, validate, and process
  healthcare data on Android
- [FHIR Engine Library](/open-health-stack/android-fhir/fhir-engine): Store and manage FHIR resources locally on Android
  and synchronize with FHIR server
- [Workflow Library](/open-health-stack/android-fhir/workflow): Provide point-of-care decision support and compute
  clinical quality measures on Android
- [Knowledge Manager Library](/open-health-stack/android-fhir/knowledge-manager): Deploy and manage FHIR knowledge artifact
  resources (e.g. from Implementation Guides) and make these available to
  other libraries

## Get started with the Android FHIR SDK

Head to the [learn section](/open-health-stack/learn) to access developer docs, video tutorials and
codelabs or jump into the [community section](/open-health-stack/community) to find out about developer
calls, forums and ways to can get involved.
