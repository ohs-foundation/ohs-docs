/**
 * Explicit sidebars for the Open Health Stack documentation.
 *
 * Top-level structure:
 *   About  ->  Learn  ->  Stories & Solutions  ->  Community
 */

const sidebars = {
  aboutSidebar: [
    {
      type: "category",
      label: "About Open Health Stack",
      collapsible: false,
      items: [
        "overview/why-ohs",
        "overview/governance-and-standards",
      ],
    },
  ],

  learnSidebar: [
    {
      type: "category",
      label: "Get Started",
      collapsible: false,
      items: [
        "get-started",
        "prerequisites",
      ],
    },
    {
      type: "category",
      label: "Tutorials & Codelabs",
      collapsible: true,
      collapsed: false,
      items: [
        "resources/tutorials-and-codelabs",
      ],
    },
    {
      type: "category",
      label: "Pillar 01 · FHIR Foundations",
      collapsible: true,
      collapsed: false,
      link: { type: "doc", id: "fhir-foundations/overview" },
      items: [
        {
          type: "category",
          label: "Kotlin FHIR (Data Model)",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "fhir-foundations/kotlin-fhir/overview" },
          items: [
            "fhir-foundations/kotlin-fhir/get-started",
            "fhir-foundations/kotlin-fhir/working-with-resources",
            "fhir-foundations/kotlin-fhir/serialization",
            "fhir-foundations/kotlin-fhir/search-parameters",
          ],
        },
        {
          type: "category",
          label: "Kotlin FHIRPath (Logic Engine)",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "fhir-foundations/kotlin-fhirpath/overview" },
          items: [
            "fhir-foundations/kotlin-fhirpath/get-started",
            "fhir-foundations/kotlin-fhirpath/evaluation-semantics",
            "fhir-foundations/kotlin-fhirpath/conformance",
          ],
        },
        {
          type: "category",
          label: "Kotlin FHIR Engine (Storage & Sync)",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "fhir-foundations/kotlin-fhir-engine/overview",
          },
          items: [
            "fhir-foundations/kotlin-fhir-engine/get-started",
            "fhir-foundations/kotlin-fhir-engine/persist-and-search",
            "fhir-foundations/kotlin-fhir-engine/synchronization",
            "fhir-foundations/kotlin-fhir-engine/web-targets",
          ],
        },
        {
          type: "category",
          label: "Kotlin FHIR Data Capture (SDC Forms)",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "fhir-foundations/kotlin-fhir-data-capture/overview",
          },
          items: [
            "fhir-foundations/kotlin-fhir-data-capture/get-started",
            "fhir-foundations/kotlin-fhir-data-capture/render-a-questionnaire",
            "fhir-foundations/kotlin-fhir-data-capture/customize-and-extend",
          ],
        },
        {
          type: "link",
          label: "Android FHIR SDK ↗",
          href: "https://github.com/google/android-fhir",
        },
        {
          type: "link",
          label: "Info Gateway ↗",
          href: "https://github.com/ohs-foundation/fhir-gateway",
        },
        {
          type: "link",
          label: "FHIR Data Pipes ↗",
          href: "https://github.com/ohs-foundation/fhir-data-pipes",
        },
        "fhir-foundations/platform-support",
        "fhir-foundations/versions",
      ],
    },
    {
      type: "category",
      label: "Pillar 02 · OHS Player Reference",
      collapsible: true,
      collapsed: false,
      link: { type: "doc", id: "concepts/what-ohs-player-is" },
      items: [
        "concepts/architecture",
        "concepts/how-player-uses-ohs-components",
        {
          type: "category",
          label: "Player Components",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "components/overview" },
          items: [
            "components/client-app/overview",
            "concepts/configuration-ig",
            "components/reference-backend/overview",
            "components/web-portal/overview",
            "components/reference-analytics/overview",
          ],
        },
        {
          type: "category",
          label: "Run Components",
          collapsible: true,
          collapsed: true,
          items: [
            "components/reference-infrastructure/overview",
            "components/reference-backend/run",
            "components/web-portal/run",
            "components/client-app/run",
            "components/reference-analytics/run",
          ],
        },
        {
          type: "category",
          label: "Configuration & Extension",
          collapsible: true,
          collapsed: true,
          items: [
            "concepts/configuration-model",
            "configure/screen-from-fhir-data",
            "extend/decide",
            "extend/backend-extensions",
          ],
        },
        "concepts/what-you-can-do-today",
      ],
    },
  ],

  solutionsSidebar: [
    {
      type: "category",
      label: "Stories & Solutions",
      collapsible: false,
      items: [
        "overview/solutions-and-pathways",
      ],
    },
  ],

  communitySidebar: [
    {
      type: "category",
      label: "Community & Ecosystem",
      collapsible: false,
      items: [
        "resources",
      ],
    },
  ],
};

module.exports = sidebars;
