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
entityMethods.updateEntityTypes = (info) => {
  console.log(info)
  return new Promise((resolve, reject) => {
    console.log(info)
    models.Entities.entity_types.update(info)
      .spread((entity, created) => {
        if (created) {
          resolve(entity)
        } else {
          reject(new Error('Entity_type already exist'))
        }
      })
  })
}

module.exports = entityMethods
