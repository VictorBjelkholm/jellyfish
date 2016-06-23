#! /usr/bin/env node
const fs = require('fs-extra')
const colors = require('colors/safe')
const readJellyfishFile = require('./lib/read-jellyfish-file')
const findProjectsInFolder = require('./lib/find-projects-in-folder')
const createJellyfishFile = require('./lib/create-jellyfish-file')
const printJellyConfig = require('./lib/print-jellyfish-config')
const filter = require('./lib/filter')

const supportedProperties = [
  'description',
  'tags',
  'homepage',
  'created',
  'type',
  'language',
  'active',
  'finished'
]

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'filter': ['f'],
    'search': ['s']
  }
})
if (argv.search !== undefined) {
  console.log(colors.yellow('NOT IMPLEMENTED YET!'))
  console.log('Should do some searching as well')
  console.log(argv.search)
}

const commands = {}

commands.new = () => {
  createJellyfishFile()
}
commands.print_directory = (path) => {
  findProjectsInFolder(path).then((projects) => {
    filter(projects, [argv.filter]).forEach((project) => {
      printJellyConfig(supportedProperties, project)
    })
  })
}
commands.print_file = (path) => {
  var jellyfishFile = readJellyfishFile(path)
  if (argv.filter !== undefined) {
    jellyfishFile = filter(jellyfishFile, argv.filter.split(','))
  }
  printJellyConfig(supportedProperties, jellyfishFile)
}

const pathOrCmd = argv._[0]

if (pathOrCmd === undefined) {
  throw new Error('Need to provide path to jellyfish.json (or a directory to search) as first argument')
}

if (commands[pathOrCmd] === undefined) {
  // is a path TODO unless the path is actually new
  const path = pathOrCmd
  const stats = fs.statSync(path)
  if (stats.isDirectory()) {
    commands.print_directory(path)
  } else {
    commands.print_file(path)
  }
} else {
  commands[pathOrCmd]()
}
