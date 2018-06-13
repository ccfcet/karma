var Promise = require('bluebird')

var models = require('_/data/models')
var returnObject = {}
returnObject.classesMethods = require('./classes')

returnObject.obtainInformation = function (streamId, className, division) {
  return new Promise(function (resolve, reject) {
    models.Academics.classes_time_tables.findOne({
      include:
        [
          {
            model: models.Academics.classes,
            where: {
              stream_id: streamId,
              current_class_slug: className,
              division: division
            }
            // attributes: []
          }
        ],
      // attributes: ['data'],
      rejectOnEmpty: true
    }).then(function (result) {
      resolve(result.data)
    }).catch(function (err) {
      // handle error;
      console.log(err)
      reject(err)
    })
  })
}
module.exports = returnObject
