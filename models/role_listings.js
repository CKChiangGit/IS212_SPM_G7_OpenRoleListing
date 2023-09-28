const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Replace with your database connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model

const RoleListings = sequelize.define('RoleListings', {
  role_listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_listing_desc: {
    type: DataTypes.STRING(50000),
  },
  role_listing_source: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_listing_open: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  role_listing_close: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  role_listing_creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_listing_updater: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_listing_ts_create: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  role_listing_ts_update: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'ROLE_LISTINGS',
  timestamps: false,
});

RoleListings.belongsTo(StaffDetails, { foreignKey: 'role_listing_source', as: 'sourceStaff' });
RoleListings.belongsTo(StaffDetails, { foreignKey: 'role_listing_creator', as: 'creatorStaff' });
RoleListings.belongsTo(StaffDetails, { foreignKey: 'role_listing_updater', as: 'updaterStaff' });

// Sync the model with the database
sequelize.sync({ force: false }) // Set force to true to drop existing tables and re-create them
  .then(() => {
    console.log('Model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error syncing model with the database:', error);
  });

module.exports = RoleListings;