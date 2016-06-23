module.exports = (projects, attributes) => {
  return projects.map((project) => {
    const newObj = {}
    attributes.forEach((attribute) => {
      newObj[attribute] = project[attribute]
    })
    return newObj
  })
}
