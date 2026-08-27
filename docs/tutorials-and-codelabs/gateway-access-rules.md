---
id: gateway-access-rules
title: Codelab · Gateway Security and Access Rules
description: Implement custom role-based access checkers and custom REST endpoints using Kotlin and Spring Boot in Info Gateway.
slug: /tutorials-and-codelabs/gateway-access-rules/
sidebar_label: Gateway Security Codelab
sidebar_position: 40
guide_type: Codelab
guide_status: ready
repository: backend-extension
---

## Overview

In this codelab, you will extend the Info Gateway with a custom Kotlin Spring Boot module. You will implement fine-grained role-based access rules to restrict FHIR resource queries by user facility and role, and register custom REST endpoints on the gateway host.

## Prerequisites

- JDK 21 installed
- Maven 3.8+ installed
- Basic familiarity with Spring Boot and Kotlin

## Step 1 · Implement a custom AccessChecker

Create a Kotlin class implementing the `AccessChecker` and `AccessCheckerFactory` SPI interfaces to inspect incoming JWT tokens and filter FHIR queries by location.

```kotlin
package com.google.fhir.gateway.plugin

import com.auth0.jwt.interfaces.DecodedJWT
import com.google.fhir.gateway.interfaces.AccessChecker
import com.google.fhir.gateway.interfaces.AccessCheckerFactory
import com.google.fhir.gateway.interfaces.AccessDecision
import com.google.fhir.gateway.interfaces.NoOpAccessDecision
import com.google.fhir.gateway.interfaces.PatientFinder
import com.google.fhir.gateway.interfaces.RequestDetailsReader
import javax.inject.Named

class FacilityAccessChecker(
  private val facilityId: String?,
) : AccessChecker {

  override fun checkAccess(requestDetails: RequestDetailsReader): AccessDecision {
    // Evaluate request location against user facility claim
    val requestedLocation = requestDetails.requestParameters["location"]?.firstOrNull()
    if (facilityId == null || requestedLocation == null || facilityId == requestedLocation) {
      return NoOpAccessDecision.accessGranted()
    }
    return NoOpAccessDecision.accessDenied()
  }

  @Named("facility-checker")
  class Factory : AccessCheckerFactory {
    override fun create(
      jwt: DecodedJWT,
      httpFhirClient: com.google.fhir.gateway.HttpFhirClient,
      fhirContext: ca.uhn.fhir.context.FhirContext,
      patientFinder: PatientFinder,
    ): AccessChecker {
      val facility = jwt.getClaim("facility_id")?.asString()
      return FacilityAccessChecker(facility)
    }
  }
}
```

## Step 2 · Add custom administrative endpoints

Add a Spring REST controller to the extension module to expose bulk import and practitioner hierarchy management endpoints.

```kotlin
@RestController
@RequestMapping("/api/v1/workforce")
class WorkforceController {

  @PostMapping("/bulk-assign")
  fun assignCareTeam(@RequestBody assignment: CareTeamAssignment): ResponseEntity<String> {
    // Process care team assignment logic
    return ResponseEntity.ok("Care team updated")
  }
}
```

## Step 3 · Package the extension JAR

Compile and package your extension into an executable plugin JAR.

```sh
mvn clean package
```

## Step 4 · Load the extension into Info Gateway

Launch the Info Gateway host pointing to your compiled extension JAR via the Java loader path.

```sh
java -Dloader.path="target/custom-gateway-extension-1.0.jar" \
  -jar fhir-gateway-exec.jar --server.port=8083
```

## Where to go next

- Learn how to configure screens in the [Zero-Code Screens Tutorial](/tutorials-and-codelabs/zero-code-screens/).
- Read the [Backend extensions guide](/extend/backend-extensions/).
