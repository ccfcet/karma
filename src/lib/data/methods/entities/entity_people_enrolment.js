const Promise = require('bluebird');

const models = require('../../models');

const entityPeopleEnrolMethods = {};

entityPeopleEnrolMethods.findEntityPeopleEnrolById = id => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_enrollment.findById(id)
    .then((entityPe) => {
      resolve(entityPe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeopleEnrolMethods.addEntityPeopleEnrol = info => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_enrollment.create(info)
    .then((entityPe) => {
      resolve(entityPe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeopleEnrolMethods.getAllEntityPeopleEnrol = () => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_enrollment.findAll()
    .then((entityPe) => {
      resolve(entityPe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeopleEnrolMethods.updateEntityPeopleEnrol = (info, data) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_enrollment.update(data, {
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

entityPeopleEnrolMethods.deleteAllEntityPeopleEnrol = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_people_enrollment.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeopleEnrolMethods
  .deleteEntityPeopleEnrol = info => new Promise((resolve, reject) => {
    models.entities.entity_people_enrollment.destroy({
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

module.exports = entityPeopleEnrolMethods;
