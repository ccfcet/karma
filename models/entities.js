"use strict";

module.exports = function(sequelize, DataTypes) {
    var Entities = sequelize.define("entities", {
        eid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ename: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        }
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    }, {
        classMethods: {
            associate: function(models) {
                // models.entities.hasMany(models.information, { foreignKey: 'eid', targetKey: 'eid' }); //Admin is the target model--automatically created a foreign key
                  // models.slugs.hasMany(models.information);
                  models.entities.hasMany(models.information);
            }
        }
    });

    return Entities;
}
