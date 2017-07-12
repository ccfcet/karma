"use strict";

module.exports = function(sequelize, DataTypes) {
    var Programmes = sequelize.define("programmes", {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pname: {
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

    return Programmes;
}