var Promise = require('bluebird')

var models = require('_/data/models')
var classesTimeTablesMethods = {}
classesTimeTablesMethods.addClassesTimeTables = (info) => {
  console.log('inside adding Classes')
  return new Promise((resolve, reject) => {
    models.Academics.classes_time_tables.create(info)
      .then((timeTable) => {
        resolve(timeTable)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = classesTimeTablesMethods
