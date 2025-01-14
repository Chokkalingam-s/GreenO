const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UploadSnap = sequelize.define('UploadSnap', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, 
    },
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastUpload: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null, 
  },
  latitude: {
    type: DataTypes.STRING, // Encrypted string
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING, // Encrypted string
    allowNull: false,
  },
}, {
  timestamps: true, 
});

module.exports = UploadSnap;
