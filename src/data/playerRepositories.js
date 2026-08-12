const repositories = {
  "ohs-player": {
    label: "OHS Player",
    url: "https://github.com/ohs-foundation/ohs-player",
    role: "Toolkit overview and entry point.",
    dependencies: [],
  },
  "client-app": {
    label: "Player Reference Client App",
    url: "https://github.com/ohs-foundation/player-reference",
    role: "Kotlin Multiplatform reference client application.",
    dependencies: [
      {repository: "player-client", relationship: "Renders configuration-driven healthcare UI."},
      {repository: "configuration-ig", relationship: "Defines the declarative UI configuration resources."},
    ],
  },
  "web-portal": {
    label: "Reference Web Portal",
    url: "https://github.com/ohs-foundation/ohs-player-reference-web-portal",
    role: "Web-based workforce and configuration portal.",
    dependencies: [
      {label: "HAPI FHIR", relationship: "Local quickstart FHIR service."},
      {label: "Keycloak", relationship: "Local quickstart identity service."},
    ],
  },
  "backend-extension": {
    label: "Reference Backend",
    url: "https://github.com/ohs-foundation/ohs-player-reference-backend",
    role: "FHIR Gateway extensions for Player clients.",
    dependencies: [
      {label: "FHIR Gateway", url: "https://github.com/ohs-foundation/fhir-gateway", relationship: "Runtime host for backend extensions."},
    ],
  },
  infrastructure: {
    label: "Reference Infrastructure",
    url: "https://github.com/ohs-foundation/ohs-player-reference-infrastructure",
    role: "Deployment scripts and images for an OHS-based environment.",
    dependencies: [],
  },
  analytics: {
    // Analytics is not a separate repository. The pipeline configuration,
    // ViewDefinitions, and compose services live in the infrastructure repo
    // under a dedicated profile.
    label: "Reference Infrastructure",
    url: "https://github.com/ohs-foundation/ohs-player-reference-infrastructure",
    role: "Analytics pipeline configuration, ViewDefinitions, and dashboard services.",
    dependencies: [
      {label: "FHIR Data Pipes", url: "https://github.com/ohs-foundation/fhir-data-pipes", relationship: "Analytics pipeline engine."},
      {repository: "infrastructure", relationship: "Ships in the same stack, started with an additional profile."},
    ],
  },
  "player-client": {
    label: "Player Client",
    url: "https://github.com/ohs-foundation/player-client",
    role: "Configurable Kotlin Multiplatform healthcare UI library.",
    dependencies: [
      {repository: "configuration-ig", relationship: "Defines the configuration vocabulary consumed by the library."},
    ],
  },
  "configuration-ig": {
    label: "Player Configuration IG",
    url: "https://github.com/ohs-foundation/player-reference-ig",
    role: "FHIR implementation guide for declarative Player UI configuration.",
    dependencies: [
      {label: "SQL-on-FHIR", url: "https://sql-on-fhir.org/", relationship: "ViewDefinition foundation."},
    ],
  },
};

export function repositoryFor(id) {
  return repositories[id];
}

export default repositories;
