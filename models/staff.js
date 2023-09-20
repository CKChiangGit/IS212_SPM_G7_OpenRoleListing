const { DataTypes } = require('sequelize');

const sequelize = require('./ConnectionManager');

// Defining a model to fit the schema
const Staff = sequelize.define('Staff', {
  Access_Rights: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Dept: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Staff_FName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Staff_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  Staff_LName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'staff', // Specify the table name if different from the model name
  timestamps: false,   // Set this to false to disable timestamps (e.g., createdAt, updatedAt)
});

// Sync the model with the database
async function synchronisationlog() {
  try {
    await Staff.sync();
    console.log('Staff table accessed!');
  } catch (error) {
    console.error('Error accessing Staff table:', error);
  }
}
synchronisationlog();

module.exports = Staff;