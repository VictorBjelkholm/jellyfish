const colors = require('colors/safe')
module.exports = (config, key) => {
  if (config[key] !== undefined) {
    const uppercasedKey = key.charAt(0).toUpperCase() + key.slice(1)
    var value = config[key]
    if (value === true) {
      value = 'Yes'
    } else if (value === false) {
      value = 'No'
    } else {
      value = value.toString()
    }
    console.log(colors.blue(uppercasedKey + '    \t') + value)
  }
}
