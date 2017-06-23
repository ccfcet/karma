/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpTermRelationships', {
    objectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      field: 'object_id'
    },
    termTaxonomyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      field: 'term_taxonomy_id'
    },
    termOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'term_order'
    }
  }, {
    tableName: 'wp_term_relationships'
  });
};
