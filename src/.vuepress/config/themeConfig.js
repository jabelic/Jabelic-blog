
themeConfig: {
    locales: {
      '/': {
        languages: {                              // Used in the drop down of languages
          label: 'Japanese', 
          shortname: 'JA' 
         }, 
        translation: {},                          // Look for the "translations section" below
        logo: { 
          name: 'MY_LOGO_FILENAME', 
          ext: 'png', 
          alt: 'My description about logo' 
        },
        share: { 
          facebookCaption: 'MY_CAPTION_FB_SHARE', 
          twitterVia: 'MY_TWITTER_NICKNAME' 
        },
        newsletter: {
          provider: 'mailchimp',                  // Currently supports mailchimp
          action: 'link_form_action_mailchimp'
        },
        copy: '2018 © Ktquez play - <a href="https://vuepress.vuejs.org/" rel="noopener" target="_blank"> MADE WITH VUEPRESS </a>',
        footer: {
          nav1: {
            title: 'NAVIGATION 1',                
            items: [
              {
                label: 'ABOUT',
                path: '/about/'                         // Use "link" for external links and "path" for internal links
              },
              ...
            ]
          },
          nav2: {
            title: 'NAVIGATION 2',                 
            items: [
              {
                label: 'Slack Group',
                link: 'https://my_group.slack.com/'     // Use "link" for external links and "path" for internal links
              },
              ...
            ]
          }
        },
        social: [ 
          {
            name: 'twitter',                        // Look for the "social icon section" below
            link: 'https://www.twitter.com/ktquez'
          },
          ...
        ]
      },
      '/pt/': {
        languages: {                              // Used in the drop down of languages
          label: 'Portuguese', 
          shortname: 'PT' 
        },
        ...  // the rest of the properties of this locale are the same as the example above, but with information for that language
      },
      '/es/': ...
    },
    disqus: 'MY_DISQUS_SHORTNAME',
    url: 'https://jabelic.netlify.app',
    cdn: '',                              // If there is a CDN, put the bucket link here.
    blackWhite: true,                     // Active toggle for Nocturne mode
    topNavigation: true,                  // Turn on the navigation menu above the header
    searchMaxSuggestions: 7,              // Maximum result per search
    responsive: {
      active: true,                       // Turn on responsive images on the cover of the post
      ext: 'png',
      breakpoints: [320, 427, 524, 680]   // Breakpoints used for picture media tag
    },
    share: {
      facebook: { appId: '', version: 'v3.1' }
    },
    elevator: { duration: 4000, mainAudio: '/music/elevator.mp3', endAudio: '/music/ding.mp3' }
  },
}