const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model
const RoleDetails = require('./role_details'); // Import the RoleDetails model

const StaffRoles = sequelize.define('StaffRoles', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  staff_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  role_type: {
    type: DataTypes.ENUM('primary', 'secondary'),
    allowNull: false,
  },
  sr_status: {
    type: DataTypes.ENUM('inactive', 'active'),
    allowNull: false,
  },
}, {
  tableName: 'STAFF_ROLES',
  timestamps: false,
});

StaffRoles.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'staff' });
StaffRoles.belongsTo(RoleDetails, { foreignKey: 'staff_role', as: 'role' });

module.exports = StaffRoles;
