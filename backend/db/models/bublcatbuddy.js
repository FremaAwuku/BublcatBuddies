'use strict';
module.exports = (sequelize, DataTypes) => {
  const BublcatBuddy = sequelize.define('BublcatBuddy', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buddyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  BublcatBuddy.associate = function(models) {
    BublcatBuddy.belongsToMany(models.User, {through:"BublcatBuddies", foreignKey:'userId', otherKey:'buddyId'})
  };
  return BublcatBuddy;


}
