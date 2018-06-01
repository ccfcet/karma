var Promise = require('bluebird')

var models = require('_/data/models')
var peopleMethods = {}
peopleMethods.addPeople = (info) => {
  return new Promise((resolve, reject) => {
    models.People.people.create(info)
      .then((model) => {
        resolve(model)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = peopleMethods
