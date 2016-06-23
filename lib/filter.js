module.exports = (project, attributes) => {
  const newObj = {}
  newObj.name = project.name
  attributes.forEach((attribute) => {
    newObj[attribute] = project[attribute]
  })
  return newObj
}
