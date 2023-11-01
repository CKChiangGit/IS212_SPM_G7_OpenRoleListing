// --Microservice Portion--
const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('../../models/staff_details'); // Import the StaffRoles model
const StaffSkills = require('../../models/staff_skills');
const SkillDetails = require('../../models/skill_details');
const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5007;
app.use(cors()) 
app.use(bodyParser.json());  

// get all users + their skills
app.get('/staff_details', async (req, res) => {
  try {
    const staff_details = await StaffDetails.findAll();
    const skill_details = await StaffSkills.findAll();

    const skill_name_id = await Promise.all(
        // get the skill_name string + skill_id from SkillDetails
        skill_details.map(async (skill) => {
            const skill_name = await SkillDetails.findAll({
                where: {
                    skill_id: skill.skill_id
                }
            })
            // return skill_name[0].skill_name
            return skill_name[0]
        }
    ))
    console.log(skill_name_id)  

    // for each skill_detail's staff_id that matches with staff_details' staff_id, 
    if (staff_details.length) {
      return res.status(200).json({
        code: 200,
        data: {
            'staff_details': staff_details.map(staff_details => {
                // find corresponding skill_name, add the skill_name to the staff_details object
                const skill_arr = []
                skill_details.forEach(skill => {
                    if (skill.staff_id === staff_details.staff_id) {
                        skill_arr.push(skill_name_id[skill_details.indexOf(skill)])
                    }
                })
                staff_details.dataValues.staff_skill = skill_arr
                return staff_details.toJSON()
            }),
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

// return new role details that match email and password
app.post('/staff_details', async (req, res) => {
  try {
        const staff_details = await StaffDetails.findAll({
            where: {
                email: req.body.email,
                pw: req.body.password
            }
        });
    
    //   get all staff_skills to match with staff_details
    const skill_details = await StaffSkills.findAll();
    const skill_name_id = await Promise.all(
        // get the skill_name string + skill_id from SkillDetails
        skill_details.map(async (skill) => {
            const skill_name = await SkillDetails.findAll({
                where: {
                    skill_id: skill.skill_id
                }
            })
            // return skill_name[0].skill_name
            return skill_name[0]
        }
    ))
    console.log(skill_name_id)  
      if (staff_details && staff_details.length > 0) {
        return res.status(200).json({
          code: 200,
          data: {
            'staff_details': staff_details.map(staff_details => {
                // find corresponding skill_name, add the skill_name to the staff_details object
                const skill_arr = []
                skill_details.forEach(skill => {
                    if (skill.staff_id === staff_details.staff_id) {
                        skill_arr.push(skill_name_id[skill_details.indexOf(skill)])
                    }
                })
                staff_details.dataValues.staff_skill = skill_arr
                return staff_details.toJSON()
            }),
          },
        });
      }
  
      return res.status(404).json({
        code: 404,
        message: 'No matching staff details found.',
      });
  } catch (error) {
      res.status(500).json({ error: `Internal server error in '/staff_details' endpoint` });
  }
});

// create new staff details
app.post('/staff_creation', async (req, res) => {
  try {
    const { staff_id, skill_id, ...staffDetails } = req.body;
    const test = {
        staff_id: staff_id, 
        ...staffDetails
    }
    // console.log(test)
    const staff_creation = await StaffDetails.create(test);

    // console.log(staff_id, skill_id)
    // // for each element in staff_skill array, create a new skill_name
    const assign_staff_skill = await Promise.all(
        skill_id.map(async (id) => {
            return await StaffSkills.create({
                staff_id: staff_id, 
                skill_id: parseInt(id), 
                ss_status: 'active'
            })
        })
    )
    res.json(assign_staff_skill);
  } catch (error) {
      res.status(500).json({ error: `Internal server error in '/staff_creation' endpoint `});
  }
});

// update staff details
app.put('/staff_details', async (req, res) => {
    try {
        const { staff_id, skill_id, old_staff_id, ...staffDetails } = req.body;
        const test = {
            staff_id: staff_id, 
            ...staffDetails
        }
        console.log(staff_id)
        
        // delete all staff_skills that match staff_id
        const delete_staff_skill = await StaffSkills.destroy({
            where: {
                staff_id: staff_id
            }
        })
        console.log("deleted " + delete_staff_skill)
        
        const staff_details = await StaffDetails.update(test, {
            where: {
                staff_id: req.body.staff_id
            }
            });
        
        // res.json(staff_details);
        // // for each element in staff_skill array, create a new skill_name
        const assign_staff_skill = await Promise.all(
            skill_id.map(async (skill_id_id) => {
                console.log(staff_id, parseInt(skill_id_id.skill_id))
                return await StaffSkills.create({
                    staff_id: staff_id, 
                    skill_id: parseInt(skill_id_id.skill_id), 
                    ss_status: 'active'
                })
            })
        )
        res.json(assign_staff_skill);
    } catch (error) {
        res.status(500).json({ error: `Internal server error in '/staff_details' endpoint` });
    }
});

app.listen(PORT, async () => {
  try {
    // Sync the model with the database
    await sequelize.sync({ force: false });
    console.log('Model synchronized with the database.');

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error syncing the model:', error);
  }
}); 