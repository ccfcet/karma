// // Method to insert a new slug
// peopleMethods.insertSlug = slugName => new Promise((resolve, reject) => {
//   models.people.people_information_slugs.findOrCreate({
//     where: { slug_name: slugName },
//   }).spread((slug, created) => {
//     if (created) {
//       resolve(slug);
//     } else {
//       console.log('Slug already exists');
//       reject(new Error('Slug already exists.'));
//     }
//   }).catch((err) => {
//     console.log('Error');
//     reject(err);
//   });
// });

// // Method to get all slugs in the database
// peopleMethods.getSlugs = () => new Promise((resolve, reject) => {
//   models.people.people_information_slugs.findAll()
//     .then((slugs) => {
//       if (slugs !== null) {
//         resolve(slugs);
//       } else {
//         reject(new Error('No slugs are present'));
//       }
//     })
//     .catch((err) => {
//       console.log('Error');
//       reject(err);
//     });
// });

// // Method to get information using slug
// peopleMethods.getInformationUsingSlug = (
//   peopleId,
//   slugName,
// ) => new Promise((resolve, reject) => {
//   models.people.people_information_slugs.findOne({
//     where: { slug_name: slugName },
//   })
//     .then((slug) => {
//       if (slug) {
//         models.people.people_information.findOne({
//           where: {
//             people_id: peopleId,
//             slug_id: slug.id,
//           },
//         })
//           .then((peopleInfomation) => {
//             if (peopleInfomation !== null) {
//               resolve(peopleInfomation);
//             } else {
//               reject(new Error('No entry was found in the people_information'
//                   + 'table!'));
//             }
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } else {
//         reject(new Error('The slug was not found!'));
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       reject(err);
//     });

//   // models.people.people.findOne({
//   //   where: { people_id: peopleId },
//   //   include: [
//   //     {
//   //       model: models.people.people_information_slugs,
//   //       where: {
//   //         slug_name: slugName
//   //       }
//   //     }
//   //   ]
//   // })
//   //   .then((peopleInfomation) => {
//   //     resolve(peopleInfomation)
//   //   })
//   //   .catch((err) => {
//   //     console.log('Error in searching the database')
//   //     reject(err)
//   //   })
// });

// // Method to put information using slug
// peopleMethods.putInformationUsingSlug = (
//   peopleId,
//   slugName,
//   slugValue,
// ) => new Promise((resolve, reject) => {
//   models.people.people_information_slugs.findOne({
//     where: { slug_name: slugName },
//   })
//     .then((slug) => {
//       if (slug !== null) {
//         let existingData;

// eslint-disable-next-line max-len
//         const existingDataSql = `select data from people_informations where people_id = ${peopleId} and slug_id = ${slug.id}`;

//         models.sequelize.query(existingDataSql,
//           { type: models.sequelize.QueryTypes.SELECT })
//           .spread((resultsOne) => {
//             // The value which the user asked to insert to database should be
//             // converted to an array as the function JSON_MERGE_PRESERVE
//             // provided by MySQL takes two arrays as input.
// eslint-disable-next-line max-len
//             // Remove escape charector '\n' if it is present in slugValue before
//             // pushing it to the array
//             const slugValueTrimmed = slugValue.replace(/^\s+|\s+$/g, '');

//             const newData = [];
//             newData.push(slugValueTrimmed);

//             // if the slugValue given by the user is already present in the
//             // database, it should not be added again. [Array].indexOF('key')
//             // returns -1 if the element is not present in the array and the
//             // index of the key otherwise.

//             if (resultsOne) {
//               // A value for the slug exists
//               const indexOfSlugValueInExistingData = resultsOne.data
//                 .indexOf(slugValueTrimmed);
//               if ((indexOfSlugValueInExistingData !== -1)) {
//                 reject(new Error('The value for the slug given is already'
//                     + 'present in the database'));
//               }
//               existingData = resultsOne.data;
// eslint-disable-next-line max-len
//               models.sequelize.query(`insert into people_informations (people_id, slug_id, data, createdAt, updatedAt) values (${peopleId}, ${slug.id}, JSON_MERGE_PRESERVE('${JSON.stringify(existingData)}','${JSON.stringify(newData)}'), NOW(), NOW()) ON DUPLICATE KEY UPDATE data = JSON_MERGE_PRESERVE('${JSON.stringify(existingData)}','${JSON.stringify(newData)}')`)
//                 .spread(() => {
//                   resolve('Email inserted!');
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   reject(err);
//                 });
//             } else {
//               // No values for the slug exist.
//               // console.log('No values for the slug exist.')

// eslint-disable-next-line max-len
//               models.sequelize.query(`insert into people_informations (people_id, slug_id, data, createdAt, updatedAt) values (${peopleId}, ${slug.id}, '${JSON.stringify(newData)}', NOW(), NOW())`)
//                 .spread((results) => {
//                   // console.log(results)
//                   resolve(results);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   reject(err);
//                 });
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//             reject(err);
//           });
//       } else {
//         reject(new Error('Slug was not found'));
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       reject(err);
//     });
// });


const Promise = require('bluebird');
const models = require('../../models');

const peopleInfoSlugsMethods = {};

// Method to add peopleinfo_slugs to the database
peopleInfoSlugsMethods.addPeopleInfoSlugs = info => new Promise((
  resolve, reject,
) => {
  models.people.people_information_slugs.create(info)
    .then((model) => {
      resolve(model);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

peopleInfoSlugsMethods.getAllPeopleInfoSlugs = () => new Promise((
  resolve, reject,
) => {
  models.people.people_information_slugs.findAll()
    .then((people) => {
      resolve(people);
    })
    .catch((err) => {
      reject(err);
    });
});

peopleInfoSlugsMethods.updatePeopleInfoSlugs = (info, data) => new Promise((
  resolve, reject,
) => {
  models.people.people_information_slugs.update(data, {
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

peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs = () => new Promise((
  resolve, reject,
) => {
  models.people.people_information_slugs.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

peopleInfoSlugsMethods.deletePeopleInfoSlugs = info => new Promise((
  resolve, reject,
) => {
  models.people.people_information_slugs.destroy({
    where: {
      id: info.id,

    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});


module.exports = peopleInfoSlugsMethods;
