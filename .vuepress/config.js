module.exports = {
  title: "MagicMirror² Documentation",
  description: "The open source modular smart mirror platform.",
  themeConfig: {
    // logo: '/mm.png',
    algolia: {
      appId: "U3QOOOGLZR",
      apiKey: "96d207343bbb5e45068a1e3c8d141bb4",
      indexName: "docs-magicmirror-builders",
    },
    nav: [
      { text: "Donate", link: "https://magicmirror.builders/donate" },
      { text: "Forum", link: "https://forum.magicmirror.builders" },
    ],
    sidebar: [
      {
        title: "Getting Started",
        collapsable: true,
        children: [
          "/",
          "getting-started/requirements",
          "getting-started/installation",
          "getting-started/upgrade-guide",
        ],
      },
      {
        title: "Configuration",
        collapsable: true,
        children: [
          "configuration/introduction",
          "configuration/autostart",
          "configuration/raspberry",
        ],
      },
      {
        title: "Modules",
        collapsable: true,
        children: [
          "modules/introduction",
          "modules/configuration",
          {
            title: "Default Modules",
            collapsable: false,
            children: [
              "modules/alert",
              "modules/calendar",
              "modules/clock",
              "modules/compliments",
              "modules/helloworld",
              "modules/newsfeed",
              "modules/updatenotification",
              "modules/weather",
            ],
          },
          "modules/customcss",
        ],
      },
      {
        title: "Module Development",
        collapsable: true,
        children: [
          "development/introduction.md",
          "development/core-module-file.md",
          "development/node-helper.md",
          "development/helper-methods.md",
          "development/logger.md",
          "development/notifications.md",
          "development/weather-provider.md",
          "development/documentation.md",
        ],
      },
      {
        title: "About",
        collapsable: true,
        children: [
          "about/manifesto",
          "about/contributing",
          "about/donate",
          "about/support",
          "about/license",
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
  },
  markdown: {
    toc: { includeLevel: [2, 3, 4] },
  },
  locales: {
    "/": {
      lang: "en",
    },
  },
  plugins: [
    ["@vuepress/back-to-top"],
    ['check-md'],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-1219071-59", // UA-00000000-0
      },
    ],
  ],
};
