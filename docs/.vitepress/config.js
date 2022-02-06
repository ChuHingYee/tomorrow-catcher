module.exports = {
  base: '/tomorrow-catcher/',
  title: 'Tomorrow Catcher',
  description: 'Tomorrow Catcher,Bugs,Error,Vue,React',
  themeConfig: {
    lastUpdated: 'lastUpdate',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/docs/getting-started' },
      { text: 'SDKs', link: '/sdks/' },
      { text: 'Github', link: 'https://github.com/ChuHingYee/tomorrow-catcher' },
    ],
    sidebar: {
      '/docs/': [
        {
          title: '文档',
          collapsable: false,
          sidebarDepth: 1,
          children: [{
            text: '快速开始',
            link: '/docs/getting-started'
          }],
        },
      ],
      '/sdks/': [
        {
          title: 'SDKs',
          collapsable: false,
          sidebarDepth: 1,
          children: [{
            text: 'SDKs',
            link: '/sdks/'
          }],
        },
        {
          title: '基础版本',
          collapsable: false,
          sidebarDepth: 0,
          children: [{
            text: '基础',
            link: '/sdks/browser'
          }],
        },
        {
          title: 'vue版本',
          collapsable: false,
          sidebarDepth: 0,
          children: [{
            text: 'vue',
            link: '/sdks/vue'
          }],
        },
        {
          title: 'react版本',
          collapsable: false,
          sidebarDepth: 0,
          children: [{
            text: 'react',
            link: '/sdks/react'
          }],
        },
      ],
    },
  },
  markdown: {
    anchor: { permalink: false },
    toc: { includeLevel: [1, 2] },
  }
}