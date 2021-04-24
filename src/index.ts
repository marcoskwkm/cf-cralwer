#!/usr/bin/env node

import yargs from 'yargs/yargs'

import { handleCodeforces } from './codeforces'

const argv = yargs(process.argv.slice(2))
  .options({
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
  })
  .help().argv

switch (argv.platform) {
  case 'cf':
    handleCodeforces(argv.id)
    break
}
