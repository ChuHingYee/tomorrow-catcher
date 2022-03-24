# @tomorrow-catcher/vue

the vue'SDK of the tomorrow-catcher'SDK

## Install

Using npm:

```bash
$ npm install --save  @tomorrow-catcher/vue
```

or using yarn:

```bash
$ yarn add @tomorrow-catcher/vue
```

or using pnpm:

```bash
$ pnpm add @tomorrow-catcher/vue
```

## Usage

[DOCS](https://chuhingyee.github.io/tomorrow-catcher/sdks/vue.html)

## Options

### `key`

Type: `string`<br>
Default: ``

the app unique key

### `expireDate`

Type: `number`<br>
Default: `0`

the log expire date,the log will upload when the expireDate was setting 0.one step is millisecond.

### `reportUrl`

Type: `string`<br>
Default: ``

the log upload api url.

### `handlersList`

Type: `'error' | 'unhandledrejection' | 'fetch' | 'xhr'[]`<br>
Default: `[]`

the errors handler options

### `vue`

Type: `Vue Instance`<br>
Default: `null`

the Vue instance

### `beforeUpload`

Type: `Function`<br>
Default: ``

the log custom info factory function

### `beforeUpload`

Type: `Vue-Router Instance`<br>
Default: ``

the Vue-Router instance

## Meta

[LICENSE (MIT)](/LICENSE)
