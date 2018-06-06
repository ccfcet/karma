var Promise = require('bluebird')

var models = require('_/data/models')
var classesMethods = {}
classesMethods.addClasses = (info) => {
  console.log('inside adding Classes')

  return new Promise((resolve, reject) => {
    models.Academics.classes.create(info)

    resolve(model)
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}

module.exports = classesMethods
