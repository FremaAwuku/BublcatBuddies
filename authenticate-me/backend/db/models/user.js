'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        len: [4,30],
        isNotEmail(value){
          if(Validator.isNotEmail(value)) {
            throw new Error('Cannot be an email')
        }
      }
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
 
User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
