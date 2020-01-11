module.exports = {
  title: 'MagicMirror² Documentation',
  description: 'The open source modular smart mirror platform.',
  themeConfig: {
    // logo: '/mm.png',
    nav: [
      { text: 'Donate', link: 'https://magicmirror.builders/donate' },
      { text: 'Forum', link: 'https://forum.magicmirror.builders' }
    ],
    sidebar: [
      {
        title: 'Getting Started',
        collapsable: false,
        children: [
          '/',
          'getting-started/license',
          'getting-started/requirements',
          'getting-started/installation',
          'getting-started/configuration',
          'getting-started/upgrade-guide',
          'getting-started/contributing',
          'getting-started/support',
          'getting-started/manifesto',
          'getting-started/donate',
        ]
      },
      {
        title: 'Modules',
        collapsable: false,
        children: [
          'modules/introduction',
          'modules/configuration',
          {
            title: 'Default Modules',
            collapsable: false,
            children: [
              'modules/alert',
              'modules/calendar',
              'modules/clock',
              'modules/compliments',
              'modules/currentweather',
              'modules/helloworld',
              'modules/newsfeed',
              'modules/updatenotification',
              'modules/weather',
              'modules/weatherforecast'
            ]
          }
        ]
      },
      'development/introduction',
    ],
    repo: 'MichMich/MagicMirror',
    repoLabel: 'GitHub',

    docsRepo: 'MichMich/MagicMirror-Documentation',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Updated'
  },
  markdown: {
    toc: { includeLevel: [2, 3, 4] }
  },
  locales: {
    '/': {
      lang: 'en'
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-1219071-59' // UA-00000000-0
      }
    ]
  ]
}