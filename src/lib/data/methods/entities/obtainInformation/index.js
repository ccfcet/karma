const Promise = require('bluebird');

const models = require('../../../models');

const returnObject = {};
// returnObject.entityMethod = require('../entitytypemethods');

// function to obtain information from table entity_information joining table
// entities and table entity_information_slugs using entitySlug and
// entityInformationSlug respectively

returnObject.obtainInformation = function (entitySlug, entityInformationSlug) {
  return new Promise(((resolve, reject) => {
    models.Entities.entity_information.findOne({
      include:
        [
          {
            model: models.Entities.entities,
            where: { entity_slug: entitySlug },
            attributes: [],
          },
          {
            model: models.Entities.entity_information_slugs,
            where: { slug_name: entityInformationSlug },
            attributes: [],
          },
        ],
      attributes: ['data'],
      rejectOnEmpty: true,
    }).then((result) => {
      resolve(result.data);
    }).catch((err) => {
      // handle error;
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = returnObject;
