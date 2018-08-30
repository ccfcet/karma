const Entities = {};

Entities.obtainInformation = require('./obtainInformation');
Entities.entityTypeMethods = require('./entity_types');
Entities.entityMethods = require('./entities');
Entities.entityInfoSlugsMethods = require('./entity_information_slugs');
Entities.entityParentChildMethods = require('./entity_parent_child_association');

module.exports = Entities;
