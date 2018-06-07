var Promise = require('bluebird')

var models = require('_/data/models')
var entityMethods = {}

entityMethods.addEntity = (info) => {
  return new Promise((resolve, reject) => {
    models.Entities.entity_types.create(info)
      .then((model) => {
        console.log('hello')
        resolve(model)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
entityMethods.updateEntityTypes = (info, data) => {
  console.log('inside method')
  return new Promise((resolve, reject) => {
    console.log('inside promise')
    models.Entities.entity_types.update(data, {
      where: {entity_type: info.entity_type,
        entity_type_slug: info.entity_type_slug}
    })
      .then((updated) => {
        if (updated > 0) {
          console.log('updated')
          resolve(updated)
        } else {
          reject(new Error('not updated'))
        }
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = entityMethods
