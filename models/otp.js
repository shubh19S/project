'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isVerified: {
      type : DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};