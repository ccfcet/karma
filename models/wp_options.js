/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpOptions', {
    optionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'option_id'
    },
    optionName: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: '',
      unique: true,
      field: 'option_name'
    },
    optionValue: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'option_value'
    },
    autoload: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'yes',
      field: 'autoload'
    }
  }, {
    tableName: 'wp_options'
  });
};
