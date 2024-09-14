'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('UploadSnaps');

    if (!tableDescription.filename) {
      await queryInterface.addColumn('UploadSnaps', 'filename', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    if (!tableDescription.filePath) {
      await queryInterface.addColumn('UploadSnaps', 'filePath', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('UploadSnaps', 'filename');
    await queryInterface.removeColumn('UploadSnaps', 'filePath');
  }
};
