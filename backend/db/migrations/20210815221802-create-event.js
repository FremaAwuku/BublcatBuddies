'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      eventImageUrl: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Users'
        }
      },
      private: {
        type: Sequelize.BOOLEAN
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      eventDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
