const Promise = require('bluebird');
const models = require('../../models');

const peopleMethods = {};

// Method to add people to the database
peopleMethods.addPeople = info => new Promise((resolve, reject) => {
  models.people.people.create(info)
    .then((model) => {
      resolve(model);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

peopleMethods.getAllPeople = () => new Promise((resolve, reject) => {
  models.people.people.findAll()
    .then((people) => {
      resolve(people);
    })
    .catch((err) => {
      reject(err);
    });
});


peopleMethods.getPeople = data => new Promise((resolve, reject) => {
  console.log(data);
  models.people.people.findOne({
    where: {
      id: data.id,
    },
  })
    .then((people) => {
      resolve(people);
    })
    .catch((err) => {
      reject(err);
    });
});
// Method to find people given their people_id
// peopleMethods.findPeopleById = peopleId => new Promise((resolve, reject) => {
//   models.people.people.findById(peopleId)
//     .then((person) => {
//       if (_.isEmpty(person)) {
//         resolve(person);
//       } else {
//         reject(new Error('No rows were returned from people table for the'
//           + 'given people_id'));
//       }
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

peopleMethods.updatePeople = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.people.people.update(data, {
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

peopleMethods.deleteAllPeople = () => new Promise((
  resolve,
  reject,
) => {
  models.people.people.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

peopleMethods.deletePeople = info => new Promise((
  resolve,
  reject,
) => {
  models.people.people.destroy({
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

peopleMethods.userIdExists = Id => new Promise((resolve, reject) => {
  models.people.people.findOne({
    where: {
      id: Id,
    },
  }).then((doc) => {
    if (doc) {
      resolve(true);
    } else {
      reject(false);
    }
  }).catch((err) => {
    reject(err);
  });
});


module.exports = peopleMethods;
