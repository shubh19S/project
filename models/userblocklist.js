'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userBlockList extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  userBlockList.init({
    userId:{ 
      type:DataTypes.INTEGER,
    
    },
    blockedTill: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'userBlockList',
  });

  // userBlockList.hasOne(User);
  return userBlockList;
};