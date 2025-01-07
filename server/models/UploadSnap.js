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
    type: DataTypes.DECIMAL(9, 6), 
    allowNull: false,
    validate: {
      min: -90, 
      max: 90,
    },
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6), 
    allowNull: false,
    validate: {
      min: -180, 
      max: 180,
    },
  },
}, {
  timestamps: true, 
});

module.exports = UploadSnap;
