'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        unique:{
          args:true,
          msg: 'User Name must be unique'
        },
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: "email address must be unique"
        },
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: "Phone Number must be unique"
        },
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM({
          values: ['Male','Female','Others']
        }),
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};