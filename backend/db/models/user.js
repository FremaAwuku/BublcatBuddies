'use strict';
const bcrypt = require('bcryptjs')
const { Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        len: [4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)) {
            throw new Error('Cannot be an email')
        }
      }
    },
  },
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      len: [0, 20]
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 256]
    },
  },
  hashedPassword: {
    type: DataTypes.STRING.BINARY,
    allowNull: false,
    validate: {
      len: [60, 60]
    },
  },
  profileImgUrl: {
    type: DataTypes.TEXT,

  },
},
{
  defaultScope: {
    attributes: {
      exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
    },
  },
  scopes: {
    currentUser: {
      attributes: { exclude: ['hashedPassword'] },
    },
    loginUser: {
      attributes: {},
    },
  },
});

User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
  const { id, username, email } = this; // context will be the User instance
  return { id, username, email };
};
User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
 };

User.getCurrentUserById = async function (id) {
  return await User.scope('currentUser').findByPk(id);
 };
User.login = async function ({ credential, password }) {
  const { Op } = require('sequelize');
  const user = await User.scope('loginUser').findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });
  if (user && user.validatePassword(password)) {
    return await User.scope('currentUser').findByPk(user.id);
  }
};
User.signup = async function ({ email, username, password , profileImgUrl,firstName}) {
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email, username, hashedPassword , profileImgUrl,firstName
  });
  return await User.scope('currentUser').findByPk(user.id);
};

User.associate = function(models) {
   User.belongsToMany(models.User,{as: 'buddies', through:'BublcatBuddies',foreignKey:'userId', otherKey:'buddyId'})
   User.hasMany(models.Event,{foreignKey:'hostId'})
   User.belongsToMany(models.Event,{ through:'Rsvps',foreignKey:'userId', otherKey:'eventId'})
   User.hasMany(models.Comment,{foreignKey:'userId'})
  };
  return User;
};
