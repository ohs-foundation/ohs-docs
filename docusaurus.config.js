/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Open Health Stack",
  tagline: "Evaluate, assemble, and adapt the OHS Player reference toolkit",
  favicon: "assets/favicon.svg",
  url: "https://ohs-foundation.github.io",
  baseUrl: "/ohs-docs/",
  trailingSlash: true,
  organizationName: "ohs-foundation",
  projectName: "ohs-docs",
  onBrokenLinks: "throw",
  onBrokenAnchors: "ignore",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },
  i18n: { defaultLocale: "en", locales: ["en"] },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: undefined,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: { customCss: "./src/css/custom.css" },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        // This site previously published an OHS ecosystem catalogue under
        // /docs/. That catalogue is owned by the Foundation projects page, so
        // those paths now route to the landing page, which states the site's
        // scope and links to the catalogue. Keep an entry for every path that
        // has ever been published here.
        redirects: [
          { from: "/docs", to: "/" },
          { from: "/docs/ohs-player", to: "/" },
          { from: "/docs/contributing", to: "/resources/" },
          { from: "/docs/android-fhir-sdk", to: "/" },
          { from: "/docs/fhir-app-examples", to: "/" },
          { from: "/docs/fhir-data-pipes", to: "/" },
          { from: "/docs/fhir-gateway", to: "/" },
          { from: "/docs/kotlin-fhir", to: "/" },
        ],
      },
    ],
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        searchResultLimits: 8,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Open Health Stack",
      logo: { alt: "Open Health Stack", src: "assets/favicon.svg", href: "https://ohs.foundation" },
      items: [
        { to: "/", label: "Home", position: "left" },
        { to: "/why-ohs/", label: "About", position: "left" },
        { to: "/learn/", label: "Learn", position: "left" },
        { to: "/get-started/", label: "Build", position: "left" },
        {
          to: "/overview/solutions-and-pathways/",
          label: "Stories & Solutions",
          position: "left",
        },
        {
          to: "/resources/",
          label: "Community",
          position: "left",
        },
        {
          href: "https://github.com/ohs-foundation",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: "Open Health Stack documentation.",
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
  },
};

module.exports = config;
