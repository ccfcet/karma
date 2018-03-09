'use strict'

module.exports = function (sequelize, DataTypes) {
  var EntityPeoplePositionEnrollment = sequelize.define('entity_people_position_enrolment', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    entity_position_association_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    activity: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  })

  EntityPeoplePositionEnrollment.associate = function (models) {
    models.Entities.entity_people_position_enrolment.belongsTo(models.Entities.entity_position_association, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_position_association_id'
        // allowNull: false -- already defined
      }
    })

    models.Entities.entity_people_position_enrolment.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })
  }

  return EntityPeoplePositionEnrollment
}
