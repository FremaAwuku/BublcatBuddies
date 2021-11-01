'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [{
        content: 'Last time I had such a great time at the event',
        eventId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'We are starting a drinks list, shoot us a text to be added on!',
        eventId: 4,
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Can't wait to Go again!",
        eventId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Make sure yall comment your experience! Shoot me a text for after party!',
        eventId: 2,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "My cat kinda freaked out at the park",
        eventId: 1,
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
