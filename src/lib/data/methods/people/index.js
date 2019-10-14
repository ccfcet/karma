const People = {};

People.peopleMethods = require('./people');
People.peopleInfoMethods = require('./people_information');
People.peopleInfoSlugsMethods = require('./people_information_slugs');
People.getUserIdUsingEmail = require('./get_user_id_using_email');

module.exports = People;
