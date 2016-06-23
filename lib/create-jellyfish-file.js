var inquirer = require('inquirer')
var fs = require('fs')
var path = require('path')

module.exports = () => {
  const getValueFromPackageJSON = (attribute) => {
    return () => {
      try {
        return require(path.join(process.cwd(), 'package.json'))[attribute] || null
      } catch (err) {
        return ''
      }
    }
  }

  const questions = [
    {
      name: 'name',
      message: 'Project Name',
      default: getValueFromPackageJSON('name')
    },
    {
      name: 'description',
      message: 'Description',
      default: getValueFromPackageJSON('description')
    },
    {
      name: 'tags',
      message: 'Tags (separated by comma)',
      default: getValueFromPackageJSON('keywords')
    },
    {
      name: 'homepage',
      message: 'Homepage',
      default: getValueFromPackageJSON('homepage')
    },
    {
      name: 'type',
      message: 'Type',
      type: 'list',
      choices: ['Project', 'application', 'API', 'Library', 'Documentation', 'Prototype', 'Game']
    },
    {
      name: 'language',
      message: 'Language'
    },
    {
      type: 'confirm',
      name: 'active',
      message: 'Active',
      default: false
    },
    {
      type: 'confirm',
      name: 'finished',
      message: 'Finished',
      default: false
    }
  ]
  inquirer.prompt(questions).then((answers) => {
    Object.keys(answers).forEach((key) => {
      if (answers[key] === '') {
        delete answers[key]
      }
    })
    console.log(JSON.stringify(answers, null, 2))
    inquirer.prompt([{
      type: 'confirm',
      name: 'sure',
      message: 'Are you sure you want to write this to ./jellyfish.json?',
      default: true
    }]).then((answer) => {
      if (answer.sure) {
        fs.writeFileSync('./jellyfish.json', JSON.stringify(answers, null, 2))
      } else {
        console.log('Aborting')
      }
    })
  })
}
