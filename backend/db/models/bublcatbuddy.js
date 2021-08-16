'use strict';
module.exports = (sequelize, DataTypes) => {
  const BublcatBuddy = sequelize.define('BublcatBuddy', {
    userId: DataTypes.INTEGER,
    buddyId: DataTypes.INTEGER
  }, {});
  BublcatBuddy.associate = function(models) {
    BublcatBuddy.belongsToMany(models.User, {through:"BublcatBuddies", foreignKey:'userId', otherKey:'buddyId'})
  };
  return BublcatBuddy;
};
