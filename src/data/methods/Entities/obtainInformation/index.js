var Promise = require('bluebird')

var models = require('../../../models')

// function to obtain information from table entity_information joining table
// entities and table entity_information_slugs using entitySlug and
// entityInformationSlug respectively
var obtainInformation = function (entitySlug, entityInformationSlug) {
  return new Promise(function (resolve, reject) {
    models.Entities.entity_information.findOne({
      include:
      [
        {
          model: models.Entities.entities,
          where: { entity_slug: entitySlug },
          attributes: []
        },
        { model: models.Entities.entity_information_slugs,
          where: { slug_name: entityInformationSlug },
          attributes: []
        }
      ],
      attributes: ['data']
    }).then(function (result) {
      resolve(result.data)
    }).catch(function (err) {
      // handle error;
      console.log(err)
      reject(err)
    })
  })
}

module.exports = obtainInformation
