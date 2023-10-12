const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('../../models/ConnectionManager');

// Import the Sequelize model for RoleDetails
const RoleSkills = require('../../models/role_skills');

const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors())
app.use(bodyParser.json());   



app.get('/role_skills', async (req, res) => {
  try {
    const role_skills = await RoleSkills.findAll();
    res.json(role_skills);
  } catch (error) {
    res.status(500).json({ error: `Internal server error in '/role_skills' endpoint` });
  }
});

app.get('/role_skills/:role_id', async (req, res) => { 
    try {
      var skills_needed=[]
      const role_skills = await RoleSkills.findAll();
      var jsondata=JSON.stringify(role_skills);
      var jsondata1=JSON.parse(jsondata);
      for(var data1 in jsondata1){
        for(var key in jsondata1[data1]){
            if(key==='role_id'){
                if(jsondata1[data1][key]===Number(req.params.role_id)){
                    skills_needed.push(jsondata1[data1])
                }
            }
        }
    }
    res.json(skills_needed)
    module.exports=skills_needed

    } catch (error) {
      res.status(500).json({ error: `Internal server error in '/role_skills' endpoint` });
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
  
  