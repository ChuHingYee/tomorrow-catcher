import { join } from 'path'
import execa from 'execa'
import { existsSync } from 'fs'
import chalk from 'chalk'
import { pkgRoot } from '../build/paths'
import { packages } from '../meta/packages'

const { log } = console

const clean = async function (
  cwd: string,
  packageName: string,
  shortName: string
) {
  log(chalk`{cyan Cleaning ${packageName}} from {grey packages/${shortName}}\n`)
  await execa('rimraf', [join(cwd, 'es')], { stdio: 'inherit' })
  await execa('rimraf', [join(cwd, 'lib')], { stdio: 'inherit' })
}

const build = async function (packageName: string, shortName: string) {
  log(chalk`{cyan Building ${packageName}} from {grey packages/${shortName}}\n`)
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [`PKG:${shortName}`, 'NODE_ENV:production'].filter(Boolean).join(','),
    ],
    { stdio: 'inherit' }
  )
}

const buildPackages = async function () {
  for (const name of packages) {
    const shortName = name.replace(/^@.+\//, '')
    const cwd = join(pkgRoot, shortName)
    if (cwd && existsSync(cwd)) {
      await clean(cwd, name, shortName)
      await build(name, shortName)
    }
  }
}

;(async () => {
  try {
    buildPackages()
  } catch (e) {
    log(e)
    process.exit(1)
  }
})()
