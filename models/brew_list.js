'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brew_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  brew_list.init({
    user_id: DataTypes.INTEGER,
    brew_id: DataTypes.STRING,
    visited: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'brew_list',
  });
  return brew_list;
};