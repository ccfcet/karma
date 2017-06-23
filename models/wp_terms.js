/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpTerms', {
    termId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'term_id'
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      field: 'name'
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      field: 'slug'
    },
    termGroup: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'term_group'
    }
  }, {
    tableName: 'wp_terms'
  });
};
