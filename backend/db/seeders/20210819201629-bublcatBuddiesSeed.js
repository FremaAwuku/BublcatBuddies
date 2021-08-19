'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('BublcatBuddies', [{
        userId:1,
        buddyId:4,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:1,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        userId:1,
        buddyId:11,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        userId:2,
        buddyId:10,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:2,
        buddyId:8,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:2,
        buddyId:5,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:3,
        buddyId:11,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:3,
        buddyId:9,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:3,
        buddyId:7,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:3,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:4,
        buddyId:1,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:3,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:4,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:5,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:7,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:8,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:9,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:10,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:6,
        buddyId:11,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:7,
        buddyId:3,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:7,
        buddyId:4,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:7,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:8,
        buddyId:2,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:8,
        buddyId:4,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:8,
        buddyId:5,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:8,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:9,
        buddyId:3,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:9,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        userId:10,
        buddyId:11,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:10,
        buddyId:2,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:10,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:11,
        buddyId:1,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:11,
        buddyId:3,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:11,
        buddyId:6,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        userId:11,
        buddyId:10,
        createdAt: new Date(),
        updatedAt: new Date()

      },


      ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('BublcatBuddies', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
