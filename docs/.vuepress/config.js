module.exports = {
  title: 'Vue Formulate',
  themeConfig: {
    sidebar: [
      {
        title: 'Guide',
        path: '/guide/',
        collapsable: false,
        sidebarDepth: 2
      },
      {
        title: 'Inputs',
        path: '/inputs/',
        collapsable: false,
        sidebarDepth: 2
      }
    ],
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/wearebraid/vue-formulate' }
    ],
    searchPlaceholder: 'Search...',
    smoothScroll: true
  }
  // configureWebpack: (config, isServer) => {
  //   config.resolve.symlinks = false
  // }
}
