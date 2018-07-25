const Promise = require('bluebird');

const models = require('../../models');

const mediaMethods = {};
mediaMethods.addMedia = info => new Promise((resolve, reject) => {
  models.media.media.create(info)
    .then((newMedia) => {
      resolve(newMedia);
    })
    .catch((err) => {
      reject(err);
    });
});

mediaMethods.updateMedia = (info, data) => new Promise((resolve, reject) => {
  models.media.media.update(data, {
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

mediaMethods
  .deleteMedia = info => new Promise((resolve, reject) => {
    models.media.media.destroy({
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
module.exports = mediaMethods;
