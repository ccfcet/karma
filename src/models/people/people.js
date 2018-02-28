'use strict'

module.exports = function (sequelize, DataTypes) {
  var People = sequelize.define('people', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    },
    person_slug_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT('medium'),
      unique: false,
      allowNull: false
    }
  }, {
    indexes: [
      { fields: ['key1', 'key2'], unique: true }
    ]
  })

  People.associate = function (models) {
    models.peopleInformation.belongsTo(models.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'person_id'
        // allowNull: false -- already defined
      }
    })

    models.peopleInformation.belongsTo(models.peopleSlugs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'person_slug_id'
        // allowNull: false -- already defined
      }
    })
  }

  return People
}
