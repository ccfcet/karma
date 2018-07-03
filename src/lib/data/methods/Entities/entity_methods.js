const Promise = require('bluebird');

const models = require('../../models');

const entityMethods = {};

entityMethods.addEntity = newEntity => new Promise((resolve, reject) => {
  models.Entities.entities.create(newEntity)
    .then((entity) => {
      resolve(entity);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = entityMethods;
