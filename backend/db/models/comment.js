'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,

    },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Event,{foreignKey:'eventId'})
    Comment.belongsTo(models.User,{foreignKey:'userId'})
  };
  return Comment;
};
