'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Events', [{
  eventName: "Cats and Cradle",
  description: "Mommy Cat walking group",
  eventImageUrl: 'https://media.istockphoto.com/photos/multiracial-mothers-with-babies-in-jogging-strollers-picture-id509349960?k=6&m=509349960&s=612x612&w=0&h=kSTgl3tPrfQ4TtkGRRYIcZQaTIfF8qHaBW7CiC0ZH5k=',
  hostId: 2,
  private: false,
  address: "3229 Piedmont Park Atlanta,GA, 30311",
  eventDate: "2021-08-31",
  createdAt: new Date(),
  updatedAt: new Date()

      },
    {eventName: "CATlanta Meet-Up",
    description: "Recurring Atlanta Cat Meet-up group ",
    eventImageUrl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.18169-9/18010024_1438279462899105_2901457057159399457_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=9267fe&_nc_ohc=mQvagUx_ERIAX9SkLna&_nc_ht=scontent-atl3-1.xx&oh=c3eafe6d49515e472f9a6edad73c5fc0&oe=61403A81',
    hostId: 6,
    private: false,
    address: "729 Freedom Park Atlanta,GA, 30321",
    eventDate: "2021-08-23",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    eventName: "Quiet Cats",
  description: "Private Reading Group for Cat",
  eventImageUrl: 'http://images6.fanpop.com/image/photos/41000000/Reading-have-fun-41031970-600-401.jpg',
  hostId: 5,
  private: true,
  address: "729 Freedom Park Atlanta,GA, 30321",
  eventDate: "2021-09-01",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
eventName: "Cat Cafe Clique",
description: "Private Reading Group for Cat",
eventImageUrl: 'http://images6.fanpop.com/image/photos/41000000/Reading-have-fun-41031970-600-401.jpg',
hostId: 7,
private: true,
address: "640 Lenox Rd Buckhead,GA 30325",
eventDate: "2021-07-31",
createdAt: new Date(),
updatedAt: new Date()
},
], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Events', null, {});

  }
};
