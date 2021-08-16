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
  }, {});
  Rsvp.associate = function(models) {

  };
  return Rsvp;
};
