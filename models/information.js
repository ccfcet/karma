"use strict";

module.exports = function(sequelize, DataTypes) {
    var Information = sequelize.define("information", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    });

    return Information;
}