#!/usr/bin/env node

import yargs from 'yargs/yargs'

import * as Codeforces from './codeforces'

const handleSamples = (argv: { platform: string; id?: string }) => {
  switch (argv.platform) {
    case 'cf':
      Codeforces.handleSamples(argv.id)
      break
  }
}

const handleServer = (argv: { platform: string }) => {
  switch (argv.platform) {
    case 'cf':
      Codeforces.handleServer()
      break
  }
}

const handleSubmit = (argv: {
  platform: string
  id: string
  problem: string
  _: any[]
}) => {
  const [_, codePath] = argv._

  if (typeof codePath !== 'string') {
    console.error('Missing path to solution code')
    process.exit(-1)
  }

  switch (argv.platform) {
    case 'cf':
      Codeforces.submit(argv.id, argv.problem, codePath)
      break
  }
}

yargs(process.argv.slice(2))
  .command(
    'samples',
    'download samples',
    (yargs) =>
      yargs.options({
        platform: {
          alias: 'p',
          description: 'Which platform to crawl from',
          choices: ['cf'],
          demandOption: true,
        },
        id: {
          alias: 'i',
          description: 'The contest id',
          type: 'string',
        },
      }),
    (argv) => handleSamples(argv)
  )
  .command(
    'server',
    'start submission server',
    (yargs) =>
      yargs.options({
        platform: {
          alias: 'p',
          description: 'Which platform to submit to',
          choices: ['cf'],
          demandOption: true,
        },
      }),
    (argv) => handleServer(argv)
  )
  .command(
    'submit',
    'submit problem',
    (yargs) =>
      yargs.options({
        platform: {
          alias: 'p',
          description: 'Which platform to submit to',
          choices: ['cf'],
          demandOption: true,
        },
        id: {
          alias: 'i',
          description: 'The contest id',
          type: 'string',
          demandOption: true,
        },
        problem: {
          alias: 'P',
          description: 'Which problem to submit',
          type: 'string',
          demandOption: true,
        },
      }),
    (argv) => handleSubmit(argv)
  )

  .help().argv
