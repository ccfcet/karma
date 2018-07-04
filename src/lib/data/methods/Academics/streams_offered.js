const Promise = require('bluebird');

const models = require('../../models');

const streamsOfferedMethods = {};

streamsOfferedMethods.addStreamsOffered = (info) => {
  console.log(info);
  return new Promise((resolve, reject) => {
    models.Academics.streams_offered.create(info)
      .then((newStreamOffered) => {
        resolve(newStreamOffered);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

streamsOfferedMethods.updateStreamsOffered = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.Academics.streams_offered.update(data, {
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

streamsOfferedMethods.deleteStreamsOffered = info => new Promise((
  resolve,
  reject,
) => {
  models.Academics.streams_offered.destroy({
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

module.exports = streamsOfferedMethods;
