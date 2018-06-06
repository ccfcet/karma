var Promise = require('bluebird')

var models = require('_/data/models')
var streamTypesMethods = {}
streamTypesMethods.addStreamTypes = (info) => {
  console.log('inside adding stream types')

  return new Promise((resolve, reject) => {
    models.Academics.stream_types.create(info)

    resolve(model)
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}

module.exports = streamTypesMethods
