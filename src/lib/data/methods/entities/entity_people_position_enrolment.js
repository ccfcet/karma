const Promise = require('bluebird');

const models = require('../../models');

const entityPeoplePosEnrolMethods = {};

entityPeoplePosEnrolMethods.findEntityPeoplePosEnrolById = id => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_position_enrolment.findById(id)
    .then((entityPpe) => {
      resolve(entityPpe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeoplePosEnrolMethods.addEntityPeoplePosEnrol = info => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_position_enrolment.create(info)
    .then((entityPpe) => {
      resolve(entityPpe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeoplePosEnrolMethods.getAllEntityPeoplePosEnrol = () => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_position_enrolment.findAll()
    .then((entityPpe) => {
      resolve(entityPpe);
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeoplePosEnrolMethods.updateEntityPeoplePosEnrol = (
  info, data,
) => new Promise((
  resolve, reject,
) => {
  models.entities.entity_people_position_enrolment.update(data, {
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

entityPeoplePosEnrolMethods.deleteAllEntityPeoplePosEnrol = () => new Promise((
  resolve,
  reject,
) => {
  models.entities.entity_people_position_enrolment.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

entityPeoplePosEnrolMethods
  .deleteEntityPeoplePosEnrol = info => new Promise((resolve, reject) => {
    models.entities.entity_people_position_enrolment.destroy({
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

module.exports = entityPeoplePosEnrolMethods;
