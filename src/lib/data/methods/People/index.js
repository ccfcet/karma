var Promise = require('bluebird')

var models = require('_/data/models')
var peopleMethods = {}
peopleMethods.addPeople = (info) => {
  console.log('inside addPeople')
  return new Promise((resolve, reject) => {
    models.People.people_information.create(info)
      .then((model) => {
        console.log(model)
        resolve(model)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = peopleMethods
