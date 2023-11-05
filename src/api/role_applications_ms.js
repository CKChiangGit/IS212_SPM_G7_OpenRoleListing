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

// Get all role applications
app.get('/roleapplications', async (req, res) => {
  try {
      const roleApplications = await RoleApplications.findAll();
      if (!roleApplications.length) {
      res.status(404).send('<p>There are no role applications.</p>');
      } else {
      res.status(200).json(roleApplications);
      }
  } catch (error) {
      console.error('Error getting all role applications:', error);
      res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});

// Post a new role application
app.post('/roleapplications', async (req, res) => {
  try {
      const { role_app_id, role_listing_id, staff_id, role_app_status } = req.body;
      const roleApplication = await RoleApplications.create({
      role_app_id,
      role_listing_id,
      staff_id,
      role_app_status
      });

      res.status(201).json(roleApplication);
  } catch (error) {
      console.error('Error creating a new role application:', error);
      res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});

// Post a new role application
app.post('/createroleapplications', async (req, res) => {
    try {
        const { role_app_id, role_listing_id, staff_id, role_app_status } = req.body;
        const roleApplication = await RoleApplications.create({
        role_app_id,
        role_listing_id,
        staff_id,
        role_app_status
        });

        res.status(201).json(roleApplication);
    } catch (error) {
        console.error('Error creating a new role application:', error);
        res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
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

