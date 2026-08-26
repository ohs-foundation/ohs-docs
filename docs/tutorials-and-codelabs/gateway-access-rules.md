---
id: gateway-access-rules
title: Codelab · Gateway Security and Access Rules
description: Implement custom role-based access checkers and custom REST endpoints using Kotlin and Spring Boot in Info Gateway.
slug: /tutorials-and-codelabs/gateway-access-rules/
sidebar_label: 4. Gateway Security Codelab
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

Create a Kotlin class implementing the `AccessChecker` interface to inspect incoming JWT tokens and filter FHIR queries by location.

```kotlin
package dev.ohs.gateway.plugin

import dev.ohs.gateway.security.AccessChecker
import dev.ohs.gateway.security.RequestContext
import org.springframework.stereotype.Component

@Component
class FacilityAccessChecker : AccessChecker {
  override fun canAccess(context: RequestContext): Boolean {
    val userFacility = context.userClaims["facility_id"] as? String
    val requestedLocation = context.requestParams["location"]
    
    if (context.hasRole("NATIONAL_ADMIN")) return true
    return userFacility == requestedLocation
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
