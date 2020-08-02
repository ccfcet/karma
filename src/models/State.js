const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class State extends Model {
  static get tableName() {
    return tableNames.state;
  }

  static get relationMappings() {
    const Country = require('./Country');
    const Address = require('./Address');

    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: `${tableNames.state}.${tableNames.country}_id`,
          to: `${tableNames.country}.id`,
        },
      },
      address: {
        relation: Model.HasManyRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.country}.id`,
          to: `${tableNames.address}.${tableNames.country}_id`,
        },
      },
    };
  }
}

module.exports = State;
