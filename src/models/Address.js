const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Address extends Model {
  static get tableName() {
    return tableNames.address;
  }

  static get relationMappings() {
    const Country = require('./Country');
    const State = require('./State');
    const People = require('./People');
    const Entity = require('./Entity');

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
      people: {
        relation: Model.ManyToManyRelation,
        modelClass: People,
        join: {
          from: `${tableNames.address}.id`,
          through: {
            from: `${tableNames.people_address}.${tableNames.address}_id`,
            to: `${tableNames.people_address}.${tableNames.people}_id`,
          },
          to: `${tableNames.people}.id`,
        },
      },
      entity: {
        relation: Model.ManyToManyRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.address}.id`,
          through: {
            from: `${tableNames.entity_address}.${tableNames.address}_id`,
            to: `${tableNames.entity_address}.${tableNames.entity}_id`,
          },
          to: `${tableNames.entity}.id`,
        },
      },
    };
  }
}

module.exports = Address;
