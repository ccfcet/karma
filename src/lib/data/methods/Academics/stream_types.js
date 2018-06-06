var Promise = require('bluebird')

var models = require('_/data/models')

var streamTypesMethods = {}

streamTypesMethods.addStreamType = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.stream_types.create(info)
      .then((newStreamType) => {
        resolve(newStreamType)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = streamTypesMethods
