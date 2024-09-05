const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  collegeName: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  collegeRegisterNumber: {
    type: DataTypes.STRING,
  },
  yearOfGraduation: {
    type: DataTypes.INTEGER,
  },
  aadharNumber: {
    type: DataTypes.STRING,
  },
  principalName: {
    type: DataTypes.STRING,
  },
  pocNumber: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    allowNull: false,
  },
});

module.exports = User;
