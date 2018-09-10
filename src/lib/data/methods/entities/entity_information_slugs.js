const Promise = require('bluebird');

const models = require('../../models');

const entityInfoSlugsMethods = {};

entityInfoSlugsMethods.getAllEntityInfoSlugs = () => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information_slugs.findAll()
    .then((entityInfoSlugs) => {
      resolve(entityInfoSlugs);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoSlugsMethods.findEntityInfoSlugsById = id => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information_slugs.findById(id)
    .then((entityInfoSlugs) => {
      resolve(entityInfoSlugs);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoSlugsMethods.addEntityInfoSlugs = newEntity => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information_slugs.create(newEntity)
    .then((entityInfoSlugs) => {
      resolve(entityInfoSlugs);
    })
    .catch((err) => {
      reject(err);
    });
});

entityInfoSlugsMethods.updateEntityInfoSlugs = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information_slugs.update(data, {
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

entityInfoSlugsMethods.deleteEntityInfoSlugs = info => new Promise((
  resolve, reject,
) => {
  models.entities.entity_information_slugs.destroy({
    where: {
      id: info.id,
    },
  })
    .then((affectedCount) => {
      resolve(`${affectedCount} row(s) deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});
entityInfoSlugsMethods.deleteAllEntityInfoSlugs = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_information_slugs.destroy({
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

module.exports = entityInfoSlugsMethods;
