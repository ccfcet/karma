const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class PeopleAddress extends Model {
  static get tableName() {
    return tableNames.people_address;
  }

  static get relationMappings() {
    const People = require('./People');
    const Address = require('./Address');
    const DataType = require('./DataType');

    return {
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.people_address}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.people_address}.${tableNames.address}_id`,
          to: `${tableNames.address}.id`,
        },
      },
      data_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: DataType,
        join: {
          from: `${tableNames.people_address}.${tableNames.data_type}_id`,
          to: `${tableNames.data_type}.id`,
        },
      },
    };
  }
}

module.exports = PeopleAddress;
