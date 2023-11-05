const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model
const RoleListings = require('./role_listings'); // Import the RoleListings model

const RoleApplications = sequelize.define('RoleApplications', {
  role_app_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role_listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_app_status: {
    type: DataTypes.ENUM('applied', 'accepted', 'rejected'),
    allowNull: false,
  },
  role_app_ts_create: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'ROLE_APPLICATIONS',
  timestamps: false,
});

RoleApplications.belongsTo(RoleListings, { foreignKey: 'role_listing_id', as: 'roleListing' });
RoleApplications.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'applicant' });

module.exports = RoleApplications;
