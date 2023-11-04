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

  app.post('/role_applications_staff', async (req, res) => {
    try {
      const { staff_id, role_listing_id } = req.body;
      
      // Create a new role application
      const role_application = await RoleApplications.create({
        staff_id,
        role_listing_id,
        role_app_status: 'applied',
        role_app_ts_create: new Date().toISOString(),
      });
  
      res.status(201).json(role_application); // Respond with the newly created role application
    } catch (error) {
      console.error('Error creating role application:', error);
      res.status(500).json({ error: `Internal server error in '/role_applications' endpoint` });
    }
  });


  app.put('/role_applications/:role_app_id', async (req, res) => {
    try {
      const { role_app_id } = req.params; // Extract the role_app_id from the URL parameters
      const { newStatus } = req.body; // Define a newStatus field in the request body
  
      // Check if the newStatus is one of the allowed values ('withdrawn', 'accepted', 'rejected')
      if (newStatus === 'withdrawn' || newStatus === 'accepted' || newStatus === 'rejected') {
        const roleApplication = await RoleApplications.findOne({
          where: { role_app_id },
        });
  
        if (roleApplication) {
          // Update the role_app_status with the newStatus
          roleApplication.role_app_status = newStatus;
  
          // Save the updated role application to the database
          await roleApplication.save();
  
          res.status(200).json(roleApplication); // Respond with the updated role application
        } else {
          res.status(404).json({ error: 'Role application not found' });
        }
      } else {
        res.status(400).json({ error: 'Invalid newStatus value' });
      }
    } catch (error) {
      console.error('Error updating role application status:', error);
      res.status(500).json({ error: 'Internal server error in updating role application status' });
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

