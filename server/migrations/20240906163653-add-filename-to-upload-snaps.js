'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UploadSnaps', 'filename', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('UploadSnaps', 'filepath', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('UploadSnaps', 'filename');
    await queryInterface.removeColumn('UploadSnaps', 'filepath');
  }
};
