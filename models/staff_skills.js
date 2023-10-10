const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model



const StaffSkills = sequelize.define('StaffSkills', {
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ss_status: {
    type: DataTypes.ENUM('active', 'unverified', 'in-progress'),
    allowNull: false,
  },
}, {
  tableName: 'STAFF_SKILLS',
  timestamps: false,
});

StaffSkills.belongsTo(StaffDetails, { foreignKey: 'staff_id', as: 'staff' });
StaffSkills.belongsTo(SkillDetails, { foreignKey: 'skill_id', as: 'skill' });

module.exports = StaffSkills;



// --Microservice Portion--
const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
const port = 5002;

app.use(cors());

const sequelize = new Sequelize(process.env.dbURL || 'mysql://root@localhost:3306/spm', {
  logging: false,
});

app.get('/staff_skills', async (req, res) => {
  try {
    const skill_list = await staff_skills.findAll();

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
      message: 'There are no available houses.',
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
  const staff_skills = req.params.staff_id;

  try {
    const staff_skills = await spm.findOne({ where: { staff_id } });

    if (staff_skills) {
      return res.status(200).json({
        code: 200,
        data: staff_skills.toJSON(),
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'Staff skills not found.',
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