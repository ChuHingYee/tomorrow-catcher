import 'source-map-support/register.js'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import parser from 'conventional-commits-parser'
import chalk from 'chalk'
import { execa } from 'execa'
import yargs from 'yargs-parser'
import { pkgRoot } from '../build/paths'
/**
 * fork = require( https://github.com/rollup/plugins/blob/master/scripts/release.ts ）
 */

type Commit = parser.Commit<string | number | symbol>

interface BreakingCommit {
  breaking: boolean
}

interface Notes {
  breaking: string[]
  features: string[]
  fixes: string[]
  updates: string[]
  UI: string[]
  chore: string[]
}

const { log } = console
const parserOptions = {
  noteKeywords: ['BREAKING CHANGE', 'Breaking Change'],
}
const reBreaking = new RegExp(`(${parserOptions.noteKeywords.join(')|(')})`)

const getCommits = async (shortName: string) => {
  log(chalk`{blue Gathering Commits}`)

  let params = ['tag', '--list', `${shortName}-v*`, '--sort', '-v:refname']
  const { stdout: tags } = await execa('git', params)
  const [latestTag] = tags.split('\n')

  log(chalk`{blue Last Release Tag}: ${latestTag || '<none>'}`)

  params = [
    '--no-pager',
    'log',
    `${latestTag}..HEAD`,
    '--format=%B%n-hash-%n%H🐒💨🙊',
  ]
  const rePlugin = new RegExp(
    `^[\\w\\!]+\\(([\\w,-]+)?${shortName}([\\w,-]+)?\\)`,
    'i'
  )
  let { stdout } = await execa('git', params)
  if (!stdout) {
    if (latestTag) params.splice(2, 1, `${latestTag}`)
    else params.splice(2, 1, 'HEAD')
    ;({ stdout } = await execa('git', params))
  }
  const commits = stdout
    .split('🐒💨🙊')
    .filter((commit) => {
      const chunk = commit.trim()
      return chunk && rePlugin.test(chunk)
    })
    .map((commit) => {
      const node = parser.sync(commit)
      const body = (node.body || node.footer) as string
      if (!node.type) {
        node.type = parser.sync(
          node.header?.replace(/\(.+\)!?:/, ':') || ''
        ).type
      }

      ;(node as unknown as BreakingCommit).breaking =
        reBreaking.test(body) || /!:/.test(node.header as string)

      return node
    })
  return commits
}

const updateGitLog = (commits: Commit[], cwd: string, shortName: string) => {
  log(chalk`{blue Gathering Changes}`)
  const title = `# @tomorrow-catcher/${shortName} GitLog`
  const [date] = new Date().toISOString().split('T')
  const logPath = join(cwd, 'GitLog.md')
  const logFile = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : ''
  const oldNotes = logFile.startsWith(title)
    ? logFile.slice(title.length).trim()
    : logFile
  const notes: Notes = {
    breaking: [],
    features: [],
    fixes: [],
    updates: [],
    UI: [],
    chore: [],
  }
  for (const commit of commits) {
    const { breaking, hash, header, type } = commit
    const ref = /\(#\d+\)/.test(header as string)
      ? ''
      : ` (${hash?.substring(0, 7)})`
    const message = header?.trim().replace(/\(.+\)!?:/, ':') + ref
    if (breaking) {
      notes.breaking.push(message)
    } else if (type === 'fix') {
      notes.fixes.push(message)
    } else if (type === 'feat' || type === 'feature') {
      notes.features.push(message)
    } else if (type === 'chore') {
      notes.chore.push(message)
    } else {
      notes.updates.push(message)
    }
  }
  const parts = [
    `## new commits`,
    `_${date}_`,
    notes.breaking.length
      ? `### Breaking Changes\n\n- ${notes.breaking.join('\n- ')}`.trim()
      : '',
    notes.fixes.length
      ? `### Bugfixes\n\n- ${notes.fixes.join('\n- ')}`.trim()
      : '',
    notes.features.length
      ? `### Features\n\n- ${notes.features.join('\n- ')}`.trim()
      : '',
    notes.updates.length
      ? `### Updates\n\n- ${notes.updates.join('\n- ')}`.trim()
      : '',
  ].filter(Boolean)
  const newLog = parts.join('\n\n')
  log(chalk`{blue Updating} GitLog.md`)
  let content = [title, newLog, oldNotes].filter(Boolean).join('\n\n')
  if (!content.endsWith('\n')) content += '\n'
  writeFileSync(logPath, content, 'utf-8')
}

;(async () => {
  try {
    const argv = yargs(process.argv.slice(2))
    const packageName = argv.pkg
    if (!packageName) {
      throw new RangeError('pkg must be specified via --pkg packageName.')
    }
    const shortName = packageName.replace(/^@.+\//, '')
    const cwd = join(pkgRoot, shortName)
    if (!cwd || !existsSync(cwd)) {
      throw new RangeError(
        `Could not find directory for package: ${packageName}`
      )
    }
    const commits = await getCommits(shortName)
    if (!commits.length) {
      log(
        chalk`\n{red No Commits Found}. Did you mean to publish ${packageName}?`
      )
      process.exit(1)
    }
    log(chalk`{blue Found} {bold ${commits.length}} Commits\n`)
    updateGitLog(commits, cwd, shortName)
  } catch (e) {
    log(e)
    process.exit(1)
  }
})()
