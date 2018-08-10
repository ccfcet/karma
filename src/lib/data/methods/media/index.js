const media = {};

media.other = require('./other');
media.mediaPeopleAssociation = require('./media_role_people_association');
media.mediaEntityAssociation = require('./media_role_entity_association');
media.mediaRolesMethods = require('./media_roles');
media.mediaMethods = require('./media');

module.exports = media;
