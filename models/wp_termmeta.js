/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpTermmeta', {
    metaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'meta_id'
    },
    termId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'term_id'
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
    tableName: 'wp_termmeta'
  });
};
