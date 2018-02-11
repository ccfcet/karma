"use strict";

module.exports = function(sequelize, DataTypes) {
  var PeopleSlugs = sequelize.define("peopleSlugs", {
    slugId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slugName: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  });

  return PeopleSlugs;
}
