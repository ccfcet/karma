const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class People extends Model {
  static get tableName() {
    return tableNames.people;
  }

  static get relationMappings() {
    const Nationality = require('./Nationality');
    const Identifier = require('./Identifier');

    return {
      nationality: {
        relation: Model.BelongsToOneRelation,
        modelClass: Nationality,
        join: {
          from: `${tableNames.people}.${tableNames.nationality}_id`,
          to: `${tableNames.nationality}.id`,
        },
      },
      identifier: {
        relation: Model.HasManyRelation,
        modelClass: Identifier,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.identifier}.${tableNames.people}_id`,
        },
      },
    };
  }
}

module.exports = People;
