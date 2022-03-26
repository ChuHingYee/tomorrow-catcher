# Vue 版本

基于 vue 对 @tomorrow-catcher/browser 的封装

## 安装

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install @tomorrow-catcher/vue
# Yarn
$ yarn add @tomorrow-catcher/vue
# pnpm
$ pnpm add @tomorrow-catcher/vue
```

## 基础用法

::: info
在如果需要使用 errorHandler 函数，需要再声明函数后调用 init 方法
:::

::: details 点击查看代码

```js{5,14-27}
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { init } from "@tomorrow-catcher/vue";

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info);
  console.log("i am custom");
};

init({
  key: "key",
  expireDate: 1,
  reportUrl: "http://localhost:4873/",
  vue: app,
  beforeUpload(err, from, vm, info) {
    console.log(err, vm, info);
    return {
      err,
      customForm: `i am from ${from}`,
    };
  },
  router,
});

app.use(store).use(router).mount("#app");

```

:::

## 监控路由

::: info
在基础用法上传入 router 对象即可
:::

::: details 点击查看代码

```js{3,14}
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { init } from "@tomorrow-catcher/vue";

const app = createApp(App);

init({
  key: "key",
  expireDate: 1,
  reportUrl: "http://localhost:4873/",
  vue: app,
  router,
});

app.use(store).use(router).mount("#app");

```

:::

## SDK 属性

[继承@tomorrow-catcher/brower 所有属性](./browser#sdk-属性)

| 属性         |            说明            |       类型 | 可选值 | 默认值 |
| ------------ | :------------------------: | ---------: | -----: | -----: |
| vue          |          vue 实例          |          - |      - |      - |
| beforeUpload | 自定义日志 customInfo 属性 | `function` |      - |      - |
| router       |        router 实例         |          - |      - |      - |
