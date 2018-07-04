// const Promise = require('bluebird');

// const models = require('../../../models');

const returnObject = {};
// returnObject.entityMethod = require('./entitymethods');

// function to obtain information from table media_roles_people_association
// joining table media and table media_roles using mediaId and
// mediaRolesId respectively

/* returnObject.obtainPeopleInformation = function (mediaId, mediaRolesId) {
  return new Promise(((resolve, reject) => {
    models.Media.media_role_people_association.findOne({
      include:
        [
          {
            model: models.Media.media_roles,
            where: { id: mediaRolesId },
            attributes: [],
          },
          {
            model: models.Media.media,
            where: { id: mediaId },
            attributes: [],
          },
        ],
      // attributes: ['data'],
      rejectOnEmpty: true,
    }).then((result) => {
      resolve(result.data);
    }).catch((err) => {
      // handle error;
      console.log(err);
      reject(err);
    });
  }));
};
// function to obtain information from table media_roles_entity_association
// joining table media and table media_roles using mediaId and
// mediaRolesId respectively
returnObject.obtainEntityInformation = function (mediaId, mediaRolesId) {
  return new Promise(((resolve, reject) => {
    models.Media.media_role_entity_association.findOne({
      include:
          [
            {
              model: models.Media.media_roles,
              where: { id: mediaRolesId },
              attributes: [],
            },
            {
              model: models.Media.media,
              where: { id: mediaId },
              attributes: [],
            },
          ],
      // attributes: ['data'],
      rejectOnEmpty: true,
    }).then((result) => {
      resolve(result.data);
    }).catch((err) => {
      // handle error;
      console.log(err);
      reject(err);
    });
  }));
};

// function to obtain information from table media joining table
// media_roles_entity_association and table media_roles using entityId and
// mediaRolesSlug respectively
*/
// returnObject
//   .obtainMediaInformationFromEntity = function (entityId, mediaRolesSlug) {
//     return new Promise(((resolve, reject) => {
//       const entity = {};
//       const role = {};

//       models.Media.media_roles.findAll({
//         where: {
//           role_slug: mediaRolesSlug,
//         },
//         attributes: ['id'],
//         raw: true,
//       })
//         .then((result) => {
//           role.id = result[0].id;
//           models.Media.media_role_entity_association.findAll({
//             where: {
//               id: entityId,
//               role_id: role.id,
//             },
//             attributes: ['media_id'],
//             raw: true,
//           }).then((result) => {
//             console.log(`result is ${result}`);
//             entity.media_id = result[0].id;
//             console.log(entity.media_id);
//             models.Media.media.findAll({
//               where: { id: entity.media_id },

//             }).then((result) => {
//               resolve(result.data);
//             }).catch((err) => {
//               // handle error;
//               console.log(err);
//               reject(err);
//             });
//           }));
//     };

//   }).catch ((err) => {
//     console.log(err);
//   });
//       }).catch ((err) => {
//   console.log(err);
// });


// function to obtain information from table media joining table
// media_roles_people_association and table media_roles using peopleId and
// mediaRolesSlug respectively

// returnObject
//   .obtainMediaInformationFromPeople = function (peopleId, mediaRolesSlug) {

//     return new Promise(((resolve, reject) => {
//       models.Media.media.findAll({
//         include:
//           [
//             {
//               model: models.Media.media_role_people_association,
//               where: { people_id: peopleId },
//               attributes: [],
//             },
//             {
//               model: models.Media.media_roles,
//               where: { role_slug: mediaRolesSlug },
//               attributes: [],
//             },
//           ],
//         rejectOnEmpty: true,
//       })
//         .then((result) => {
//           resolve(result.data);
//         })
//         .catch((err) => {
//           console.log(err);
//           reject(err);
//         });
//     });
//   };

module.exports = returnObject;
