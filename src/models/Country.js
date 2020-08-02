const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Country extends Model {
  static get tableName() {
    return tableNames.country;
  }

  static get relationMappings() {
    const State = require('./State');
    const Address = require('./Address');

    return {
      state: {
        relation: Model.HasManyRelation,
        modelClass: State,
        join: {
          from: `${tableNames.country}.id`,
          to: `${tableNames.state}.${tableNames.country}_id`,
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

module.exports = Country;
