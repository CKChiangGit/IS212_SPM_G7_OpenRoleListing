const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../models/ConnectionManager');
const StaffDetails = require('../../models/staff_details');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());


app.get('/staff_details', async (req, res) => {
  try {
    const staff_details = await StaffDetails.findAll();

    if (staff_details.length) {
      res.status(200).json(staff_details);
    }
    res.status(404).json({
      message: 'There are no Staff details.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

app.get('/staff_details/:staff_id', async (req, res) => {
  try {
    const staffDetails = await StaffDetails.findOne({
      where: {
        staff_id: req.params.staff_id
      }
    });

    if (staffDetails) {
      if (staffDetails.sys_role === 'hr') {
        res.status(200).json({
          staff_fname: staffDetails.fname,
          staff_lname: staffDetails.lname,
          staff_dept: staffDetails.dept,
          staff_email: staffDetails.email,
          staff_phone: staffDetails.phone,
          staff_biz_address: staffDetails.biz_address,
          staff_sys_role: staffDetails.sys_role,
          staff_pw: staffDetails.pw
        });
      } else {
        res.status(200).json({
          staff_fname: staffDetails.fname,
          staff_lname: staffDetails.lname,
          staff_email: staffDetails.email,
          staff_phone: staffDetails.phone,
          staff_biz_address: staffDetails.biz_address,
          staff_pw: staffDetails.pw
        });
      }
    } else {
      res.status(404).send('<p>There is no such staff.</p>');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});



app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Model synchronized with the database.');

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error syncing the model:', error);
  }
});