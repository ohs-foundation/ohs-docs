---
id: info-gateway-access-checker
title: Tutorial · Create an Access Checker Plugin
description: Implement a custom Java access checker plugin and factory for Info Gateway.
slug: /tutorials-and-codelabs/info-gateway-access-checker/
sidebar_label: Access Checker Plugin Tutorial
sidebar_position: 44
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-gateway
source_label: fhir-gateway on GitHub ↗
---

## Overview

Info Gateway uses pluggable access checkers to make authorization decisions for incoming FHIR requests.

In this tutorial, you will create a custom Java access checker plugin by implementing the `AccessChecker` and `AccessCheckerFactory` interfaces, build the plugin, and configure Info Gateway to evaluate requests using your rule.

## Prerequisites

- Java Development Kit 17 or higher
- Apache Maven 3.8 or higher
- Info Gateway source repository cloned locally

## Step 1 · Understand the plugin interfaces

Creating an access checker plugin requires implementing two core interfaces.

1. `AccessCheckerFactory` creates instances of your checker for each authenticated request or session and carries a `@Named("checker-name")` annotation.
2. `AccessChecker` evaluates incoming requests via its `checkAccess` method and returns an `AccessDecision`.

## Step 2 · Create the AccessChecker class

Add a new class in `plugins/src/main/java/com/google/fhir/gateway/plugin/MyAccessChecker.java`.

```java
package com.google.fhir.gateway.plugin;

import ca.uhn.fhir.context.FhirContext;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.fhir.gateway.FhirUtil;
import com.google.fhir.gateway.HttpFhirClient;
import com.google.fhir.gateway.JwtUtil;
import com.google.fhir.gateway.interfaces.AccessChecker;
import com.google.fhir.gateway.interfaces.AccessCheckerFactory;
import com.google.fhir.gateway.interfaces.AccessDecision;
import com.google.fhir.gateway.interfaces.NoOpAccessDecision;
import com.google.fhir.gateway.interfaces.PatientFinder;
import com.google.fhir.gateway.interfaces.RequestDetailsReader;
import javax.inject.Named;

public class MyAccessChecker implements AccessChecker {
  private final FhirContext fhirContext;
  private final HttpFhirClient httpFhirClient;
  private final String claim;
  private final PatientFinder patientFinder;

  private MyAccessChecker(
      HttpFhirClient httpFhirClient,
      String claim,
      FhirContext fhirContext,
      PatientFinder patientFinder) {
    this.fhirContext = fhirContext;
    this.claim = claim;
    this.httpFhirClient = httpFhirClient;
    this.patientFinder = patientFinder;
  }

  @Override
  public AccessDecision checkAccess(RequestDetailsReader requestDetails) {
    // Evaluate request method, path, and claims
    return NoOpAccessDecision.accessGranted();
  }

  @Named(value = "sample")
  public static class Factory implements AccessCheckerFactory {
    static final String CLAIM = "sub";

    private String getClaim(DecodedJWT jwt) {
      return FhirUtil.checkIdOrFail(JwtUtil.getClaimOrDie(jwt, CLAIM));
    }

    @Override
    public AccessChecker create(
        DecodedJWT jwt,
        HttpFhirClient httpFhirClient,
        FhirContext fhirContext,
        PatientFinder patientFinder) {
      String claim = getClaim(jwt);
      return new MyAccessChecker(httpFhirClient, claim, fhirContext, patientFinder);
    }
  }
}
```

The factory implementation is thread-safe and instantiated once, while the checker instances it produces handle individual requests.

## Step 3 · Rebuild the project

Compile the gateway modules and package the plugin using Maven.

```sh
mvn package -Dspotless.apply.skip=true
```

## Step 4 · Run with the custom checker

Set the `ACCESS_CHECKER` environment variable to match the `@Named` annotation value (`sample`) and launch the gateway executable.

```sh
export ACCESS_CHECKER=sample
java -jar exec/target/exec-0.1.0.jar --server.port=8080
```

Incoming requests will now be routed through your custom checker instance for access evaluation.

## Where to go next

- Learn how to run the full stack in [Run Info Gateway in Docker](/tutorials-and-codelabs/info-gateway-docker/).
- See how to extend gateway endpoints with Kotlin in [Gateway Security Codelab](/tutorials-and-codelabs/gateway-access-rules/).
