"use strict";

module.exports = function(sequelize, DataTypes) {
    var People = sequelize.define("people", {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pname: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        pslugname: {
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
                  models.people.hasMany(models.peopleInformation);
                  models.people.hasMany(models.positionsCurrentData);
            }
          }
        });

    return People;
}
