const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const axios = require('axios');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('../../models/ConnectionManager'); 

// Import the Sequelize model for RoleApplications
const RoleApplications = require('../../models/role_applications'); 

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors())
app.use(bodyParser.json());

// const skills_results = require('../../models/staff_skills.js');
// const role_skills=require('../../models/role_skills.js'); 
const role_details=require('../../models/role_details.js');
const staff_details=require('../../models/staff_details.js');
const role_application_ids=require('../../models/role_applications.js'); 

async function getStaffSkills(staffId) {
  console.log(staffId);
  try {
    const response = await axios.get(`http://localhost:5009/staff_skills/${staffId}`);
    const staffSkillsData = response.data.data;
    console.log(staffSkillsData);
    // This is to filter out the unverified skills.
    const staffSkillIds = staffSkillsData.filter(entry => entry.ss_status !== 'unverified').map(entry => entry.skill_id);
    console.log(staffSkillIds);
    return staffSkillIds;
  } catch (error) {
    console.error('Error retrieving staff skills:', error);
    return [];
  }
}

async function getRoleSkills(roleId) {
  try {
    const response = await axios.get(`http://localhost:5005/role_skills/${roleId}`);
    const roleSkillsData = response.data;
    console.log(roleSkillsData);
    const roleSkillIds = roleSkillsData.map(entry => entry.skill_id);
    console.log(roleSkillIds);
    return roleSkillIds;
  } catch (error) {
    console.error('Error retrieving role skills:', error);
    return [];
  }
}

function calculateMatchingPercentage(staffSkills, roleSkills) {
    const matchedSkills = staffSkills.filter(skill => roleSkills.includes(skill));
    const matchingPercentage = (matchedSkills.length / roleSkills.length) * 100;
    return matchingPercentage.toFixed(2); 
}

// async function getRoleIdFromRoleDetails(roleName) {
//   try {
//     const response = await axios.get(`http://localhost:5005/role_skills/${roleName});
//     return response.data.role_id;
//   } catch (error) {
//     console.error('Error retrieving role details:', error);
//     return null;
//   }
// }


//viewing role applications for HR
app.get('/role_applications', async (req, res) => {
    try {
      const role_applications = await RoleApplications.findAll();
      res.json(role_applications);
    } catch (error) {
      res.status(500).json({ error: `Internal server error in '/role_applications' endpoint` });
    }
  }); 


//var staff_skills=skills_results;
//var role_skills_needed=role_skills; 
var role_details1=role_details;
var staff_details1=staff_details;
var role_applications=[]
var role_app_ids=role_application_ids
var application_id=role_app_ids[-1]+1 
app.post('/role_applications', async (req, res) => {
    try {
      //const role_applications = await RoleApplications.create(req.body);
      //res.json(role_applications);
      role_applications.append(role_details1['role_listing_id'])
      role_applications.append(staff_details1['staff_id'])
      role_applications.append(application_id)

      res.json(JSON.stringify(role_applications)) //change this array to json
      

    } catch (error) {
      res.status(500).json({ error: `Internal server error in '/role_applications' endpoint` });
    }
  });  

  app.get('/skill_match', async (req, res) => {
    const staffId = 8857;
    const roleId = '27431';
    try{
        staffskillsArray = await getStaffSkills(staffId);
        roleskillsArray = await getRoleSkills(roleId);
        console.log(staffskillsArray)
        console.log(roleskillsArray)
        const matchingPercentage = calculateMatchingPercentage(staffskillsArray, roleskillsArray);
        console.log(`Matching Percentage: ${matchingPercentage}%`);

      } catch (error) {
        console.error('Error in /skill_match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }); 

  //     axios.get('http://localhost:5005/role-details', {
  //     params: { role_name: 'desired_role_name' }, // Replace with the role name you want to look up
  //   })
  //   .then((response) => {
  //     const roleId = response.data.role_id;
  //     // Use the retrieved role_id in the next step
  //     // Now, you can query the "Role Skill" microservice based on this roleId
  //     axios.get('http://localhost:5005/role-data', {
  //       params: { role_listing_id: roleId }, // Assuming role_listing_id is the parameter
  //     })
  //     .then((roleResponse) => {
  //       const roleSkills = roleResponse.data.role_skills;
  //       // Use the retrieved role skills in your "Apply Role" logic
  //     })
  //     .catch((roleError) => {
  //       console.error('Error retrieving role skills:', roleError);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error retrieving role details:', error);
  //   });
  //   try {


  //   } catch (error) {
  //     res.status(500).json({ error: `Internal server error in '/role_applications' endpoint` });
  //   }
  // });  


  // app.get('/session_data', async (req, res) => {

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






// Matching algo code test from chatgpt, havent tested with MS communication yet.
// function jaccardSimilarity(staff_skills, role_skills) {
//   const staffskills = staff_skills.filter(skill => role_skills.includes(skill));
//   const roleskills = role_skills.filter(skill => !staff_skills.includes(skill));
//   const union = [...new Set([...staff_skills, ...role_skills])];
//   const similarity = staffskills.length / roleskills.length;
//   return similarity;
// }