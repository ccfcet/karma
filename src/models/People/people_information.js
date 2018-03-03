'use strict'

module.exports = function (sequelize, DataTypes) {
  var PeopleInformation = sequelize.define('people_information', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    slug_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    json: {
      type: DataTypes.JSON(),
      allowNull: false
    }
  }, {
    indexes: [
      { fields: ['people_id', 'slug_id'], unique: true }
    ]
  })

  PeopleInformation.associate = function (models) {
    models.People.people_information.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })

    models.People.people_information.belongsTo(models.People.people_information_slugs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'slug_id'
        // allowNull: false -- already defined
      }
    })
  }

  return PeopleInformation
}
