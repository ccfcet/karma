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

peopleMethods.getInforamationUsingSlug = (peopleId, informationSlug) => {
  return new Promise((resolve, reject) => {
    models.People.people.findById(peopleId)
      .then((person) => {
        models.People.people_information_slugs.findOne(
          {
            where: { slug_name: informationSlug }
          })
          .then((slug) => {
            models.People.people_information.findOne({
              where: {
                id: peopleId,
                slug_name: slug.slug_name
              }
            })
              .then((peopleInfomation) => {
                resolve(peopleInfomation)
              })
              .catch((err) => {
                reject(err)
              })
          })
          .catch((err) => {
            reject(err)
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

peopleMethods.insertSlug = (slugName, peopleId) => {
  console.log(slugName)
  return new Promise((resolve, reject) => {
    models.People.people_information_slugs.findOrCreate({
      where: { slug_name: slugName }
    })
      .then((arr) => {
        if (!arr[1]) {
          console.log('Slug already exists.')
          reject(new Error('Slug already exists.'))
        } else {
          console.log('success')
          resolve(arr[0])
        }
      })
      .catch((err) => {
        console.log('Error')
        reject(err)
      })
  })
}
module.exports = peopleMethods
