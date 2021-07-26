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
  locales:{
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: title,
      description: description
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Vue Formulate ⚡️ 最简单的构建表单的方法',
      description: '内置验证器、错误处理、分组和可复用的字段、表单生成等 -- 使复杂表单的创建变得轻而易举'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
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
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        ariaLabel: '选择语言',
        sidebar: {
          '/zh/guide': [
            {
              title: '必要内容',
              path: '/zh/guide',
              collapsable: false,
              children: [
                {
                  title: '安装',
                  path: '/zh/guide/installation/',
                  collapsable: true
                },
                {
                  title: '快速开始',
                  path: '/zh/guide/',
                  collapsable: true
                },
                {
                  title: '验证器',
                  path: '/zh/guide/validation/',
                  collapsable: true
                },
                {
                  title: '插件',
                  path: '/zh/guide/plugins/',
                  collapsable: true
                },
                {
                  title: '国际化',
                  path: '/zh/guide/internationalization/',
                  collapsable: true
                },
                {
                  title: '开源贡献',
                  path: '/zh/guide/contributing/',
                  collapsable: true
                },
                {
                  title: '社区',
                  path: '/zh/guide/community/',
                  collapsable: true
                }
              ]
            },
            {
              title: '表单域',
              collapsable: false,
              path: '/zh/guide/inputs',
              children: [
                {
                  title: '配置',
                  collapsable: true,
                  path: '/zh/guide/inputs/',
                },
                {
                  title: '自定义表单域类型',
                  collapsable: true,
                  path: '/zh/guide/inputs/custom-inputs/',
                },
                {
                  title: '插槽',
                  collapsable: true,
                  path: '/zh/guide/inputs/slots/',
                },
                {
                  title: '类型',
                  collapsable: false,
                  children: [
                    ...[
                      '/zh/guide/inputs/types/button/',
                      '/zh/guide/inputs/types/box/',
                      '/zh/guide/inputs/types/file/',
                      '/zh/guide/inputs/types/group/',
                      '/zh/guide/inputs/types/select/',
                      '/zh/guide/inputs/types/sliders/',
                      '/zh/guide/inputs/types/text/',
                      '/zh/guide/inputs/types/textarea/'
                    ]
                  ]
                }
              ]
            },
            {
              title: '表单',
              collapsable: false,
              path: '/zh/guide/forms',
              children: [
                {
                  title: '使用表单',
                  collapsable: true,
                  path: '/zh/guide/forms/',
                },
                {
                  title: '构建表单',
                  collapsable: true,
                  path: '/zh/guide/forms/generating-forms/',
                },
                {
                  title: '错误处理',
                  collapsable: true,
                  path: '/zh/guide/forms/error-handling/',
                }
              ]
            },
            {
              title: '主题',
              collapsable: false,
              path: '/zh/guide/theming',
              children: [
                {
                  title: '介绍',
                  collapsable: true,
                  path: '/zh/guide/theming/',
                },
                {
                  title: '定制 class',
                  collapsable: true,
                  path: '/zh/guide/theming/customizing-classes/',
                },
                {
                  title: '自定义样式技巧',
                  collapsable: true,
                  path: '/zh/guide/theming/styling-tips/',
                }
              ]
            }
          ]
        },
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '教程', link: '/zh/guide/' },
          { text: '变更记录', link: '/zh/changelog/' }
        ],
      }
    },
    
    
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
