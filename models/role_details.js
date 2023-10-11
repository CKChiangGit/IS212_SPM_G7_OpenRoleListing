const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Replace with your database connection

const RoleDetails = sequelize.define('RoleDetails', {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role_description: {
    type: DataTypes.STRING(50000),
  },
  role_status: {
    type: DataTypes.ENUM('inactive', 'active'),
    allowNull: false,
  },
}, {
  tableName: 'role_details',
  timestamps: false, // If you don't want Sequelize to add createdAt and updatedAt columns
});

// Sync the model with the database
sequelize.sync({ force: false }) // Set force to true to drop existing tables and re-create them
  .then(() => {
    console.log('Model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error syncing model with the database:', error);
  });

module.exports = RoleDetails;