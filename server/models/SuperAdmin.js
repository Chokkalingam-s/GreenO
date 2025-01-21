const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class SuperAdmin extends Model {}

SuperAdmin.init({
  collegeName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentsOnboard: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  saplingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
}, {
  sequelize,
  modelName: 'SuperAdmin',
});

module.exports = SuperAdmin;