/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpPosts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    postAuthor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'post_author'
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'post_date'
    },
    postDateGmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'post_date_gmt'
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_content'
    },
    postTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_title'
    },
    postExcerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_excerpt'
    },
    postStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'publish',
      field: 'post_status'
    },
    commentStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open',
      field: 'comment_status'
    },
    pingStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open',
      field: 'ping_status'
    },
    postPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'post_password'
    },
    postName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      field: 'post_name'
    },
    toPing: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'to_ping'
    },
    pinged: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'pinged'
    },
    postModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'post_modified'
    },
    postModifiedGmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'post_modified_gmt'
    },
    postContentFiltered: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_content_filtered'
    },
    postParent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'post_parent'
    },
    guid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'guid'
    },
    menuOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'menu_order'
    },
    postType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'post',
      field: 'post_type'
    },
    postMimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      field: 'post_mime_type'
    },
    commentCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'comment_count'
    }
  }, {
    tableName: 'wp_posts'
  });
};
