'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.addColumn(
      'loginFailedAttempts',
      'origin',
      {
       type :  Sequelize.GEOMETRY('POINT')
      },
    )
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn(
      'loginFailedAttempts',
      'origin',
    )
  }
};
