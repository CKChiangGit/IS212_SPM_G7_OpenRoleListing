const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const RoleDetails = require('./role_details'); // Import the RoleDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model

const RoleSkills = sequelize.define('RoleSkills', {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'ROLE_SKILLS',
  timestamps: false,
});

RoleSkills.belongsTo(RoleDetails, { foreignKey: 'role_id', as: 'role' });
RoleSkills.belongsTo(SkillDetails, { foreignKey: 'skill_id', as: 'skill' });

module.exports = RoleSkills;