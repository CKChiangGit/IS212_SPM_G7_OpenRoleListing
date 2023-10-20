// --Microservice Portion--
const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffSkills = require('../../models/staff_skills'); // Import the StaffSkills model
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5009;
app.use(cors())
app.use(bodyParser.json());


app.get('/staff_skills', async (req, res) => {
  try {
    
    // const staff_skills = await StaffSkills.findAll(); 
    // res.json(staff_skills);

    const staff_skills = await StaffSkills.findAll();
    if (staff_skills.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_skills': staff_skills.map(staff_skills => staff_skills.toJSON()),
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
      message: 'Internal Server Error in "/staff_skills".',
    });
  }
});


// -- Mervin version of staff_id query --
app.get('/staff_skills/:staff_id', async (req, res) => {
  const staff_id = req.params.staff_id;
  try {
    const staff_skills = await StaffSkills.findAll({ where: { staff_id } });
    
    if (staff_skills) {
      return res.status(200).json({
        code: 200,
        data: staff_skills.map(skill => skill.toJSON())
        //data: staff_skills.toJSON(),
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

//  

// // -- Persis version of staff_id query --
// app.get('/staff_skills/:staff_id', async (req, res) =>{
//   try{
//       var skills_results=[];
//       const staff_skills = await StaffSkills.findAll();   
//       var jsondata=JSON.stringify(staff_skills);  
//       var jsondata1=JSON.parse(jsondata)
//       for(var data1 in jsondata1){
//           for(var key in jsondata1[data1]){
//               if(key==='staff_id'){
//                   if(jsondata1[data1][key]===Number(req.params.staff_id)){
//                       console.log("yes")
//                       skills_results.push(jsondata1[data1])


//                   }

//               }
//           }
//       }
//       res.json(skills_results)
//       module.exports=skills_results 
      


      
//   }catch(error) {
//     return res.status(500).json({
//       code: 500,
//       message: 'Internal Server Error in "/staff_skills/:staff_id".',
//     });
    
//     // res.status(500).json({ error: `Internal server error in '/staff_skills/:staff_id' endpoint` });
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



// Persis code to send info to another microservice:
//send data to another microservice
// const axios = require('axios')
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(cors()) 
// app.use(bodyParser.json()); 
// const PORT = process.env.PORT || 5003;
// app.post('/staff_skills/:staff_id', async (req, res) => {
//     try { 
//       const staff_skills = await axios.post('http://localhost:5003/staff_skills/:staff_id', req.body)
//       res.json(staff_skills.data);
//     } catch (error) {
//       res.status(500).json({ error: `Internal server error in '/staff_skills/:staff_id' endpoint` });
//     }
//   });
// app.listen(PORT, async () => {
//     try {
//       // Sync the model with the database
//       await sequelize.sync({ force: false });
//       console.log('Model synchronized with the database.');
//       console.log(`Server is running on port ${PORT}`);
//     } catch (error) {
//       console.error('Error syncing the model:', error);
//     }
//   });
//
// Path: api/src/get_staff_skill.js
// Compare this snippet from api/src/role_skills.js:
// const express = require('express');
// const cors = require('cors'); 
// const bodyParser = require('body-parser');  
//
// // Import the Sequelize instance from ConnectionManager
// const sequelize = require('./models/ConnectionManager');
//
// // Import the Sequelize model for RoleDetails