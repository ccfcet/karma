var Promise = require('bluebird')

var models = require('_/data/models')
var classesMethods = {}
classesMethods.addClasses = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.classes.create(info)
      .then((newClass) => {
        resolve(newClass)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = classesMethods
