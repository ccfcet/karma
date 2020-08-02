const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Nationality extends Model {
  static get tableName() {
    return tableNames.nationality;
  }

  static get relationMappings() {
    const People = require('./People');

    return {
      people: {
        relation: Model.HasManyRelation,
        modelClass: People,
        join: {
          from: `${tableNames.nationality}.id`,
          to: `${tableNames.people}.${tableNames.nationality}_id`,
        },
      },
    };
  }
}

module.exports = Nationality;
