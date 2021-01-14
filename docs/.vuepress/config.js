const description = 'Built-in validation, error handling, grouped & repeatable fields, form generation, and more — make complex form creation a breeze.'
const title = 'Vue Formulate ⚡️ The easiest way to build forms with Vue.js'

module.exports = ctx => ({
  title,
  description,
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "https://vueformulate.com/assets/favicon/apple-touch-icon.png"}],
    ['script', { src: 'https://polyfill.io/v3/polyfill.min.js?features=es2015%2CFunction.name' }]
  ],
  port: 8123,
  themeConfig: {
    sidebar: {
      '/guide': [
        {
          title: 'Essentials',
          path: '/guide',
          collapsable: false,
          children: [
            {
              title: 'Installation',
              path: '/guide/installation/',
              collapsable: true
            },
            {
              title: 'Getting started',
              path: '/guide/',
              collapsable: true
            },
            {
              title: 'Validation',
              path: '/guide/validation/',
              collapsable: true
            },
            {
              title: 'Plugins',
              path: '/guide/plugins/',
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
            },
            {
              title: 'Community',
              path: '/guide/community/',
              collapsable: true
            }
          ]
        },
        {
          title: 'Inputs',
          collapsable: false,
          path: '/guide/inputs',
          children: [
            {
              title: 'Configuration',
              collapsable: true,
              path: '/guide/inputs/',
            },
            {
              title: 'Custom input types',
              collapsable: true,
              path: '/guide/inputs/custom-inputs/',
            },
            {
              title: 'Slots',
              collapsable: true,
              path: '/guide/inputs/slots/',
            },
            {
              title: 'Types',
              collapsable: false,
              children: [
                ...[
                  '/guide/inputs/types/button/',
                  '/guide/inputs/types/box/',
                  '/guide/inputs/types/file/',
                  '/guide/inputs/types/group/',
                  '/guide/inputs/types/select/',
                  '/guide/inputs/types/sliders/',
                  '/guide/inputs/types/text/',
                  '/guide/inputs/types/textarea/'
                ]
              ]
            }
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
              title: 'Generating forms',
              collapsable: true,
              path: '/guide/forms/generating-forms/',
            },
            {
              title: 'Error handling',
              collapsable: true,
              path: '/guide/forms/error-handling/',
            }
          ]
        },
        {
          title: 'Theming',
          collapsable: false,
          path: '/guide/theming',
          children: [
            {
              title: 'Overview',
              collapsable: true,
              path: '/guide/theming/',
            },
            {
              title: 'Customizing classes',
              collapsable: true,
              path: '/guide/theming/customizing-classes/',
            },
            {
              title: 'Styling tips',
              collapsable: true,
              path: '/guide/theming/styling-tips/',
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
    ['live', { noSsr: true }],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-107296601-3' // UA-00000000-0
      }
    ],
    ['seo', {
      title: $page => `${$page.title} — Vue Formulate`,
      image: () => 'https://vueformulate.com/assets/img/og.jpg',
      siteTitle: (_, $site) => $site.title,
      description: $page => $page.frontmatter.description || description,
      author: (_, $site) => $site.themeConfig.author,
      tags: $page => $page.frontmatter.tags,
      twitterCard: _ => 'summary_large_image',
      type: () => 'article',
      url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
      publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
    }]
  ],
  markdown: {
    plugins: [
      '@gerhobbelt/markdown-it-attrs'
    ]
  },
  dest: 'public'
})
