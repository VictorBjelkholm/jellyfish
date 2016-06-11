const fs = require('fs-extra')
const colors = require('colors/safe')

if (process.argv[2] === undefined) {
  throw new Error('Need to provide path to jellyfish.json as first argument')
}
const path = process.argv[2]

const printIfExists = (config, key) => {
  if (config[key] !== undefined) {
    const uppercasedKey = key.charAt(0).toUpperCase() + key.slice(1)
    console.log(colors.blue(uppercasedKey + '    \t') + config[key].toString())
  }
}

const propertiesToPrint = [
  'description',
  'tags',
  'homepage',
  'created',
  'type',
  'language',
  'active',
  'finished'
]

const printJellyConfig = (config) => {
  console.log(colors.green('# ' + config.name))
  propertiesToPrint.forEach((property) => {
    printIfExists(config, property)
  })
  console.log()
}

const stats = fs.statSync(path)
if (stats.isDirectory()) {
  var items = []
  fs.walk(path).on('data', function (item) {
    if (item.path.indexOf('/jellyfish.json') !== -1) {
      items.push(item.path)
    }
  }).on('end', function () {
    items.forEach((configPath) => {
      const jellyConfig = JSON.parse(fs.readFileSync(configPath).toString())
      printJellyConfig(jellyConfig)
    })
  })
}
if (stats.isFile()) {
  const jellyConfig = JSON.parse(fs.readFileSync(path).toString())
  printJellyConfig(jellyConfig)
}
