const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Address extends Model {
  static get tableName() {
    return tableNames.address;
  }

  static get relationMappings() {
    const Country = require('./Country');
    const State = require('./State');

    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: `${tableNames.address}.${tableNames.country}_id`,
          to: `${tableNames.country}.id`,
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: State,
        join: {
          from: `${tableNames.address}.${tableNames.state}_id`,
          to: `${tableNames.state}.id`,
        },
      },
    };
  }
}

module.exports = Address;
