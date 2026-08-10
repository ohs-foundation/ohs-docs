/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OHS Player Reference",
  tagline: "Evaluate, assemble, and adapt the OHS Player reference toolkit",
  favicon: "assets/favicon.svg",
  // The canonical site. The preview workflow on a fork sets DOCS_URL so its
  // canonical tags and sitemap point at the fork rather than at production.
  url: process.env.DOCS_URL ?? "https://ohs-foundation.github.io",
  baseUrl: "/ohs-docs/",
  trailingSlash: true,
  organizationName: "ohs-foundation",
  projectName: "ohs-docs",
  onBrokenLinks: "throw",
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
        // The v1 information architecture replaced the flat /setups/ tree.
        // These paths were published on the preview site, so they redirect
        // rather than 404. Keep an entry for every path that has ever shipped.
        redirects: [
          { from: "/setups", to: "/get-started/" },
          { from: "/setups/client-app", to: "/components/client-app/run/" },
          { from: "/setups/web-portal", to: "/components/web-portal/run/" },
          {
            from: "/setups/reference-infrastructure",
            to: "/components/reference-infrastructure/",
          },
          { from: "/setups/analytics", to: "/components/reference-analytics/" },
          {
            from: "/setups/backend-extension",
            to: "/extend/backend-extensions/",
          },
          { from: "/concepts/configuration", to: "/concepts/configuration-model/" },
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
      title: "OHS Player",
      logo: { alt: "", src: "assets/favicon.svg" },
      items: [
        { to: "/", label: "Overview", position: "left" },
        {
          to: "/setups/",
          label: "Setups",
          position: "left",
        },
        {
          to: "/concepts/how-player-uses-ohs-components/",
          label: "Concepts",
          position: "left",
        },
        {
          href: "https://github.com/ohs-foundation/ohs-player",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: "OHS Player documentation.",
    },
    docs: { sidebar: { hideable: false } },
  },
};

module.exports = config;
