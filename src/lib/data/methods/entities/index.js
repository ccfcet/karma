const Entities = {};

Entities.obtainInformation = require('./obtainInformation');
Entities.entityTypeMethods = require('./entity_types');
Entities.entityMethods = require('./entities');
Entities.entityInfoSlugsMethods = require('./entity_information_slugs');
Entities.entityParentChildMethods = require(
  './entity_parent_child_association',
);
Entities.entityInfoMethods = require('./entity_information');
Entities.entityPositionMethods = require('./entity_position_association');
Entities.entityPeopleEnrolMethods = require('./entity_people_enrolment');
Entities.entityPeoplePosEnrolMethods = require(
  './entity_people_position_enrolment',
);

module.exports = Entities;
