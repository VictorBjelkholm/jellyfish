const fs = require('fs')
module.exports = (path) => {
  return JSON.parse(fs.readFileSync(path).toString())
}
