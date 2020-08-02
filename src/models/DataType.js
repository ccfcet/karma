const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class DataType extends Model {
  static get tableName() {
    return tableNames.data_type;
  }
}

module.exports = DataType;
