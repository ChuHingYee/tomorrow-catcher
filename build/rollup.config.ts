import path from 'path'
import { pkgRoot } from './paths'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import type { RollupOptions } from 'rollup'
if (!process.env.PKG) {
  throw new Error('pkg package must be specified via --environment flag.')
}
const packageDir = path.resolve(pkgRoot, process.env.PKG)
const resolve = (p) => path.resolve(packageDir, p)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.resolve(packageDir, 'package.json'))
const { name, version } = pkg

interface PkgRollup {
  type: 'iife' | 'esm' | 'type'
  name?: string
}

const babelPlugins = [
  babel({
    babelHelpers: 'runtime',
    extensions: ['.js', '.jsx', '.mjs', '.html', '.ts', '.tsx'],
  }),
]

const basePlugins = [
  json(),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
  }),
  commonjs(),
  esbuild({
    sourceMap: true,
    target: 'es2018',
    jsx: 'transform', // default, or 'preserve'
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    minify: process.env.NODE_ENV === 'production',
  }),
]
const banner = `/*! Tomorrow ${name}-v${version} */\n`

const generateConfig = function (list: PkgRollup[]) {
  const configs: RollupOptions[] = []
  list.forEach((item) => {
    if (item.type === 'iife') {
      configs.push(generateGlobalConfig(pkg, item.name as string))
    } else if (item.type === 'esm') {
      configs.push(generateESMConfig(pkg))
    } else if (item.type === 'type') {
      configs.push(generateTypeConfig(pkg))
    }
  })
  return configs
}

const generateGlobalConfig = function (pkg, name: string): RollupOptions {
  return {
    input: resolve('index.ts'),
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name,
    },
    plugins: [...basePlugins, ...babelPlugins],
  }
}

const generateESMConfig = function (pkg): RollupOptions {
  return {
    input: resolve('index.ts'),
    output: {
      format: 'esm',
      file: resolve(pkg.module),
      sourcemap: true,
      banner,
    },
    plugins: [...basePlugins],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  }
}

const generateTypeConfig = function (pkg): RollupOptions {
  return {
    input: resolve('index.ts'),
    output: {
      file: resolve(pkg.types),
      format: 'es',
    },
    plugins: [dts()],
  }
}

const configs = generateConfig(pkg.rollup)
export default configs
