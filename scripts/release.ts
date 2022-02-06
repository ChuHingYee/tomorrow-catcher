import chalk from 'chalk'
import execa from 'execa'
const { log } = console

const setVersion = async () => {
  log(chalk`{blue Setting Version}`)
  await execa('pnpm', ['changeset', 'version'], {
    stdio: 'inherit',
  })
}

const buildFile = async () => {
  log(chalk`{blue Building Files}`)
  await execa('pnpm', ['build'], {
    stdio: 'inherit',
  })
}

const publish = async () => {
  log(chalk`{blue Publish Changes}`)
  await execa('pnpm', ['changeset', 'publish'], {
    stdio: 'inherit',
  })
}

;(async () => {
  try {
    log(chalk`{cyan Releasing\n}`)
    await setVersion()
    await buildFile()
    await publish()
  } catch (e) {
    log(e)
    process.exit(1)
  }
})()
