const Promise = require('bluebird');

const models = require('../../models');
const obtainInformation = require('./obtainInformation');

const classesTimeTablesMethods = {};

classesTimeTablesMethods.addClassesTimeTables = (info) => {
  console.log('inside adding Classes');
  return new Promise((resolve, reject) => {
    models.Academics.classes_time_tables.create(info)
      .then((timeTable) => {
        resolve(timeTable);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
classesTimeTablesMethods.updateClassesTimeTablesWithClassNameAndDivision = (
  info,
  data,
) => new Promise((resolve, reject) => {
  obtainInformation.obtainInformation(
    info.streamId,
    info.className,
    info.division,
  ).then((classesTimeTables) => {
    models.Academics.classes_time_tables.update(data, {
      where: {
        class_id: classesTimeTables.class_id,
        day: info.day,
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
  }).catch((error) => {
    reject(error);
  });
});

classesTimeTablesMethods.updateClassesTimeTables = (info, data) => {
  console.log(info, data);
  return new Promise((resolve, reject) => {
    models.Academics.classes_time_tables.update(data, {
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
};

classesTimeTablesMethods.deleteClassesTimeTables = info => new Promise((
  resolve,
  reject,
) => {
  models.Academics.classes_time_tables.destroy({
    where: {
      id: info.id,

    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error tg');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});

module.exports = classesTimeTablesMethods;
