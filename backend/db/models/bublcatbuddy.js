'use strict';
module.exports = (sequelize, DataTypes) => {
  const BublcatBuddy = sequelize.define('BublcatBuddy', {
    userId: DataTypes.INTEGER,
    buddyId: DataTypes.INTEGER
  }, {});
  BublcatBuddy.associate = function(models) {
    BublcatBuddy.belongsToMany(models.userId, {through:"BublcatBuddies", foreignKey:'userId', otherKey:'buddyId'})
  };
  return BublcatBuddy;
};
