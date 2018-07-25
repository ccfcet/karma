const Promise = require('bluebird');

const models = require('../../models');

const mediaAssociationMethods = {};
mediaAssociationMethods
  .addMediaRolePeopleAssociation = (info) => {
    console.log('inside adding faculty enrolment');
    return new Promise((resolve, reject) => {
      models.media.media_role_people_association.create(info)
        .then((newmediaRolePeopleAssociation) => {
          resolve(newmediaRolePeopleAssociation);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
mediaAssociationMethods
  .updateMediaRolePeopleAssociation = (info, data) => {
    console.log(info, data);
    return new Promise((resolve, reject) => {
      models.media.media_role_people_association.update(data, {
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

mediaAssociationMethods
  .deleteMediaRolePeopleAssociation = info => new Promise((resolve, reject) => {
    models.media.media_role_people_association.destroy({
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
module.exports = mediaAssociationMethods;
