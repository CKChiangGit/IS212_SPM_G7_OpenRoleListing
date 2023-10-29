const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../../models/ConnectionManager');
const StaffDetails = require('../../models/staff_skills');
const SkillNames = require('../models/skill_details');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(bodyParser.json());
app.use(cors());

app.get('/staff_skills', async (req, res) => {
  try {
    const skill_list = await StaffDetails.findAll();
    const staffSkills = {};
    skill_list.forEach(skill => {
      if (!staffSkills[skill.staff_id]) {
        staffSkills[skill.staff_id] = {
          staff_id: skill.staff_id,
          skill_ids: [skill.skill_id],
          ss_status: [skill.ss_status]
        };
      } else {
        staffSkills[skill.staff_id].skill_ids.push(skill.skill_id);
        staffSkills[skill.staff_id].ss_status.push(skill.ss_status);
      }
    });

    const result = Object.values(staffSkills);

    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).send('<p>There are no skills available for any staff.</p>');
    }

  } catch (error) {
    res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});

app.get('/staff_skills/:staff_id', async (req, res) => {
  
  // This is a placeholder staff to get request from frontend to input staff that logged in to have their id attached to staff_id
  const staff_id = req.params.staff_id;

  try {
    const staffSkills = await StaffDetails.findAll({ where: { staff_id} });
    const skillIds = staffSkills.filter(skill => skill.ss_status === "active").map(skill => skill.skill_id);


    const skillNames = await Promise.all(skillIds.map(async skill_id => {
      const skillName = await SkillNames.findOne({ where: { skill_id } });
      return skillName.skill_name;
    }
    ));

    if (skillIds.length) {    
      res.status(200).json({
        staff_id: staff_id,
        skill_names: skillNames
      });
    } else {
      res.status(404).send('<p>There are no active skills available for this staff.</p>');
    }
    
  } catch (error) {
    res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
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