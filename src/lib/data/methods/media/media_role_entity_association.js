const Promise = require('bluebird');

const models = require('../../models');

const mediaEntityAssociationMethods = {};
mediaEntityAssociationMethods
  .addMediaRoleEntityAssociation = (info) => {
    console.log('inside adding faculty enrolment');
    return new Promise((resolve, reject) => {
      models.media.media_role_entity_association.create(info)
        .then((newmediaRoleEntityAssociation) => {
          resolve(newmediaRoleEntityAssociation);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
mediaEntityAssociationMethods
  .updateMediaRoleEntityAssociation = (info, data) => {
    console.log(info, data);
    return new Promise((resolve, reject) => {
      models.media.media_role_entity_association.update(data, {
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

mediaEntityAssociationMethods
  .deleteMediaRoleEntityAssociation = info => new Promise((resolve, reject) => {
    models.media.media_role_entity_association.destroy({
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
module.exports = mediaEntityAssociationMethods;
