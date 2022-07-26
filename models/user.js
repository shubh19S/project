'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      const user = this.get()
      delete user.password
      return user 
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      unique: {
          msg: "Username Must be unique"
        },
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email Must be unique"
      },
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: "Phone Number Must be unique"
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM({
        values: ['Male','Female','Others']
      }),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};