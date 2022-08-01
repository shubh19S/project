'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class loginFailedAttempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  loginFailedAttempts.init({
    userId:{
      type:DataTypes.INTEGER

    },
    ip: DataTypes.STRING,
    origin :{
      type : DataTypes.GEOMETRY('POINT')
    },
  }, {
    sequelize,
    modelName: 'loginFailedAttempts',
  });

  return loginFailedAttempts;
};
