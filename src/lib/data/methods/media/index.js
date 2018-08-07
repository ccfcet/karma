const media = {};

media.other = require('./other');
media.media_people_association = require('./media_role_people_association');
media.media_entity_association = require('./media_role_entity_association');
media.mediaRolesMethods = require('./media_roles');
media.mediaMethods = require('./media');

module.exports = media;
