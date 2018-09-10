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

entityTypeMethods.getAllEntityTypes = () => new Promise((resolve, reject) => {
  models.entities.entity_types.findAll()
    .then((entityType) => {
      resolve(entityType);
    })
    .catch((err) => {
      reject(err);
    });
});

entityTypeMethods.updateEntityTypes = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_types.update(data, {
    where: {
      id: info.id,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
        console.log(updated);
      } else {
        reject(new Error());
      }
    }).catch((error) => {
      reject(error);
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
entityTypeMethods.deleteAllEntityTypes = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_types.destroy({
    where: {
    },
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = entityTypeMethods;
