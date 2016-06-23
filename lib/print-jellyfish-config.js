const colors = require('colors/safe')
const printPropertyIfExists = require('./print-property-if-exists')

module.exports = (propertiesToPrint, config) => {
  console.log(colors.green('# ' + config.name.toUpperCase()))
  propertiesToPrint.forEach((property) => {
    printPropertyIfExists(config, property)
  })
  console.log()
}
