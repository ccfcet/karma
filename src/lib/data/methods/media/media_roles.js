const Promise = require('bluebird');

const models = require('../../models');

const mediaRolesMethods = {};
mediaRolesMethods.addMediaRoles = (info) => {
  console.log('inside add media roles');
  return new Promise((resolve, reject) => {
    models.media.media_roles.create(info)
      .then((newmediaRoles) => {
        resolve(newmediaRoles);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
mediaRolesMethods.updateMediaRoles = (info, data) => new Promise((
  resolve, reject,
) => {
  models.media.media_roles.update(data, {
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

mediaRolesMethods
  .deleteMediaRoles = info => new Promise((resolve, reject) => {
    models.media.media_roles.destroy({
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

mediaRolesMethods.deleteAllMediaRoles = () => new Promise((
  resolve,
  reject,
) => {
  models.media.media_roles.destroy({
    where: {},
  })
    .then(() => {
      resolve();
      console.log('deleted');
    })
    .catch((err) => {
      reject(err);
    });
});

mediaRolesMethods.getAllMediaRoles = () => new Promise((resolve, reject) => {
  console.log('entered getallmediaroles');
  models.media.media_roles.findAll()
    .then((classes) => {
      resolve(classes);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = mediaRolesMethods;
