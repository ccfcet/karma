const Promise = require('bluebird');
const _ = require('lodash');

const models = require('../../../models');

const otherMethods = {};

otherMethods.getMediaForEntityUsingMediaRoleSlug = data => new Promise((
  resolve,
  reject,
) => {
  models.Media.media_roles.findOne({
    where: {
      role_slug: data.role_slug,
    },
  })
    .then((mediaRole) => {
      if (!_.isEmpty(mediaRole)) {
        models.Media.media_role_entity_association.findAll({
          role_id: mediaRole.id,
          entity_id: data.entity_id,
        })
          .then((media) => {
            if (!_.isEmpty(media)) resolve(media);
            else {
              reject(new Error('No media found for given media role and '
                + 'entity combination'));
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error('The corresponding media role slug is not defined'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

otherMethods.addMediaForEntityUsingMediaRoleSlug = data => new Promise((
  resolve,
  reject,
) => {
  models.Media.media_roles.findOne({
    where: {
      role_slug: data.role_slug,
    },
  })
    .then((mediaRole) => {
      if (!_.isEmpty(mediaRole)) {
        models.Media.media.create({
          media_title: data.media_title,
          media_location: data.media_location,
          media_file_name: data.media_file_name,
        })
          .then((medium) => {
            if (!_.isEmpty(medium)) {
              models.Media.media_role_entity_association.create({
                media_id: medium.id,
                role_id: mediaRole.id,
                entity_id: data.entity_id,
              })
                .then((mediaAtMediaRoleForEntity) => {
                  if (!_.isEmpty(mediaAtMediaRoleForEntity)) {
                    resolve(mediaAtMediaRoleForEntity);
                  } else {
                    reject(new Error('Media was created but the assocication of'
                      + ' the media with entity could not be made'));
                  }
                });
            } else {
              reject(new Error('The media could not be created'));
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error('Media role corresponding to the given slug cannot'
          + ' be found'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

otherMethods.updateMediaForEntityUsingMediaRoleSlug = data => new Promise((
  resolve,
  reject,
) => {
  models.Media.media_roles.findOne({
    where: {
      role_slug: data.role_slug,
    },
  })
    .then((mediaRole) => {
      if (!_.isEmpty(mediaRole)) {
        models.Media.media.create({
          media_title: data.media_title,
          media_location: data.media_location,
          media_file_name: data.media_file_name,
        })
          .then((medium) => {
            if (!_.isEmpty(medium)) {
              models.Media.media_role_entity_association.update({
                media_id: medium.id,
              }, {
                where: {
                  role_id: mediaRole.id,
                  entity_id: data.entity_id,
                },
              })
                .then((affectedArray) => {
                  if (affectedArray[0] > 0) {
                    resolve(affectedArray[1]);
                  } else {
                    reject(new Error('Media was created but the assocication of'
                      + ' the media with entity could not be updated'));
                  }
                });
            } else {
              reject(new Error('The media could not be created'));
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error('Media role corresponding to the given slug cannot'
          + ' be found'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

otherMethods.getMediaForPeopleUsingMediaRoleSlug = info => new Promise((
  resolve,
  reject,
) => {
  models.Media.media_roles.findOne({
    where: {
      role_slug: info.role_slug,
    },
  })
    .then((mediaRole) => {
      if (!_.isEmpty(mediaRole)) {
        models.Media.media_role_people_association.findOne({
          where: {
            role_id: mediaRole.id,
            people_id: info.people_id,
          },
        })
          .then((mediaAtMediaRoleForPeopleGiven) => {
            if (!_.isEmpty(mediaAtMediaRoleForPeopleGiven)) {
              models.Media.media.findById(mediaAtMediaRoleForPeopleGiven.id)
                .then((media) => {
                  if (!_.isEmpty(media)) resolve(media);
                  else {
                    reject(new Error('Requested media cannot be found in'
                      + 'the database.'));
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject(new Error('No media was previously present in the '
              + 'database for the given people and role combination'));
            }
          });
      } else {
        reject(new Error('Cannot find a row in media_roles table corresponding '
          + 'to the role_slug given'));
      }
    });
});

module.exports = otherMethods;
