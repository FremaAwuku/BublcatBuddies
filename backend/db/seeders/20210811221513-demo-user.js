'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {

        username: 'Demo-lition',
        firstName:'DemoUser',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        profileImgUrl:"https://www.chicagotribune.com/resizer/b4pDF7Lz95sEugm9LA7ddvXDtT4=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/CNDQDU4UHNCSRDAZODSCCXQBIU.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },


    ], {});
  },
  // down: (queryInterface, Sequelize) => {


  //   return queryInterface.bulkDelete('Users', null, {});


  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
