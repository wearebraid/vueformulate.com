module.exports = {
  title: 'Vue Formulate',
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            {
              title: 'Installation',
              path: '/guide/installation',
              collapsable: true
            },
            {
              title: 'Introduction',
              path: '/guide/',
              collapsable: true
            },
            {
              title: 'Configuration',
              path: '/guide/configuration',
              collapsable: true
            },
            {
              title: 'Validation',
              path: '/guide/validation',
              collapsable: true
            }
          ]
        },
        {
          title: 'Inputs',
          collapsable: false,
          children: [
            '/guide/inputs/text',
            '/guide/inputs/box',
            '/guide/inputs/file',
            '/guide/inputs/select',
            '/guide/inputs/sliders',
            '/guide/inputs/textarea'
          ]
        },
        {
          title: 'Theme',
          collapsable: false,
          children: []
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Inputs', link: '/guide/inputs/text' },
      { text: 'Theme Builder', link: '/theme-builder/' },
      { text: 'Github', link: 'https://github.com/wearebraid/vue-formulate' }
    ],
    searchPlaceholder: 'Search...',
    smoothScroll: true
  }
}
