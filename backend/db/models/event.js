'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    description: DataTypes.TEXT,
    eventImageUrl: DataTypes.TEXT,
    hostId: DataTypes.INTEGER,
    private: DataTypes.BOOLEAN,
    address: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};