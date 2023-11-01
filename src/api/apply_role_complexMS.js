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
    // console.log(roleSkillsData);
    const roleSkillIds = roleSkillsData.map(entry => entry.skill_id);
    // console.log(roleSkillIds);
    return roleSkillIds;
  } catch (error) {
    console.error('Error retrieving role skills:', error);
    return [];
  }
}

// // sends request to view open role details
// async function getRoleListings(staffId) {
//     console.log(staffId);
//     try {
//         const response = await fetch(`http://localhost:3003/openroles`, {
//             method: 'GET',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//         });
//         const roleListing = response.data;
//         console.log(roleListing);
//         return roleListing;
//     } catch (error) {
//         console.error('Error retrieving role listings:', error);
//         return [];
//     }
// }
async function getRoleListing() {
  try {
    // const response = await axios.get(`http://localhost:3004/roledetails`);
    const response = await axios.get(`http://localhost:3003/openroles`);
    const RoleDetailsData = response.data;
    console.log(RoleDetailsData);
    return (RoleDetailsData)
    // const RoleIds = RoleDetailsData.map(entry => entry.role_id);
    // console.log(RoleIds);
    // return RoleIds;
  } catch (error) {
    console.error('Error retrieving role Ids from roledetails:', error);
    return [];
  }
}

async function getSkillDetails(skillId) {
  try {
    const response = await axios.get(`http://localhost:5006/skill_details/${skillId}`);
    const skillDetailsData = response.data;

    if (skillDetailsData && skillDetailsData.skill_name && skillDetailsData.skill_status === 'active') {
      // Assuming skillDetailsData is an object
      const skillName = skillDetailsData.skill_name;
      console.log(skillName);
      return skillName;
    } else {
      console.error('Skill details not found or skill is not active');
      return null; // You can choose to return a default value or handle the error differently
    }
  } catch (error) {
    console.error('Error retrieving skill details:', error);
    return null; // Handle the error accordingly
  }
}
// async function getSkillDetails(skillId) {
//   try {
//     const response = await axios.get(`http://localhost:5006/skill_details/${skillId}`);
//     const skillDetailsData = response.data;
//     console.log(skillDetailsData);
//     const SkillNames = skillDetailsData.map(entry => entry.skill_name);
//     console.log(SkillNames);
//     return SkillNames;
//   } catch (error) {
//     console.error('Error retrieving skill names from skill details:', error);
//     return [];
//   }
// }
async function getSkillNames(roleId) {
  try {
    const skillNamelist = [];
    const skillIdsArray = await getRoleSkills(roleId);
    
    for (y in skillIdsArray) {
      const skillName = await getSkillDetails(skillIdsArray[y]);
      skillNamelist.push(skillName);
    }
    
    return skillNamelist;
  } catch (error) {
    console.error('Error in getSkillNames:', error);
    throw error; // Re-throw the error to handle it at the caller level.
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

// main function that will be called by the front end
app.get('/apply_role/:staffId', async (req, res) => {
    try {
        // // const staffId = 8857;
        // const staffId = req.params.staffId;
        // const result = [];
        // let roleSkillsBigArray = [];
        // let roleIdsArray = await getRoleListing();
        
        // // console.log("roleIdsArray ", roleIdsArray)
        // for (let roleId in roleIdsArray)
        // {
        //     console.log("roleIds is ", roleIdsArray[roleId])
        //     let roleSkillsArray = await getRoleSkills(roleIdsArray[roleId]);
        //     console.log(roleSkillsArray)  
        //     // if (roleSkillsArray == null)
        //     // {
        //     //   roleSkillsArray = ['Null'];
        //     //   console.log(roleSkillsArray)
        //     // }
        //     roleSkillsBigArray.push(roleSkillsArray);
        // }
        // console.log("roleSkillsBigArray ", roleSkillsBigArray)
        // let staffskillsArray = await getStaffSkills(staffId)
        // console.log(`Staff Skills for staff id ${staffId} are: ` + staffskillsArray)
        // if (staffskillsArray) {
        //     for (let x in roleSkillsBigArray) {
        //         console.log(roleSkillsBigArray[x])
                
        //         // console.log(`test`)
        //         // console.log(roleSkillsBigArray[x])
        //         // console.log(roleSkillsBigArray[x].length)
                
        //         // const skillNamelist = await getSkillNames(roleIdsArray[x]);
        //         if (roleSkillsBigArray[x].length === 0)
        //         {
        //             let skillMatchPercent = 0.00;
        //             console.log(`Matching Percentage is invalid for this role id.`);
        //             result.push({
        //                 skill_id: roleIdsArray[x],
        //                 // skill_names: skillNamelist,
        //                 skill_match: skillMatchPercent,
        //             });  
                    
        //         } else {
        //             console.log("staffskillsArray ", staffskillsArray)
        //             let skillMatchPercent = calculateMatchingPercentage(staffskillsArray, roleSkillsBigArray[x]);
        //             console.log(`Matching Percentage for role id {roleIdsArray[${x}]} is: ${skillMatchPercent}%`);
        //             result.push({
        //                 skill_id: roleIdsArray[x],
        //                 // skill_names: skillNamelist,
        //                 skill_match: skillMatchPercent,
        //             });  
        //         }
                
            
        //     }
        // }
    
        // // Kheng's version
        const staffId = req.params.staffId;

        let roleListingArray = await getRoleListing();
        // console.log("roleIdsArray ", roleIdsArray)
        let staffskillsArray = await getStaffSkills(staffId)
        console.log(`Staff Skills for staff id ${staffId} are: ` + staffskillsArray)
        
        if (staffskillsArray && roleListingArray) {
            for (let y in roleListingArray) {
                console.log("roleList is ", roleListingArray[y]);

                let roleSkillsArray = await getRoleSkills(roleListingArray[y].role_id);
                console.log(roleSkillsArray);

                console.log("staffskillsArray ", staffskillsArray);
                let skillMatchPercent = calculateMatchingPercentage(staffskillsArray, roleSkillsArray);
                console.log(`Matching Percentage for role id is: ${skillMatchPercent}%`);

                if (isNaN(skillMatchPercent)) {
                    roleListingArray[y].skill_match = 0.00;
                } else {
                    roleListingArray[y].skill_match = skillMatchPercent;
                }
                
            }
            // console.log("roleSkillsBigArray ", roleSkillsBigArray)
        }
        console.log("result ", roleListingArray)
        res.status(200).json(roleListingArray);
        
    } catch (error) {
    console.error('Error in /skill_match:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
    // return json({
    //   skill_name: skillName
    //   skill_match : skillMatchPercent
    // });
}); 

  // app.get('/getSkillNames', async (req, res) => {
  //   try
  //   {
  //     skillNamelist = [];
  //     skillIdsArray = await getRoleSkills('27431');
  //     console.log(skillIdsArray)
  //     for (y in skillIdsArray)
  //     {
  //       console.log(skillIdsArray[y])
  //       skillName = await getSkillDetails(skillIdsArray[y]);
  //       console.log(skillName);
  //       skillNamelist.push(skillName);
  //     }
  //     console.log(skillNamelist);
  //   }
  //   catch (error) {
  //     console.error('Error in /getSkillNames:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
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