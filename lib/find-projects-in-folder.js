const fs = require('fs-extra')

module.exports = (path) => {
  return new Promise((resolve) => {
    var items = []
    const filter = (item) => {
      var should_scan = true
      if (item.indexOf('node_modules') !== -1) {
        should_scan = false
      }
      if (item.indexOf('.git') !== -1) {
        should_scan = false
      }
      return should_scan
    }
    fs.walk(path, {filter}).on('data', (item) => {
      if (item.path.indexOf('/jellyfish.json') !== -1) {
        items.push(item.path)
      }
    }).on('end', () => {
      resolve(items.map((configPath) => {
        return JSON.parse(fs.readFileSync(configPath).toString())
      }))
    })
  })
}
