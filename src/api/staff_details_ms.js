// --Microservice Portion--
const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('../../models/staff_details'); // Import the StaffRoles model
const express = require('express');
const mysql2 = require('mysql2');

const app = express();
const port = 5004;

// Add the following middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/staff_details', async (req, res) => {
  try {
    const staff_details = await StaffDetails.findAll();

    if (staff_details.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_details': staff_details.map(staff_details => staff_details.toJSON()),
        },
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'There are no Staff details.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

app.get('/staff_details/:staff_id', async (req, res) => {
  const staff_id = req.params.staff_id;
  // Trying to figure out how to use query parameters. - Mervin
  // const { fname, lname, dept, email } = req.query;
  // const whereClause = {};

  // Build the WHERE clause based on provided parameters
  // if (staff_id) {
  //   whereClause.staff_id = staff_id;
  // }
  // if (fname) {
  //   whereClause.fname = fname;
  // }
  // if (lname) {
  //   whereClause.lname = { [Op.like]: `%${lname}%` };
  // }
  // if (dept) {
  //   whereClause.dept = dept;
  // }
  // if (email) {
  //   whereClause.email = email;
  // }

  try {
    const staff_details = await StaffDetails.findAll({ where: {staff_id} });

    if (staff_details && staff_details.length > 0) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_details': staff_details.map(staff => staff.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'No matching staff details found.',
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