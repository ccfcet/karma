const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class PeopleFieldValue extends Model {
  static get tableName() {
    return tableNames.people_field_value;
  }

  static get relationMappings() {
    const People = require('./People');
    const Field = require('./Field');

    return {
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.people_field_value}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
      field: {
        relation: Model.BelongsToOneRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.people_field_value}.${tableNames.field}_id`,
          to: `${tableNames.field}.id`,
        },
      },
    };
  }
}

module.exports = PeopleFieldValue;
