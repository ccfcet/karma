var Promise = require('bluebird')

var models = require('_/data/models')
// var entityMethods = {}

let addEntity = (info) => {
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
module.exports = addEntity
