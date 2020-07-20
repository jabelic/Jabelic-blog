/* eslint-disable no-console */
module.exports = {
  serviceWorker: true,
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/info/info.html' },
        { text: 'Github', link: 'https://github.com/jabelic' }
      ],
      domain: 'https://jabelic.netlify.app'
    },
    head:[
      ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    plugins: [
        [
          '@vuepress/google-analytics',
          {
            'ga': 'UA-148177675-2' // UA-00000000-0, GoogleAnalyticsトラッキングID
          }
        ],
        [
        'sitemap',
            {
            hostname: 'https://jabelic.netlify.app'
            },
        ],
        [
            'seo',
            {
                title: ($page, $site) => $page.title || $site.title,
                description: $page => $page.frontmatter.description,
                author: (_, $site) => $site.themeConfig.author,
                tags: $page => $page.frontmatter.tags,
                url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
                publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            }
        ]
    ]
  }