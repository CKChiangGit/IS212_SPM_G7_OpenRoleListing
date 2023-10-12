// -- Code from Persis -- 
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('../../models/ConnectionManager');

// Import the Sequelize model for RoleDetails
const RoleApplications = require('../../models/role_applications');

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors())
app.use(bodyParser.json()); 

app.get('/role_applications_ids', async (req, res) => {
    var role_app_ids=[]
    try {
      const role_applications = await RoleApplications.findAll();
      var jsondata=JSON.stringify(role_applications);  
        var jsondata1=JSON.parse(jsondata)
        for(var data1 in jsondata1){
            for(var key in jsondata1[data1]){
                if(key==='role_app_id'){
                    role_app_ids.push(Number(jsondata1[data1][key]))

                }
            }
        }
        role_app_ids.sort() //sorting all existing role_app_id in database

      res.json(role_app_ids);
      module.exports=role_app_ids  
    } catch (error) {
      res.status(500).json({ error: `Internal server error in '/role_applications_ids' endpoint` });
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

