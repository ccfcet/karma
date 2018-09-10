const Promise = require('bluebird');

const models = require('../../models');

const entityInfoMethods = {};

entityInfoMethods.findEntityInfoId = id => new Promise((resolve, reject) => {
  models.entities.entity_information.findById(id)
    .then((entityInfo) => {
      resolve(entityInfo);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoMethods.addEntityInfo = info => new Promise((resolve, reject) => {
  models.entities.entity_information.create(info)
    .then((entityInfo) => {
      resolve(entityInfo);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoMethods.getAllEntityInfo = () => new Promise((resolve, reject) => {
  models.entities.entity_information.findAll()
    .then((entityInfo) => {
      resolve(entityInfo);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoMethods.updateEntityInfo = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information.update(data, {
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

entityInfoMethods.deleteAllEntityInfo = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_information.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoMethods
  .deleteEntityInfo = info => new Promise((resolve, reject) => {
    models.entities.entity_information.destroy({
      where: { id: info.id },
    })
      .then((deleted) => {
        if (deleted === 0) {
          reject(new Error());
        } else {
          resolve(deleted);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

module.exports = entityInfoMethods;
