'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      terms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('NEW', 'IN_PROGRESS', 'TERMINATED'),
        allowNull: false,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id',
        },
      },
      contractorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contracts');
  },
};
