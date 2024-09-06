const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UploadSnap = sequelize.define('UploadSnap', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = UploadSnap;
