#!/usr/bin/env node

const parseArgs = require('minimist')
const run = require('./index.js')

const args = parseArgs(process.argv.slice(2), {
  'default': {
    delay: 3000,
    retries: 20,
    verbose: false,
    module: null
  },
  alias: {
    delay: 'd',
    retries: 'r',
    verbose: 'v',
    module: 'm'
  },
  string: ['delay', 'retries', 'module'],
  boolean: ['verbose'],
});

const toNumberOrThrow = (str, name) => {
  const number = parseInt(str, 10)
  if (Number.isNaN(number)) {
    throw new Error(`invalid value for number ${name}: ${str}`)
  }
  return number
}

const config = {
  delay: toNumberOrThrow(args.delay, 'delay'),
  retries: toNumberOrThrow(args.retries, 'retries'),
  verbose: args.verbose,
  module: args.module,
}

if (config.verbose) console.log('Testing with config:\n', config)

run(config, args).then(
  () => {
    if (config.verbose) {
      console.log('Check succesful, continuing...')
    }
  },
  (error) => {
    console.error(`${error.message}, aborting...`)
    process.exit(1)
  }
)
