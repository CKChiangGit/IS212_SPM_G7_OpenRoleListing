// --Microservice Portion--
const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffSkills = require('../../models/staff_skills'); // Import the StaffSkills model
const express = require('express');
const mysql2 = require('mysql2');

const app = express();
const port = 5002;
app.get('/staff_skills', async (req, res) => {
  try {
    const skill_list = await StaffSkills.findAll();

    if (skill_list.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'skill_list': skill_list.map(staff_skills => staff_skills.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'There are no available skills.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

app.get('/staff_skills/:staff_id', async (req, res) => {
  const staff_id = req.params.staff_id;

  try {
    const staff_skills = await StaffSkills.findOne({ where: { staff_id } });

    if (staff_skills) {
      return res.status(200).json({
        code: 200,
        data: staff_skills.toJSON(),
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'Staff skills / Staff details not found.',
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