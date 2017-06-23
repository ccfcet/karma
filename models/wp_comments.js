/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpComments', {
    commentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'comment_ID'
    },
    commentPostId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'comment_post_ID'
    },
    commentAuthor: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'comment_author'
    },
    commentAuthorEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      field: 'comment_author_email'
    },
    commentAuthorUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      field: 'comment_author_url'
    },
    commentAuthorIp: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      field: 'comment_author_IP'
    },
    commentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'comment_date'
    },
    commentDateGmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'comment_date_gmt'
    },
    commentContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'comment_content'
    },
    commentKarma: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'comment_karma'
    },
    commentApproved: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '1',
      field: 'comment_approved'
    },
    commentAgent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'comment_agent'
    },
    commentType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      field: 'comment_type'
    },
    commentParent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'comment_parent'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      field: 'user_id'
    }
  }, {
    tableName: 'wp_comments'
  });
};
