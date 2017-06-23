/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpTermTaxonomy', {
    termTaxonomyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'term_taxonomy_id'
    },
    termId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'term_id'
    },
    taxonomy: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
      field: 'taxonomy'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'parent'
    },
    count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'count'
    }
  }, {
    tableName: 'wp_term_taxonomy'
  });
};
