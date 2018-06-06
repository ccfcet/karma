var Promise = require('bluebird')

var models = require('_/data/models')
var classesMethods = {}
classesMethods.addClasses = (info) => {
  console.log('inside adding Classes')

  return new Promise((resolve, reject) => {
    models.Academics.classes.create(info)

    resolve(model)
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}

classesMethods.findBySlug = (slugName) => {
  console.log('finding by slugname')

  return new Promise((resolve, reject) => {
    models.Academics.classes.findAll({ where: { current_class_slug: slugName } }).then(classes => {
      console.log(classes)
    })
    if (classes) {
      resolve(classes)
    } else {
      reject(new Error('No start or end date specified.'))
    }
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}
classesMethods.findById = (id) => {
  console.log('finding by id')
  return new Promise((resolve, reject) => {
    models.Academics.classes.findAll({ where: { id: id } }).then(classes => {
      console.log(classes)
    })
    if (classes) {
      resolve(classes)
    } else {
      reject(new Error('Not a valid class id'))
    }
  })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
}

module.exports = classesMethods
