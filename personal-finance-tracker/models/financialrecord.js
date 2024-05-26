'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinancialRecord.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'FinancialRecord',
  });
  return FinancialRecord;
};