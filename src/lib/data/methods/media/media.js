const Promise = require('bluebird');

const models = require('../../models');

const mediaMethods = {};
mediaMethods.addMedia = info => new Promise((resolve, reject) => {
  models.Media.media.create(info)
    .then((newMedia) => {
      resolve(newMedia);
    })
    .catch((err) => {
      reject(err);
    });
});

mediaMethods.addMediaForEntityUsingMediaRoleSlug = data => new Promise((
  resolve,
  reject,
) => {
  models.Media.media_roles.findOne({
    role_slug: data.role_slug,
  })
    .then((mediaRole) => {
      if (mediaRole) {
        models.Media.media.create({
          media_title: data.media_title,
          media_location: data.media_location,
          media_file_name: data.media_file_name,
        })
          .then((medium) => {
            if (medium) {
              models.Media.media_role_entity_association.create({
                media_id: medium.id,
                role_id: mediaRole.id,
                entity_id: data.entity_id,
              })
                .then((mediaAtMediaRoleForEntity) => {
                  if (mediaAtMediaRoleForEntity) {
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

// mediaMethods.addMediaForEntityUsingMediaRoleSlug = data => new Promise((
//   resolve,
//   reject,
// ) => {
//   models.media.media_roles.findOne({
//     role_slug: data.role_slug,
//   })
//     .then((mediaRole) => {
//       models.media.media_role_entity_association.create({
//         role_id: mediaRole.id,
//         entity_id: data.entity_id,
//       })
//         .then((media) => {
//           if (media) resolve(media);
//           else {
//             reject(new Error('No media found for given media role and '
//           + 'entity combination'));
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

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
    models.Media.media.destroy({
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
