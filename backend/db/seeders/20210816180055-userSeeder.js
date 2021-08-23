'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [  {

        username: 'Demo-lition',
        firstName:'DemoUser',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        profileImgUrl:"https://www.chicagotribune.com/resizer/b4pDF7Lz95sEugm9LA7ddvXDtT4=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/CNDQDU4UHNCSRDAZODSCCXQBIU.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
{
        username: 'CoolCatCaryn49',
        firstName: 'Caryn',
        email: "caryn.solomen@hotmail.com",
        hashedPassword: bcrypt.hashSync('CoolCatCaryn49'),
        profileImgUrl:"https://arts.ny.gov/sites/default/files/people/2018-07/Janet%20Kagan%20NYSCA%20Headshot.jpg",
        createdAt: new Date(),
        updatedAt: new Date()

          },
    {username: "FatFelix22",
    firstName: "Theo",
    email: "cleo.theo@gmail.com",
    hashedPassword: bcrypt.hashSync("FatFelix22"),
    profileImgUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F08%2F04%2Fowner-bonding-with-cat.jpg&q=85',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {username: "SammyAndChiChi",
    firstName: "Samantha",
    email: "sammyNchichi@gmail.com",
    hashedPassword: bcrypt.hashSync('SammyAndChiChi'),
    profileImgUrl: 'https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/ca_0510NF_Cat_Cognition_Carl_350px.jpg?itok=WkITYYmW',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    username: 'CatMomma528',
    firstName: 'Jolesha',
    email: "jolesha.dresden@gmail.com",
    hashedPassword: bcrypt.hashSync('CatMomma528'),
    profileImgUrl: 'https://www.potentash.com/wp-content/uploads/2017/11/Black-woman-with-Cat-PF.jpg',
    createdAt: new Date(),
    updatedAt: new Date()

    },
    {username: "ColdestKatDad",
    firstName: "Daquan",
    email: "DaquanDaCatDaddy@gmail.com",
    hashedPassword: bcrypt.hashSync('ColdestKatDad'),
    profileImgUrl: 'https://pbs.twimg.com/media/DfTexiDVAAAABUj.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    username: "JustinAndJarod",
    firstName: "JustinAndJarod",
    email: "JustinNJarodFoster@gmail.com",
    hashedPassword: bcrypt.hashSync('JustinAndJarod'),
    profileImgUrl: 'https://pvhsociety.ca/wp-content/uploads/2019/10/iStock-1083686000.jpg',
    createdAt: new Date(),
    updatedAt: new Date()

    },
    {
    username: "AntonioMoricci364",
    firstName: "Antonio",
    email: "antonio.moricci@gmail.com",
    hashedPassword: bcrypt.hashSync('AntonioMoricci364'),
    profileImgUrl: 'https://media.istockphoto.com/photos/cheerfull-senior-man-with-cat-isolated-on-white-picture-id649248614?k=6&m=649248614&s=612x612&w=0&h=SvY8XPtWJkTnuKKM0xjj3bx-oQomofN9KBn4GOqahmA=',
    createdAt: new Date(),
    updatedAt: new Date()

    },

    {
    username: "RealLifeRachel",
    firstName: "Rachel",
    email: "rachelruns.333@gmail.com",
    hashedPassword: bcrypt.hashSync('RealLifeRachel'),
    profileImgUrl: 'https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2016/09/things-cat-people-understand-article-092016.jpg',
    createdAt: new Date(),
    updatedAt: new Date()

    },
    {
    username: "DesmondLuvsGatos",
    firstName: "Desmond",
    email: "desmond.rodriguez@gmail.com",
    hashedPassword: bcrypt.hashSync('DesmondLuvsGatos'),
    profileImgUrl: 'https://upfront.scholastic.com/content/dam/classroom-magazines/upfront/issues/2017-18/091817/p4-5-newstrends/UPF-091817-NT-Cats-medium.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    username: "Johnny888",
    firstName: "Johnny",
    email: "Johnny.Kim@gmail.com",
    hashedPassword: bcrypt.hashSync('Johnny888'),
    profileImgUrl: 'https://www.globaltimes.cn/Portals/0/attachment/2018/2018-01-18/0fa13b44-8369-4582-b7ef-e21ebae5ac5d.jpeg',
    createdAt: new Date(),
    updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});;

  }
};
