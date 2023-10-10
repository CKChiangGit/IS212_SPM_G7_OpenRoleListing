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

// // --Microservice Portion--
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 5003;

// app.use(cors());

// app.get('/staff_roles/:staff_id', async (req, res) => {
//   try {
//     const staff_role = await staff_roles.findOne({where: {staff_id}});
//     if (staff_role) {
//       return res.status(200).json({
//         code: 200,
//         data: {
//           'staff_role': staff_role.map(staff_role => staff_role.toJSON()),
//         },
//       });
//     }

//     return res.status(404).json({
//       code: 404,
//       message: 'There are no staff roles.',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: 'Internal Server Error',
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });