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
    const response = await axios.get(`http://localhost:3007/staff_skills/${staffId}`);
    // const staffSkillIds = response.data
    const staffSkillsData = response.data;
    console.log(staffSkillsData);
    // This is to filter out the unverified skills.
    console.log(staffSkillsData.skill_ids);
    return staffSkillsData.skill_ids;
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

async function getListofRoleIds() {
  try {
    const response = await axios.get(`http://localhost:3004/roledetails`);
    const RoleDetailsData = response.data;
    console.log(RoleDetailsData);
    const RoleIds = RoleDetailsData.map(entry => entry.role_id);
    console.log(RoleIds);
    return RoleIds;
  } catch (error) {
    console.error('Error retrieving role Ids from roledetails:', error);
    return [];
  }
}

async function getSkillDetails(skillId) {
  try {
    const response = await axios.get(`http://localhost:5006/skill_details/${skillId}`);
    const skillDetailsData= response.data;
    console.log(skillDetailsData);
    const SkillNames = skillDetailsData.map(entry => entry.skill_name);
    console.log(SkillNames);
    return SkillNames;
  } catch (error) {
    console.error('Error retrieving skill names from skill details:', error);
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

  // app.get('/skill_match', async (req, res) => {
  //   const staffId = 8857;
  //   const roleId = '27431';
  //   try{
  //       staffskillsArray = await getStaffSkills(staffId);
  //       roleskillsArray = await getRoleSkills(roleId);
  //       console.log(staffskillsArray)
  //       console.log(roleskillsArray)
  //       const matchingPercentage = calculateMatchingPercentage(staffskillsArray, roleskillsArray);
  //       console.log(`Matching Percentage: ${matchingPercentage}%`);

  //     } catch (error) {
  //       console.error('Error in /skill_match:', error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  // }); 

  app.get('/roleIds', async (req, res) => {
    try
      {
        const staffId = 8857;
        roleSkillsBigArray = [];
        roleIdsArray = await getListofRoleIds();
        console.log(roleIdsArray)
        for (roleId in roleIdsArray)
        {
          console.log(roleIdsArray[roleId])
          roleSkillsArray = await getRoleSkills(roleIdsArray[roleId]);
          console.log(roleSkillsArray)  
          // if (roleSkillsArray == null)
          // {
          //   roleSkillsArray = ['Null'];
          //   console.log(roleSkillsArray)
          // }
          roleSkillsBigArray.push(roleSkillsArray);
        }
        console.log(roleSkillsBigArray)
        staffskillsArray = await getStaffSkills(staffId)
        console.log(`Staff Skills for staff id ${staffId} are: ` + staffskillsArray)
        for (x in roleSkillsBigArray)
        {
          console.log(roleSkillsBigArray[x])
          try
          {
            console.log(`test`)
            console.log(roleSkillsBigArray[x])
            console.log(roleSkillsBigArray[x].length)
            if (roleSkillsBigArray[x].length == 0)
            {
              skillsMatchPercent = 0.00;
              console.log(`Matching Percentage is invalid for this role id.`);
            }
            else 
              {
                skillMatchPercent = calculateMatchingPercentage(staffskillsArray, roleSkillsBigArray[x]);
                console.log(`Matching Percentage for role id {roleIdsArray[${x}]} is: ${skillMatchPercent}%`);  
              }
            } 
          catch (error) {
            console.error('Error doing skill matching algorithm.', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }

      } catch (error) {
        console.error('Error in /skill_match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      // return json({
      //   skill_name: skillName
      //   skill_match : skillMatchPercent
      // });
  }); 

  app.get('/getSkillNames', async (req, res) => {
    try
    {
      skillNamelist = [];
      skillIdsArray = await getRoleSkills('27431');
      console.log(skillIdsArray)
      for (y in skillIdsArray)
      {
        console.log(skillIdsArray[y])
        skillName = await getSkillDetails(skillIdsArray[y]);
        console.log(skillName);
        skillNamelist.push(skillName);
      }
      console.log(skillNamelist);
    }
    catch (error) {
      console.error('Error in /getSkillNames:', error);
      res.status(500).json({ error: 'Internal Server Error' });
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