var Promise = require('bluebird')

var models = require('_/data/models')

var timeSlotsMethods = {}

timeSlotsMethods.addTimeSlots = (info) => {
  console.log(info)
  return new Promise((resolve, reject) => {
    models.Academics.time_slots.create(info)
      .then((newTimeSlot) => {
        resolve(newTimeSlot)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

timeSlotsMethods.updateTimeSlots = (info, data) => {
  return new Promise((resolve, reject) => {
    models.Academics.time_slots.update(data, {
      where: {
        id: info.id
      }
    })
      .then((updated) => {
        if (updated > 0) {
          resolve(updated)
        } else {
          reject(new Error())
          // throw ('err')
        }
      }).catch((error) => {
        reject(error)
      })
  })
}

timeSlotsMethods.deleteTimeSlots = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.time_slots.destroy({
      where: {
        id: info.id

      }
    }).then((deleted) => {
      if (deleted === 0) {
        console.log('error tg')
        reject(new Error())
      } else {
        resolve(deleted)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = timeSlotsMethods
