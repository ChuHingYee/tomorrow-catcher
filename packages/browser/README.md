# @tomorrow-catcher/browser

the browser'SDK of the tomorrow-catcher'SDK

## Install

Using npm:

```console
npm install @tomorrow-catcher/browser
# or
yarn add @tomorrow-catcher/browser
# or
pnpm add @tomorrow-catcher/browser
```

## Usage

[DOCS](https://chuhingyee.github.io/tomorrow-catcher/sdks/browser.html)

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

### `sdkVersion`

Type: `string`<br>
Default: `${current SDK'version}`

the extra sdk'version

## Meta

[LICENSE (MIT)](/LICENSE)
