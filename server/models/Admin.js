const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Admin extends Model {}

Admin.init({
  collegeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  uploadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
  },
}, {
  sequelize,
  modelName: 'Admin',
});

module.exports = Admin;