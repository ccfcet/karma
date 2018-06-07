var Promise = require('bluebird')
var models = require('_/data/models')
var peopleMethods = {}

// Method to add people to the database
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

// Method to find people given their people_id
peopleMethods.findPeopleById = (peopleId) => {
  return new Promise((resolve, reject) => {
    models.People.people.findById(peopleId)
      .then((person) => {
        if (person !== null) {
          resolve(person)
        } else {
          reject(new Error('No rows were returned from people table for the given people_id'))
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Method to insert a new slug
peopleMethods.insertSlug = (slugName) => {
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOrCreate({
      where: { slug_name: slugName }
    }).spread((slug, created) => {
      if (created) {
        resolve(slug)
      } else {
        console.log('Slug already exists')
        reject(new Error('Slug already exists.'))
      }
    }).catch((err) => {
      console.log('Error')
      reject(err)
    })
  })
}

// Method to get information using slug
peopleMethods.getInformationUsingSlug = (peopleId, slugName) => {
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOne({
      where: { slug_name: slugName }
    })
      .then((slug) => {
        if (slug) {
          models.People.people_information.findOne({
            where: {
              people_id: peopleId,
              slug_id: slug.id
            }
          })
            .then((peopleInfomation) => {
              if (peopleInfomation !== null) {
                resolve(peopleInfomation)
              } else {
                reject(new Error('No entry was found in the people_information table!'))
              }
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          reject(new Error('The slug was not found!'))
        }
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })

    // models.People.people.findOne({
    //   where: { people_id: peopleId },
    //   include: [
    //     {
    //       model: models.People.people_information_slugs,
    //       where: {
    //         slug_name: slugName
    //       }
    //     }
    //   ]
    // })
    //   .then((peopleInfomation) => {
    //     resolve(peopleInfomation)
    //   })
    //   .catch((err) => {
    //     console.log('Error in searching the database')
    //     reject(err)
    //   })
  })
}

// Method to put information using slug
peopleMethods.putInformationUsingSlug = (peopleId, slugName, slugValue) => {
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOne({
      where: { slug_name: slugName }
    })
      .then((slug) => {
        if (slug !== null) {
          var existingData
          var existingDataSql = 'select data from people_informations where people_id = ' + peopleId + ' and slug_id = ' + slug.id

          models.sequelize.query(existingDataSql, { type: models.sequelize.QueryTypes.SELECT })
            .spread((results, metadata) => {
              // The value which the user asked to insert to database should be
              // converted to an array as the function JSON_MERGE_PRESERVE
              // provided by MySQL takes two arrays as input.

              // Remove escape charector '\n' if it is present in slugValue before
              // pushing it to the array
              var slugValueTrimmed = slugValue.replace(/^\s+|\s+$/g, '')

              var newData = []
              newData.push(slugValueTrimmed)

              // if the slugValue given by the user is already present in the database,
              // it should not be added again. [Array].indexOF('key') returns -1 if
              // the element is not present in the array and the index of the key otherwise.

              if (results) {
                // A value for the slug exists
                var indexOfSlugValueInExistingData = results.data.indexOf(slugValueTrimmed)
                if ((indexOfSlugValueInExistingData !== -1)) {
                  reject(new Error('The value for the slug given is already present in the database'))
                }
                existingData = results.data
                models.sequelize.query('insert into people_informations (people_id, slug_id, data, createdAt, updatedAt) values (' + peopleId + ', ' + slug.id + ', JSON_MERGE_PRESERVE(\'' + JSON.stringify(existingData) + '\',\'' + JSON.stringify(newData) + '\'), NOW(), NOW()) ON DUPLICATE KEY UPDATE data = JSON_MERGE_PRESERVE(\'' + JSON.stringify(existingData) + '\',\'' + JSON.stringify(newData) + '\')')
                  .spread((results) => {
                    // console.log(results)
                    resolve('Email inserted!')
                  })
                  .catch((err) => {
                    console.log(err)
                    reject(err)
                  })
              } else {
                // No values for the slug exist.
                // console.log('No values for the slug exist.')

                models.sequelize.query('insert into people_informations (people_id, slug_id, data, createdAt, updatedAt) values (' + peopleId + ', ' + slug.id + ', \'' + JSON.stringify(newData) + '\', NOW(), NOW())')
                  .spread((results, metadata) => {
                    // console.log(results)
                    resolve(results)
                  })
                  .catch((err) => {
                    console.log(err)
                    reject(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        } else {
          reject(new Error('Slug was not found'))
        }
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

peopleMethods.getUserIdUsingEmail = require('./get_user_id_using_email')

module.exports = peopleMethods
