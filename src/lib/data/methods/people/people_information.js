const Promise = require('bluebird');
const models = require('../../models');

const peopleInfoMethods = {};

// Method to add peopleinfo to the database
peopleInfoMethods.addPeopleInfo = info => new Promise((resolve, reject) => {
  models.people.people_information.create(info)
    .then((model) => {
      resolve(model);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

peopleInfoMethods.getAllPeopleInfo = () => new Promise((resolve, reject) => {
  models.people.people_information.findAll()
    .then((people) => {
      resolve(people);
    })
    .catch((err) => {
      reject(err);
    });
});

peopleInfoMethods.updatePeopleInfo = (info, data) => new Promise((
  resolve, reject,
) => {
  models.people.people_information.update(data, {
    where: {
      id: info.id,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
        // throw ('err')
      }
    }).catch((error) => {
      reject(error);
    });
});

peopleInfoMethods.deleteAllPeopleInfo = () => new Promise((resolve, reject) => {
  models.people.people_information.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

peopleInfoMethods.deletePeopleInfo = info => new Promise((resolve, reject) => {
  models.people.people_information.destroy({
    where: {
      id: info.id,

    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});


module.exports = peopleInfoMethods;
