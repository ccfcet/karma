"use strict";

module.exports = function(sequelize, DataTypes) {
  var EntitySlugs = sequelize.define("entitySlugs", {
    id: {
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

  return EntitySlugs;
}
