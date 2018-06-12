var Promise = require('bluebird')

var models = require('_/data/models')
var obtainInformation = require('./obtainInformation')
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
classesTimeTablesMethods.updateClassesTimeTables = (info, data) => {
  return new Promise((resolve, reject) => {
  	obtainInformation.obtainInformation(info.streamId, info.className, info.division).then(classesTimeTables => {
      models.Academics.courses_offered.update(data, {
        where: {
          class_id: classesTimeTables.class_id,
          day: info.day
        }
      })
        .then((updated) => {
          if (updated > 0) {
            resolve(updated)
          } else {
            reject(new Error())
          // throw ('err')
          }
        }).catch((error) => {
          reject(error)
        })
    }).catch((error) => {
  	reject(error)
    })
  })
}

module.exports = classesTimeTablesMethods
