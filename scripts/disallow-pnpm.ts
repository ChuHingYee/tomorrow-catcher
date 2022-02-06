const agent = process.env.npm_config_user_agent
const { error } = console
console.log(agent, 'agent')
if (!(agent as string).startsWith('pnpm')) {
  error(
    '\nPlease use pnpm to manage dependencies in this repository.\n  $ npm i pnpm -g\n'
  )
  process.exit(1)
}
