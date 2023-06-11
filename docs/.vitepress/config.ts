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
      {
        text: 'Github',
        link: 'https://github.com/ChuHingYee/tomorrow-catcher',
      },
    ],
    sidebar: {
      '/docs/': [
        {
          title: '文档',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              text: '快速开始',
              link: '/docs/getting-started',
            },
          ],
        },
      ],
      '/sdks/': [
        {
          text: 'SDKs',
          items: [
            { text: '全部', link: '/sdks/' },
            { text: '基础版本', link: '/sdks/browser' },
            { text: 'vue版本', link: '/sdks/vue' },
            { text: 'react版本', link: '/sdks/react' },
          ],
        },
      ],
    },
  },
}
