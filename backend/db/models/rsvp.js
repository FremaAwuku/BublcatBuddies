'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,

    },
    confirmed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

  }, {});
  Rsvp.associate = function(models) {

  };
  return Rsvp;
};
