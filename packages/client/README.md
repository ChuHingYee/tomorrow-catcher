# @tomorrow-catcher/client

the base'SDK of the tomorrow-catcher'SDK

## Install

Using npm:

```console
npm install @tomorrow-catcher/client
# or
yarn add @tomorrow-catcher/client
# or
pnpm add @tomorrow-catcher/client
```

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

### `systemInfo`

Type: `{platform:string,userAgent:string,language:string,baseVersion:string,sdkVersion:string}`<br>
Default: `null`

the base'SDK system info

## Meta

[LICENSE (MIT)](/LICENSE)
