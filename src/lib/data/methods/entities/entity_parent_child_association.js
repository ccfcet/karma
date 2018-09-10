const Promise = require('bluebird');

const models = require('../../models');

const entityParentChildMethods = {};

entityParentChildMethods.findEntityParentChildById = id => new Promise((
  resolve, reject,
) => {
  models.entities.entity_parent_child_association.findById(id)
    .then((entityPca) => {
      resolve(entityPca);
    })
    .catch((err) => {
      reject(err);
    });
});

entityParentChildMethods.addEntityParentChild = info => new Promise((
  resolve, reject,
) => {
  models.entities.entity_parent_child_association.create(info)
    .then((entityPca) => {
      resolve(entityPca);
    })
    .catch((err) => {
      reject(err);
    });
});

entityParentChildMethods.getAllEntityParentChild = () => new Promise((
  resolve, reject,
) => {
  models.entities.entity_parent_child_association.findAll()
    .then((entityPca) => {
      resolve(entityPca);
    })
    .catch((err) => {
      reject(err);
    });
});

entityParentChildMethods.updateEntityParentChild = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_parent_child_association.update(data, {
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

entityParentChildMethods.deleteAllEntityParentChild = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_parent_child_association.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

entityParentChildMethods
  .deleteEntityParentChild = info => new Promise((resolve, reject) => {
    models.entities.entity_parent_child_association.destroy({
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

module.exports = entityParentChildMethods;
