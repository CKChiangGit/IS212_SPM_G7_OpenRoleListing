const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection


const StaffDetails = sequelize.define('StaffDetails', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  dept: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  biz_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sys_role: {
    type: DataTypes.ENUM('staff', 'hr', 'manager', 'inactive'),
    allowNull: false,
  },
  pw: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'staff_details',
  timestamps: false, // If you don't want Sequelize to add createdAt and updatedAt columns
});

// Sync the model with the database
sequelize.sync({ force: false }) // Set force to true to drop existing tables and re-create them
  .then(() => {
    console.log('Model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error syncing model with the database:', error);
  });

module.exports = StaffDetails;

// // --Microservice Portion--
// const express = require('express');
// const mysql2 = require('mysql2');

// const app = express();
// const port = 5004;


// app.get('/staff_details', async (req, res) => {
//   try {
//     const staff_details = await StaffDetails.findAll();

//     if (staff_details.length) {
//       return res.status(200).json({
//         code: 200,
//         data: {
//           'staff_details': staff_details.map(staff_details => staff_details.toJSON()),
//         },
//       });
//     }
//     return res.status(404).json({
//       code: 404,
//       message: 'There are no Staff details.',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: 'Internal Server Error',
//     });
//   }
// });

// app.get('/staff_details/:staff_id', async (req, res) => {
//   const staff_id = req.params.staff_id;
//   // Trying to figure out how to use query parameters. - Mervin
//   // const { fname, lname, dept, email } = req.query;
//   // const whereClause = {};

//   // Build the WHERE clause based on provided parameters
//   // if (staff_id) {
//   //   whereClause.staff_id = staff_id;
//   // }
//   // if (fname) {
//   //   whereClause.fname = fname;
//   // }
//   // if (lname) {
//   //   whereClause.lname = { [Op.like]: `%${lname}%` };
//   // }
//   // if (dept) {
//   //   whereClause.dept = dept;
//   // }
//   // if (email) {
//   //   whereClause.email = email;
//   // }

//   try {
//     const staff_details = await StaffDetails.findAll({ where: {staff_id} });

//     if (staff_details && staff_details.length > 0) {
//       return res.status(200).json({
//         code: 200,
//         data: {
//           'staff_details': staff_details.map(staff => staff.toJSON()),
//         },
//       });
//     }

//     return res.status(404).json({
//       code: 404,
//       message: 'No matching staff details found.',
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