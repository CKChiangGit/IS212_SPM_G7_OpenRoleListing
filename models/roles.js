const { DataTypes } = require('sequelize');

const sequelize = require('./ConnectionManager');

// Defining a model to fit the schema
const Role = sequelize.define('Role', {
  Access_Rights: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  Create_Listing: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  View_Applicant: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  View_Listing: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'roles', // Specify the table name if different from the model name
  timestamps: false,   // Set this to false to disable timestamps (e.g., createdAt, updatedAt)
});

// Sync the model with the database
async function synchronisationlog() {
  try {
    await Role.sync();
    console.log('Role table accessed!');
  } catch (error) {
    console.error('Error accessing Role table:', error);
  }
}
synchronisationlog();

module.exports = Role;
