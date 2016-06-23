module.exports = (projects, attributes) => {
  if (Array.isArray(projects)) {
    return projects.map((project) => {
      const newObj = {}
      newObj.name = project.name
      attributes.forEach((attribute) => {
        newObj[attribute] = project[attribute]
      })
      return newObj
    })
  } else {
    const project = projects
    const newObj = {}
    newObj.name = project.name
    attributes.forEach((attribute) => {
      newObj[attribute] = project[attribute]
    })
    return newObj
  }
}
