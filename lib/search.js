module.exports = (projects, attribute, term) => {
  return projects.filter((project) => {
    if (project[attribute] === undefined) {
      return false
    } else {
      return project[attribute].toString().indexOf(term) !== -1
    }
  })
}
