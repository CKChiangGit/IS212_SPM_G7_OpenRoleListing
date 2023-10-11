const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model



const StaffSkills = sequelize.define('StaffSkills', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ss_status: {
    type: DataTypes.ENUM('active', 'unverified', 'in-progress'),
    allowNull: false,
  },
}, {
  tableName: 'STAFF_SKILLS',
  timestamps: false,
});

StaffSkills.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'staff' });
StaffSkills.belongsTo(SkillDetails, { foreignKey: 'skill_id', as: 'skill' });

module.exports = StaffSkills;