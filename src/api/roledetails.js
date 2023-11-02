// This microservice is responsible for the retrieval and creation of role details.

// Import the necessary modules and database models to use
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../../models/ConnectionManager');
const RoleDetails = require('../../models/role_details');
const cors = require('cors');
const app = express();

// Define the port number
const PORT = process.env.PORT || 3004;

// Use the necessary modules
app.use(bodyParser.json());
app.use(cors());

// Get all role details
app.get('/roledetails', async (req, res) => {
  try {
    const roledetails = await RoleDetails.findAll();
    if (!roledetails.length) {
      res.status(404).send('<p>There are no roles available.</p>');
    } else {
      res.status(200).json(roledetails);
    }
  } catch (error) {
    console.error('Error getting all role details:', error);
    res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});

// Get a role detail by role_id
app.get('/roledetails/:role_id', async (req, res) => {
  try {
    const roledetails = await RoleDetails.findOne({
      where: {
        role_id: req.params.role_id
      }
    });
    if (!roledetails) {
      res.status(404).send('<p>There is no such role.</p>');
    }

    const roleSkills = await RoleSkills.findAll({
      where: {
        role_id: req.params.role_id
      },
      attributes: ['skill_id'] // Retrieve only the skill IDs associated with the role
    });

    const skillIds = roleSkills.map(roleSkill => roleSkill.skill_id);

    const skillDetails = await SkillDetails.findAll({
      where: {
        skill_id: skillIds
      },
      attributes: ['skill_name']
    });

    const skillNames = skillDetails.map(skill => skill.skill_name);

    res.status(200).json({
      role_name: roleDetails.role_name,
      role_description: roleDetails.role_description,
      role_status: roleDetails.role_status,
      role_skills: skillNames
    })

  } catch (error) {
    console.error('Error getting role details:', error);
    res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});


// Post a new role detail
app.post('/createrole', async (req, res) => {
  try {
    const { role_id, role_name, role_description, role_status } = req.body;

    // Create a new role detail entry in the RoleDetails table
    const newRole = await RoleDetails.create({
      role_id,
      role_name,
      role_description,
      role_status
    });

    res.status(201).json(newRole); // Respond with the created role details
  } catch (error) {
    console.error('Error creating a new role listing:', error);
    res.status(500).send('Internal Server Error');
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