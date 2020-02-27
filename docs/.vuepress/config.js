module.exports = {
  title: 'Vue Formulate',
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
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/wearebraid/vue-formulate' }
    ],
    searchPlaceholder: 'Search...',
    smoothScroll: true,
    logo: '/assets/img/logo.png',
  }
}
