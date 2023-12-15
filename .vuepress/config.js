import { defaultTheme } from 'vuepress';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  title: "MagicMirror² Documentation",
  description: "The open source modular smart mirror platform.",
  theme: defaultTheme({
    // logo: '/mm.png',
    navbar: [
      { text: "Donate", link: "https://magicmirror.builders/donate" },
      { text: "Forum", link: "https://forum.magicmirror.builders" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        collapsible: true,
        children: [
          "/",
          "/getting-started/requirements.md",
          "/getting-started/installation.md",
          "/getting-started/upgrade-guide",
        ],
      },
      {
        text: "Configuration",
        collapsible: true,
        children: [
          "/configuration/introduction",
          "/configuration/autostart",
          "/configuration/raspberry",
        ],
      },
      {
        text: "Modules",
        collapsible: true,
        children: [
          "/modules/introduction",
          "/modules/configuration",
          {
            title: "Default Modules",
            collapsible: false,
            children: [
              "/modules/alert",
              "/modules/calendar",
              "/modules/clock",
              "/modules/compliments",
              "/modules/helloworld",
              "/modules/newsfeed",
              "/modules/updatenotification",
              "/modules/weather",
            ],
          },
          "/modules/animate"
        ],
      },
      {
        text: "Module Development",
        collapsible: true,
        children: [
          "/development/introduction.md",
          "/development/core-module-file.md",
          "/development/node-helper.md",
          "/development/helper-methods.md",
          "/development/logger.md",
          "/development/notifications.md",
          "/development/weather-provider.md",
          "/development/documentation.md",
        ],
      },
      {
        text: "About",
        collapsible: true,
        children: [
          "/about/manifesto",
          "/about/contributing",
          "/about/donate",
          "/about/support",
          "/about/license",
        ],
      },
    ],
    repo: "MichMich/MagicMirror",
    repoLabel: "GitHub",

    docsRepo: "MichMich/MagicMirror-Documentation",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Help us improve this page!",
    lastUpdated: "Updated",
  }),
  markdown: {
    toc: { includeLevel: [2, 3, 4] },
  },
  locales: {
    "/": {
      lang: "en",
    },
  },
  plugins: [
    googleAnalyticsPlugin({
      id: "UA-1219071-59",
    }),
    docsearchPlugin({
      apiKey: "96d207343bbb5e45068a1e3c8d141bb4",
      appId: "U3QOOOGLZR",
      indexName: "docs-magicmirror-builders",
    }),
  ],
};

