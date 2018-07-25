const Promise = require('bluebird');

const models = require('../../models');

const entityTypeMethods = {};

entityTypeMethods.addEntityType = info => new Promise((resolve, reject) => {
  models.entities.entity_types.create(info)
    .then((model) => {
      resolve(model);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

entityTypeMethods.updateEntityTypes = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_types.update(data, {
    where: {
      entity_type: info.entity_type,
      entity_type_slug: info.entity_type_slug,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve('Updated');
      } else {
        reject(new Error('not updated'));
      }
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

entityTypeMethods.deleteEntityTypes = info => new Promise((resolve, reject) => {
  models.entities.entity_types.destroy({
    where: { entity_type: info.entity_type },
  })
    .then((deleted) => {
      if (deleted === 0) {
        reject(new Error("Can't be deleted!"));
      } else {
        resolve('deleted');
      }
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

module.exports = entityTypeMethods;
