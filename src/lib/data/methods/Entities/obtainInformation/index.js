var Promise = require('bluebird')

var models = require('_/data/models')

var returnObject = {}
returnObject.addEntity = require('./entitymethods')
// function to obtain information from table entity_information joining table
// entities and table entity_information_slugs using entitySlug and
// entityInformationSlug respectively

returnObject.obtainInformation = function (entitySlug, entityInformationSlug) {
  return new Promise(function (resolve, reject) {
    models.Entities.entity_information.findOne({
      include:
        [
          {
            model: models.Entities.entities,
            where: { entity_slug: entitySlug },
            attributes: []
          },
          {
            model: models.Entities.entity_information_slugs,
            where: { slug_name: entityInformationSlug },
            attributes: []
          }
        ],
      attributes: ['data'],
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
