require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_NAME
});

// Export sequelize so models can use it
module.exports = sequelize;

// Async function to create database tables
async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    require('../models/track'); // Load Track model
    await sequelize.sync({ force: true });
    console.log('Database synced.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
}

// Run setup if executed directly
if (require.main === module) {
  setupDatabase();
}