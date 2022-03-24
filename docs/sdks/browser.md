# 普通版本

封装 js 错误监控

## 安装

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install @tomorrow-catcher/browser
# Yarn
$ yarn add @tomorrow-catcher/browser
# pnpm
$ pnpm add @tomorrow-catcher/browser
```

## 基础用法

::: details 点击查看代码

```js
import { init } from '@tomorrow-catcher/browser'

init({
  key: 'key',
  expireDate: 1,
  reportUrl: 'http://localhost:4873/',
  handlersList: ['error', 'unhandledrejection', 'fetch', 'xhr'],
})
```

:::

## SDK 属性

| 属性         |                                         说明                                         |   类型 |                                        可选值 |                默认值 |
| ------------ | :----------------------------------------------------------------------------------: | -----: | --------------------------------------------: | --------------------: |
| key          |                                     应用对应 key                                     | string |                                             - |                     - |
| expireDate   |                日志过期时间，单位为天，如果为 0 时捕获错误后马上上传                 | number |                                             - |                     - |
| reportUrl    | 日志上传 api 地址，请求方法为 post(resquest body:{appkey:string,list:TomorrowLog[]}) | string |                                             - |                     - |
| handlersList |                                    错误捕获类型：                                    |  array | error/unhandledrejection/fetch/xhr/sourceLoad |                    [] |
| sdkVersion   |                                       SDK 信息                                       | string |                                             - | 当前 sdk 版本 version |
