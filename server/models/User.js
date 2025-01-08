const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  role: {
    type: DataTypes.ENUM('student', 'admin','hod'),
    allowNull: false
  },
  adminType: {
    type: DataTypes.ENUM('principal', 'hod'), 
    allowNull: true 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true 
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
    allowNull: true 
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  collegeName: {
    type: DataTypes.STRING,
    allowNull: true 
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
  dob: { 
    type: DataTypes.DATEONLY,
    allowNull: true 
  },
  secEmail: { 
    type: DataTypes.STRING,
    allowNull: true
  },
  uploadCount: { 
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = User;
