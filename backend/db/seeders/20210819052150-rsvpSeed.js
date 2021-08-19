'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

return queryInterface.bulkInsert('Rsvps',
[
  {
    eventId:1,
    userId:2,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:2,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:2,
    interested: true,
    confirmed:null ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:2,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:3,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:3,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    eventId:4,
    userId:3,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:2,
    userId:4,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:4,
    interested: true,
    confirmed:null ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:5,
    interested: null ,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:5,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:5,
    interested: null,
    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:5,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    eventId:1,
    userId:6,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:6,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:6,
    interested: null,
    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:6,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:7,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:7,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:7,
    interested: null,
    confirmed:true ,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:7,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:2,
    userId:8,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:8,
    interested: null,
    confirmed:true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:4,
    userId:8,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:9,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:9,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:1,
    userId:10,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:10,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    eventId:3,
    userId:10,
    interested: true,
    confirmed:null ,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    eventId:1,
    userId:11,
    interested: null,
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventId:2,
    userId:11,
    interested: true,
    confirmed: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },

 ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Rsvps', null, {});

  }
};
