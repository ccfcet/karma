const Promise = require('bluebird');
const _ = require('lodash');

const models = require('../../../models');

const returnObject = {};
// returnObject.entityMethod = require('../entitytypemethods');

// function to obtain information from table entity_information joining table
// entities and table entity_information_slugs using entitySlug and
// entityInformationSlug respectively

returnObject.obtainInformation = function (entitySlug, entityInformationSlug) {
  return new Promise((resolve, reject) => {
    if (_.includes(_.keys(models.entities.entities.attributes),
      entityInformationSlug)) {
      models.entities.entities.findOne({
        where: { entity_slug: entitySlug },
        attributes: [entityInformationSlug],
        rejectOnEmpty: true,
      }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    } else {
      console.log('NOT ALLOWED');
      models.entities.entity_information.findOne({
        include:
          [
            {
              model: models.entities.entities,
              where: { entity_slug: entitySlug },
              attributes: [],
            },
            {
              model: models.entities.entity_information_slugs,
              where: { slug_name: entityInformationSlug },
              attributes: [],
            },
          ],
        attributes: ['data'],
        rejectOnEmpty: true,
      }).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    }
  });
};

returnObject.getEntitiesByType = entityTypeSlug => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_types.findOne({
    where: {
      entity_type_slug: entityTypeSlug,
    },
  })
    .then((entityType) => {
      console.log(entityTypeSlug);
      if (_.isEmpty(entityType)) {
        reject(new Error('Could not find an entity type for the given slug'));
      } else {
        models.entities.entities.findAll({
          where: {
            entity_type_id: entityType.id,
          },
        })
          .then((entities) => {
            if (_.isEmpty(entities)) {
              reject(new Error('Could not find entities corresponding '
                + 'to given slug'));
            } else {
              resolve(entities);
            }
          });
      }
    })
    .catch((err) => {
      reject(err);
    });
});
module.exports = returnObject;
