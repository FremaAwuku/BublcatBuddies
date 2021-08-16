'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
      type:DataTypes.STRING(255),
      allowNull: false,
      validate:{
        len: [4,30],}
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false,
      },
    eventImageUrl: {
      type:DataTypes.TEXT,
      allowNull: false,
      },
    hostId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    private: DataTypes.BOOLEAN,
    address: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    eventDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.User,{foreignKey:'hostId'})
    Event.belongsToMany(models.User,{ through:'Rsvps',foreignKey:'eventId', otherKey:'userId'})
  };
  return Event;
};
