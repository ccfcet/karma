var Promise = require('bluebird')

var models = require('_/data/models')
var peopleMethods = {}
peopleMethods.addPeople = (info) => {

  console.log('inside addPeople')
  
  return new Promise((resolve, reject) => {
    models.People.people.create(info)

        resolve(model)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  )
}

module.exports = peopleMethods
