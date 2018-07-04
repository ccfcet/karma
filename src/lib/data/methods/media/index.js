const media = {};

media.obtainInformation = require('./obtainInformation');
media.media_people_association = require('./media_role_people_association');
media.media_entity_association = require('./media_role_entity_association');
media.media_roles = require('./media_roles');
media.media = require('./media');

module.exports = media;
