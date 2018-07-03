const Promise = require('bluebird');
const models = require('../../models');

const eventMethods = {};

eventMethods.getAllEvents = () => new Promise((resolve, reject) => {
  models.Events.events.findAll()
    .then((events) => {
      resolve(events);
    })
    .catch((err) => {
      reject(err);
    });
});

eventMethods.findEventById = id => new Promise((resolve, reject) => {
  models.Events.events.findById(id)
    .then((events) => {
      resolve(events);
    })
    .catch((err) => {
      reject(err);
    });
});


module.exports = eventMethods;
