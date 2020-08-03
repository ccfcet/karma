const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class DataType extends Model {
  static get tableName() {
    return tableNames.data_type;
  }

  static get relationMappings() {
    const Email = require('./Email');
    const PeopleAddress = require('./PeopleAddress');
    const Field = require('./Field');

    return {
      email: {
        relation: Model.HasManyRelation,
        modelClass: Email,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.email}.${tableNames.people}_id`,
        },
      },
      people_address: {
        relation: Model.HasManyRelation,
        modelClass: PeopleAddress,
        join: {
          from: `${tableNames.data_type}.id`,
          to: `${tableNames.people_address}.${tableNames.data_type}_id`,
        },
      },
      field: {
        relation: Model.HasManyRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.data_type}.id`,
          to: `${tableNames.field}.${tableNames.data_type}_id`,
        },
      },
    };
  }
}

module.exports = DataType;
