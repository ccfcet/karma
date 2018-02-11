"use strict";

module.exports = function(sequelize, DataTypes) {
  var PeopleInformation = sequelize.define("peopleInformation", {
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
  });

  PeopleInformation.associate = function (models) {
    models.peopleInformation.belongsTo(models.people, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "person_id"
        // allowNull: false -- already defined
      }
    });

    models.peopleInformation.belongsTo(models.peopleSlugs, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "person_slug_id"
        // allowNull: false -- already defined
      }
    });
  };

  return PeopleInformation;
}
