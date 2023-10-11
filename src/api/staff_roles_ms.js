const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('../../models/staff_details'); // Import the StaffDetails model
const RoleDetails = require('../../models/role_details'); // Import the RoleDetails model4
const StaffRoles = require('../../models/staff_roles'); // Import the StaffRoles model

// const StaffRoles = sequelize.define('StaffRoles', {
//   staff_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//   },
//   staff_role: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//   },
//   role_type: {
//     type: DataTypes.ENUM('primary', 'secondary'),
//     allowNull: false,
//   },
//   sr_status: {
//     type: DataTypes.ENUM('inactive', 'active'),
//     allowNull: false,
//   },
// }, {
//   tableName: 'STAFF_ROLES',
//   timestamps: false,
// });

// StaffRoles.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'staff' });
// StaffRoles.belongsTo(RoleDetails, { foreignKey: 'staff_role', as: 'role' });

// module.exports = StaffRoles;

// --Microservice Portion--
const express = require('express');
const mysql2 = require('mysql2');

const app = express();
const port = 5003;


app.get('/staff_roles', async (req, res) => {
  try {
    const staff_roles = await StaffRoles.findAll();

    if (staff_roles.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_roles': staff_roles.map(staff_roles => staff_roles.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'There are no available staff roles.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

app.get('/staff_roles/:staff_id', async (req, res) => {
  const staff_id = req.params.staff_id;
  try {
    const staff_roles = await StaffRoles.findAll({where: {staff_id}});
    if (staff_roles) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_roles': staff_roles.map(staff_roles => staff_roles.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'There are no available staff roles / Staff does not exist.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});