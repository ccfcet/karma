const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Auth extends Model {
  static get tableName() {
    return tableNames.auth;
  }

  static get relationMappings() {
    const People = require('./People');

    return {
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.auth}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
    };
  }
}

module.exports = Auth;
