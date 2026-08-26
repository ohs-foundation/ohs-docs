/**
 * Explicit sidebars for the Open Health Stack documentation.
 *
 * Top-level structure:
 *   About  ->  Learn (The 3 Pillars)  ->  Build (Blueprints & Codelabs)  ->  Stories & Solutions  ->  Community
 */

const sidebars = {
  aboutSidebar: [
    {
      type: "category",
      label: "About Open Health Stack",
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Why Open Health Stack",
          collapsible: true,
          collapsed: false,
          link: { type: "doc", id: "overview/why-ohs" },
          items: [
            {
              type: "link",
              label: "Core Advantages",
              href: "/why-ohs/#core-advantages",
            },
            {
              type: "link",
              label: "What It Doesn't Cover",
              href: "/why-ohs/#what-open-health-stack-does-not-cover",
            },
          ],
        },
        "overview/governance-and-standards",
      ],
    },
  ],

  learnSidebar: [
    "learn/overview",
    {
      type: "category",
      label: "Pillar 01 · FHIR Foundations",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "fhir-foundations/overview" },
      items: [
        {
          type: "category",
          label: "Core Libraries",
          collapsible: true,
          collapsed: false,
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
          ],
        },
        {
          type: "category",
          label: "Client SDKs",
          collapsible: true,
          collapsed: false,
          items: [
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
            "fhir-foundations/android-fhir/overview",
          ],
        },
        {
          type: "category",
          label: "Back-end SDKs",
          collapsible: true,
          collapsed: false,
          items: [
            "fhir-foundations/info-gateway/overview",
            "fhir-foundations/fhir-data-pipes/overview",
          ],
        },
        {
          type: "category",
          label: "Reference",
          collapsible: true,
          collapsed: false,
          items: [
            "fhir-foundations/platform-support",
            "fhir-foundations/versions",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Pillar 02 · OHS Player Reference Toolkit",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "ohs-player/overview" },
      items: [
        "ohs-player/architecture",
        "ohs-player/how-player-uses-ohs-components",
        {
          type: "category",
          label: "Component Overviews",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "components/overview" },
          items: [
            "components/client-app/overview",
            "components/reference-backend/overview",
            "components/web-portal/overview",
            "components/reference-analytics/overview",
          ],
        },
        "ohs-player/configuration-model",
        "ohs-player/configuration-ig",
        "ohs-player/what-you-can-do-today",
      ],
    },
    {
      type: "link",
      label: "Pillar 03 · AI Commons (Incubating)",
      href: "/why-ohs/#pillar-3-for-ai-commons-incubating",
    },
  ],

  buildSidebar: [
    {
      type: "category",
      label: "Quickstart & Setup",
      collapsible: true,
      collapsed: false,
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
      link: { type: "doc", id: "tutorials-and-codelabs/overview" },
      items: [
        {
          type: "category",
          label: "Client SDKs",
          collapsible: true,
          collapsed: false,
          items: [
            "tutorials-and-codelabs/multiplatform-client",
            "tutorials-and-codelabs/sdc-questionnaires",
          ],
        },
        {
          type: "category",
          label: "Info Gateway",
          collapsible: true,
          collapsed: false,
          items: [
            "tutorials-and-codelabs/info-gateway-getting-started",
            "tutorials-and-codelabs/info-gateway-docker",
            "tutorials-and-codelabs/info-gateway-access-checker",
            "tutorials-and-codelabs/gateway-access-rules",
          ],
        },
        {
          type: "category",
          label: "FHIR Data Pipes",
          collapsible: true,
          collapsed: false,
          items: [
            "tutorials-and-codelabs/sql-on-fhir-analytics",
            "tutorials-and-codelabs/data-pipes-test-servers",
            "tutorials-and-codelabs/data-pipes-single-machine",
            "tutorials-and-codelabs/data-pipes-try-controller",
            "tutorials-and-codelabs/data-pipes-superset",
            "tutorials-and-codelabs/data-pipes-gcp-fhirstore",
          ],
        },
        {
          type: "category",
          label: "OHS Player Toolkit",
          collapsible: true,
          collapsed: false,
          items: [
            "tutorials-and-codelabs/zero-code-screens",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Blueprints & Reference Deployments",
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
      label: "Configuration & Extension Recipes",
      collapsible: true,
      collapsed: true,
      items: [
        "configure/screen-from-fhir-data",
        "extend/decide",
        "extend/backend-extensions",
      ],
    },
  ],

  solutionsSidebar: [
    {
      type: "category",
      label: "Pathways",
      collapsible: false,
      items: [
        "overview/solutions-and-pathways",
        "overview/architecture-samples",
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
