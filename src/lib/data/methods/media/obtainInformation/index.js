const Promise = require('bluebird');

const models = require('../../../models');

const returnObject = {};


// function to obtain information from table media joining table
// media_roles_entity_association and table media_roles using entityId and
// mediaRolesSlug respectively

returnObject
  .obtainMediaInformationFromEntity = function (entityId, mediaRolesSlug) {
    return new Promise(((resolve, reject) => {
      const f1 = mediarolesslug => new Promise(((resolve, reject) => {
        models.Media.media_roles.findAll({
          where: {
            role_slug: mediarolesslug,
          },
          attributes: ['id'],
          raw: true,
        }).then((result) => {
          // roleId = result[0].id;
          console.log(result[0].id);
          resolve(result);
        }).catch((err) => {
          reject(err);
          console.log(err);
        });
      }));

      const f2 = (roleid, entityid) => new Promise(((resolve, reject) => {
        console.log('entered');
        // let mediaId;
        models.Media.media_role_entity_association.findAll({
          where: {
            id: entityid,
            role_id: roleid,
          },
          attributes: ['media_id'],
          raw: true,

        }).then((result) => {
          console.log(`result is ${result}`);
          // mediaId = result[0].id;
          // console.log(mediaId);
          resolve(result);
          console.log(result[0]);
        }).catch((err) => {
          reject(err);
        });
      }));
      const f3 = mediaid => new Promise(((resolve, reject) => {
        models.Media.media.findAll({

          where: { id: mediaid },
          raw: true,

        }).then((result) => {
          resolve(result);
          console.log(result[0]);
        }).catch((err) => {
        // handle error;
          console.log(err);
          reject(err);
        });
      }));
      // resolve(
      f1(mediaRolesSlug).then((result) => {
        console.log(`result is ${result}`);
        f2(result[0].id, entityId).then((result) => {
          f3(result[0].media_id).then((result) => {
            resolve(result);
          })
            .catch((err) => {
              reject(err);
            });
        }).catch((err) => {
          reject(err);
        });
      });
    }));
  };

// function to obtain information from table media joining table
// media_roles_people_association and table media_roles using peopleId and
// mediaRolesSlug respectively


returnObject
  .obtainMediaInformationFromPeople = function (peopleId, mediaRolesSlug) {
    return new Promise(((resolve, reject) => {
      const f4 = mediarolesslug => new Promise(((resolve, reject) => {
        models.Media.media_roles.findAll({
          where: {
            role_slug: mediarolesslug,
          },
          attributes: ['id'],
          raw: true,
        }).then((result) => {
          // roleId = result[0].id;
          console.log(result[0].id);

          resolve(result);
        }).catch((err) => {
          reject(err);
          console.log(err);
        });
      }));

      const f5 = (roleid, peopleid) => new Promise(((resolve, reject) => {
        console.log('entered');
        console.log(peopleid);
        // let mediaId;
        models.Media.media_role_people_association.findAll({
          where: {
            id: peopleid,
            role_id: roleid,
          },
          attributes: ['media_id'],
          raw: true,

        }).then((result) => {
          console.log(`result is ${result}`);
          // mediaId = result[0].id;
          // console.log(mediaId);
          resolve(result);
          console.log(result[0]);
        }).catch((err) => {
          reject(err);
        });
      }));
      const f6 = mediaid => new Promise(((resolve, reject) => {
        models.Media.media.findAll({

          where: { id: mediaid },
          raw: true,

        }).then((result) => {
          resolve(result);
          console.log(result[0]);
        }).catch((err) => {
        // handle error;
          console.log(err);
          reject(err);
        });
      }));
      // resolve(
      f4(mediaRolesSlug).then((result) => {
        console.log(`result is ${result}`);
        f5(result[0].id, peopleId).then((result) => {
          f6(result[0].media_id).then((result) => {
            resolve(result);
          })
            .catch((err) => {
              reject(err);
            });
        }).catch((err) => {
          reject(err);
        });
      });
    }));
  };


module.exports = returnObject;
