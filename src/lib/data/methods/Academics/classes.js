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

classesMethods.updateClasses = (info, data) => {
  return new Promise((resolve, reject) => {
    models.Academics.classes.update(data, {
      where: {
        id: info.id
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
  })
}

classesMethods.deleteClasses = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.classes.destroy({
      where: {
        stream_id: info.stream_id,
        division: info.division,
        current_class_slug: info.current_class_slug
      }
    }).then((deleted) => {
      if (deleted === 0) {
        console.log('error tg')
        reject(new Error())
      } else {
        resolve(deleted)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = classesMethods
