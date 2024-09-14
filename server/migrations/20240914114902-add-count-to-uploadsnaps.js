'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('UploadSnaps');

    if (!tableDescription.count) {
      await queryInterface.addColumn('UploadSnaps', 'count', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      });
    }

    if (!tableDescription.lastUpload) {
      await queryInterface.addColumn('UploadSnaps', 'lastUpload', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('UploadSnaps', 'count');
    await queryInterface.removeColumn('UploadSnaps', 'lastUpload');
  }
};
