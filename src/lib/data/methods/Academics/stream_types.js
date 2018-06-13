var Promise = require('bluebird')

var models = require('_/data/models')

var streamTypesMethods = {}

streamTypesMethods.addStreamType = (info) => {
  console.log(info)
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

streamTypesMethods.updateStreamTypes = (info, data) => {
  return new Promise((resolve, reject) => {
    models.Academics.stream_types.update(data, {
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

streamTypesMethods.deleteStreamTypes = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.stream_types.destroy({
      where: {
        id: info.id

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

module.exports = streamTypesMethods
