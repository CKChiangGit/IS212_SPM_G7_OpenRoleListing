const { DataTypes } = require('sequelize');

const sequelize = require('./ConnectionManager');

// Defining a model to fit the schema
const Role_Skill = sequelize.define('Role_Skill', {
  Role_Name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Skill_Name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Staff_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'role_skill', // Specify the table name if different from the model name
  timestamps: false,   // Set this to false to disable timestamps (e.g., createdAt, updatedAt)
});

// Sync the model with the database
async function synchronisationlog() {
  try {
    await Role_Skill.sync();
    console.log('Role_Skill table accessed!');
  } catch (error) {
    console.error('Error accessing Role_Skill table:', error);
  }
}
synchronisationlog();

module.exports = Role_Skill;