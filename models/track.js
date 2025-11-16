const { DataTypes } = require('sequelize');
const sequelize = require('../database/setup');

const Track = sequelize.define('Track', {
  trackId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  songTitle: { type: DataTypes.STRING, allowNull: false },
  artistName: { type: DataTypes.STRING, allowNull: false },
  albumName: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  releaseYear: { type: DataTypes.INTEGER }
}, {
  tableName: 'tracks'
});

module.exports = Track;