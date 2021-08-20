'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

return queryInterface.bulkInsert('Rsvps',
[
  {
    eventId:1,
    userId:2,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:2,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:2,
    confirmed:false ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:2,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:3,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:3,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    eventId:4,
    userId:3,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:2,
    userId:4,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:4,
    confirmed:false ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:5,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:5,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:5,

    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:5,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:6,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:6,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:6,

    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:6,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:7,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:7,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:7,

    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:7,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:2,
    userId:8,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:8,

    confirmed:true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:8,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:9,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:9,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:10,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:10,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:10,
    confirmed:false ,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    eventId:1,
    userId:11,

    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:11,
    confirmed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },

 ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Events', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
