const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  collegeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  collegeRegisterNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  yearOfGraduation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  principalName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pocNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uploadCount: { 
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = User;
