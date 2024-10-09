// src/models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
});

// Define associations
User.hasMany(Image, { foreignKey: 'userId', onDelete: 'CASCADE' });
Image.belongsTo(User, { foreignKey: 'userId' });

module.exports = Image;
