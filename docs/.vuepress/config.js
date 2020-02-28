module.exports = {
  title: 'Vue Formulate',
  description: 'The easiest way to build forms with Vue.',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
  ],
  port: 8123,
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          path: '/guide',
          collapsable: false,
          children: [
            {
              title: 'Installation',
              path: '/guide/installation',
              collapsable: true
            },
            {
              title: 'Getting Started',
              path: '/guide/',
              collapsable: true
            },
            {
              title: 'Validation',
              path: '/guide/validation',
              collapsable: true
            },
            {
              title: 'Custom Inputs',
              path: '/guide/custom-inputs',
              collapsable: true
            },
            {
              title: 'Plugins',
              path: '/guide/plugins',
              collapsable: true
            },
            {
              title: 'Theming',
              path: '/guide/theming',
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
            ...[
              '/guide/inputs/text',
              '/guide/inputs/box',
              '/guide/inputs/button',
              '/guide/inputs/file',
              '/guide/inputs/select',
              '/guide/inputs/sliders',
              '/guide/inputs/textarea'
            ]
          ]
        },
        {
          title: 'Forms',
          collapsable: false,
          path: '/guide/forms',
          children: [
            {
              title: 'Configuration',
              collapsable: true,
              path: '/guide/forms/',
            }
          ]
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    searchPlaceholder: 'Search...',
    smoothScroll: true,
    logo: '/assets/img/logo.png',
    repo: 'wearebraid/vue-formulate',
    docsRepo: 'wearebraid/vueformulate.com',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page!'
  }
}
