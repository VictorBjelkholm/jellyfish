var test = require('ava').test

const readJellyfishFile = require('./lib/read-jellyfish-file')
const findProjectsInFolder = require('./lib/find-projects-in-folder')
const search = require('./lib/search')
const filter = require('./lib/filter')

const createTestProject = (label) => {
  return {
    name: 'Project ' + label,
    description: 'Description of Project ' + label,
    tags: ['project', label]
  }
}
const test_data = [
  createTestProject('A'),
  createTestProject('B'),
  createTestProject('CF'),
  createTestProject('DF'),
  createTestProject('E')
]

test('Basic Search', (t) => {
  const results = search(test_data, 'name', 'B')
  t.is(results.length, 1)
  t.is(results[0].name, 'Project B')
})
test('Tag Search', (t) => {
  const results = search(test_data, 'tags', 'B')
  t.is(results.length, 1)
  t.is(results[0].name, 'Project B')
})
test('Description Search', (t) => {
  const results = search(test_data, 'description', 'Project')
  t.is(results.length, 5)
})
test('Basic Filtering', (t) => {
  const results = filter(test_data, ['name'])
  t.is(results[0].name, 'Project A')
  t.is(results[0].description, undefined)
  t.is(results[0].tags, undefined)
})
test('Multiple Filters', (t) => {
  const results = filter(test_data, ['name', 'tags'])
  t.is(results[0].name, 'Project A')
  t.is(results[0].description, undefined)
  t.deepEqual(results[0].tags, ['project', 'A'])
})
test('Filter works on one object', (t) => {
  const results = filter(test_data[0], ['name', 'tags'])
  t.is(results.name, 'Project A')
  t.is(results.description, undefined)
  t.deepEqual(results.tags, ['project', 'A'])
})
test('Filter always includes name', (t) => {
  const results = filter(test_data[0], ['tags'])
  t.is(results.name, 'Project A')
  t.is(results.description, undefined)
  t.deepEqual(results.tags, ['project', 'A'])
})
test('Reading jellyfish.json', (t) => {
  const jellyfishFile = readJellyfishFile('./example-jellyfish.json')
  t.is(jellyfishFile.name, 'Just an example project')
  t.is(jellyfishFile.description, 'This is a project to test if jellyfish is working well...')
  t.deepEqual(jellyfishFile.tags, ['example', 'jelly', 'fish'])
})
test.cb('Reading directory recursivly', (t) => {
  findProjectsInFolder('./test-recursive').then((projects) => {
    t.is(projects.length, 4)
    t.is(projects[0].name, 'Just an example project')
    t.end()
  })
})
