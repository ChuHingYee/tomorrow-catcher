# React 版本

基于 react 对 @tomorrow-catcher/browser 的封装

## 安装

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install @tomorrow-catcher/react
# Yarn
$ yarn add @tomorrow-catcher/react
# pnpm
$ pnpm add @tomorrow-catcher/react
```

## 基本用法

::: details 点击查看代码

```js{5,14-28}
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { init, ErrorBoundary, ErrorBoundaryProps } from "@tomorrow-catcher/react";

init({
  key: "key",
  expireTime: 100000,
  type: "delay",
  reportUrl: "http://localhost:4873/",
});

function errorComponent() {
  return (
    <div className='App'>
      <span>i am custom error compontet</span>
    </div>
  );
}

const beforeUpload: ErrorBoundaryProps["beforeUpload"] = function (
  err,
  errInfo,
) {
  console.log(err);
  return {
    customForm: `i am ${errInfo}`,
  };
};

ReactDOM.render(
    <ErrorBoundary
      errorComponent={errorComponent()}
      beforeUpload={beforeUpload}
    >
      <App />
    </ErrorBoundary>
  document.getElementById("root"),
);
```

:::

## SDK 属性

[继承@tomorrow-catcher/brower 所有属性](./browser#sdk-属性)

### ErrorBoundary 组件 属性

| 属性           |            说明            |               类型 | 可选值 | 默认值 |
| -------------- | :------------------------: | -----------------: | -----: | -----: |
| errorComponent |       自定义错误组件       | React.ReactElement |      - |      - |
| onMount        |   组件 onMount 生命周期    |           function |      - |      - |
| onUnmount      |  组件 onUnmount 生命周期   |           function |      - |      - |
| onError        |  捕获错误时自定义触发方法  |           function |      - |      - |
| beforeUpload   | 自定义日志 customInfo 属性 |           function |      - |      - |
