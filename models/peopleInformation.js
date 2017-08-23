"use strict";

module.exports = function(sequelize, DataTypes) {
    var PeopleInformation = sequelize.define("peopleInformation", {
            iid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                type: DataTypes.TEXT
            }
        }, {
            classMethods: {
                associate: function(models) {
                    models.peopleInformation.belongsTo(models.people, { foreignKey: 'personPid' });
                    models.peopleInformation.belongsTo(models.peopleSlugs, { foreignKey: 'peopleSlugSlugId' });
            }
        }
      });

        // EIDs
        // ------------
        // 0 - college
        // 1 - cse
        // 2 - ece

    return PeopleInformation;
}
