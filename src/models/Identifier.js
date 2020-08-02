const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Identifier extends Model {
  static get tableName() {
    return tableNames.identifier;
  }

  static get relationMappings() {
    const People = require('./People');

    return {
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.identifier}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
    };
  }
}

module.exports = Identifier;
