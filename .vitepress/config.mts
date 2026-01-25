import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MagicMirror² Docs",
  description: "The open source modular smart mirror platform.",
  lang: "en",
  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=UA-1219071-59",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`,
    ],
  ],
  sitemap: {
    hostname: "https://docs.magicmirror.builders/",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    carbonAds: {
      code: "CK7IC23N",
      placement: "magicmirror",
    },
    editLink: {
      pattern:
        "https://github.com/MagicMirrorOrg/MagicMirror-Documentation/blob/master/:path",
      text: "Help us improve this page!",
    },
    lastUpdated: {
      text: "Updated at",
    },
    logo: "/logo.png",
    nav: [
      { text: "Donate", link: "https://magicmirror.builders/donate" },
      { text: "Forum", link: "https://forum.magicmirror.builders" },
    ],
    search: {
      options: {
        apiKey: "96d207343bbb5e45068a1e3c8d141bb4",
        appId: "U3QOOOGLZR",
        indexName: "docs-magicmirror-builders",
      },
      provider: "algolia",
    },
    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/" },
          { text: "Requirements", link: "/getting-started/requirements.md" },
          {
            text: "Installation & Usage",
            link: "/getting-started/installation.md",
          },
          { text: "Upgrade Guide", link: "/getting-started/upgrade-guide.md" },
        ],
      },
      {
        text: "Configuration",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/configuration/introduction" },
          {
            text: "Autostart your MagicMirror²",
            link: "/configuration/autostart",
          },
          { text: "Raspberry Specific", link: "/configuration/raspberry" },
        ],
      },
      {
        text: "Modules",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/modules/introduction" },
          { text: "Configuration", link: "/modules/configuration" },
          {
            text: "Default Modules",
            collapsed: true,
            items: [
              { text: "Alert", link: "/modules/alert" },
              { text: "Calendar", link: "/modules/calendar" },
              { text: "Clock", link: "/modules/clock" },
              { text: "Compliments", link: "/modules/compliments" },
              { text: "Hello World", link: "/modules/helloworld" },
              { text: "Newsfeed", link: "/modules/newsfeed" },
              {
                text: "Update Notification",
                link: "/modules/updatenotification",
              },
              { text: "Weather", link: "/modules/weather" },
            ],
          },
          { text: "Animation Guide", link: "/modules/animate" },
        ],
      },
      {
        text: "Module Development",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/module-development/introduction" },
          {
            text: "The Core module file",
            link: "/module-development/core-module-file",
          },
          { text: "The Node Helper", link: "/module-development/node-helper" },
          {
            text: "Rendering Component",
            link: "/module-development/rendering",
          },
          {
            text: "MagicMirror Helper Methods",
            link: "/module-development/helper-methods",
          },
          { text: "Logger", link: "/module-development/logger" },
          { text: "Notifications", link: "/module-development/notifications" },
          {
            text: "Weather Module Weather Provider Development",
            link: "/module-development/weather-provider",
          },
          {
            text: "How to write good documentation",
            link: "/module-development/documentation",
          },
        ],
      },
      {
        text: "Core Development",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/core-development/introduction.md" },
          {
            text: "Testing",
            link: "/core-development/testing.md",
          },
          { text: "Debugging", link: "/core-development/debugging.md" },
        ],
      },
      {
        text: "About",
        collapsed: true,
        items: [
          { text: "Manifesto", link: "/about/manifesto" },
          { text: "Contributing Guidelines", link: "/about/contributing" },
          { text: "Donate", link: "/about/donate" },
          { text: "Support", link: "/about/support" },
          { text: "License", link: "/about/LICENSE" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/MagicMirrorOrg/MagicMirror" },
      { icon: "discord", link: "https://discord.gg/J5BAtvx" },
    ],
  },
});
