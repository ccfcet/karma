var Promise = require('bluebird')

var models = require('_/data/models')

var obtainInformation = function () {
  return new Promise(function (resolve, reject) {
    models.Faculty.faculty_academic_enrolment_activity.findAll({
      include: [
        {
          model: models.People.people
          // where: { id: id }
        }
      ],
      attributes: ['data'],
      rejectOnEmpty: true
    })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = obtainInformation
