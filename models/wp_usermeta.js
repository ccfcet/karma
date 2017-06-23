/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpUsermeta', {
    umetaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'umeta_id'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'user_id'
    },
    metaKey: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'meta_key'
    },
    metaValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'meta_value'
    }
  }, {
    tableName: 'wp_usermeta'
  });
};
