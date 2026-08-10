import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Open Health Stack Docs',
  tagline: 'Documentation for the Open Health Stack ecosystem',
  favicon: 'assets/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://ohs-foundation.github.io',
  baseUrl: '/ohs-docs/',
  trailingSlash: true,

  organizationName: 'ohs-foundation',
  projectName: 'ohs-docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs-content',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ohs-foundation/ohs-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        searchResultLimits: 8,
      },
    ],
  ],

  // The OHS shells in src/components/ohs render the site's own header, sidebar,
  // and footer, so the classic theme's navbar and footer are left unconfigured.
  themeConfig: {
    docs: {
      sidebar: {
        hideable: false,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
