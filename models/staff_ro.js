const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model

const StaffRO = sequelize.define('StaffRO', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  RO_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'STAFF_RO',
  timestamps: false,
});

StaffRO.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'staff' });
StaffRO.belongsTo(StaffDetails, { foreignKey: 'RO_id', as: 'RO' });

module.exports = StaffRO;
