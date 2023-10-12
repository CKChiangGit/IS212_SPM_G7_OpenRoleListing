// -- Persis Code for complex MS Apply Role, still needs working on. --

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 

// Import the Sequelize instance from ConnectionManager
const sequelize = require('../../models/ConnectionManager'); 

// Import the Sequelize model for RoleApplications
const RoleApplications = require('../../models/role_applications'); 

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors())
app.use(bodyParser.json());

//const skills_results = require('./get_staff_skill.js');
//const role_skills=require('./role_skills.js'); 
const role_details=require('../../role_details.js');
const staff_details=require('../../staff_details.js');
const role_application_ids=require('../../role_applications.js'); 

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
//   const intersection = staff_skills.filter(skill => role_skills.includes(skill));
//   const union = [...new Set([...staff_skills, ...role_skills])];
//   const similarity = intersection.length / union.length;
//   return similarity;
// }