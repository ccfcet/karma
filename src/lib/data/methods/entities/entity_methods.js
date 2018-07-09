const Promise = require('bluebird');

const models = require('../../models');

const entityMethods = {};

entityMethods.getAllEntities = () => new Promise((resolve, reject) => {
  models.Entities.entities.findAll()
    .then((entities) => {
      resolve(entities);
    })
    .catch((err) => {
      reject(err);
    });
});

entityMethods.findEntityById = id => new Promise((resolve, reject) => {
  models.Entities.entities.findById(id)
    .then((entities) => {
      resolve(entities);
    })
    .catch((err) => {
      reject(err);
    });
});

entityMethods.addEntity = newEntity => new Promise((resolve, reject) => {
  models.Entities.entities.create(newEntity)
    .then((entity) => {
      resolve(entity);
    })
    .catch((err) => {
      reject(err);
    });
});

entityMethods.updateEntity = updatedEntity => new Promise((resolve, reject) => {
  models.Entities.entities.update(
    {
      entity_name: updatedEntity.entity_name,
      entity_slug: updatedEntity.entity_slug,
      entity_type_id: updatedEntity.entity_type_id,
    },
    {
      where: {
        id: updatedEntity.id,
      },
    },
  )
    .then((affectedCount) => {
      resolve(affectedCount > 0 ? 'updated' : 'No rows were updated. '
        + 'Make sure that you are passing the correct id as parameter');
    })
    .catch((err) => {
      reject(err);
    });
});

entityMethods.deleteEntity = id => new Promise((resolve, reject) => {
  models.Entities.entities.destroy({
    where: {
      id,
    },
  })
    .then((affectedCount) => {
      resolve(`${affectedCount} row(s) deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});
module.exports = entityMethods;
