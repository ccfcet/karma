const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Email extends Model {
  static get tableName() {
    return tableNames.email;
  }

  static get relationMappings() {
    const People = require('./People');
    const DataType = require('./DataType');

    return {
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.email}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
      data_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: DataType,
        join: {
          from: `${tableNames.email}.${tableNames.data_type}_id`,
          to: `${tableNames.data_type}.id`,
        },
      },
    };
  }
}

module.exports = Email;
