# @tomorrow-catcher/react

the react'SDK of the tomorrow-catcher'SDK

## Install

Using npm:

```bash
$ npm install --save  @tomorrow-catcher/react
```

or using yarn:

```bash
$ yarn add @tomorrow-catcher/react
```

or using pnpm:

```bash
$ pnpm add @tomorrow-catcher/react
```

## Usage

[DOCS](https://chuhingyee.github.io/tomorrow-catcher/sdks/react.html)

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

### `errorBoundary Options`

#### `errorComponent`

Type: `React.ReactElement`<br>

the errorBoundary component's default error component

#### `onMount`

Type: `Function`<br>

the errorBoundary component's componentDidMount

#### `onUnmount`

Type: `Function`<br>

the errorBoundary component's componentWillUnmount

#### `beforeUpload`

Type: `Function`<br>

the log custom info factory function

## Meta

[LICENSE (MIT)](/LICENSE)
