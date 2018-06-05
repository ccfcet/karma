var Promise = require('bluebird')
var models = require('_/data/models')
var peopleMethods = {}

peopleMethods.addPeople = (info) => {
  return new Promise((resolve, reject) => {
    models.People.people.create(info)
      .then((model) => {
        resolve(model)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

peopleMethods.findPeopleById = (peopleId) => {
  return new Promise((resolve, reject) => {
    models.People.people.findById(peopleId)
      .then((person) =>
        resolve(person)
      )
      .catch((err) => {
        reject(err)
      })
  })
}

peopleMethods.insertSlug = (slugName) => {
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOrCreate({
      where: { slug_name: slugName }
    }).spread((slug, created) => {
      if (created) {
        resolve(slug)
      } else {
        reject(new Error('Slug already exists.'))
      }
    }).catch((err) => {
      console.log('Error')
      reject(err)
    })
  })
}

peopleMethods.getInformationUsingSlug = (peopleId, slugName) => {
  return new Promise((resolve, reject) => {
    models.People.people.findOne({
      include: [
        {
          model: models.People.people_information_slugs,
          where: {
            slug_name: slugName
          }
        }
      ]
    })
      .then((peopleInfomation) => {
        resolve(peopleInfomation)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

peopleMethods.putInformationUsingSlug = (peopleId, slugName, slugValue) => {
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOne({
      where: { slug_name: slugName }
    })
      .then((slug) => {
        // models.People.people_information.create({
        //   people_id: peopleId,
        //   slug_id: slug.id,
        // })
        //   .then((details) => {
        //     resolve(details)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     reject(err)
        //   })
        var sqlQuery = 'update people_informations set json = \'["' +
        slugValue + '"]\' where people_id = ' + peopleId + ' and slug_id = ' +
        slug.id + ' ;'
        var sqlQueryNew = 'insert into people_informations (people_id, slug_id, json) ' +
        'VALUES (' + peopleId + ', ' + slug.id + ', \'["' + slugValue + '"]\') ON DUPLICATE KEY UPDATE json = \'["' + slugValue +
        '"]\''
        console.log(sqlQuery)
        console.log(sqlQueryNew)
        models.sequelize.query('update people_informations set json = \'["' +
          slugValue + '"]\' where people_id = ' + peopleId + ' and slug_id = ' +
          slug.id + ' ;')
          .spread((results, metadata) => {
            resolve(results)
          })
          .catch((err) => {
            reject(err)
          })
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

// peopleMethods.putInformationUsingSlug = (peopleId, slugName, slugValue) => {
//   return new Promise((resolve, reject) => {
//     models.People.people_information_slugs.findOne({
//       where: { slug_name: slugName }
//     })
//       .then((slug) => {
//         models.People.people_information.findOrCreate({
//           where: {
//             people_id: peopleId,
//             slug_id: slug.id
//           }
//         })
//           .then((arr) => {
//             if (!arr[1]) {
//               reject(new Error('Value for this slug already exists!'))
//             }
//             resolve(arr[1])
//           })
//           .catch((err) => {
//             reject(err)
//           })
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }

peopleMethods.getUserIdUsingEmail = require('./get_user_id_using_email')

module.exports = peopleMethods
