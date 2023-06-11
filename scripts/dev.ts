import { join } from 'path'
import { execa } from 'execa'
import { existsSync } from 'fs'
import chalk from 'chalk'
import yargs from 'yargs-parser'
import { pkgRoot } from '../build/paths'

const { log } = console

const clean = async function (
  cwd: string,
  packageName: string,
  shortName: string
) {
  log(
    `${chalk.blueBright(`Cleaning ${packageName}`)} from ${chalk.gray(
      `packages/${shortName}`
    )}\n`
  )
  await execa('rimraf', [join(cwd, 'dist')], { stdio: 'inherit' })
}

const build = function (packageName: string, shortName: string) {
  log(
    `${chalk.blueBright(`Building ${packageName}`)} from ${chalk.gray(
      `packages/${shortName}`
    )}\n`
  )
  execa(
    'rollup',
    [
      '-c',
      '-w',
      '--environment',
      [`PKG:${shortName}`].filter(Boolean).join(','),
    ],
    { stdio: 'inherit' }
  )
}

;(async () => {
  try {
    const argv = yargs(process.argv.slice(2))
    const packageNames = argv.pkgs
    if (!packageNames) {
      throw new RangeError(
        'pkgs must be specified via --pkgs packageA,packageB.'
      )
    }
    const packageNamesArr = packageNames.split(',')
    packageNamesArr.forEach(async (packageName: string) => {
      const shortName = packageName.replace(/^@.+\//, '')
      const cwd = join(pkgRoot, shortName)
      if (cwd && existsSync(cwd)) {
        await clean(cwd, packageName, shortName)
        await build(packageName, shortName)
      }
    })
  } catch (e) {
    log(e)
    process.exit(1)
  }
})()
