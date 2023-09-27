const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection


const StaffDetails = sequelize.define('StaffDetails', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  dept: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  biz_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sys_role: {
    type: DataTypes.ENUM('staff', 'hr', 'manager', 'inactive'),
    allowNull: false,
  },
}, {
  tableName: 'staff_details',
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

module.exports = StaffDetails;