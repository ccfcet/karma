const Promise = require('bluebird');

const models = require('../../models');

const entityPositionMethods = {};

entityPositionMethods.findEntityPositionById = id => new Promise((
  resolve, reject,
) => {
  models.entities.entity_position_association.findById(id)
    .then((entityPa) => {
      resolve(entityPa);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPositionMethods.addEntityPosition = info => new Promise((
  resolve, reject,
) => {
  models.entities.entity_position_association.create(info)
    .then((entityPa) => {
      resolve(entityPa);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPositionMethods.getAllEntityPosition = () => new Promise((
  resolve, reject,
) => {
  models.entities.entity_position_association.findAll()
    .then((entityPa) => {
      resolve(entityPa);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPositionMethods.updateEntityPosition = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_position_association.update(data, {
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

entityPositionMethods.deleteAllEntityPosition = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_position_association.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

entityPositionMethods
  .deleteEntityPosition = info => new Promise((resolve, reject) => {
    models.entities.entity_position_association.destroy({
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

module.exports = entityPositionMethods;
