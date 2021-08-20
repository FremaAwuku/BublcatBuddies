'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rsvps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Events'
        },
        unique: 'actions'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Users'
        },
        unique: 'actions'
      },

      confirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },

    {
      uniqueKeys:{
      actions_unique:{
        fields:['userId','eventId']
      }

    }
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rsvps');
  }
};
