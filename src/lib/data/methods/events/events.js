const Promise = require('bluebird');
const models = require('../../models');

const eventMethods = {};

eventMethods.getAllEvents = () => new Promise((resolve, reject) => {
  models.events.events.findAll()
    .then((events) => {
      console.log(events);
      if (events !== null) resolve(events);
      else { reject(new Error('No events were found!')); }
    })
    .catch((err) => {
      reject(err);
    });
});

eventMethods.findEventById = id => new Promise((resolve, reject) => {
  models.events.events.findById(id)
    .then((events) => {
      if (events !== null) resolve(events);
      else { reject(new Error('No events match the given ID')); }
    })
    .catch((err) => {
      reject(err);
    });
});

eventMethods.createNewEvent = data => new Promise((resolve, reject) => {
  models.events.events.create(data)
    .then((event) => {
      if (event !== null) resolve(event);
      else { reject(new Error('No events match the given ID')); }
    })
    .catch((err) => {
      reject(err);
    });
});


module.exports = eventMethods;
