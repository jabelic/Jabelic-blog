/* eslint-disable no-console */
const path = require("path");
const resolve = pathName => path.join(__dirname, pathName)
module.exports = {
    base: '/',
    ga: 'UA-70393520-1',
    evergreen: true,
    locales: {
      '/': {
        lang: 'ja-JP'
      },
    },
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/info/info.html' },
        { text: 'Github', link: 'https://github.com/jabelic' }
      ],
      domain: 'https://jabelic.netlify.app'
    },
    head: [
      ['link', { rel: 'icon', href: './public/favicon.ico' }],
      ['link', { rel: 'manifest', href: '/manifest.json' }],
      ['meta', { name: 'theme-color', content: '#3eaf7c' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['link', { rel: 'apple-touch-icon', href: './public/apple-touch-icon-120x120.png' }],
      ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
      ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
      ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    configureWebpack () {
      return {
        resolve: {
          alias: {
            '@public': resolve('./public')
          }
        }
      }
    },
    plugins: [
      [
        '@vuepress/medium-zoom',
        {
          selector: 'img.zoom-custom-imgs',
          // medium-zoom options here
          // See: https://github.com/francoischalifour/medium-zoom#options
          options: {
            margin: 16
          }
        }
      ],
        [
          '@maginapp/vuepress-plugin-katex',
          {
            delimiters: 'dollars'
          }
        ],
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
        ],
        [
          '@vuepress/pwa',
          {
            serviceWorker: true,
            popupComponent: 'MySWUpdatePopup',
            updatePopup: {
              message: "New content is available.",
              buttonText: "Refresh"
          }
          }
        ],
        ['@vuepress/last-updated']
    ],
}
