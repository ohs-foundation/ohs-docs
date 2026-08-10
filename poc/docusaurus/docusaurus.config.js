/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OHS Player Reference",
  tagline: "A Docusaurus feasibility PoC",
  favicon: "assets/favicon.svg",
  url: "https://poc.ohs.foundation",
  baseUrl: "/docusaurus/",
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
      copyright: "OHS Player documentation feasibility PoC.",
    },
    docs: { sidebar: { hideable: false } },
  },
};

module.exports = config;
