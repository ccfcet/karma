const methods = {};

methods.authentication = require('./authentication');
methods.Entities = require('./entities');
methods.Menu = require('./menu');
methods.Media = require('./media');
methods.people = require('./people');
methods.Academics = require('./academics');
methods.students = require('./student');
methods.Events = require('./events');

module.exports = methods;
