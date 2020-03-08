module.exports = ctx => ({
  title: 'Vue Formulate',
  description: 'The easiest way to build forms with Vue.',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
    ['meta', { name: 'twitter:image', content: 'http://assets.wearebraid.com/vue-formulate/logo-on-white.png' }],
  ],
  port: 8123,
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          path: '/guide/',
          collapsable: false,
          children: [
            {
              title: 'Installation',
              path: '/guide/installation/',
              collapsable: true
            },
            {
              title: 'Getting Started',
              path: '/guide/',
              collapsable: true
            },
            {
              title: 'Validation',
              path: '/guide/validation/',
              collapsable: true
            },
            {
              title: 'Custom Inputs',
              path: '/guide/custom-inputs/',
              collapsable: true
            },
            {
              title: 'Plugins',
              path: '/guide/plugins/',
              collapsable: true
            },
            {
              title: 'Theming',
              path: '/guide/theming/',
              collapsable: true
            },
            {
              title: 'Internationalization',
              path: '/guide/internationalization/',
              collapsable: true
            },
            {
              title: 'Contributing',
              path: '/guide/contributing/',
              collapsable: true
            }
          ]
        },
        {
          title: 'Inputs',
          collapsable: false,
          path: '/guide/inputs/',
          children: [
            {
              title: 'Configuration',
              collapsable: true,
              path: '/guide/inputs/',
            },
            ...[
              '/guide/inputs/text/',
              '/guide/inputs/box/',
              '/guide/inputs/button/',
              '/guide/inputs/file/',
              '/guide/inputs/select/',
              '/guide/inputs/sliders/',
              '/guide/inputs/textarea/'
            ]
          ]
        },
        {
          title: 'Forms',
          collapsable: false,
          path: '/guide/forms',
          children: [
            {
              title: 'Using forms',
              collapsable: true,
              path: '/guide/forms/',
            },
            {
              title: 'Error handling',
              collapsable: true,
              path: '/guide/forms/error-handling/',
            }
          ]
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Changelog', link: '/changelog/' }
    ],
    searchPlaceholder: 'Search...',
    smoothScroll: true,
    logo: '/assets/img/logo.png',
    repo: 'wearebraid/vue-formulate',
    docsRepo: 'wearebraid/vueformulate.com',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page!',
    algolia: {
      apiKey: 'efde7b14d4e236e6a1ea491545e42ea0',
      indexName: 'vueformulate'
    }
  },
  plugins: [
    ['live'],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-107296601-3' // UA-00000000-0
      }
    ],
    [ 'autometa', {
      site: {
        name   : 'Vue Formulate',
        twitter: 'wearebraid',
      },
      canonical_base: 'https://vueformulate.com',
    }]
  ],
  dest: 'public'
})
