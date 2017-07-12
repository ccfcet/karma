"use strict";

module.exports = function(sequelize, DataTypes) {
    var Slugs = sequelize.define("slugs", {
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
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    });

    return Slugs;
}