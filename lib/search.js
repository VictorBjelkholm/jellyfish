module.exports = (projects, attribute, term) => {
  return projects.filter((project) => {
    return project[attribute].indexOf(term) !== -1
  })
}
