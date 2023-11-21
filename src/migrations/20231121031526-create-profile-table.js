'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create the uuid-ossp extension if it doesn't exist
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM('CLIENT', 'CONTRACTOR'),
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
};
