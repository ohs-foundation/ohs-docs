/**
 * Source repository for a doc, selected by its `repository` frontmatter key.
 * GuideShell renders this as the page's source link.
 */
const repositories = {
  "android-fhir-sdk": {
    label: "Android FHIR SDK",
    url: "https://github.com/ohs-foundation/android-fhir",
  },
  "kotlin-fhir": {
    label: "Kotlin FHIR",
    url: "https://github.com/ohs-foundation/kotlin-fhir",
  },
  "fhir-gateway": {
    label: "FHIR Gateway",
    url: "https://github.com/ohs-foundation/fhir-gateway",
  },
  "fhir-data-pipes": {
    label: "FHIR Data Pipes",
    url: "https://github.com/ohs-foundation/fhir-data-pipes",
  },
  "fhir-app-examples": {
    label: "FHIR App Examples",
    url: "https://github.com/ohs-foundation/fhir-app-examples",
  },
  "ohs-docs": {
    label: "OHS Docs",
    url: "https://github.com/ohs-foundation/ohs-docs",
  },
  "ohs-player": {
    label: "OHS Player",
    url: "https://github.com/ohs-foundation/ohs-player",
  },
  "client-app": {
    label: "Player Reference Client App",
    url: "https://github.com/ohs-foundation/player-reference",
  },
  "web-portal": {
    label: "Reference Web Portal",
    url: "https://github.com/ohs-foundation/ohs-player-reference-web-portal",
  },
  "backend-extension": {
    label: "Reference Backend",
    url: "https://github.com/ohs-foundation/ohs-player-reference-backend",
  },
  infrastructure: {
    label: "Reference Infrastructure",
    url: "https://github.com/ohs-foundation/ohs-player-reference-infrastructure",
  },
  analytics: {
    label: "Reference Analytics",
    url: "https://github.com/ohs-foundation/ohs-player-reference-analytics",
  },
  "player-client": {
    label: "Player Client",
    url: "https://github.com/ohs-foundation/player-client",
  },
  "configuration-ig": {
    label: "Player Configuration IG",
    url: "https://github.com/ohs-foundation/player-reference-ig",
  },
};

export function repositoryFor(id) {
  return repositories[id];
}
