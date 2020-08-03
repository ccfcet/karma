const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class People extends Model {
  static get tableName() {
    return tableNames.people;
  }

  static get relationMappings() {
    const Nationality = require('./Nationality');
    const Identifier = require('./Identifier');
    const Email = require('./Email');
    const Address = require('./Address');
    const Auth = require('./Auth');
    const Field = require('./Field');
    const PeopleFieldValue = require('./PeopleFieldValue');
    const CourseInstanceAssociation = require('./CourseInstanceAssociation');
    const Role = require('./Role');

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
      email: {
        relation: Model.HasManyRelation,
        modelClass: Email,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.email}.${tableNames.people}_id`,
        },
      },
      address: {
        relation: Model.ManyToManyRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.people}.id`,
          through: {
            from: `${tableNames.people_address}.${tableNames.people}_id`,
            to: `${tableNames.people_address}.${tableNames.address}_id`,
          },
          to: `${tableNames.address}.id`,
        },
      },
      field: {
        relation: Model.ManyToManyRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.people}.id`,
          through: {
            from: `${tableNames.people_field_value}.${tableNames.people}_id`,
            to: `${tableNames.people_field_value}.${tableNames.field}_id`,
          },
          to: `${tableNames.field}.id`,
        },
      },
      auth: {
        relation: Model.HasOneRelation,
        modelClass: Auth,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.auth}.${tableNames.people}_id`,
        },
      },
      people_field_value: {
        relation: Model.HasManyRelation,
        modelClass: PeopleFieldValue,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.people_field_value}.${tableNames.people}_id`,
        },
      },
      course_instance_association: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstanceAssociation,
        join: {
          from: `${tableNames.people}.id`,
          to: `${tableNames.course_instance_association}.${tableNames.people}_id`,
        },
      },
      role: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: `${tableNames.people}.id`,
          through: {
            from: `${tableNames.role_people_entity}.${tableNames.people}_id`,
            to: `${tableNames.role_people_entity}.${tableNames.role}_id`,
          },
          to: `${tableNames.role}.id`,
        },
      },
    };
  }
}

module.exports = People;
