'use strict';
module.exports = (sequelize, DataTypes) => {
  const BublcatBuddy = sequelize.define('BublcatBuddy', {
    userId: DataTypes.INTEGER,
    buddyId: DataTypes.INTEGER
  }, {});
  BublcatBuddy.associate = function(models) {
    // associations can be defined here
  };
  return BublcatBuddy;
};