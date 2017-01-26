"use strict";

module.exports = function(sequelize, DataTypes) {
    var College = sequelize.define("College", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return College;
};
