"use strict";

module.exports = function(sequelize, DataTypes) {
  var People = sequelize.define("people", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false
    },
    second_name: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    }
  });

  return People;
}
