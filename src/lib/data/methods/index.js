const methods = {};

methods.authentication = require('./authentication');
methods.Entities = require('./Entities');
methods.Menu = require('./Menu');
// methods.people = require('./people')

methods.people = require('./people');
methods.Academics = require('./Academics');
methods.students = require('./student');
methods.Events = require('./events');

module.exports = methods;
