module.exports = {
  title: 'MagicMirror²',
  description: 'Documentation',
  themeConfig: {
    // logo: '/mm.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Donate', link: 'https://magicmirror.builders/donate' }
    ],
    sidebar: [
      {
        title: 'Getting Started',
        children: [
          '/',
          'getting-started/license',
          'getting-started/installation',
          'getting-started/configuration',
          'getting-started/upgrade-guide',
          'getting-started/contributing',
          'getting-started/support',
        ]
      },
      {
        title: 'Modules',
        children: [
          'modules/introduction',
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
  }
}